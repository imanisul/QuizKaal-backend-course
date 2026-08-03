"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, MessageSquare, CheckCircle, Shield, BrainCircuit, Terminal, Server, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const TOPICS = ["All", "DNS", "APIs", "SQL", "NoSQL", "Caching", "Load Balancing", "Replication", "Partitioning", "CAP Theorem", "Message Queues", "Fault Tolerance", "Monitoring", "Netflix", "Rapido"];
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced", "Staff-level"];

const QUESTIONS = [
  { id: 1, q: "What is the CAP theorem? Give a real example of a system choosing AP over CP.", topic: "CAP Theorem", difficulty: "Beginner", answer: "CAP theorem states a distributed system can guarantee at most 2 of 3: Consistency, Availability, Partition tolerance. Since network partitions are unavoidable, you choose between CP (consistency — banking systems like payment processing) or AP (availability — social media feeds where eventual consistency is fine). Example: Cassandra is AP — during a partition, both nodes accept writes and reconcile later. This means you might temporarily see stale data, but the system never goes down.", interview: "Start by defining CAP clearly, then give ONE concrete example. Interviewers love when you tie it to a real system you've used or studied." },
  { id: 2, q: "Walk through what happens between a user typing a URL and seeing a page.", topic: "DNS", difficulty: "Beginner", answer: "1. Browser checks local DNS cache → 2. If miss, queries recursive DNS resolver → 3. Resolver queries root DNS → TLD DNS → authoritative DNS → gets IP → 4. Browser opens TCP connection (3-way handshake) → 5. If HTTPS, TLS handshake → 6. Browser sends HTTP GET request → 7. Request hits load balancer → 8. LB routes to a backend server → 9. Server processes request (may query DB/cache) → 10. Server returns HTML response → 11. Browser parses HTML, fetches CSS/JS/images (more requests) → 12. Browser renders the page.", interview: "Go step by step. Don't rush. Interviewers want depth — mention DNS caching, TCP vs UDP, TLS, and how the load balancer picks a server." },
  { id: 3, q: "When would you choose MongoDB over PostgreSQL?", topic: "NoSQL", difficulty: "Intermediate", answer: "Choose MongoDB when: (1) Your schema changes frequently (startup iterating fast), (2) You need horizontal scaling for massive write throughput, (3) Data is naturally document-shaped (nested JSON — user profiles with embedded preferences), (4) You don't need complex JOINs or multi-table transactions. Stick with PostgreSQL when: you need ACID transactions (payments), complex relationships (many-to-many), or strong consistency guarantees.", interview: "Never say 'NoSQL is better.' Frame it as trade-offs. Show you understand WHEN each is appropriate." },
  { id: 4, q: "Design the caching strategy for a product page with 1M reads/sec and rare writes.", topic: "Caching", difficulty: "Advanced", answer: "Use cache-aside with Redis: On read → check Redis first → if hit (99.5% of the time), return cached product. On miss → query DB → store in Redis with TTL 15 minutes. On write (rare) → update DB → invalidate Redis key (delete, not update). This ensures the next read fetches fresh data. For 1M reads/sec, use Redis Cluster with 3+ shards. Add a local in-process cache (Guava/Caffeine) for the hottest 100 products to reduce Redis calls further. Total architecture: App → L1 in-process cache → L2 Redis → L3 Database.", interview: "Mention cache-aside by name. Discuss TTL trade-offs (staleness window). Bonus points for mentioning cache stampede protection (single-flight / locking)." },
  { id: 5, q: "How would you shard a ride-hailing system's location data by city?", topic: "Partitioning", difficulty: "Advanced", answer: "Shard by city_id as the partition key. Each city gets its own Redis Geo instance (or shard in a cluster). This works because: (1) Location queries are always scoped to a single city ('find drivers near me in Bengaluru'), (2) Cities are naturally isolated — a driver in Mumbai never matches with a rider in Delhi, (3) Hot cities (Bengaluru, Mumbai) can get beefier shards. Risk: Rides near city borders (e.g., Bengaluru-Hosur) need a small overlap zone where both shards are queried. Cross-city rides require a handoff protocol.", interview: "This is a Rapido/Uber style question. Show you understand WHY city-based sharding works (locality of queries) and the edge case (border zones)." },
  { id: 6, q: "Explain the difference between synchronous and asynchronous replication.", topic: "Replication", difficulty: "Intermediate", answer: "Synchronous: The primary waits for ALL replicas to acknowledge the write before confirming to the client. Guarantees consistency — if the primary dies, replicas have ALL data. But increases write latency (must wait for slowest replica). Asynchronous: The primary confirms the write immediately and replicates in the background. Fast writes, but risk data loss if primary crashes before replication completes. Semi-synchronous (used by MySQL): Wait for ONE replica to ACK, send to others async — a middle ground.", interview: "Frame it as a consistency vs latency trade-off. Mention semi-synchronous as the practical middle ground." },
  { id: 7, q: "How would you design Netflix's recommendation caching layer?", topic: "Netflix", difficulty: "Advanced", answer: "Recommendations are pre-computed by ML models (batch + real-time). Store top 200 recommendations per user in EVCache (Memcached-based). Key: user_id → value: sorted list of title_ids with scores. TTL: 1 hour (recommendations don't need to be real-time). On cache miss: fetch from the recommendation service (backed by Cassandra). Cache warming: when a user logs in, proactively cache their recs. Personalization layers: global trending (cached once, shared) + user-specific (cached per user). Cache size: 250M users × ~2KB per user = ~500GB of cache — distributed across a cluster.", interview: "Show the layering: global cache (shared) + per-user cache. Mention cache warming and why TTL of 1 hour is acceptable for recommendations." },
  { id: 8, q: "How would Rapido handle a spike in ride requests during a festival in one city?", topic: "Rapido", difficulty: "Advanced", answer: "1. Surge detection: The pricing service detects demand/supply imbalance in the city's zones within 30 seconds. 2. Surge pricing kicks in: Higher fares attract more drivers to go online. 3. Auto-scaling: The matching service for that city's cluster spins up more instances (Kubernetes HPA triggered by CPU/request rate). 4. Queue-based absorption: Excess requests go into a priority queue — premium/loyal users get matched first. 5. Driver incentives: Push notifications to offline drivers offering bonus incentives ('₹200 bonus for 5 rides in Koramangala today'). 6. Geographic expansion: If zone X is saturated, expand the matching radius from 2km to 5km to find drivers in nearby zones.", interview: "This tests your understanding of real-time systems under load. Hit surge, auto-scaling, queueing, and incentives — show you think beyond just 'add more servers.'" },
  { id: 9, q: "What is a circuit breaker pattern and when would you use it?", topic: "Fault Tolerance", difficulty: "Intermediate", answer: "A circuit breaker monitors calls to a downstream service. States: CLOSED (normal, requests pass through), OPEN (service is failing, requests are blocked and a fallback is returned immediately), HALF-OPEN (after a timeout, allow a few test requests — if they succeed, go back to CLOSED). Use when: calling an external API or microservice that might be down. Without it: cascading failure — your service hangs waiting for the dead service, exhausts thread pools, and crashes too. Example: Netflix's Hystrix library. If the recommendation service is down, the circuit breaker returns 'Popular on Netflix' as a fallback instead of crashing the entire homepage.", interview: "Draw the state diagram: CLOSED → OPEN → HALF-OPEN → CLOSED. Mention cascading failure prevention and graceful degradation." },
  { id: 10, q: "Compare REST, GraphQL, gRPC, and WebSockets — when to use each.", topic: "APIs", difficulty: "Intermediate", answer: "REST: Universal, stateless, cacheable. Best for CRUD APIs, public APIs. Uses HTTP/1.1, JSON. GraphQL: Client specifies exactly what data it needs. Best when clients have varied data needs (mobile vs web), or to avoid over-fetching. Single endpoint. gRPC: Binary protocol (Protobuf), very fast. Best for internal microservice-to-microservice communication where latency matters. Supports streaming. WebSockets: Full-duplex, persistent connection. Best for real-time data (chat, live location tracking, stock tickers). REST for most things, GraphQL for complex client needs, gRPC for internal speed, WebSockets for real-time.", interview: "Don't just list features — explain WHEN you'd pick each one. Interviewers want to see decision-making, not memorization." },
  { id: 11, q: "How does DNS resolution work? What's the role of TTL in DNS?", topic: "DNS", difficulty: "Beginner", answer: "DNS translates domain names to IP addresses. Flow: Browser cache → OS cache → Recursive resolver (ISP) → Root DNS (.com) → TLD DNS (example.com) → Authoritative DNS (returns IP). TTL controls how long DNS records are cached. Short TTL (60s): faster failover but more DNS queries. Long TTL (86400s): fewer queries but slow to propagate changes. During migrations, you lower TTL days before the switch, then change the IP, so caches expire quickly.", interview: "Mention the caching hierarchy. TTL trade-off (speed vs freshness) is a common follow-up." },
  { id: 12, q: "What are the different load balancing algorithms and when to use each?", topic: "Load Balancing", difficulty: "Beginner", answer: "Round Robin: Simple rotation. Good for uniform servers with similar request costs. Least Connections: Send to server with fewest active connections. Best for requests with varying processing times. Weighted Round Robin: Assign weights based on server capacity. For heterogeneous hardware. IP Hash: Same client IP always goes to same server. For session affinity. Geo-routing: Route to nearest data center. For global apps minimizing latency.", interview: "Name the algorithm, explain it in one sentence, and give a use case. Show you know when Round Robin fails (uneven request sizes)." },
  { id: 13, q: "Explain write-through vs write-back caching strategies.", topic: "Caching", difficulty: "Intermediate", answer: "Write-through: Every write updates BOTH cache and DB synchronously. Pros: cache is always consistent, zero staleness. Cons: slower writes (double write), caches data that may never be read. Used in banking/payment systems. Write-back (write-behind): Writes go to cache ONLY, DB is updated asynchronously in batches. Pros: extremely fast writes, reduces DB load. Cons: risk of data loss if cache crashes before DB flush. Used in gaming leaderboards, like counters, analytics.", interview: "Frame as a consistency vs performance trade-off. Mention the data loss risk of write-back explicitly — it shows maturity." },
  { id: 14, q: "How would you handle duplicate messages in a message queue?", topic: "Message Queues", difficulty: "Advanced", answer: "Idempotent consumers: Design your consumer so processing the same message twice produces the same result. Use a deduplication table: store message_id in a DB/Redis set. Before processing, check if message_id exists. If yes, skip. If no, process and add to set. At-least-once delivery is the default in most queues (Kafka, SQS). Exactly-once is extremely hard to achieve — most systems settle for at-least-once + idempotent consumers.", interview: "Key insight: don't try to prevent duplicates in the queue — handle them in the consumer. Mention idempotency keys for payment processing." },
  { id: 15, q: "What metrics would you monitor for a production microservice?", topic: "Monitoring", difficulty: "Beginner", answer: "The 4 Golden Signals (from Google SRE): 1. Latency: p50, p95, p99 response times. 2. Traffic: requests per second. 3. Errors: error rate (5xx responses / total responses). 4. Saturation: CPU, memory, disk, network utilization. Plus: queue depth (for async services), cache hit rate, DB connection pool usage, deployment markers (correlate issues with deploys).", interview: "Lead with the 4 Golden Signals by name — shows you've read the Google SRE book. Then mention specific metrics relevant to the service being discussed." },
];

