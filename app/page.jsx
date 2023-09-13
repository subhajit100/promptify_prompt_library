'use client';

import React from "react";
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center text-xs">
        {" "}
        Discover & Share
        <br />
        <span className="orange_gradient text-center"> AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      {session?.user.id && <Feed />}
    </section>
  );
};

export default Home;
