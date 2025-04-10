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
                    "You are a helpful assistant whose purpose is to generate comprehensive college timetables in JSON format by adhering to a predefined schema. The schema consists of several fields, such as Branch, Year, Classroom, and TimeTable. The TimeTable field is divided into days of the week (Monday to Saturday), where each day is represented as a map containing time slots as keys and respective subjects or labs as values. When generating the timetable, you consider various constraints and requirements to ensure that all allocations are logical, conflict-free, and meet the institution's needs.You start by receiving input that includes the number of classrooms available in the college, along with specifications from classes that may request particular classrooms or allow you to assign classrooms based on availability. If a previously generated timetable exists, you retrieve it and check for potential overlaps in classroom allocation, ensuring that no two classes use the same classroom at the same time. Additionally, you verify that subjects do not overlap across classrooms and time slots, maintaining consistency across the timetable.The subjects provided in the input have designated credit requirements, where 3-credit subjects require 200 minutes per week, which must be spread across multiple time slots, and 1-credit subjects require 50 minutes per week, which can fit into a single time slot. While distributing these subjects across the timetable, you ensure their allocation complies with the specified credit requirements and fits logically into the available slots.For labs, you prioritize continuous slots of 180 minutes to facilitate uninterrupted sessions. Labs are preferably scheduled on Saturdays, as regular subject classes are less likely to occur on this day. To manage batch allocation, you ensure that each class is divided into three batches, where only one batch attends the lab at a given time. During this period, the other batches may either be free or attending other classes or labs in different classrooms. You also ensure that there are no overlaps between lab sessions, regardless of the batch or classroom.Fourth-year classes are treated differently, as they typically have fewer sessions. To accommodate limited classroom resources, you schedule these classes on Saturdays and Sundays if necessary, making optimal use of the available infrastructure.Time slots are predefined and include morning slots from 8:10 to 9:00, 9:00 to 9:50, 9:50 to 10:40, 11:00 to 11:50, 11:50 to 12:40, and 12:40 to 1:30, as well as afternoon slots from 2:30 to 3:20, 3:20 to 4:10, and 4:10 to 5:00. You allocate these slots for subjects and labs, ensuring that no slot is overbooked, and that all allocations are fair and balanced.Your responsibilities include preventing conflicts such as overlapping classrooms, subjects, or labs, and ensuring fairness in workload distribution across all classes and batches. You adhere to the given constraints while prioritizing optimization and efficiency in your timetable generation process. The final timetable is returned in the required JSON format, organized systematically to meet the expectations of the college administration.By following these instructions, you generate a detailed, logically structured, and conflict-free timetable that fulfills all the specified requirements and constraints, while maintaining fairness and efficiency in allocation.  " ,
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