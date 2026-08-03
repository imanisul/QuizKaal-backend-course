"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronRight, ChevronLeft, CheckCircle, Zap, MapPin, 
  DollarSign, Navigation, Users, Clock, Wifi
} from "lucide-react";

const STEPS = [
  {
    id: 1, title: "Requirements", icon: "📋",
    content: {
      functional: [
        "Rider requests a ride (bike taxi / auto / cab)",
        "Real-time driver matching based on proximity",
        "Live GPS location tracking during ride",
        "Fare calculation with distance + time + surge",
        "Payment processing (UPI, wallet, cash)",
        "Ride history & receipts",
        "Driver onboarding & earnings dashboard"
      ],
      nonFunctional: [
        "Real-time low latency (< 500ms for driver matching)",
        "High availability (no downtime during peak hours)",
        "Geo-scale across 100+ Indian cities",
        "Handle surge: 10x demand spikes during rain/festivals",
        "Cost-efficient infrastructure (thin margins in ride-hailing)"
      ]
    }
  },
  {
    id: 2, title: "High-Level Architecture", icon: "🏗️",
    diagram: {
      description: "Rapido's architecture separates real-time concerns (location, matching) from transactional ones (payments, billing).",
      nodes: [
        { label: "📱 Rider App", sub: "Request ride, track driver, pay" },
        { label: "📱 Driver App", sub: "Accept rides, navigate, earnings" },
        { label: "🌐 API Gateway", sub: "Auth, rate limiting, routing" },
        { label: "🔍 Matching Service", sub: "Find nearest available driver" },
        { label: "📍 Location Service", sub: "Real-time GPS tracking" },
        { label: "💰 Pricing Service", sub: "Fare calc + surge pricing" },
        { label: "💳 Payment Service", sub: "UPI, wallet, cash handling" },
        { label: "🗄️ Databases", sub: "PostgreSQL + MongoDB + Redis" },
      ]
    }
  },
  {
    id: 3, title: "Real-Time Location Tracking", icon: "📍",
    content: {
      explanation: `Every active driver sends a GPS ping every 3-5 seconds. With 500K+ active drivers, that's 
**100K-170K location updates per second**. This data is ephemeral — we only care about the CURRENT location, 
not where a driver was 10 minutes ago.`,
      flow: [
        "Driver app sends GPS coordinates via WebSocket connection",
        "Location Service receives pings and updates the driver's position",
        "Positions stored in Redis (in-memory, fast writes, auto-expiry)",
        "Geospatial index (Geohash) enables 'find drivers within 2km' queries",
        "Rider app receives live driver position updates via WebSocket",
        "Map UI updates driver pin every 2-3 seconds"
      ],
      stat: "A single Redis Geo cluster can handle 1M+ GEOADD/GEORADIUS operations per second"
    }
  },
  {
    id: 4, title: "Driver Matching Algorithm", icon: "🔍",
    content: {
      explanation: `When a rider requests a ride, the system needs to find the best driver within seconds. 
Here's how Geohashing makes this possible:`,
      flow: [
        "Rider's location is converted to a Geohash (e.g., 'tdr1w3' = a ~600m² cell in Bengaluru)",
        "Query Redis: 'Find all drivers in geohash cells tdr1w3 + 8 neighboring cells'",
        "Filter: only available drivers (not on a ride, online, correct vehicle type)",
        "Rank by: distance (primary), acceptance rate (secondary), rating (tertiary)",
        "Send ride request to top-ranked driver — 15 second timeout to accept",
        "If declined/timeout → send to next driver in ranking",
        "If accepted → lock driver, notify rider, start navigation"
      ],
      stat: "Rapido matches a driver in < 10 seconds for 90% of ride requests in metro cities"
    }
  },
  {
    id: 5, title: "Surge Pricing", icon: "💰",
    content: {
      explanation: `Surge pricing balances supply (drivers) and demand (riders) in real-time. 
When it rains in Bengaluru or a cricket match ends at Chinnaswamy Stadium, demand spikes 5-10x in that area.`,
      flow: [
        "Divide each city into hexagonal zones (H3 geo-index, ~500m radius)",
        "Every 30 seconds: count ride requests vs available drivers per zone",
        "Calculate demand/supply ratio for each zone",
        "Ratio > 1.5 → 1.2x surge | Ratio > 3.0 → 1.8x surge | Ratio > 5.0 → 2.5x surge",
        "Surge multiplier applied to base fare before showing rider",
        "As surge price attracts more drivers to the zone, supply increases and surge drops",
        "Cache surge data in Redis (TTL: 60s) for sub-millisecond fare lookups"
      ],
      stat: "Surge recalculation runs every 30 seconds across 10,000+ zones in 100+ cities"
    }
  },
  {
    id: 6, title: "Database Architecture", icon: "🗄️",
    content: {
      explanation: `Like Netflix, Rapido uses a polyglot database approach — different databases for different jobs:`,
      databases: [
        { name: "Redis (Geo)", type: "In-Memory", use: "Live driver locations, surge cache, session data", why: "Sub-ms reads, built-in geospatial commands (GEOADD, GEORADIUS)" },
        { name: "MongoDB", type: "NoSQL", use: "Ride events, driver activity logs, location history", why: "Flexible schema, fast writes, horizontal scaling for event data" },
        { name: "PostgreSQL", type: "SQL", use: "User accounts, payments, billing, ride records", why: "ACID transactions — money can't go missing, strong consistency" },
        { name: "Elasticsearch", type: "Search", use: "Address autocomplete, place search", why: "Full-text search with geo-filtering" },
      ],
      insight: "Payments go through PostgreSQL (ACID). Locations go through Redis (speed). Never mix the two."
    }
  },
  {
    id: 7, title: "Event Streaming", icon: "📨",
    content: {
      explanation: `A ride goes through a clear state machine: 
REQUESTED → MATCHED → ACCEPTED → DRIVER_ARRIVING → RIDE_STARTED → RIDE_COMPLETED → PAYMENT_PROCESSED. 
Each transition is an event published to a message queue.`,
      useCases: [
        { task: "Ride state machine", detail: "Each state change publishes a Kafka event — all services react independently" },
        { task: "ETA calculations", detail: "Location pings → consumer calculates live ETA → pushes to rider app" },
        { task: "Analytics pipeline", detail: "Every event flows to the data warehouse for demand forecasting" },
        { task: "Notifications", detail: "'Driver arriving in 2 min' pushed via FCM/APNS through a notification queue" },
        { task: "Driver incentives", detail: "Complete 10 rides today = ₹200 bonus — tracked via event aggregation" },
      ],
      stat: "A single ride generates 50+ events across 8+ microservices"
    }
  },
  {
    id: 8, title: "Regional Load Balancing", icon: "📈",
    content: {
      explanation: `India is vast. Bengaluru at 8 AM rush hour has 100x the traffic of a Tier-3 city. 
Rapido needs region-aware infrastructure:`,
      tiers: [
        { tier: "City-level sharding", detail: "Each major city gets its own matching/location service cluster" },
        { tier: "Regional load balancing", detail: "API Gateway routes Bengaluru traffic to BLR cluster, Mumbai to BOM cluster" },
        { tier: "Auto-scaling by city", detail: "Bengaluru cluster scales up during morning/evening rush, scales down at night" },
        { tier: "Cross-city fallback", detail: "If BLR cluster is degraded, overflow to the nearest healthy region" },
      ],
      stat: "Bengaluru alone generates 40%+ of Rapido's total traffic — it gets its own dedicated infrastructure"
    }
  },
  {
    id: 9, title: "Fault Tolerance", icon: "🛡️",
    content: {
      explanation: `What happens if the Matching Service crashes while a rider is waiting for a driver?`,
      patterns: [
        { pattern: "Retry with backoff", detail: "If matching fails, retry 3 times with exponential backoff (1s, 2s, 4s)" },
        { pattern: "Circuit breaker", detail: "If matching keeps failing, stop trying and show 'No drivers available' gracefully" },
        { pattern: "Event sourcing for rides", detail: "Ride state is stored as an event log — can reconstruct state from events if service restarts" },
        { pattern: "Payment idempotency", detail: "Every payment has a unique ID — charging twice with the same ID is a no-op" },
        { pattern: "Driver GPS buffering", detail: "If Location Service is down, driver app buffers GPS pings locally and replays when service recovers" },
      ],
      insight: "The worst failure in ride-hailing: charging the rider but the driver doesn't know the ride started. Idempotent events + state reconciliation prevent this."
    }
  },
  {
    id: 10, title: "Full Ride Walkthrough", icon: "🎬",
    content: {
      explanation: `Let's trace a complete ride: **A user opens Rapido in Koramangala, Bengaluru and books a bike taxi to Indiranagar.**`,
      trace: [
        { step: "📱 Rider App", detail: "User enters destination → app sends ride request with pickup & drop coordinates" },
        { step: "🌐 API Gateway", detail: "Authenticates user, checks wallet balance, routes to Matching Service" },
        { step: "💰 Pricing Service", detail: "Calculates fare: ₹45 base + ₹12/km × 3.2km + 1.3x surge = ₹84" },
        { step: "🔍 Matching Service", detail: "Queries Redis Geo: 'drivers within 2km of Koramangala' → finds 12 drivers" },
        { step: "📍 Location Service", detail: "Ranks drivers by proximity → Driver Raju is 800m away, 4.8★ rating" },
        { step: "📱 Driver App", detail: "Raju receives ride request with fare ₹84 → accepts within 5 seconds" },
        { step: "📨 Kafka Event", detail: "Publishes RIDE_MATCHED event → Notification Service sends push to rider" },
        { step: "🗺️ Live Tracking", detail: "Rider sees Raju's bike moving on map → ETA: 3 minutes" },
        { step: "🏍️ Ride in Progress", detail: "Raju picks up rider → RIDE_STARTED event → location pings every 3s" },
        { step: "✅ Ride Complete", detail: "Drop at Indiranagar → ₹84 debited via UPI → receipt generated → ratings exchanged" },
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
              className="p-4 rounded-2xl border border-white/10 bg-white/[0.03] text-center"
            >
              <div className="text-2xl mb-2">{node.label.split(' ')[0]}</div>
              <div className="font-bold text-white text-sm">{node.label.split(' ').slice(1).join(' ')}</div>
              <div className="text-xs text-textTertiary mt-1">{node.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (step.id === 6) {
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
        <div className="p-4 bg-sysDb/10 border border-sysDb/20 rounded-xl text-sysDb font-bold text-center">💡 {c.insight}</div>
      </div>
    );
  }

  if (step.id === 10) {
    return (
      <div>
        <p className="text-textSecondary text-lg mb-8">{c.explanation}</p>
        <div className="space-y-3">
          {c.trace.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.06] transition-colors">
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

  // Generic rendering
  const items = c.flow || c.useCases || c.tiers || c.patterns;
  return (
    <div>
      <p className="text-textSecondary text-lg mb-6 whitespace-pre-line">{c.explanation}</p>
      <div className="space-y-3 mb-8">
        {items && items.map((item, i) => {
          const isObj = typeof item === "object" && item.detail;
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-sysLb/20 text-sysLb flex items-center justify-center font-black text-sm flex-shrink-0">{i + 1}</div>
              {isObj ? (
                <div>
                  <div className="font-bold text-white text-sm">{item.task || item.tier || item.pattern}</div>
                  <div className="text-sm text-textTertiary">{item.detail}</div>
                </div>
              ) : (
                <span className="text-textSecondary">{item}</span>
              )}
            </motion.div>
          );
        })}
      </div>
      {(c.stat || c.insight) && (
        <div className="p-4 bg-sysLb/10 border border-sysLb/20 rounded-xl text-sysLb font-bold text-center">
          ⚡ {c.stat || c.insight}
        </div>
      )}
    </div>
  );
}

export default function RapidoCaseStudy() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 global-page-pt pb-12 px-6 max-w-5xl mx-auto">
        <Link href="/system-design" className="text-textTertiary hover:text-white transition-colors text-sm font-bold mb-6 inline-flex items-center gap-1">
          ← Back to Course
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <div className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-[11px] font-black uppercase tracking-widest">
            Full Project • 10 Steps • India-First
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
          🏍️ Rapido <span className="text-yellow-500">System Design</span>
        </h1>
        <p className="text-xl text-textSecondary max-w-3xl leading-relaxed">
          Real-time location tracking, geospatial matching, surge pricing — how India&apos;s largest bike-taxi platform handles millions of rides daily.
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
                  ? "bg-yellow-500 text-black shadow-lg"
                  : i < currentStep
                  ? "bg-sysServer/20 text-sysServer"
                  : "bg-white/5 text-textTertiary hover:bg-white/10"
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden md:inline">{s.title}</span>
              <span className="md:hidden">{s.id}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
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
              <span className="text-4xl">{step.icon}</span>
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
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400 transition-all disabled:opacity-30"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
