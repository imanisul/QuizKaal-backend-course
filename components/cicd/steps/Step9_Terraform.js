"use client";
import { Server, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../../ui/AnimatedTerminal";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step9_Terraform({ playbackSpeed = 1 }) {
  const terminalLines = [
    { type: "command", text: "terraform apply -auto-approve" },
    { type: "output", text: "aws_eks_cluster.main: Refreshing state... [id=quizkaal-prod-eks]", delay: 300 },
    { type: "output", text: "aws_db_instance.postgres: Refreshing state... [id=quizkaal-db-1]", delay: 500 },
    { type: "output", text: "\nTerraform used the selected providers to generate the following execution plan.", delay: 800 },
    { type: "output", text: "Resource actions are indicated with the following symbols:\n  ~ update in-place", className: "text-textSecondary", delay: 900 },
    { type: "output", text: "\nTerraform will perform the following actions:", delay: 1000 },
    { type: "output", text: "  ~ aws_eks_node_group.workers\n      scaling_config.0.desired_size: \"3\" -> \"4\"", className: "text-yellow-400 font-bold", delay: 1200 },
    { type: "output", text: "\nPlan: 0 to add, 1 to change, 0 to destroy.", className: "font-bold", delay: 1500 },
    { type: "output", text: "aws_eks_node_group.workers: Modifying... [id=quizkaal-workers]", delay: 1800 },
    { type: "output", text: "aws_eks_node_group.workers: Modifications complete after 2m30s", delay: 2800 },
    { type: "output", text: "\nApply complete! Resources: 0 added, 1 changed, 0 destroyed.", className: "text-success font-bold mt-2", delay: 3200 }
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <Server className="text-purple-400" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">9. Infrastructure as Code (IaC)</h2>
          <p className="text-textSecondary text-base mt-1">Automatically provisioning the AWS/GCP servers needed to run the code.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1 h-full min-h-[400px]">
        
        {/* Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={Building2}
            title="Terraform"
            analogyTitle="The Architect & Construction Crew"
            description="Instead of manually clicking buttons in the AWS console to rent servers (which leads to human error), you write a blueprint. Terraform reads the blueprint and automatically builds the data center to match."
            points={[
              { keyword: "Plan", text: "Showing the blueprints. ('I am going to add 1 server')." },
              { keyword: "Apply", text: "Actually pouring the concrete and building it in AWS." },
              { keyword: "State", text: "Terraform's memory of what it has already built." }
            ]}
          />
        </div>

        {/* Animated Terminal */}
        <div className="h-full">
          <AnimatedTerminal 
            title="Terraform CLI" 
            branch="feature-login" 
            lines={terminalLines} 
            autoPlayDelay={0.5 / playbackSpeed} 
          />
        </div>

      </div>
    </div>
  );
}
