"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronRight, ChevronLeft, Bot, Target, FileText, Settings, Type, AlignLeft, Sparkles, Terminal, Users, ShieldAlert, BookOpen, RotateCcw } from "lucide-react";

const STEPS = [
  { id: "role", label: "Role", icon: Bot, description: "Who is the AI acting as?" },
  { id: "task", label: "Task", icon: Target, description: "What exactly needs to be done?" },
  { id: "context", label: "Context", icon: FileText, description: "What background info is needed?" },
  { id: "audience", label: "Audience", icon: Users, description: "Who is the output for?" },
  { id: "constraints", label: "Constraints", icon: ShieldAlert, description: "What should the AI NOT do?" },
  { id: "tone", label: "Tone", icon: Type, description: "How should the AI sound?" },
  { id: "format", label: "Output Format", icon: AlignLeft, description: "How should the response look?" },
  { id: "examples", label: "Examples", icon: BookOpen, description: "Show the AI what good output looks like (optional)" },
];

const PRESETS = {
  role: ["Senior Developer", "Expert Teacher", "Data Analyst", "Copywriter", "Product Manager", "UX Designer", "Career Coach", "Business Analyst"],
  audience: ["A 10-year-old", "A college student", "A CTO", "A junior developer", "A non-technical stakeholder", "A hiring manager"],
  constraints: ["Keep under 200 words", "Do not use jargon", "Do not include code", "Do not make assumptions", "No bullet points — use prose", "Do not mention competitors"],
  tone: ["Professional", "Casual & Friendly", "Strict & Direct", "Humorous", "Academic", "Empathetic", "Encouraging", "Assertive"],
  format: ["Markdown with Code Blocks", "Bullet Points", "JSON", "Table", "Step-by-Step Guide", "Essay", "Numbered List", "Checklist"]
};

const INITIAL_STATE = {
  role: "", task: "", context: "", audience: "", constraints: "", tone: "", format: "", examples: ""
};

const stepVariants = {
  enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
};

