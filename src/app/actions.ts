// src/app/actions.ts
"use server";

import { analyzeIdea, AnalyzeIdeaInput, AnalyzeIdeaOutput } from "@/ai/flows/analyze-idea";
import { z } from "zod";

const IdeaSchema = z.object({
  idea: z.string().min(10, { message: "Idea must be at least 10 characters long." }),
});

export type FormState = {
  message: string;
  analysis?: AnalyzeIdeaOutput;
  errors?: {
    idea?: string[];
  };
};

export async function handleAnalyzeIdea(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = IdeaSchema.safeParse({
    idea: formData.get("idea"),
  });

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const analysisResult = await analyzeIdea(validatedFields.data);
    return {
      message: "Analysis successful!",
      analysis: analysisResult,
    };
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      message: "Analysis failed. Please try again.",
    };
  }
}
