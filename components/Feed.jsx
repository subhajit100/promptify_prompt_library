"use client";

import React, { useRef } from "react";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  let allPosts = useRef([]);

  // search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedPosts, setSearchedPosts] = useState([]);

  const actualSearch = (text) => {
    if (text !== "") {
      // if something in search box, then filter the tag, prompt text and username for the search text.
      const regex = new RegExp(text, "i"); // 'i' flag for case-insensitive search
      const filteredPosts = allPosts.current.filter((post) => {
        return (
          regex.test(post.prompt) ||
          regex.test(post.tag) ||
          regex.test(post.creator.username)
        );
      });
      setSearchedPosts(filteredPosts);
    } else {
      setSearchedPosts(allPosts.current); // when nothing searched, it goes back to showing all posts
    }
  };

  const handleSearchChange = (text) => {
    clearTimeout(searchTimeout);

    // debounce
    setSearchTimeout(
      setTimeout(() => {
        actualSearch(text);
      }, 500)
    );

    setSearchText(text);
  };

  const handleTagClick = (postTag) => {
    setSearchText(postTag);
    handleSearchChange(postTag);
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt/all");
    const data = await response.json();
    allPosts.current = data;
    setSearchedPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
