import OpenAI from "openai";
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "system",
            content:
                "how it should genarate time table antha illi describe madbeku. " ,
        },
        {
            role: "user",
            content: JSON.stringify(prompt),
        },
    ],
});