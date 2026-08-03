"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Zap, Server, Database, Play, Globe, Smartphone, User, FileText, Bot, Video, Building, Target, Zap as ZapIcon, MonitorPlay, Film, ArrowRight, Activity, HardDrive, Cpu, Cloud, Shield, ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Requirements Gathering",
    icon: "📋",
    content: {
      functional: [
        "Browse & search a catalog of movies/shows",
        "Stream video with adaptive quality",
        "Resume playback from where you left off",
        "Personalized recommendations",
        "Multi-device support (TV, mobile, tablet, laptop)",
        "User profiles & parental controls"
      ],
      nonFunctional: [
        "Low latency globally (< 200ms for metadata, instant play)",
        "High availability (99.99% — 52 minutes of downtime/year max)",
        "Massive scale (250M+ subscribers, 100M+ concurrent viewers)",
        "Cost-efficient CDN and storage",
        "Fault-tolerant — individual service failures don't crash the platform"
      ]
    }
  },
  {
    id: 2,
    title: "High-Level Architecture",
    icon: Building,
    diagram: {
      description: "Netflix uses a microservices architecture with 1000+ services. Here's the simplified view:",
      nodes: [
        { label: "Client Apps", icon: Smartphone, sub: "TV / Mobile / Web / Browser", color: "sysClient" },
        { label: "API Gateway", icon: Globe, sub: "Zuul — routing, auth, rate limiting", color: "sysLb" },
        { label: "User Service", icon: User, sub: "Profiles, auth, preferences", color: "sysServer" },
        { label: "Catalog Service", icon: FileText, sub: "Movie/show metadata", color: "sysServer" },
        { label: "Recommendation", icon: Bot, sub: "ML-powered suggestions", color: "sysServer" },
        { label: "Playback Service", icon: Play, sub: "Stream URLs, DRM, resume", color: "sysServer" },
        { label: "Databases", icon: Database, sub: "Cassandra, MySQL, CockroachDB", color: "sysDb" },
        { label: "Caches", icon: ZapIcon, sub: "EVCache (Memcached-based)", color: "sysCache" },
      ]
    }
  },
  {
    id: 3,
    title: "Video Storage & CDN",
    icon: Film,
    content: {
      explanation: `When Netflix ingests a new movie, it doesn't just store one file. It creates 
**thousands of versions** — different resolutions (480p, 720p, 1080p, 4K), different codecs (H.264, VP9, AV1), 
and different audio tracks (Dolby Atmos, stereo, 20+ languages).

A single movie might have **~1,200 encoded files** totaling 100+ GB.`,
      flow: [
        "Original master file uploaded to S3",
        "Encoding pipeline creates 1,200+ versions (takes hours on GPU clusters)",
        "Encoded chunks pushed to Open Connect CDN (Netflix's own CDN)",
        "15,000+ Open Connect servers in 6,000+ ISP locations worldwide",
        "When you press Play: nearest CDN server streams chunks to you",
        "Adaptive bitrate: quality adjusts in real-time based on your bandwidth"
      ],
      stat: "Netflix serves 400+ Gbps of traffic from a SINGLE Open Connect server"
    }
  },
  {
    id: 4,
    title: "Database Architecture",
    icon: Database,
    content: {
      explanation: `Netflix uses **multiple database technologies** — each chosen for its specific strengths:`,
      databases: [
        { name: "Cassandra", type: "NoSQL", use: "Viewing history, user activity, A/B test data", why: "Massive write throughput, linear horizontal scaling, no single point of failure" },
        { name: "MySQL / CockroachDB", type: "SQL", use: "Billing, subscriptions, payment records", why: "ACID transactions — money can't go missing" },
        { name: "Elasticsearch", type: "Search", use: "Search index for titles, actors, genres", why: "Full-text search with relevance ranking" },
        { name: "EVCache", type: "Cache", use: "Session data, metadata, recommendations", why: "Sub-millisecond reads, 99th percentile < 1ms" },
      ],
      insight: "Netflix writes 3+ TRILLION Cassandra rows per day. Their largest Cassandra cluster has 10,000+ nodes."
    }
  },
  {
    id: 5,
    title: "Caching Layers",
    icon: ZapIcon,
    content: {
      explanation: `Netflix's caching strategy is multi-layered and achieves **99%+ cache hit rates**:`,
      layers: [
        { layer: "Client-side cache", detail: "App caches UI assets, thumbnails, and recently browsed metadata locally" },
        { layer: "CDN cache", detail: "Video chunks cached at 15,000+ edge servers globally" },
        { layer: "EVCache (L1)", detail: "In-region Memcached clusters for hot metadata — hit rate: 99.5%" },
        { layer: "EVCache (L2)", detail: "Cross-region fallback cache — if L1 misses, try L2 before DB" },
        { layer: "Application cache", detail: "In-process caches inside each microservice for config and feature flags" },
      ],
      stat: "EVCache serves 30+ MILLION requests per second across Netflix's infrastructure"
    }
  },
  {
    id: 6,
    title: "Load Balancing & Scaling",
    icon: Activity,
    content: {
      explanation: `Every Friday night and every new release (think: Stranger Things season drop) causes 
massive traffic spikes. Netflix handles this with a multi-layered load balancing and auto-scaling strategy.`,
      tiers: [
        { tier: "DNS Load Balancing", detail: "Route users to the nearest AWS region (us-east-1, eu-west-1, ap-south-1)" },
        { tier: "Zuul API Gateway", detail: "Edge proxy that handles routing, auth, and rate limiting for all API traffic" },
        { tier: "Eureka Service Discovery", detail: "Microservices register themselves — Zuul routes to healthy instances" },
        { tier: "AWS Auto Scaling", detail: "Automatically spin up more EC2 instances when CPU/memory thresholds are breached" },
      ],
      stat: "Netflix auto-scales from ~100K to 300K+ EC2 instances during peak hours"
    }
  },
  {
    id: 7,
    title: "Message Queues & Async",
    icon: "📨",
    content: {
      explanation: `Many Netflix operations don't need to happen in real-time. These are processed asynchronously 
through message queues and event streams:`,
      useCases: [
        { task: "Video encoding", detail: "A new upload triggers a Kafka event → encoding workers pick it up → hours of GPU processing" },
        { task: "Notification sends", detail: "'New episode available!' push notifications sent via a queue to millions of devices" },
        { task: "Analytics events", detail: "Every play, pause, seek, and error is an event → Kafka → data warehouse → ML models" },
        { task: "Billing events", detail: "Subscription changes, payment retries — processed reliably through a durable queue" },
      ],
      stat: "Netflix Kafka clusters process 7+ TRILLION messages per day"
    }
  },
  {
    id: 8,
    title: "Fault Tolerance",
    icon: Shield,
    content: {
      explanation: `Netflix famously invented **Chaos Engineering** — the practice of intentionally breaking 
things in production to build resilience. Their tool, **Chaos Monkey**, randomly terminates production servers 
to ensure the system survives.`,
      patterns: [
        { pattern: "Circuit Breaker (Hystrix)", detail: "If a microservice fails repeatedly, stop calling it and return a fallback response" },
        { pattern: "Bulkhead Isolation", detail: "Isolate services into pools — if one pool fails, others are unaffected" },
        { pattern: "Graceful Degradation", detail: "If recommendations fail, show a generic 'Popular on Netflix' list instead" },
        { pattern: "Chaos Monkey", detail: "Randomly kills production instances during business hours to test resilience" },
        { pattern: "Chaos Kong", detail: "Simulates an entire AWS region going offline — can Netflix survive?" },
      ],
      insight: "Netflix's philosophy: 'If you haven't tested the failure mode, it WILL fail in the worst possible way at the worst possible time.'"
    }
  },
  {
    id: 9,
    title: "Monitoring & Observability",
    icon: "📊",
    content: {
      explanation: `With 1000+ microservices, you can't manually watch dashboards. Netflix's observability stack 
is one of the most sophisticated in the world:`,
      stack: [
        { tool: "Atlas", detail: "Netflix's custom time-series metrics system — ingests 2+ billion metrics per minute" },
        { tool: "Mantis", detail: "Real-time stream processing for operational events — catch issues in seconds" },
        { tool: "Edgar", detail: "Distributed request tracing — follow a single request across 50+ microservices" },
        { tool: "PagerDuty + Custom Alerts", detail: "Automated alerting when SLOs are breached" },
      ],
      metrics: [
        "Stream Start Time (SST) — time from pressing Play to first frame rendering",
        "Rebuffer Rate — how often the video pauses to buffer",
        "Error Rate per device type / region / ISP",
        "Latency p50, p99, p999 per API endpoint"
      ]
    }
  },
  {
    id: 10,
    title: "Full Architecture Walkthrough",
    icon: "🎬",
    content: {
      explanation: `Let's trace a single request: **User presses Play on "Stranger Things" on their TV in Mumbai.**`,
      trace: [
        { step: "📱 TV App", detail: "Sends 'GET /playback/stranger-things-s4e1' to Netflix API" },
        { step: "🌐 DNS", detail: "Resolves api.netflix.com → nearest AWS region (ap-south-1 Mumbai)" },
        { step: "🟨 Zuul Gateway", detail: "Authenticates the user, checks subscription status, rate-limits" },
        { step: "▶️ Playback Service", detail: "Determines the best CDN server and video quality for the user" },
        { step: "⚡ EVCache", detail: "Checks cached playback state — user left off at 34:22, resume from there" },
        { step: "🗄️ Cassandra", detail: "If cache miss: fetches viewing history from the database" },
        { step: "📡 Open Connect CDN", detail: "Returns stream URL pointing to the nearest ISP-hosted CDN box in Mumbai" },
        { step: "🎥 Streaming", detail: "CDN sends video chunks via HTTPS — adaptive bitrate adjusts quality in real-time" },
        { step: "📊 Atlas Metrics", detail: "Logs: stream_start_time=1.2s, initial_quality=1080p, region=ap-south-1" },
        { step: "✅ User watches", detail: "Stranger Things plays seamlessly. Total latency: ~1.5 seconds." },
      ]
    }
  },
];

