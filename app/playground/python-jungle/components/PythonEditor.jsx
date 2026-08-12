"use client";
import React, { useState } from "react";
import PremiumEduEditor from "../../../../components/interactive/editor/PremiumEduEditor";

export default function PythonEditor({ missionCode, onComplete }) {
  const [executionState, setExecutionState] = useState({
    isRunning: false,
    currentLine: null,
    output: "",
    error: null,
    success: false
  });

  const handleRun = (code) => {
    setExecutionState({ isRunning: true, currentLine: 1, output: "Running script...\n", error: null, success: false });

    // Mock execution loop
    setTimeout(() => {
      setExecutionState(prev => ({ ...prev, currentLine: 2 }));
      
      setTimeout(() => {
        if (missionCode?.validationRegex?.test(code)) {
          // Success
          setExecutionState({
            isRunning: false,
            currentLine: null,
            output: "Running script...\n\n" + (missionCode.successMessage || "") + "\n> Task Completed Successfully.",
            error: null,
            success: true
          });
          if (onComplete) onComplete();
        } else {
          // Failure
          setExecutionState({
            isRunning: false,
            currentLine: null,
            output: "Running script...\n\nProcess exited with error.\n\n💡 Tip: " + (missionCode?.failureMessage || "Check your code logic and syntax. Use print statements to debug!"),
            error: "Execution Failed",
            success: false
          });
        }
      }, 500);
    }, 500);
  };

  const handleReset = () => {
    setExecutionState({ isRunning: false, currentLine: null, output: "", error: null, success: false });
  };

  return (
    <PremiumEduEditor 
      initialCode={missionCode?.initialCode || ""}
      language="python"
      onRun={handleRun}
      onReset={handleReset}
      executionState={executionState}
      explanations={missionCode?.explanations || {}}
      className="h-[500px]"
    />
  );
}
