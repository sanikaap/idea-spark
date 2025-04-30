
"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleAnalyzeIdea, FormState } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { LoadingIndicator } from "./loading-indicator";

interface IdeaInputFormProps {
  onAnalysisComplete: (analysis: FormState['analysis']) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        "Spark Analysis"
      )}
    </Button>
  );
}
import { Loader2 } from 'lucide-react';


export function IdeaInputForm({ onAnalysisComplete }: IdeaInputFormProps) {
  const initialState: FormState = { message: "" };
  const [state, formAction] = useFormState(handleAnalyzeIdea, initialState);
  const { pending } = useFormStatus();

  
  React.useEffect(() => {
    if (state.analysis) {
      onAnalysisComplete(state.analysis);
    }
     
  }, [state.analysis]); 


  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="idea" className="text-lg font-semibold text-primary">
          Enter Your Startup Idea
        </Label>
        <Textarea
          id="idea"
          name="idea"
          placeholder="Describe your innovative startup idea here..."
          rows={5}
          className="resize-none border-input focus:border-primary focus:ring-primary"
          aria-describedby="idea-error"
          required
          disabled={pending}
        />
        {state.errors?.idea && (
          <p id="idea-error" className="text-sm text-destructive">
            {state.errors.idea[0]}
          </p>
        )}
      </div>

      <div className="flex justify-end">
         <SubmitButton />
      </div>

      {pending && <LoadingIndicator className="mt-4" />}

      {state.message && !state.analysis && !pending && (
        <Alert variant={state.errors ? "destructive" : "default"} className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{state.errors ? "Error" : "Status"}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
