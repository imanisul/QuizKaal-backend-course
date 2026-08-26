import React from "react";

export const metadata = {
  title: "DevOps Engineer Course | QuizKaal",
  description: "Master Linux, Git, Docker, Kubernetes, CI/CD, Cloud, Terraform, Monitoring, DevSecOps, SRE and Production Deployment.",
};

export default function DevOpsLayout({ children }) {
  return (
    <div className="bg-[#060608] min-h-screen text-white font-sans selection:bg-primary/30">
      {children}
    </div>
  );
}
