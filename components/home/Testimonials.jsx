"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Backend Engineer @ TechCorp",
    content: "The visual analogies for HTTP and DNS finally made everything click. The System Design simulator was crucial for passing my recent senior engineering interview.",
    avatar: "AJ"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Full Stack Developer",
    content: "I've taken many backend courses, but QuizKaal's interactive approach is unmatched. The Docker and Kubernetes playground environments saved me hours of setup.",
    avatar: "SC"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Software Architect",
    content: "The level of depth in the Database Sharding and Caching modules is incredible. This is exactly what engineers need to bridge the gap from mid-level to senior.",
    avatar: "MR"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0c] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4">Trusted by Engineers</h2>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">See what our community says about their learning experience on QuizKaal.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] group"
            >
              <Quote className="absolute top-6 right-6 text-white/5 w-16 h-16 -z-10 group-hover:text-primary/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={16} className="text-yellow-500" fill="currentColor" />
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 relative z-10 text-[15px]">
                "{review.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center font-bold text-white shadow-lg">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <p className="text-sm text-textTertiary">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