function StepContent({ step }) {
  const c = step.content;

  if (step.id === 1) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-sysServer mb-4">Functional Requirements</h4>
          <ul className="space-y-3">
            {c.functional.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-textSecondary">
                <CheckCircle size={18} className="text-sysServer mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-sysQueue mb-4">Non-Functional Requirements</h4>
          <ul className="space-y-3">
            {c.nonFunctional.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-textSecondary">
                <Zap size={18} className="text-sysLb mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (step.id === 2) {
    return (
      <div>
        <p className="text-textSecondary mb-8 text-lg">{step.diagram.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {step.diagram.nodes.map((node, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`p-4 rounded-2xl border border-${node.color}/30 bg-${node.color}/10 text-center`}
              style={{ borderColor: `var(--${node.color}, rgba(255,255,255,0.1))` }}
            >
              <div className="text-2xl mb-2 text-white/80 flex justify-center">{node.icon && <node.icon size={28} />}</div>
              <div className="font-bold text-white text-sm">{node.label}</div>
              <div className="text-xs text-textTertiary mt-1">{node.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (step.id === 3) {
    return (
      <div>
        <p className="text-textSecondary text-lg mb-6 whitespace-pre-line">{c.explanation}</p>
        <div className="space-y-3 mb-8">
          {c.flow.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-sysClient/20 text-sysClient flex items-center justify-center font-black text-sm flex-shrink-0">{i + 1}</div>
              <span className="text-textSecondary">{item}</span>
            </motion.div>
          ))}
        </div>
        <div className="p-4 bg-sysClient/10 border border-sysClient/20 rounded-xl text-sysClient font-bold text-center"><div className="flex items-center justify-center gap-2"><ZapIcon size={20} /> {c.stat}</div></div>
      </div>
    );
  }

  if (step.id === 4) {
    return (
      <div>
        <p className="text-textSecondary text-lg mb-6">{c.explanation}</p>
        <div className="space-y-4 mb-8">
          {c.databases.map((db, i) => (
            <div key={i} className="p-5 bg-white/[0.03] border border-white/5 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-black uppercase tracking-wider text-sysDb bg-sysDb/20 px-2 py-0.5 rounded">{db.type}</span>
                <span className="font-bold text-white">{db.name}</span>
              </div>
              <p className="text-sm text-textSecondary mb-1"><strong className="text-textPrimary">Used for:</strong> {db.use}</p>
              <p className="text-sm text-textTertiary"><strong className="text-textSecondary">Why:</strong> {db.why}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-sysDb/10 border border-sysDb/20 rounded-xl text-sysDb font-bold text-center"><div className="flex items-center justify-center gap-2"><ZapIcon size={20} /> {c.insight}</div></div>
      </div>
    );
  }

  if (step.id === 5) {
    return (
      <div>
        <p className="text-textSecondary text-lg mb-6">{c.explanation}</p>
        <div className="space-y-3 mb-8">
          {c.layers.map((layer, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-sysCache/20 text-sysCache flex items-center justify-center font-black text-sm flex-shrink-0">L{i + 1}</div>
              <div>
                <div className="font-bold text-white text-sm">{layer.layer}</div>
                <div className="text-sm text-textTertiary">{layer.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-sysCache/10 border border-sysCache/20 rounded-xl text-sysCache font-bold text-center"><div className="flex items-center justify-center gap-2"><ZapIcon size={20} /> {c.stat}</div></div>
      </div>
    );
  }

  if (step.id === 10) {
    return (
      <div>
        <p className="text-textSecondary text-lg mb-8">{c.explanation}</p>
        <div className="space-y-3">
          {c.trace.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
              className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl group hover:bg-white/[0.06] transition-colors">
              <div className="text-2xl flex-shrink-0">{item.step.split(' ')[0]}</div>
              <div>
                <div className="font-bold text-white">{item.step.split(' ').slice(1).join(' ')}</div>
                <div className="text-sm text-textTertiary">{item.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Generic rendering for steps 6, 7, 8, 9
  const items = c.tiers || c.useCases || c.patterns || c.stack;
  return (
    <div>
      <p className="text-textSecondary text-lg mb-6 whitespace-pre-line">{c.explanation}</p>
      <div className="space-y-3 mb-8">
        {items && items.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-black text-sm flex-shrink-0">{i + 1}</div>
            <div>
              <div className="font-bold text-white text-sm">{item.tier || item.task || item.pattern || item.tool}</div>
              <div className="text-sm text-textTertiary">{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
      {c.metrics && (
        <div className="mt-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-textTertiary mb-3">Key Metrics Tracked</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {c.metrics.map((m, i) => (
              <div key={i} className="p-3 bg-white/[0.03] border border-white/5 rounded-lg text-sm text-textSecondary">{m}</div>
            ))}
          </div>
        </div>
      )}
      {(c.stat || c.insight) && (
        <div className="p-4 bg-sysClient/10 border border-sysClient/20 rounded-xl text-sysClient font-bold text-center mt-6">
          🔥 {c.stat || c.insight}
        </div>
      )}
    </div>
  );
}

export default function NetflixCaseStudy() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 global-page-pt pb-12 px-6 max-w-5xl mx-auto">
        <Link href="/system-design" className="text-textTertiary hover:text-white transition-colors text-sm font-bold mb-6 inline-flex items-center gap-1">
          ← Back to Course
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <div className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-[11px] font-black uppercase tracking-widest">
            Full Project • 10 Steps
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
          🎬 Netflix <span className="text-red-500">System Design</span>
        </h1>
        <p className="text-xl text-textSecondary max-w-3xl leading-relaxed">
          How Netflix serves 250M+ subscribers, streams 100M+ hours of video daily, and achieves 99.99% availability — deconstructed step by step.
        </p>
      </section>

      {/* Step Navigation */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-8">
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                i === currentStep
                  ? "bg-white text-black shadow-lg"
                  : i < currentStep
                  ? "bg-sysServer/20 text-sysServer"
                  : "bg-white/5 text-textTertiary hover:bg-white/10"
              }`}
            >
              <span className="flex items-center justify-center">{s.icon && typeof s.icon === "object" ? <s.icon size={20} /> : s.icon}</span>
              <span className="hidden md:inline">{s.title}</span>
              <span className="md:hidden">{s.id}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Current Step Content */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
              <span className="text-4xl text-white">{typeof step.icon === "object" ? <step.icon size={40} /> : step.icon}</span>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-textTertiary">Step {step.id} of 10</div>
                <h2 className="text-2xl md:text-3xl font-black text-white">{step.title}</h2>
              </div>
            </div>

            <StepContent step={step} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Prev / Next */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-32">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-textSecondary hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
          >
            <ChevronLeft size={18} /> Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
            disabled={currentStep === STEPS.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-neutral-200 transition-all disabled:opacity-30"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
