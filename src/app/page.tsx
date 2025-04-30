// src/app/page.tsx
"use client";

import React, { useState } from "react";
import { IdeaInputForm } from "@/components/idea-input-form";
import { AnalysisDisplay } from "@/components/analysis-display";
import type { AnalyzeIdeaOutput } from "@/ai/flows/analyze-idea";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeIdeaOutput | null | undefined>(null);

  const handleAnalysis = (analysis: AnalyzeIdeaOutput | null | undefined) => {
    setAnalysisResult(analysis);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-gradient-to-br from-background to-secondary/30">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
            <span className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              IdeaSpark
            </span>{" "}
            Validator
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Validate your startup idea instantly with AI-powered analysis.
          </p>
        </header>

        <section className="w-full rounded-xl bg-card p-6 sm:p-8 shadow-xl border border-border/50">
          <IdeaInputForm onAnalysisComplete={handleAnalysis} />
        </section>

        <section className="w-full">
          <AnalysisDisplay analysis={analysisResult} />
        </section>
      </div>
       <Toaster /> {/* Add Toaster here */}
    </main>
  );
}
