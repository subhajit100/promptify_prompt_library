"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

// Do not confuse between params and searchParams below:-
// params is path params and searchParams are query params
// Eg: route = '/profile/[id]?name=subhajit'
// In the above route '[id]' is path params and 'name=subhajit' is query params

const UserProfile = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  const fetchUserPosts = async () => {
    const response = await fetch(`/api/users/${params?.id}/posts`);
    const data = await response.json();
    setUserPosts(data);
  };

  useEffect(() => {
    if (params?.id) {
      fetchUserPosts();
    }
  }, [params?.id]);

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
