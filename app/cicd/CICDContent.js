"use client";
import dynamic from 'next/dynamic';
import StaggerReveal, { StaggerItem } from "@/components/ui/StaggerReveal";
import QAAccordion from "@/components/lesson1/QAAccordion";
import { GitBranch, PlayCircle, FolderTree, ShieldCheck, Database, Rocket, AlertTriangle, RefreshCcw, Activity } from "lucide-react";
import ParticleField from "@/components/ui/ParticleField";

// The new massive Interactive CI/CD Simulator
const AdvancedCICDSimulator = dynamic(() => import('@/components/cicd/AdvancedCICDSimulator'), { ssr: false, loading: () => <div className="h-[800px] rounded-3xl bg-white/5 animate-pulse mt-12" /> });

export const cicdToc = [
  { id: "hero", label: "CI/CD Pipeline" },
  { id: "simulator", label: "1. The Deployment Journey" },
  { id: "structure", label: "2. Project Structure" },
  { id: "code", label: "3. Infrastructure Code" },
  { id: "interview", label: "4. Interview QA" },
];

export default function CICDContent() {
  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" className="relative pt-16 pb-24 border-b border-white/[0.06] mb-16 scroll-mt-24 flex flex-col items-center text-center">
        <ParticleField count={30} />
        <StaggerReveal className="flex flex-col items-center">
          <StaggerItem>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5"><GitBranch size={14} /> DevOps & Infrastructure</span>
            </div>
          </StaggerItem>
          
          <StaggerItem>
            <h1 className="text-[clamp(3rem,5vw,5rem)] font-black tracking-tighter leading-[1.05] mb-6 text-white drop-shadow-2xl max-w-[1200px]">
              CI/CD Pipeline from <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 animate-gradient-shift drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                Laptop to Production
              </span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-lg md:text-xl text-textSecondary max-w-[800px] leading-relaxed mb-12">
              Writing code is only 50% of the job. How does that code reliably get from your laptop, through rigorous automated testing, packaged into Docker, and deployed into a Kubernetes cluster serving millions? Welcome to Continuous Integration and Continuous Deployment.
            </p>
          </StaggerItem>
        </StaggerReveal>
      </section>

      {/* ═══════════ THE MASSIVE SIMULATOR ═══════════ */}
      <StaggerReveal className="flex flex-col items-center">
        <section id="simulator" className="mb-32 scroll-mt-24 w-full">
          <StaggerItem>
            <div className="flex flex-col items-center text-center">
              <div className="font-mono text-xs font-bold tracking-widest uppercase text-blue-400 mb-2.5 flex items-center gap-2">
                <PlayCircle size={14} /> // Interactive Simulator
              </div>
              <h2 className="text-[32px] md:text-[40px] font-extrabold tracking-tight mb-4">The Deployment Journey</h2>
              <p className="text-textSecondary text-lg max-w-[800px] mb-8 leading-relaxed">
                Watch the code travel. Click the <strong>Play</strong> button below to simulate pushing code to GitHub, triggering Jenkins, building Docker, provisioning Terraform, and deploying live to Kubernetes.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <AdvancedCICDSimulator />
          </StaggerItem>
        </section>
      </StaggerReveal>

      {/* ═══════════ PROJECT STRUCTURE ═══════════ */}
      <StaggerReveal>
        <section id="structure" className="mb-24 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-purple-400 mb-2.5 flex items-center gap-2">
              <FolderTree size={14} /> // Architecture
            </div>
            <h2 className="text-[32px] font-extrabold tracking-tight mb-4">Production Folder Structure</h2>
            <p className="text-textSecondary text-lg max-w-[680px] mb-8 leading-relaxed">
              In a modern microservices environment, infrastructure code lives right alongside your application code. This is called "GitOps."
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="bg-surface border border-white/10 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
              <div className="flex gap-8">
                <ul className="space-y-2 text-textSecondary whitespace-nowrap">
                  <li className="text-white font-bold">monorepo/</li>
                  <li className="pl-4">├── <span className="text-blue-400">backend/</span> <span className="text-textTertiary text-xs ml-2">// Node.js / Express</span></li>
                  <li className="pl-4">├── <span className="text-blue-400">frontend/</span> <span className="text-textTertiary text-xs ml-2">// Next.js / React</span></li>
                  <li className="pl-4">├── <span className="text-purple-400">docker/</span> <span className="text-textTertiary text-xs ml-2">// Dockerfiles and docker-compose.yml</span></li>
                </ul>
                <ul className="space-y-2 text-textSecondary whitespace-nowrap border-l border-white/10 pl-8">
                  <li className="pl-4">├── <span className="text-green-400">k8s/</span> <span className="text-textTertiary text-xs ml-2">// Kubernetes YAMLs (deployment, service, ingress)</span></li>
                  <li className="pl-4">├── <span className="text-yellow-400">terraform/</span> <span className="text-textTertiary text-xs ml-2">// AWS infrastructure provisioning</span></li>
                  <li className="pl-4">├── <span className="text-red-400">.github/</span> <span className="text-textTertiary text-xs ml-2">// GitHub Actions workflows</span></li>
                  <li className="pl-4">└── <span className="text-textSecondary">Jenkinsfile</span> <span className="text-textTertiary text-xs ml-2">// Pipeline definition</span></li>
                </ul>
              </div>
            </div>
          </StaggerItem>
        </section>
      </StaggerReveal>

      {/* ═══════════ INFRASTRUCTURE CODE ═══════════ */}
      <StaggerReveal>
        <section id="code" className="mb-24 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-green-400 mb-2.5 flex items-center gap-2">
              <Database size={14} /> // YAML & HCL
            </div>
            <h2 className="text-[32px] font-extrabold tracking-tight mb-4">Infrastructure Code Examples</h2>
            <p className="text-textSecondary text-lg max-w-[680px] mb-8 leading-relaxed">
              Every step of the deployment is defined in code. Here are the core files that make the magic happen.
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-[#0a0b0f] border border-white/10 rounded-xl flex flex-col overflow-hidden">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 text-xs font-mono text-textSecondary">k8s/deployment.yaml</div>
                <div className="p-4 text-xs font-mono text-textSecondary whitespace-pre overflow-x-auto">
<span className="text-blue-400">apiVersion:</span> apps/v1<br/>
<span className="text-blue-400">kind:</span> Deployment<br/>
<span className="text-blue-400">metadata:</span><br/>
&nbsp;&nbsp;<span className="text-green-400">name:</span> api-deployment<br/>
<span className="text-blue-400">spec:</span><br/>
&nbsp;&nbsp;<span className="text-green-400">replicas:</span> 3 <span className="text-textTertiary"># Ensures 3 pods are always running</span><br/>
&nbsp;&nbsp;<span className="text-green-400">selector:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">matchLabels:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">app:</span> api<br/>
&nbsp;&nbsp;<span className="text-green-400">template:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">metadata:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">labels:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">app:</span> api<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">spec:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">containers:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-white">name:</span> nodejs-api<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">image:</span> quizkaal/app:v1.0.1 <span className="text-textTertiary"># Tagged from DockerHub</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">ports:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-white">containerPort:</span> 8080
                </div>
              </div>

              <div className="bg-[#0a0b0f] border border-white/10 rounded-xl flex flex-col overflow-hidden">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 text-xs font-mono text-textSecondary">k8s/service.yaml</div>
                <div className="p-4 text-xs font-mono text-textSecondary whitespace-pre overflow-x-auto">
<span className="text-blue-400">apiVersion:</span> v1<br/>
<span className="text-blue-400">kind:</span> Service<br/>
<span className="text-blue-400">metadata:</span><br/>
&nbsp;&nbsp;<span className="text-green-400">name:</span> api-service<br/>
<span className="text-blue-400">spec:</span><br/>
&nbsp;&nbsp;<span className="text-green-400">type:</span> ClusterIP <span className="text-textTertiary"># Internal load balancing</span><br/>
&nbsp;&nbsp;<span className="text-green-400">selector:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">app:</span> api <span className="text-textTertiary"># Matches the deployment</span><br/>
&nbsp;&nbsp;<span className="text-green-400">ports:</span><br/>
&nbsp;&nbsp;- <span className="text-purple-400">protocol:</span> TCP<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">port:</span> 80<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">targetPort:</span> 8080 <span className="text-textTertiary"># Routes to container port</span>
                </div>
              </div>

            </div>
          </StaggerItem>
        </section>
      </StaggerReveal>

      {/* ═══════════ SECTION: INTERVIEW QA ═══════════ */}
      <StaggerReveal>
        <section id="interview" className="mb-24 scroll-mt-24">
          <StaggerItem>
            <div className="font-mono text-xs font-bold tracking-widest uppercase text-textTertiary mb-2.5 flex items-center gap-2">
              <Rocket size={14} /> // Get Hired
            </div>
            <h2 className="text-[32px] font-extrabold tracking-tight mb-4">Interview Questions</h2>
          </StaggerItem>
          <StaggerItem>
            <div className="glass-card p-2">
              <QAAccordion questions={[
                { q: "Why use Docker instead of just installing Node.js directly on the EC2 server?", a: "Docker provides 'Environment Parity'. It guarantees that if the app works on your Mac laptop, it will work exactly the same way on the Ubuntu production server, because the OS environment is packaged inside the container." },
                { q: "What is a Kubernetes Rolling Update?", a: "A Rolling Update allows deployments to update with zero downtime. Instead of killing all old Pods at once (causing a 502 Bad Gateway for users), K8s starts one new Pod, waits for its health checks to pass, and only then kills one old Pod, rolling through the cluster gradually." },
                { q: "What is Blue/Green Deployment?", a: "Unlike a Rolling Update, Blue/Green provisions an entirely separate identical cluster (Green) alongside the current live cluster (Blue). Once the Green cluster is tested and verified, the Load Balancer router is instantly flipped to point all traffic to Green. This allows for instant rollbacks if something fails." },
                { q: "Why use Terraform instead of clicking around in the AWS Console?", a: "Infrastructure as Code (IaC) ensures reproducibility. If an employee accidentally deletes the production VPC, Terraform can rebuild the exact architecture in seconds. It also allows infrastructure changes to be peer-reviewed via Pull Requests." },
                { q: "What is the difference between a Kubernetes Deployment and a StatefulSet?", a: "Deployments are for stateless applications (like Node.js API servers) where every Pod is identical and interchangeable. StatefulSets are for stateful apps (like PostgreSQL databases) where Pods require persistent storage and ordered startup/teardown." }
              ]} />
            </div>
          </StaggerItem>
        </section>
      </StaggerReveal>
    </>
  );
}
