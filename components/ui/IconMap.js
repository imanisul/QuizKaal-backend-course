import { 
  Blocks, Cpu, Database, Mails, ShieldCheck, Rocket, Puzzle,
  Globe, Compass, Lock, CheckCircle, TrafficCone, Gamepad2, Ruler, 
  Brain, Zap, Mail, Timer, Search, ShieldAlert, Settings, BarChart, 
  Power, TrendingUp, Layers, Box, Plug, TestTube, Play, Pause, Circle
} from "lucide-react";

export const IconMap = {
  // Phases
  Blocks, Cpu, Database, Mails, ShieldCheck, Rocket, Puzzle,
  // Lessons
  Globe, Compass, Lock, CheckCircle, TrafficCone, Gamepad2, Ruler, 
  Brain, Zap, Mail, Timer, Search, ShieldAlert, Settings, BarChart, 
  Power, TrendingUp, Layers, Box, Plug, TestTube,
  // Utilities
  Play, Pause, Circle
};

export default function RenderIcon({ iconName, ...props }) {
  const IconComponent = IconMap[iconName] || Circle;
  return <IconComponent {...props} />;
}