export default function PromptBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [copied, setCopied] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) { setDirection(1); setCurrentStep(c => c + 1); }
  };
  const handlePrev = () => {
    if (currentStep > 0) { setDirection(-1); setCurrentStep(c => c - 1); }
  };
  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setDirection(-1);
    setCurrentStep(0);
  };

  const filledFields = Object.values(formData).filter(v => v.trim()).length;

  // Build the generated prompt dynamically (only include filled fields)
  const buildPrompt = () => {
    const parts = [];
    if (formData.role) parts.push(`Act as a ${formData.role}.`);
    if (formData.task) parts.push(`\nYour task is to ${formData.task}.`);
    if (formData.context) parts.push(`\nHere is the context you need to know:\n${formData.context}`);
    if (formData.audience) parts.push(`\nThe output is intended for: ${formData.audience}.`);
    if (formData.constraints) parts.push(`\nConstraints:\n- ${formData.constraints}`);
    if (formData.tone) parts.push(`\nPlease use a ${formData.tone} tone of voice.`);
    if (formData.format) parts.push(`\nFormat your output as ${formData.format}.`);
    if (formData.examples) parts.push(`\nHere is an example of the expected output:\n${formData.examples}`);
    return parts.length > 0 ? parts.join('\n') : 'Start filling in the fields above to generate your prompt...';
  };

  const generatedPrompt = buildPrompt();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const StepIcon = STEPS[currentStep].icon;
  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="bg-white/[0.02] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row my-12 backdrop-blur-xl">
      
      {/* Left Sidebar - Stepper */}
      <div className="w-full md:w-[280px] lg:w-[320px] bg-black/60 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/5 relative shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-xl">
              <Sparkles className="text-primary w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white tracking-tight">Prompt Builder</h3>
          </div>
          {filledFields > 0 && (
            <button 
              onClick={handleReset}
              className="p-2 rounded-lg text-textTertiary hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Reset all fields"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>

        {/* Filled count badge */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(filledFields / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs text-textTertiary font-bold tabular-nums">{filledFields}/{STEPS.length}</span>
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden mb-6">
          <div className="text-xs text-textTertiary font-bold uppercase tracking-widest text-right">
            Step {currentStep + 1} of {STEPS.length}
          </div>
        </div>

        {/* Desktop Vertical Stepper */}
        <div className="hidden md:flex flex-col relative">
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-white/5 -z-10" />
          <div className="flex flex-col gap-2">
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStep;
              const isFilled = formData[step.id]?.trim();
              
              return (
                <button
                  key={step.id}
                  onClick={() => { setDirection(idx > currentStep ? 1 : -1); setCurrentStep(idx); }}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all text-left relative group ${isActive ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300
                    ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 
                      isFilled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                      'bg-black text-textTertiary border border-white/10 group-hover:border-white/20'}`}
                  >
                    {isFilled && !isActive ? <Check size={16} /> : <step.icon size={16} />}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm font-bold transition-colors truncate ${isActive ? 'text-white' : isFilled ? 'text-white/80' : 'text-textTertiary'}`}>
                      {step.label}
                      {step.id === 'examples' && <span className="text-textTertiary font-normal text-xs ml-1">(optional)</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Content - Active Step & Preview */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col min-h-[550px]">
        
        {/* Step Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="flex-1 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-primary shadow-inner border border-white/5">
                  <StepIcon size={22} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white tracking-tight">{STEPS[currentStep].label}</h4>
                  <p className="text-sm text-textSecondary">{STEPS[currentStep].description}</p>
                </div>
              </div>

              {/* Input Area */}
              {PRESETS[STEPS[currentStep].id] ? (
                <div className="flex-1">
                  <label className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-3 block">Quick Select</label>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {PRESETS[STEPS[currentStep].id].map(preset => {
                      const isSelected = formData[STEPS[currentStep].id] === preset;
                      return (
                        <button
                          key={preset}
                          onClick={() => setFormData(prev => ({ ...prev, [STEPS[currentStep].id]: preset }))}
                          className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 border
                            ${isSelected 
                              ? 'bg-primary/20 border-primary/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                              : 'bg-white/5 border-white/10 text-textSecondary hover:bg-white/10 hover:text-white hover:border-white/20'}`}
                        >
                          {preset}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="relative">
                    <label className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-2 block">Or type your own</label>
                    <input
                      type="text"
                      value={formData[STEPS[currentStep].id]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [STEPS[currentStep].id]: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-textTertiary focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all shadow-inner"
                      placeholder={`e.g., ${PRESETS[STEPS[currentStep].id][0]}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <label className="text-xs font-bold text-textTertiary uppercase tracking-widest mb-2 block">Details</label>
                  <textarea
                    value={formData[STEPS[currentStep].id]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [STEPS[currentStep].id]: e.target.value }))}
                    className="w-full flex-1 min-h-[160px] bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-textTertiary focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all resize-none shadow-inner leading-relaxed"
                    placeholder={STEPS[currentStep].id === 'examples' 
                      ? 'Paste an example of what good output looks like (optional)...'
                      : `Describe the ${STEPS[currentStep].label.toLowerCase()} in detail...`}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-5 border-t border-white/10">
            <button 
              onClick={handlePrev} 
              disabled={currentStep === 0}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-textSecondary hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:text-textSecondary disabled:hover:bg-transparent flex items-center gap-2 transition-all"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button 
              onClick={handleNext} 
              disabled={currentStep === STEPS.length - 1}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 flex items-center gap-2 transition-all"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Live Preview (Terminal Style) */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d0d12]">
          <div className="bg-white/5 px-4 py-2.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-3 text-xs font-mono text-textTertiary flex items-center gap-2">
                <Terminal size={12} /> generated_prompt.md
              </span>
            </div>
            <div className="flex items-center gap-2">
              {filledFields > 0 && (
                <button 
                  onClick={handleReset}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-500/10 text-textTertiary hover:text-red-400 transition-colors flex items-center gap-1.5"
                  title="Reset"
                >
                  <RotateCcw size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Reset</span>
                </button>
              )}
              <button 
                onClick={copyToClipboard}
                disabled={filledFields === 0}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-primary/50 group"
                aria-label="Copy Generated Prompt"
              >
                {copied ? <Check size={13} className="text-success" /> : <Copy size={13} className="group-hover:scale-110 transition-transform" />}
                <span className="text-[10px] font-bold uppercase tracking-widest">{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
          
          <div className="p-4 md:p-5 bg-black/40 max-h-[280px] overflow-y-auto">
            <pre className="text-sm text-white/90 whitespace-pre-wrap font-mono leading-relaxed">
              {formData.role && <>Act as a <span className="text-primary font-bold">{formData.role}</span>.{"\n\n"}</>}
              {formData.task && <>Your task is to <span className="text-purple-400 font-bold">{formData.task}</span>.{"\n\n"}</>}
              {formData.context && <>Here is the context you need to know:{"\n"}<span className="text-blue-300 font-bold">{formData.context}</span>{"\n\n"}</>}
              {formData.audience && <>The output is intended for: <span className="text-amber-400 font-bold">{formData.audience}</span>.{"\n\n"}</>}
              {formData.constraints && <>Constraints:{"\n"}- <span className="text-red-400 font-bold">{formData.constraints}</span>{"\n\n"}</>}
              {formData.tone && <>Please use a <span className="text-pink-400 font-bold">{formData.tone}</span> tone of voice.{"\n\n"}</>}
              {formData.format && <>Format your output as <span className="text-green-400 font-bold">{formData.format}</span>.{"\n\n"}</>}
              {formData.examples && <>Here is an example of expected output:{"\n"}<span className="text-cyan-400 font-bold">{formData.examples}</span>{"\n"}</>}
              {filledFields === 0 && <span className="text-textTertiary italic">Start filling in the fields above to generate your prompt...</span>}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
