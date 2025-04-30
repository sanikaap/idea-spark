// src/components/analysis-display.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Users, Briefcase, Target, AlertTriangle, Zap } from 'lucide-react';
import type { AnalyzeIdeaOutput } from '@/ai/flows/analyze-idea';

interface AnalysisDisplayProps {
  analysis: AnalyzeIdeaOutput | null | undefined;
}

interface AnalysisSectionProps {
  title: string;
  content: string | undefined;
  icon: React.ElementType;
}

function AnalysisSection({ title, content, icon: Icon }: AnalysisSectionProps) {
  if (!content) return null;

  return (
    <div className="mb-6 rounded-lg border border-border p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center mb-2">
        <Icon className="h-5 w-5 mr-2 text-primary" />
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>
      <p className="text-foreground/90 whitespace-pre-wrap">{content}</p>
    </div>
  );
}


export function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  if (!analysis) {
    return null; // Don't render anything if there's no analysis
  }

  return (
    <Card className="mt-8 w-full bg-card border-none shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Idea Analysis ✨
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnalysisSection title="Problem Solved" content={analysis.problem} icon={Lightbulb} />
        <AnalysisSection title="Target Users" content={analysis.targetUsers} icon={Users} />
        <AnalysisSection title="Potential Business Models" content={analysis.businessModels} icon={Briefcase} />
        <AnalysisSection title="Competitors" content={analysis.competitors} icon={Target} />
        <AnalysisSection title="Potential Risks" content={analysis.risks} icon={AlertTriangle} />
        <AnalysisSection title="One-Line Pitch" content={analysis.oneLinePitch} icon={Zap} />
      </CardContent>
    </Card>
  );
}
