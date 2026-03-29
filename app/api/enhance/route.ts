import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { resumeData } = await req.json();
    
    // 1. Configure the model to strictly return JSON
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    // Clarified prompt since the MIME type already enforces JSON output
    const prompt = `You are an expert resume writer. Rewrite and improve the following resume data. Keep the exact same JSON structure/keys as the provided input.
    
    Input data:
    ${JSON.stringify(resumeData)}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // 2. Parse the stringified JSON from the AI into a real JavaScript object
    const enhancedResumeObject = JSON.parse(responseText);

    // 3. Send the object back to the frontend
    return NextResponse.json({ enhancedData: enhancedResumeObject });

  } catch (error) {
    // Adding error handling in case the AI fails or parsing throws an error
    console.error("Error processing resume:", error);
    return NextResponse.json(
      { error: "Failed to process and enhance resume data." }, 
      { status: 500 }
    );
  }
}