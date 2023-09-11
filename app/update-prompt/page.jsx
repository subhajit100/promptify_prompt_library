"use client";

import { useEffect, useState } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const getPromptData = async (promptId) => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();
    setPost({
      prompt: data.prompt,
      tag: data.tag,
    });
  };

  useEffect(() => {
    if (promptId) {
      getPromptData(promptId);
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault(); // this is to prevent reload of page on submitting form
    setSubmitting(true); // to create a loading effect when submitting = true

    if (!promptId) {
      return alert("Prompt ID not found");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      submitting={submitting}
      post={post}
      setPost={setPost}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
