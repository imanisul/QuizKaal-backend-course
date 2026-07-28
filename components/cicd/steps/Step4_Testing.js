"use client";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Step4_Testing({ scenario }) {
  const isFail = scenario === "test_fail";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl border ${isFail ? 'bg-error/10 border-error/20' : 'bg-success/10 border-success/20'}`}>
          {isFail ? <XCircle className="text-error" size={24} /> : <CheckCircle2 className="text-success" size={24} />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">4. Testing</h2>
          <p className="text-textSecondary text-sm">Validating the logic automatically.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl p-6 flex flex-col justify-center">
          <div className="space-y-4">
             <TestRunner name="Unit Tests (Jest)" total={142} duration="4.2s" fail={isFail} />
             {!isFail && (
               <>
                 <TestRunner name="Integration Tests" total={45} duration="12.4s" fail={false} delay={1} />
                 <TestRunner name="Linter (ESLint)" total={1} duration="1.1s" fail={false} delay={2} />
               </>
             )}
          </div>
        </div>

        {isFail ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-error/10 border border-error/20 rounded-xl p-6 flex flex-col">
            <h3 className="font-bold text-error mb-4 flex items-center gap-2"><AlertTriangle size={18}/> Pipeline Halted</h3>
            <div className="bg-[#0a0b0f] border border-error/20 p-4 rounded-lg text-xs font-mono text-error/80 whitespace-pre overflow-x-auto flex-1">
FAIL src/services/auth.test.ts<br/>
&nbsp;&nbsp;✕ should return 401 for invalid JWT (12 ms)<br/><br/>
&nbsp;&nbsp;Expected: 401<br/>
&nbsp;&nbsp;Received: 200<br/><br/>
Test Suites: 1 failed, 141 passed, 142 total<br/>
Tests:       1 failed, 843 passed, 844 total
            </div>
            <div className="mt-4 text-sm text-textSecondary">
              Because a test failed, Jenkins immediately marks the build as <strong>FAILED</strong> and sends a Slack alert to the team. The broken code is prevented from reaching production.
            </div>
          </motion.div>
        ) : (
          <div className="bg-success/5 border border-success/20 rounded-xl p-6 flex flex-col justify-center items-center text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5, type: 'spring' }} className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center border border-success/50 mb-4">
              <CheckCircle2 size={40} className="text-success" />
            </motion.div>
            <h3 className="font-bold text-white text-xl mb-2">All Checks Passed!</h3>
            <p className="text-textSecondary text-sm">Code coverage is at 84%. The pipeline moves on to the Build phase.</p>
          </div>
        )}

      </div>
    </div>
  );
}

function TestRunner({ name, total, duration, fail, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className={`border rounded-xl p-4 flex items-center justify-between ${fail ? 'bg-error/5 border-error/20' : 'bg-surface border-white/10'}`}
    >
      <div>
        <h4 className="font-bold text-white text-sm">{name}</h4>
        <p className="text-xs text-textTertiary mt-1">{total} tests • {duration}</p>
      </div>
      {fail ? (
        <span className="bg-error/20 text-error text-xs font-bold px-3 py-1 rounded-full">FAILED</span>
      ) : (
        <span className="bg-success/20 text-success text-xs font-bold px-3 py-1 rounded-full">PASSED</span>
      )}
    </motion.div>
  );
}
