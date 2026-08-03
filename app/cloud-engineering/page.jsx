"use client";

import React from "react";
import { Cloud, Server, Database, Network, ShieldCheck } from "lucide-react";
import CourseLandingLayout from "@/components/ui/CourseLandingLayout";

export default function CloudEngineeringPage() {
  const modules = [
    {
      title: "Module 1: Cloud Basics",
      desc: "IaaS, PaaS, SaaS and core AWS services.",
      color: "from-sky-400 to-sky-600",
      icon: Cloud,
      topics: [
        { id: 1, title: "Introduction to AWS", slug: "aws-intro", diff: "Beginner", time: "15m" },
        { id: 2, title: "EC2 & S3", slug: "ec2-s3", diff: "Intermediate", time: "25m" }
      ]
    },
    {
      title: "Module 2: DevOps & Infrastructure",
      desc: "Docker, Kubernetes, and CI/CD pipelines.",
      color: "from-blue-500 to-indigo-600",
      icon: Server,
      topics: [
        { id: 3, title: "Docker Containers", slug: "docker", diff: "Advanced", time: "30m" },
        { id: 4, title: "Kubernetes Orchestration", slug: "kubernetes", diff: "Expert", time: "45m" },
        { id: 5, title: "Terraform & IaC", slug: "terraform", diff: "Advanced", time: "30m" }
      ]
    }
  ];

  return (
    <CourseLandingLayout
      courseId="cloud-engineering"
      title="Cloud & DevOps Engineering"
      description="Deploy and scale global infrastructure. Learn AWS, Docker, Kubernetes, and Infrastructure as Code."
      icon={Cloud}
      themeColor="from-sky-400 to-indigo-500"
      bgGlow="from-sky-400/20 to-indigo-500/20"
      modules={modules}
      basePath="/cloud-engineering"
    />
  );
}
