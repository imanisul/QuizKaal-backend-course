import React from "react";
import { Code } from "lucide-react";
import HttpVisualizer from "@/components/lesson1/HttpVisualizer";
import LifecycleTimeline from "@/components/lesson1/LifecycleTimeline";
import MethodVisualizer from "@/components/lesson2/MethodVisualizer";
import CopyButton from "@/components/ui/CopyButton";
import Reveal from "@/components/ui/Reveal";
import CompletionButton from "@/components/ui/CompletionButton";
import QuizWidget from "@/components/interactive/QuizWidget";
import CourseNavigation from "@/components/lesson/CourseNavigation";
import LessonHero from "@/components/lesson/LessonHero";
import TerminalLab from "@/components/devops/TerminalLab";
import YamlEditor from "@/components/devops/YamlEditor";

// Interactive Visual Simulator Components
import AnimatedWorkflow from "@/components/interactive/AnimatedWorkflow";
import ArchitectureDiagram from "@/components/interactive/ArchitectureDiagram";
import RequestLifecycle from "@/components/interactive/RequestLifecycle";
import RealWorldCaseStudy from "@/components/interactive/RealWorldCaseStudy";

import HTTPVisualizer from "@/components/interactive/HTTPVisualizer";
import MVCVisualizer from "@/components/interactive/MVCVisualizer";
import DockerVisualizer from "@/components/interactive/DockerVisualizer";
import RedisVisualizer from "@/components/interactive/RedisVisualizer";
import MessageQueueVisualizer from "@/components/interactive/MessageQueueVisualizer";
import ArchitectureVisualizer from "@/components/interactive/ArchitectureVisualizer";
import AIVisualizer from "@/components/interactive/AIVisualizer";
import RestApiVisualizer from "@/components/interactive/RestApiVisualizer";
import BackendFlowVisualizer from "@/components/interactive/BackendFlowVisualizer";
import AuthVisualizer from "@/components/interactive/AuthVisualizer";
import DatabaseVisualizer from "@/components/interactive/DatabaseVisualizer";

import ConceptBlock from "@/components/ai-course/ConceptBlock";
import InternetVisualizer from "@/components/interactive/InternetVisualizer";
import KnowledgeCard from "@/components/ui/KnowledgeCard";
import TimelineVisualizer from "@/components/interactive/TimelineVisualizer";
import PacketFlowVisualizer from "@/components/interactive/PacketFlowVisualizer";
import ClientServerVisualizer from "@/components/interactive/ClientServerVisualizer";
import HttpRequestVisualizer from "@/components/interactive/HttpRequestVisualizer";
import DnsLookupVisualizer from "@/components/interactive/DnsLookupVisualizer";
import IpVisualizer from "@/components/interactive/IpVisualizer";
import PortVisualizer from "@/components/interactive/PortVisualizer";
import BrowserFlowVisualizer from "@/components/interactive/BrowserFlowVisualizer";
import MegaNetworkVisualizer from "@/components/interactive/MegaNetworkVisualizer";

import DevOpsLifecycle from "@/components/interactive/DevOpsLifecycle";
import TcpHandshakeVisualizer from "@/components/interactive/TcpHandshakeVisualizer";
import LinuxProcessVisualizer from "@/components/interactive/LinuxProcessVisualizer";
import InteractiveFilesystem from "@/components/interactive/InteractiveFilesystem";
import GitFlowVisualizer from "@/components/interactive/GitFlowVisualizer";
import DockerArchitectureVisualizer from "@/components/interactive/DockerArchitectureVisualizer";
import CicdPipelineVisualizer from "@/components/interactive/CicdPipelineVisualizer";
import K8sClusterArchitecture from "@/components/interactive/K8sClusterArchitecture";
import K8sPodCreationVisualizer from "@/components/interactive/K8sPodCreationVisualizer";
import TroubleshootingFlow from "@/components/interactive/TroubleshootingFlow";

