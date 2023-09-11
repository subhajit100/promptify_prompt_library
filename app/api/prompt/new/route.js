import Prompt from "@models/prompt";

const { connectToDB } = require("@utils/database");

export const POST = async (req) => {
    const {prompt, userId, tag} = await req.json(); // getting body elements from request (req)
    try{
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt) ,{status: 201}); // this is for sending the response
    }
    catch(error){
        console.log(error);
        return new Response({error: "Failed to create a new Prompt"}, {status: 500});
    }

}
