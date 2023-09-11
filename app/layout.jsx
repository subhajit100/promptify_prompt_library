import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Promptify - Your Creative ChatGPT Prompt Library",
  description:
    "Welcome to Promptify, the ultimate hub for ChatGPT enthusiasts and creative minds! Our platform is a collaborative space where you can access a vast collection of prompts, from engaging conversations to thought-provoking challenges. But that's not all – PromptPal is designed to be community-driven, allowing users to contribute their own unique prompts, fostering a dynamic and ever-expanding resource for inspiration. Whether you're a writer, storyteller, or just looking for fun and intriguing interactions with AI, PromptPal has you covered. Dive into a world of limitless creativity and see where your imagination takes you. Join us today and become a part of a vibrant community that fuels innovation and sparks fascinating conversations with ChatGPT!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