// New Rich MDX Components
import LearningObjectives from "@/components/mdx/LearningObjectives";
import StepByStep from "@/components/mdx/StepByStep";
import AnalogyCard from "@/components/mdx/AnalogyCard";
import CodeTabs from "@/components/mdx/CodeTabs";
import WarningCard from "@/components/mdx/WarningCard";
import InterviewPrep from "@/components/mdx/InterviewPrep";
import LessonSummary from "@/components/mdx/LessonSummary";
import PracticeExercise from "@/components/mdx/PracticeExercise";
import ComparisonMatrix from "@/components/mdx/ComparisonMatrix";
import StepProcess from "@/components/mdx/StepProcess";
import CodeOutput from "@/components/mdx/CodeOutput";
import BehindTheScenes from "@/components/mdx/BehindTheScenes";
import IncidentSimulator from "@/components/mdx/IncidentSimulator";


import PlaceholderVisualizer from "@/components/interactive/PlaceholderVisualizer";

// Map missing ones to PlaceholderVisualizer
const GraphqlVisualizer = (props) => <PlaceholderVisualizer name="GraphQL Architecture Visualizer" {...props} />;
const BTreeVisualizer = (props) => <PlaceholderVisualizer name="B-Tree Data Structure Visualizer" {...props} />;
const EventLoopVisualizer = (props) => <PlaceholderVisualizer name="Event Loop Visualizer" {...props} />;
const KafkaVisualizer = (props) => <PlaceholderVisualizer name="Apache Kafka Visualizer" {...props} />;
const OauthFlowVisualizer = (props) => <PlaceholderVisualizer name="OAuth Flow Visualizer" {...props} />;
const StreamVisualizer = (props) => <PlaceholderVisualizer name="Streams & Buffers Visualizer" {...props} />;
const SecurityVisualizer = (props) => <PlaceholderVisualizer name="API Security Visualizer" {...props} />;
const WorkerVisualizer = (props) => <PlaceholderVisualizer name="Worker Threads Visualizer" {...props} />;

