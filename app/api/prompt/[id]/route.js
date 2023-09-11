import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { id } = params;
    const prompt = await Prompt.findById(id).populate("creator");
    if (prompt && Object.keys(prompt).length > 0) {
      return new Response(JSON.stringify(prompt), { status: 200 });
    }
    return new Response({ error: "Prompt not found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return new Response(
      { error: "Failed to fetch the prompt" },
      { status: 500 }
    );
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  const { id } = params;
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(id).populate("creator");
    if (existingPrompt && Object.keys(existingPrompt).length > 0) {
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      await existingPrompt.save();
      return new Response(JSON.stringify(existingPrompt), { status: 200 });
    }
    return new Response({ error: "Prompt not found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return new Response(
      { error: "Failed to update the prompt" },
      { status: 500 }
    );
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(id);
    return new Response(
      { success: "Prompt deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      { error: "Failed to delete the prompt" },
      { status: 500 }
    );
  }
};
