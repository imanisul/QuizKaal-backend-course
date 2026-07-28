import HttpVisualizer from "./HttpVisualizer";
import LifecycleTimeline from "./LifecycleTimeline";
import QAAccordion from "./QAAccordion";
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";
import RenderIcon from "@/components/ui/IconMap";
import AnalogyCard from "@/components/ui/AnalogyCard";
import { Monitor, Cpu, Database, Utensils, AlertTriangle, CheckCircle2 } from "lucide-react";

export const lesson1Toc = [
  { id: "analogy", label: "Real-world analogy" },
  { id: "visualizer", label: "HTTP visualizer" },
  { id: "lifecycle", label: "Request lifecycle" },
  { id: "code", label: "Code example" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "interview", label: "Interview questions" },
  { id: "summary", label: "Summary" },
];

export default function Lesson1Content() {
  return (
    <>

      <StaggerReveal className="hero-diagram mb-16">
        <div className="hd-row">
          <div className="hd-node">
            <div className="hd-icon client"><Monitor size={28} /></div>
            <div className="hd-label">Client</div>
            <div className="hd-sub">Your phone/laptop</div>
          </div>
          <div className="hd-track"><div className="hd-packet req" /><div className="hd-packet res" /></div>
          <div className="hd-node">
            <div className="hd-icon server"><Cpu size={28} /></div>
            <div className="hd-label">Server</div>
            <div className="hd-sub">The brain</div>
          </div>
          <div className="hd-track"><div className="hd-packet req" /><div className="hd-packet res" /></div>
          <div className="hd-node">
            <div className="hd-icon db"><Database size={28} /></div>
            <div className="hd-label">Database</div>
            <div className="hd-sub">Where data lives</div>
          </div>
        </div>
        <div className="hero-caption">GET /api/users/42 → 200 OK</div>
      </StaggerReveal>

      <div id="analogy" className="scroll-mt-24">
        <AnalogyCard 
          title="Think of it like a restaurant" 
          subtitle="You never go into the kitchen"
          description="You (the <strong>client</strong>) tell the waiter (the <strong>API</strong>) what you want. The waiter takes your order to the kitchen (the <strong>server</strong>), which grabs ingredients from the fridge (the <strong>database</strong>), cooks the meal, and the waiter brings it back to you (the <strong>response</strong>)."
          iconName="Utensils"
        />
      </div>

      <StaggerReveal>
        <section id="visualizer" className="mb-16 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">// Interactive</div>
            <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5">The HTTP request, up close</h2>
            <p className="text-textSecondary text-base max-w-[680px] mb-7">Hover over the parts of the request. This is the exact text message that travels over the internet. No magic involved.</p>
          </StaggerItem>
          <StaggerItem>
            <HttpVisualizer />
          </StaggerItem>
        </section>
      </StaggerReveal>

      <StaggerReveal>
        <section id="lifecycle" className="mb-16 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">// Step through it</div>
            <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5">The full journey</h2>
            <p className="text-textSecondary text-base max-w-[680px] mb-7">Press play to watch exactly what happens when you click a button on a website.</p>
          </StaggerItem>
          <StaggerItem>
            <LifecycleTimeline />
          </StaggerItem>
        </section>
      </StaggerReveal>

      <StaggerReveal>
        <section id="code" className="mb-16 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">// Show me code</div>
            <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5">How the server answers</h2>
          </StaggerItem>
          <StaggerItem>
            <div className="code-panel">
              <div className="code-head"><span>server.js</span><span>Node.js / Express</span></div>
              <pre><code>
<span className="tok-kw">import</span> express <span className="tok-kw">from</span> <span className="tok-str">&apos;express&apos;</span>;{"\n"}
<span className="tok-kw">const</span> app = <span className="tok-fn">express</span>();{"\n\n"}
<span className="tok-com">// When the client asks for a specific user...</span>{"\n"}
app.<span className="tok-fn">get</span>(<span className="tok-str">&apos;/api/users/:id&apos;</span>, <span className="tok-kw">async</span> (req, res) =&gt; {"{"}{"\n"}
{"  "}<span className="tok-kw">const</span> id = req.params.id;{"\n"}
{"  "}<span className="tok-kw">const</span> user = <span className="tok-kw">await</span> db.<span className="tok-fn">findUser</span>(id); <span className="tok-com">// Look in the database</span>{"\n\n"}
{"  "}<span className="tok-kw">if</span> (!user) {"{"}{"\n"}
{"    "}<span className="tok-com">// Send an error if not found</span>{"\n"}
{"    "}<span className="tok-kw">return</span> res.<span className="tok-fn">status</span>(<span className="tok-num">404</span>).<span className="tok-fn">json</span>({"{"} error: <span className="tok-str">&apos;User not found&apos;</span> {"}"});{"\n"}
{"  "}{"}"}{"\n\n"}
{"  "}<span className="tok-com">// Send the data back successfully!</span>{"\n"}
{"  "}res.<span className="tok-fn">status</span>(<span className="tok-num">200</span>).<span className="tok-fn">json</span>(user);{"\n"}
{"}"});
              </code></pre>
            </div>
          </StaggerItem>
        </section>
      </StaggerReveal>

      <StaggerReveal>
        <section id="mistakes" className="mb-16 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">// Avoid these</div>
            <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5">Common beginner mistakes</h2>
          </StaggerItem>
          <StaggerItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mistake-card">
                <h4 className="text-sm font-bold mb-1.5 flex items-center gap-2 text-error"><AlertTriangle size={16} /> Forgetting the server is forgetful</h4>
                <p className="text-[13.5px] text-textSecondary">The server has no memory of past requests. If you don&apos;t send your ID badge (token) every time, it won&apos;t know who you are.</p>
              </div>
              <div className="mistake-card">
                <h4 className="text-sm font-bold mb-1.5 flex items-center gap-2 text-error"><AlertTriangle size={16} /> Lying about the status</h4>
                <p className="text-[13.5px] text-textSecondary">Sending a "200 Success" code when an error actually happened. Always use the right status code (like 404 for Not Found).</p>
              </div>
              <div className="mistake-card">
                <h4 className="text-sm font-bold mb-1.5 flex items-center gap-2 text-error"><AlertTriangle size={16} /> 401 vs 403 confusion</h4>
                <p className="text-[13.5px] text-textSecondary">401 means "I don&apos;t know who you are". 403 means "I know who you are, but you&apos;re not allowed in here".</p>
              </div>
              <div className="mistake-card">
                <h4 className="text-sm font-bold mb-1.5 flex items-center gap-2 text-error"><AlertTriangle size={16} /> PUT vs PATCH</h4>
                <p className="text-[13.5px] text-textSecondary">Use PUT when replacing an entire item. Use PATCH when you just want to update a small part of it.</p>
              </div>
            </div>
          </StaggerItem>
        </section>
      </StaggerReveal>

      <StaggerReveal>
        <section id="interview" className="mb-16 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">// Get ready</div>
            <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5">Interview questions</h2>
          </StaggerItem>
          <StaggerItem>
            <QAAccordion />
          </StaggerItem>
        </section>
      </StaggerReveal>

      <StaggerReveal>
        <section id="summary" className="mb-16 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5">// Recap</div>
            <h2 className="text-[28px] font-extrabold tracking-tight mb-3.5">Summary</h2>
          </StaggerItem>
          <StaggerItem>
            <div className="summary-box">
              <ul className="grid gap-4">
                {[
                  "Backend is the logic and data hidden on a server. Frontend is what you see and click on your screen.",
                  "HTTP is just a text message format. It always has a method (like GET), a path, and sometimes a body.",
                  "Status codes quickly explain what happened: 200s mean success, 400s mean the client made a mistake, 500s mean the server broke.",
                  "A typical journey: You click a button → request goes to server → server checks database → server sends data back → your screen updates."
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-[15px] font-medium text-white items-start">
                    <CheckCircle2 size={20} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="opacity-90 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </section>
      </StaggerReveal>
    </>
  );
}
