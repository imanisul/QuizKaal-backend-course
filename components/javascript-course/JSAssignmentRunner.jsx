"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, CheckCircle, AlertTriangle, XCircle, Lightbulb, Code as CodeIcon, Terminal, RefreshCw, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PremiumEduEditor from "@/components/interactive/editor/PremiumEduEditor";

export default function JSAssignmentRunner({ assignment }) {
  const [code, setCode] = useState(assignment?.starterCode || "");
  const [output, setOutput] = useState([]);
  const [feedback, setFeedback] = useState(null); // { status: 'success' | 'error' | 'warning', message: string }
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  // When assignment changes, reset everything
  useEffect(() => {
    setCode(assignment?.starterCode || "");
    setOutput([]);
    setFeedback(null);
    setShowHint(false);
    setShowSolution(false);
    setIsRunning(false);
  }, [assignment]);

  if (!assignment) return null;

  const handleRun = async (currentCode) => {
    setIsRunning(true);
    setFeedback(null);
    setOutput([]);
    setShowSolution(false);

    let logs = [];
    
    // Create a safe execution environment by mocking console.log

    // Initialize Web Worker
    let worker;
    try {
      worker = new Worker('/sandbox-worker.js');
    } catch (e) {
      setOutput([`Error: Could not start sandbox environment. ${e.message}`]);
      setIsRunning(false);
      return;
    }

    // Set a timeout to kill infinite loops
    const timeoutId = setTimeout(() => {
      worker.terminate();
      setOutput(["Error: Execution timed out (Possible infinite loop detected)."]);
      setFeedback({
        status: "error",
        message: "Code execution took too long and was terminated to protect your browser."
      });
      setIsRunning(false);
    }, 2000);

    // Listen for messages from the worker
    worker.onmessage = function(e) {
      clearTimeout(timeoutId);
      worker.terminate(); // Cleanup worker after execution

      const { logs, evalResult, error } = e.data;
      
      setOutput(logs);

      if (error) {
        setFeedback({
          status: "error",
          message: `Execution failed: ${error}`
        });
        setIsRunning(false);
        return;
      }

      // Evaluate the answer using the assignment's checkAnswer function
      if (assignment.checkAnswer) {
        try {
          const result = assignment.checkAnswer(currentCode, logs, evalResult);
          setFeedback(result);
        } catch (err) {
          setFeedback({
            status: "warning",
            message: `Evaluation error: ${err.message}`
          });
        }
      } else {
        setFeedback({
          status: "success",
          message: "Code executed successfully! (No validation rules provided for this assignment)"
        });
      }

      setIsRunning(false);
    };

    // Listen for worker errors
    worker.onerror = function(err) {
      clearTimeout(timeoutId);
      worker.terminate();
      
      setOutput([`Fatal Error: ${err.message}`]);
      setFeedback({
        status: "error",
        message: "A fatal error crashed the execution sandbox."
      });
      setIsRunning(false);
    };

    // Send code to worker
    worker.postMessage({ code: currentCode });
  };

  const handleReset = () => {
    setCode(assignment.starterCode || "");
    setOutput([]);
    setFeedback(null);
    setShowHint(false);
    setShowSolution(false);
  };

  return (
    <div className="bg-bgElevated rounded-2xl border border-borderStrong overflow-hidden flex flex-col shadow-sm mt-6 relative z-10">
      {/* Header */}
      <div className="bg-bgCard px-6 py-4 border-b border-borderStrong flex items-center justify-between">
        <h4 className="font-bold flex items-center gap-3 text-white">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
            <CodeIcon size={18} />
          </div>
          Assignment: {assignment.title}
        </h4>
      </div>

      {/* Description */}
      <div className="p-6 border-b border-borderStrong bg-bgCard">
        <p className="text-textSecondary leading-relaxed whitespace-pre-wrap">{assignment.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-borderStrong">
        {/* Editor Area */}
        <div className="border-r border-borderStrong flex flex-col min-h-[300px] lg:border-r-borderStrong lg:border-b-0 border-b">
          <div className="bg-bgCard px-4 py-2 border-b border-borderStrong flex justify-between items-center text-xs font-semibold text-textTertiary uppercase tracking-wider">
            <span>Editor</span>
            <button 
              onClick={handleReset}
              className="flex items-center gap-1.5 hover:text-textPrimary transition-colors"
            >
              <RefreshCw size={12} /> Reset
            </button>
          </div>
          <div className="flex-1 bg-[#0d1117] relative">
            <PremiumEduEditor 
              key={`editor-${assignment.title}`}
              initialCode={code}
              language="javascript"
              onRun={(c) => { setCode(c); handleRun(c); }}
              onReset={handleReset}
              className="h-full border-0 shadow-none rounded-none"
              hideOutputPanel={true}
            />
          </div>
        </div>

        {/* Output & Feedback Area */}
        <div className="flex flex-col min-h-[300px]">
          <div className="bg-bgCard px-4 py-2 border-b border-borderStrong text-xs font-semibold text-textTertiary uppercase tracking-wider flex items-center gap-2">
            <Terminal size={14} /> Console Output
          </div>
          <div className="flex-1 p-4 bg-black/60 font-mono text-sm overflow-y-auto text-textSecondary custom-scrollbar min-h-[150px]">
            {output.length === 0 ? (
              <span className="text-textTertiary italic">No output yet. Run your code to see the result.</span>
            ) : (
              output.map((line, idx) => (
                <div key={idx} className={`${line.startsWith('Error:') ? 'text-red-400' : 'text-green-400'} mb-1 whitespace-pre-wrap break-words`}>
                  {line}
                </div>
              ))
            )}
          </div>

          {/* Feedback Area */}
          {feedback && (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border-t ${
                  feedback.status === 'success' ? 'bg-success/10 border-success/30 text-success' :
                  feedback.status === 'error' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                  'bg-warning/10 border-warning/30 text-warning'
                }`}
              >
                <div className="flex items-start gap-3">
                  {feedback.status === 'success' ? <CheckCircle size={20} className="shrink-0 mt-0.5" /> :
                   feedback.status === 'error' ? <XCircle size={20} className="shrink-0 mt-0.5" /> :
                   <AlertTriangle size={20} className="shrink-0 mt-0.5" />}
                  <div>
                    <h5 className="font-bold mb-1">
                      {feedback.status === 'success' ? 'Correct!' :
                       feedback.status === 'error' ? 'Incorrect' :
                       'Almost there'}
                    </h5>
                    <p className="text-sm opacity-90 whitespace-pre-wrap break-words">{feedback.message}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-bgCard px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          {assignment.hint && (
            <button 
              onClick={() => setShowHint(!showHint)}
              className="px-4 py-2 rounded-xl font-semibold text-sm transition-colors border border-borderStrong text-textSecondary hover:bg-bgElevated hover:text-white flex items-center gap-2"
            >
              <Lightbulb size={16} /> {showHint ? "Hide Hint" : "Need a Hint?"}
            </button>
          )}
          {assignment.solution && (
            <button 
              onClick={() => setShowSolution(!showSolution)}
              className="px-4 py-2 rounded-xl font-semibold text-sm transition-colors border border-borderStrong text-textSecondary hover:bg-bgElevated hover:text-white flex items-center gap-2"
            >
              <Eye size={16} /> {showSolution ? "Hide Solution" : "Show Solution"}
            </button>
          )}
        </div>
        <button 
          onClick={() => handleRun(code)}
          className="px-6 py-2 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Play size={16} /> Run & Check
        </button>
      </div>

      {/* Hint / Solution Drawers */}
      <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-borderStrong bg-warning/5"
          >
            <div className="p-6 flex items-start gap-4">
              <div className="p-2 bg-warning/20 text-warning rounded-lg shrink-0"><Lightbulb size={20} /></div>
              <div>
                <h5 className="font-bold text-warning mb-2">Hint</h5>
                <p className="text-sm text-textSecondary">{assignment.hint}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {showSolution && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-borderStrong bg-success/5"
          >
            <div className="p-6 flex items-start gap-4">
              <div className="p-2 bg-success/20 text-success rounded-lg shrink-0"><Eye size={20} /></div>
              <div className="w-full min-w-0">
                <h5 className="font-bold text-success mb-2">Solution</h5>
                <div className="bg-[#0d1117] rounded-xl border border-white/5 p-4 overflow-hidden w-full">
                  <pre className="text-sm font-mono text-[#c9d1d9] overflow-x-auto custom-scrollbar">
                    <code>{assignment.solution}</code>
                  </pre>
                </div>
                {assignment.explanation && (
                  <div className="mt-4 text-sm text-textSecondary bg-bgElevated p-4 rounded-xl border border-borderStrong break-words">
                    <strong>Explanation:</strong> {assignment.explanation}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
