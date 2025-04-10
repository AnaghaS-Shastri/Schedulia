import { NextResponse } from "next/server";
import OpenAI from "openai";
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
function parseJson(response) {
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);

    if (jsonMatch) {
        const jsonString = jsonMatch[1];
        try {
            const jsonData = JSON.parse(jsonString);
            return jsonData;
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    } else {
        console.error("No JSON found in the response");
    }
}
export async function POST(req) {
    const { prompt } = await req.json();
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            {
                role: "system",
                content:
                    "You are a helpful assistant that can generate a weekly college timetable in JSON format for multiple branches and years based on provided subject lists (specifying 3-credit and 1-credit subjects and labs) and preferred classrooms. The timetable should cover Monday to Saturday with predefined time slots: 8:10-9:00 9:00-9:50 9:50-10:40 11:00-11:50 11:50-12:40 12:40-1:30 2:30-3:20 3:20-4:10 and 4:10-5:00. Each day in the JSON output should be a dictionary with these time slots as keys. For theory classes the value should be the subject name (e.g. OS AI). For lab sessions the value should be a dictionary containing Classroom (from a predefined list like Lab1 Lab2 Lab3 Lab4) Batch (from Batch1 Batch2 Batch3) and Subject (e.g. DAALab Javalab). Each day must also include a key Classrooms Labs Used which is a list of all unique classrooms and labs used on that day. Do not include classroom names in the individual theory slot values. Ensure that 3-credit subjects are allocated 200 minutes per week (across multiple slots) and 1-credit subjects are allocated 50 minutes per week. Labs require 180 continuous minutes (3 consecutive time slots) Each batch should have each lab subject once per week and a batch cannot have more than one lab on the same day. Different batches can have labs simultaneously in different labs. Theory classes should not be scheduled on Saturdays. The input will be a list of dictionaries where each dictionary contains a prompt with Branch previous_timetable (which can be ignored for now) and subjects (a dictionary containing lists for 3credits 1credits labs and a preferable_classroom). Generate a JSON output containing a list of timetables one for each input prompt including Branch Year (set to 2nd) Classroom (a list containing the preferred classroom and all lab rooms) and the TimeTable dictionary. Produce the described JSON output ensuring all constraints are met" ,
            },
            {
                role: "user",
                content: JSON.stringify(prompt),
            },
        ],
    })
    const data = parseJson(response.choices[0].message.content);
    return NextResponse.json(data);
  
};