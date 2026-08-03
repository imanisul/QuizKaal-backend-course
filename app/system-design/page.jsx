"use client";

import React from "react";
import { BookOpen, Brain, Server, Database, Network, Shield, Zap, Layers, Clapperboard, CheckCircle2 } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";

const MODULES = [
  {
    title: "Module 1: Fundamentals",
    desc: "The core principles of System Design.",
    color: "from-blue-500 to-blue-600",
    icon: Brain,
    topics: [
      { id: 1, title: "What is System Design?", slug: "what-is-system-design", diff: "Beginner", time: "15m" },
      { id: 2, title: "Functional vs Non-Functional Requirements", slug: "requirements", diff: "Beginner", time: "10m" },
      { id: 3, title: "Scalability", slug: "scalability", diff: "Beginner", time: "20m" },
      { id: 4, title: "Availability", slug: "availability", diff: "Beginner", time: "15m" },
      { id: 5, title: "Reliability", slug: "reliability", diff: "Beginner", time: "15m" },
      { id: 6, title: "Latency & Throughput", slug: "latency-throughput", diff: "Beginner", time: "10m" },
      { id: 7, title: "CAP Theorem", slug: "cap-theorem", diff: "Intermediate", time: "20m" },
    ]
  },
  {
    title: "Module 2: Networking & Servers",
    desc: "Routing traffic and handling requests.",
    color: "from-cyan-500 to-teal-500",
    icon: Globe,
    topics: [
      { id: 8, title: "Load Balancers", slug: "load-balancers", diff: "Intermediate", time: "25m" },
      { id: 9, title: "Reverse Proxy", slug: "reverse-proxy", diff: "Intermediate", time: "15m" },
      { id: 10, title: "API Gateway", slug: "api-gateway", diff: "Intermediate", time: "20m" },
      { id: 11, title: "Web Servers", slug: "web-servers", diff: "Beginner", time: "10m" },
      { id: 12, title: "Application Servers", slug: "application-servers", diff: "Beginner", time: "10m" },
    ]
  },
  {
    title: "Module 3: Data Layer",
    desc: "Storing, retrieving, and scaling data.",
    color: "from-orange-500 to-amber-500",
    icon: Database,
    topics: [
      { id: 13, title: "Databases (SQL vs NoSQL)", slug: "sql-vs-nosql", diff: "Beginner", time: "25m" },
      { id: 14, title: "Database Indexing", slug: "database-indexing", diff: "Intermediate", time: "20m" },
      { id: 15, title: "Sharding", slug: "sharding", diff: "Advanced", time: "25m" },
      { id: 16, title: "Replication", slug: "replication", diff: "Intermediate", time: "20m" },
      { id: 17, title: "Caching (Redis)", slug: "caching", diff: "Intermediate", time: "30m" },
      { id: 18, title: "CDN", slug: "cdn", diff: "Beginner", time: "15m" },
      { id: 19, title: "Object Storage", slug: "object-storage", diff: "Beginner", time: "10m" },
    ]
  },
  {
    title: "Module 4: Async & Architecture",
    desc: "Decoupling systems for massive scale.",
    color: "from-purple-500 to-violet-500",
    icon: Network,
    topics: [
      { id: 20, title: "Messaging Queues", slug: "messaging-queues", diff: "Intermediate", time: "25m" },
      { id: 21, title: "Pub/Sub Systems", slug: "pub-sub", diff: "Intermediate", time: "20m" },
      { id: 22, title: "Event-Driven Architecture", slug: "event-driven", diff: "Advanced", time: "25m" },
      { id: 23, title: "Microservices", slug: "microservices", diff: "Intermediate", time: "20m" },
      { id: 24, title: "Monolith vs Microservices", slug: "monolith-vs-microservices", diff: "Beginner", time: "15m" },
      { id: 25, title: "Service Discovery", slug: "service-discovery", diff: "Advanced", time: "20m" },
    ]
  },
  {
    title: "Module 5: Security & Observability",
    desc: "Protecting and monitoring systems.",
    color: "from-rose-500 to-pink-500",
    icon: Shield,
    topics: [
      { id: 26, title: "Authentication & Authorization", slug: "auth", diff: "Intermediate", time: "25m" },
      { id: 27, title: "Rate Limiting", slug: "rate-limiting", diff: "Intermediate", time: "20m" },
      { id: 28, title: "Logging", slug: "logging", diff: "Beginner", time: "15m" },
      { id: 29, title: "Monitoring", slug: "monitoring", diff: "Beginner", time: "15m" },
    ]
  },
  {
    title: "Module 6: Advanced Concepts",
    desc: "Complex distributed system challenges.",
    color: "from-indigo-500 to-indigo-600",
    icon: Zap,
    topics: [
      { id: 30, title: "Distributed Systems", slug: "distributed-systems", diff: "Advanced", time: "25m" },
      { id: 31, title: "Consistency Models", slug: "consistency-models", diff: "Advanced", time: "30m" },
      { id: 32, title: "Distributed Locks", slug: "distributed-locks", diff: "Advanced", time: "25m" },
      { id: 33, title: "Search Systems", slug: "search-systems", diff: "Advanced", time: "30m" },
    ]
  },
  {
    title: "Module 7: Applied System Design",
    desc: "Designing real-world architectural components.",
    color: "from-emerald-500 to-teal-500",
    icon: Layers,
    topics: [
      { id: 34, title: "Notification Systems", slug: "notification-systems", diff: "Intermediate", time: "30m" },
      { id: 35, title: "File Upload Systems", slug: "file-upload", diff: "Intermediate", time: "25m" },
      { id: 36, title: "Chat Systems", slug: "chat-systems", diff: "Advanced", time: "35m" },
      { id: 37, title: "Payment Systems", slug: "payment-systems", diff: "Advanced", time: "40m" },
      { id: 38, title: "Video Streaming Architecture", slug: "video-streaming", diff: "Advanced", time: "35m" },
      { id: 39, title: "Social Media Feed Design", slug: "social-media-feed", diff: "Advanced", time: "35m" },
      { id: 40, title: "URL Shortener", slug: "url-shortener", diff: "Intermediate", time: "25m" },
      { id: 41, title: "Ride Sharing System", slug: "ride-sharing", diff: "Advanced", time: "40m" },
      { id: 42, title: "Food Delivery System", slug: "food-delivery", diff: "Advanced", time: "40m" },
      { id: 43, title: "E-commerce Architecture", slug: "ecommerce", diff: "Advanced", time: "40m" },
    ]
  },
  {
    title: "Module 8: FAANG Case Studies",
    desc: "Deconstructing massive global systems.",
    color: "from-red-600 to-rose-700",
    icon: Clapperboard,
    topics: [
      { id: 44, title: "Amazon System Design", slug: "amazon-design", diff: "Advanced", time: "45m" },
      { id: 45, title: "Netflix System Design", slug: "netflix-design", diff: "Advanced", time: "45m" },
      { id: 46, title: "YouTube System Design", slug: "youtube-design", diff: "Advanced", time: "45m" },
      { id: 47, title: "WhatsApp System Design", slug: "whatsapp-design", diff: "Advanced", time: "45m" },
      { id: 48, title: "Instagram System Design", slug: "instagram-design", diff: "Advanced", time: "45m" },
      { id: 49, title: "Uber System Design", slug: "uber-design", diff: "Advanced", time: "45m" },
      { id: 50, title: "Rapido System Design", slug: "rapido-design", diff: "Advanced", time: "40m" },
      { id: 51, title: "Spotify System Design", slug: "spotify-design", diff: "Advanced", time: "40m" },
      { id: 52, title: "Google Search", slug: "google-search", diff: "Advanced", time: "50m" },
      { id: 53, title: "Gmail System Design", slug: "gmail-design", diff: "Advanced", time: "40m" },
      { id: 54, title: "Swiggy / Zomato Design", slug: "swiggy-design", diff: "Advanced", time: "40m" },
      { id: 55, title: "Paytm / PhonePe Design", slug: "paytm-design", diff: "Advanced", time: "40m" },
      { id: 56, title: "Discord System Design", slug: "discord-design", diff: "Advanced", time: "45m" },
      { id: 57, title: "Twitter/X System Design", slug: "twitter-design", diff: "Advanced", time: "40m" },
      { id: 58, title: "LinkedIn System Design", slug: "linkedin-design", diff: "Advanced", time: "40m" },
    ]
  },
  {
    title: "Module 9: Final Project",
    desc: "Put your knowledge to the ultimate test.",
    color: "from-yellow-400 to-orange-500",
    icon: CheckCircle2,
    topics: [
      { id: 59, title: "Final System Design Project", slug: "final-project", diff: "Advanced", time: "120m" },
    ]
  }
];

// Added missing Globe icon import for Module 2 above
import { Globe } from "lucide-react";

export default function SystemDesignCourseHub() {
  return (
    <CourseLandingLayout
      courseId="system-design"
      title="System Design Mastery"
      description="Transform from a beginner to an interview-ready engineer. No videos — purely interactive visual learning, architectural animations, step-by-step engineering, and FAANG case studies."
      icon={BookOpen}
      themeColor="from-indigo-500 to-cyan-500"
      bgGlow="from-indigo-500/20 to-cyan-500/20"
      modules={MODULES}
      basePath="/system-design"
    />
  );
}
