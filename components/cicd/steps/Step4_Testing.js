"use client";
import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../../ui/AnimatedTerminal";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step4_Testing({ scenario, playbackSpeed = 1 }) {
  const isFailed = scenario === "test_fail";

  const terminalLines = [
    { type: "command", text: "npm run test:ci" },
    { type: "output", text: "jest --ci --coverage --maxWorkers=2", delay: 200 },
    { type: "output", text: "PASS src/auth/auth.service.spec.ts (1.2s)", className: "text-success", delay: 800 },
    { type: "output", text: "PASS src/users/users.controller.spec.ts (0.8s)", className: "text-success", delay: 1200 },
    { type: "output", text: "PASS src/database/prisma.service.spec.ts (0.5s)", className: "text-success", delay: 1500 },
    
    ...(isFailed ? [
      { type: "output", text: "FAIL src/auth/login.spec.ts (0.9s)", className: "text-error font-bold mt-2", delay: 1800 },
      { type: "output", text: "  ● Login Controller › should return 401 on invalid password", className: "text-error", delay: 1900 },
      { type: "output", text: "    Expected status: 401\n    Received status: 200", className: "text-error/80", delay: 2000 },
      { type: "output", text: "\nTest Suites: 1 failed, 3 passed, 4 total", className: "text-error font-bold mt-4", delay: 2100 },
      { type: "output", text: "npm ERR! Lifecycle script `test:ci` failed with exit code 1", className: "text-error", delay: 2200 }
    ] : [
      { type: "output", text: "PASS src/auth/login.spec.ts (0.9s)", className: "text-success", delay: 1800 },
      { type: "output", text: "\nTest Suites: 4 passed, 4 total", className: "text-success font-bold mt-4", delay: 2100 },
      { type: "output", text: "Tests:       42 passed, 42 total\nSnapshots:   0 total\nTime:        3.4s", className: "text-textSecondary", delay: 2200 },
      { type: "output", text: "-----------------|---------|----------|---------|---------|\nFile             | % Stmts | % Branch | % Funcs | % Lines |\n-----------------|---------|----------|---------|---------|\nAll files        |   98.42 |    95.23 |     100 |   98.21 |\n-----------------|---------|----------|---------|---------|", className: "text-blue-400 mt-2", delay: 2500 }
    ])
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className={`p-4 rounded-2xl border shadow-[0_0_30px_rgba(34,197,94,0.2)] bg-gradient-to-br
          ${isFailed ? 'from-error/20 to-error/5 border-error/30 shadow-[0_0_30px_rgba(244,63,94,0.2)]' : 'from-success/20 to-success/5 border-success/30'}
        `}>
          {isFailed ? <AlertTriangle className="text-error" size={28} /> : <CheckCircle2 className="text-success" size={28} />}
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">4. Automated Testing</h2>
          <p className="text-textSecondary text-base mt-1">
            {isFailed ? "The Quality Assurance team found a critical bug!" : "Validating the code works exactly as intended."}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1 h-full min-h-[400px]">
        
        {/* Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={ShieldCheck}
            title="Unit Tests"
            analogyTitle="The Car Crash Test"
            description="Before selling a car, the manufacturer runs it into a wall with dummies inside to ensure the airbags deploy. Automated testing is slamming your code into a wall virtually."
            points={[
              { keyword: "Unit", text: "Testing the seatbelt mechanism in isolation." },
              { keyword: "Integration", text: "Testing if the seatbelt, airbag, and brakes work together." },
              { keyword: "Coverage", text: "Did we test 98% of the car, or just the horn?" }
            ]}
          />
        </div>

        {/* Animated Terminal */}
        <div className="h-full">
          <AnimatedTerminal 
            title={isFailed ? "Jest (Failing)" : "Jest (Passing)"} 
            branch="feature-login" 
            lines={terminalLines} 
            autoPlayDelay={0.5 / playbackSpeed} 
          />
        </div>

      </div>
    </div>
  );
}