export default function InterviewPrepPage() {
  const [topicFilter, setTopicFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [showInterview, setShowInterview] = useState({});

  const filtered = useMemo(() => {
    return QUESTIONS.filter(q => {
      if (topicFilter !== "All" && q.topic !== topicFilter) return false;
      if (difficultyFilter !== "All" && q.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [topicFilter, difficultyFilter]);

  const diffColors = {
    "Beginner": "bg-sysServer/20 text-sysServer border-sysServer/30",
    "Intermediate": "bg-sysClient/20 text-sysClient border-sysClient/30",
    "Advanced": "bg-sysCache/20 text-sysCache border-sysCache/30",
    "Staff-level": "bg-sysQueue/20 text-sysQueue border-sysQueue/30",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-sysClient/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 global-page-pt pb-12 px-6 max-w-5xl mx-auto">
        <Link href="/system-design" className="text-textTertiary hover:text-white transition-colors text-sm font-bold mb-6 inline-flex items-center gap-1">
          ← Back to Course
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <div className="px-3 py-1.5 bg-sysClient/10 border border-sysClient/20 rounded-full text-sysClient text-[11px] font-black uppercase tracking-widest">
            {QUESTIONS.length}+ Questions
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
          <Target size={40} className="text-sysClient inline-block mr-4"/> Interview <span className="text-sysClient">Prep Bank</span>
        </h1>
        <p className="text-xl text-textSecondary max-w-3xl leading-relaxed">
          Curated system design questions with detailed answers and interview tips. Filter by topic and difficulty.
        </p>
      </section>

      {/* Filters */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
          <div className="flex-1">
            <label className="text-xs font-black uppercase tracking-widest text-textTertiary mb-2 block">Topic</label>
            <select 
              value={topicFilter} 
              onChange={(e) => setTopicFilter(e.target.value)}
              className="w-full bg-bgElevated border border-white/10 rounded-xl px-4 py-3 text-white font-medium appearance-none cursor-pointer"
            >
              {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs font-black uppercase tracking-widest text-textTertiary mb-2 block">Difficulty</label>
            <select 
              value={difficultyFilter} 
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full bg-bgElevated border border-white/10 rounded-xl px-4 py-3 text-white font-medium appearance-none cursor-pointer"
            >
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-textSecondary">
              {filtered.length} questions
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-32">
        <div className="space-y-4">
          {filtered.map((q, i) => {
            const isExpanded = expandedId === q.id;
            const showingInterview = showInterview[q.id];
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="w-full text-left p-6 flex items-start gap-4 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${diffColors[q.difficulty]}`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-textTertiary bg-white/5 px-2 py-0.5 rounded">
                        {q.topic}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug">{q.q}</h3>
                  </div>
                  {isExpanded ? <ChevronUp size={20} className="text-textTertiary mt-1 flex-shrink-0" /> : <ChevronDown size={20} className="text-textTertiary mt-1 flex-shrink-0" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/5 pt-6">
                        <div className="text-textSecondary leading-relaxed whitespace-pre-line mb-6">{q.answer}</div>
                        
                        <button
                          onClick={() => setShowInterview(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className="text-sm font-bold text-sysClient hover:text-white transition-colors flex items-center gap-2"
                        >
                          <MessageSquare size={16} className="mr-2"/> {showingInterview ? "Hide" : "Show"} Interview Tip
                        </button>

                        <AnimatePresence>
                          {showingInterview && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 p-4 bg-sysClient/10 border border-sysClient/20 rounded-xl text-sysClient text-sm font-medium leading-relaxed">
                                🎤 <strong>How to say this in an interview:</strong> {q.interview}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
