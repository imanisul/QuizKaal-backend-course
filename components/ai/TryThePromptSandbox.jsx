"use client";
import React, { useState } from "react";
import { Sparkles, Play, Code2 } from "lucide-react";
import { useAgeMode } from "@/app/ai-prompt-engineering/AgeModeContext";

export default function TryThePromptSandbox({ 
  initialPrompt = "Write a story about a dog.",
  kidResponse = "Once upon a time, a fluffy dog named Buster found a magic bone! ",
  teenResponse = "The golden retriever sprinted across the park, finally catching the frisbee just as the sun set over the city skyline.",
  proResponse = "In an isolated research facility, Unit D-09, a genetically enhanced canine, breached containment protocols at 0400 hours.",
}) {
  const { ageMode } = useAgeMode();
  const [prompt, setPrompt] = useState(initialPrompt);
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRun = () => {
    setIsGenerating(true);
    setOutput("");
    
    setTimeout(() => {
      setIsGenerating(false);
      // Simulate different responses based on age mode, but also based on the prompt if we were really connecting to an API.
      // For this sandbox, we'll use the canned responses passed via props for reliability.
      if (ageMode === "kid") setOutput(kidResponse);
      else if (ageMode === "teen") setOutput(teenResponse);
      else setOutput(proResponse);
    }, 1500);
  };

  return (
    <div className="w-full bg-[#111113] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row my-8">
      
      {/* Editor Side */}
      <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-white/10">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
          <Code2 size={16} className="text-gray-400" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Try It: Sandbox</span>
        </div>
        <div className="p-4 flex-1">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-full min-h-[150px] bg-transparent resize-none outline-none text-gray-200 text-sm font-mono placeholder:text-gray-600"
            placeholder="Type your prompt here..."
          />
        </div>
        <div className="p-4 border-t border-white/5 flex justify-end">
          <button 
            onClick={handleRun}
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-bold transition-all text-sm"
          >
            {isGenerating ? <Sparkles className="animate-spin" size={16} /> : <Play size={16} />}
            {isGenerating ? "Generating..." : "Run Prompt"}
          </button>
        </div>
      </div>

      {/* Output Side */}
      <div className="w-full md:w-1/2 flex flex-col bg-black/20">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
          <Sparkles size={16} className="text-fuchsia-400" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Output ({ageMode} mode)</span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          {output ? (
            <div className="text-sm text-gray-200 leading-relaxed font-mono whitespace-pre-wrap">
              {output}
            </div>
          ) : isGenerating ? (
            <div className="flex flex-col gap-2 w-full max-w-sm animate-pulse">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-full"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-gray-500 italic">
              Click Run to see the response.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