export const MdxComponents = {
  TerminalLab,
  YamlEditor,
  LearningObjectives,
  StepByStep,
  AnalogyCard,
  CodeTabs,
  WarningCard,
  InterviewPrep,
  LessonSummary,
  PracticeExercise,
  ConceptBlock,
  ComparisonMatrix,
  StepProcess,
  CodeOutput,
  BehindTheScenes,
  IncidentSimulator,
  CourseNavigation: () => null,
  LessonHero: () => null,
  InternetVisualizer,
  TimelineVisualizer,
  PacketFlowVisualizer,
  ClientServerVisualizer,
  HttpRequestVisualizer,
  DnsLookupVisualizer,
  IpVisualizer,
  PortVisualizer,
  BrowserFlowVisualizer,
  MegaNetworkVisualizer,
  DevOpsLifecycle,
  TcpHandshakeVisualizer,
  LinuxProcessVisualizer,
  InteractiveFilesystem,
  GitFlowVisualizer,
  DockerArchitectureVisualizer,
  CicdPipelineVisualizer,
  K8sClusterArchitecture,
  K8sPodCreationVisualizer,
  TroubleshootingFlow,
  KnowledgeCard,
  CompletionButton,
  QuizWidget,
  HttpVisualizer,
  LifecycleTimeline,
  MethodVisualizer,
  AnimatedWorkflow,
  ArchitectureDiagram,
  RequestLifecycle,
  RealWorldCaseStudy,
  HTTPVisualizer,
  MVCVisualizer,
  DockerVisualizer,
  RedisVisualizer,
  MessageQueueVisualizer,
  ArchitectureVisualizer,
  AIVisualizer,
  RestApiVisualizer,
  BackendFlowVisualizer,
  GraphqlVisualizer,
  BTreeVisualizer,
  EventLoopVisualizer,
  KafkaVisualizer,
  OauthFlowVisualizer,
  StreamVisualizer,
  SecurityVisualizer,
  WorkerVisualizer,
  ApiFlowVisualizer: RestApiVisualizer,
  MvcVisualizer: MVCVisualizer,
  QueueVisualizer: MessageQueueVisualizer,
  CacheVisualizer: RedisVisualizer,
  AuthFlowVisualizer: AuthVisualizer,
  AuthVisualizer,
  DatabaseVisualizer,
  BackendFlowVisualizer,
  AuthVisualizer,
  DatabaseVisualizer,
  h1: (props) => <Reveal as="h1" className="text-4xl font-extrabold tracking-tight mb-6 mt-10 text-white" {...props} />,
  h2: (props) => <Reveal as="h2" className="text-2xl font-bold tracking-tight mb-4 mt-12 text-white border-b border-white/10 pb-2" {...props} />,
  h3: (props) => <Reveal as="h3" className="text-xl font-bold tracking-tight mb-3 mt-8 text-white" {...props} />,
  p: (props) => <Reveal as="p" className="leading-relaxed text-textSecondary mb-6 text-[15px]" {...props} />,
  ul: (props) => <Reveal as="ul" className="list-disc pl-6 mb-6 text-textSecondary space-y-2 text-[15px]" {...props} />,
  ol: (props) => <Reveal as="ol" className="list-decimal pl-6 mb-6 text-textSecondary space-y-2 text-[15px]" {...props} />,
  li: (props) => <li {...props} />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  a: (props) => <a className="text-primary hover:underline font-medium" {...props} />,
  blockquote: (props) => (
    <Reveal as="blockquote" className="border-l-4 border-primary/50 pl-4 py-1 mb-6 bg-primary/5 rounded-r-lg italic text-textSecondary" {...props} />
  ),
  code: (props) => {
    // If it's a code block (handled by rehype-pretty-code), it comes as a figure/pre usually,
    // but inline code comes here.
    if (props.className?.includes('language-')) {
      return <code {...props} />;
    }
    return <code className="bg-white/10 text-white px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-white/10" {...props} />;
  },
  pre: (props) => {
    // Extract raw text from children for the CopyButton
    // rehype-pretty-code passes the raw code as raw property sometimes, but safely we can extract it from props.children
    const extractText = (node) => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(extractText).join("");
      if (node?.props?.children) return extractText(node.props.children);
      return "";
    };
    const rawText = extractText(props.children);

    return (
      <Reveal className="relative group my-8 w-full overflow-hidden">
        <CopyButton text={rawText} />
        <pre {...props} className={`${props.className || ''} p-4 rounded-xl overflow-x-auto text-[14px] bg-[#0d1117] border border-white/10`} />
      </Reveal>
    );
  },
  Quiz: ({ question, options, answer }) => {
    let parsedOptions = [];
    if (Array.isArray(options)) {
      parsedOptions = options;
    } else if (typeof options === "string") {
      try {
        // Sometimes MDX passes arrays as strings if not using JSX expressions correctly
        parsedOptions = JSON.parse(options.replace(/'/g, '"'));
      } catch (e) {
        parsedOptions = options.split(",").map(o => o.trim());
      }
    }

    return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 my-8">
      <h4 className="font-bold text-lg mb-4 text-white">Quiz Time: {question}</h4>
      <div className="space-y-3">
        {parsedOptions.map((opt, i) => (
          <button key={i} className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm text-textSecondary hover:text-white">
            {opt}
          </button>
        ))}
      </div>
    </div>
  )},
  Callout: ({ type = "info", title, children }) => {
    const types = {
      info: "border-blue-500/50 bg-blue-500/10 text-blue-200",
      warning: "border-warning/50 bg-warning/10 text-warning",
      danger: "border-error/50 bg-error/10 text-error",
      success: "border-success/50 bg-success/10 text-success"
    };
    return (
      <div className={`border-l-4 rounded-r-xl p-4 my-6 ${types[type]}`}>
        {title && <div className="font-bold mb-1">{title}</div>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    );
  }
};
