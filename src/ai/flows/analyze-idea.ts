'use server';


import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeIdeaInputSchema = z.object({
  idea: z.string().describe('The startup idea to analyze.'),
});
export type AnalyzeIdeaInput = z.infer<typeof AnalyzeIdeaInputSchema>;

const AnalyzeIdeaOutputSchema = z.object({
  problem: z.string().describe('The problem that the startup idea solves.'),
  targetUsers: z.string().describe('The target users for the startup idea.'),
  businessModels: z
    .string()
    .describe('Potential business models for the startup idea.'),
  competitors: z.string().describe('The main competitors for the startup idea.'),
  risks: z.string().describe('Potential risks associated with the startup idea.'),
  oneLinePitch: z.string().describe('A one-line pitch for the startup idea.'),
});
export type AnalyzeIdeaOutput = z.infer<typeof AnalyzeIdeaOutputSchema>;

export async function analyzeIdea(input: AnalyzeIdeaInput): Promise<AnalyzeIdeaOutput> {
  return analyzeIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeIdeaPrompt',
  input: {
    schema: z.object({
      idea: z.string().describe('The startup idea to analyze.'),
    }),
  },
  output: {
    schema: z.object({
      problem: z.string().describe('The problem that the startup idea solves.'),
      targetUsers: z.string().describe('The target users for the startup idea.'),
      businessModels: z
        .string()
        .describe('Potential business models for the startup idea.'),
      competitors: z.string().describe('The main competitors for the startup idea.'),
      risks: z.string().describe('Potential risks associated with the startup idea.'),
      oneLinePitch: z.string().describe('A one-line pitch for the startup idea.'),
    }),
  },
  prompt: `Analyze the following startup idea and provide insights into the problem it solves, target users, potential business models, competitors, risks, and a one-line pitch.\n\nStartup Idea: {{{idea}}}\n\nAnalysis:\nProblem: \nTarget Users: \nBusiness Models: \nCompetitors: \nRisks: \nOne-Line Pitch: `,
});

const analyzeIdeaFlow = ai.defineFlow<
  typeof AnalyzeIdeaInputSchema,
  typeof AnalyzeIdeaOutputSchema
>({
  name: 'analyzeIdeaFlow',
  inputSchema: AnalyzeIdeaInputSchema,
  outputSchema: AnalyzeIdeaOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
