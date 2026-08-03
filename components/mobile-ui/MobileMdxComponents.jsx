

import { MultiLangCodeBlock as ClientMultiLangCodeBlock } from '@/components/mobile-ui/MultiLangCodeBlock';
import { PhoneMockup as ClientPhoneMockup } from '@/components/mobile-ui/PhoneMockup';
import { AnimatedDiagram as ClientAnimatedDiagram } from '@/components/mobile-ui/AnimatedDiagram';
import { ConceptCard as ClientConceptCard } from '@/components/mobile-ui/ConceptCard';
import ClientQuizWidget from '@/components/interactive/QuizWidget';
import { LifecycleTimeline as ClientLifecycleTimeline } from '@/components/mobile-ui/animations/LifecycleTimeline';
import { NavigationStackVisualizer as ClientNavigationStackVisualizer } from '@/components/mobile-ui/animations/NavigationStackVisualizer';
import { NetworkFlowDiagram as ClientNetworkFlowDiagram } from '@/components/mobile-ui/animations/NetworkFlowDiagram';
import { StateFlowDiagram as ClientStateFlowDiagram } from '@/components/mobile-ui/animations/StateFlowDiagram';
import { AuthFlowDiagram as ClientAuthFlowDiagram } from '@/components/mobile-ui/animations/AuthFlowDiagram';
import { BuildPipelineDiagram as ClientBuildPipelineDiagram } from '@/components/mobile-ui/animations/BuildPipelineDiagram';
import { RenderingPipelineDiagram as ClientRenderingPipelineDiagram } from '@/components/mobile-ui/animations/RenderingPipelineDiagram';
import { PermissionFlowDiagram as ClientPermissionFlowDiagram } from '@/components/mobile-ui/animations/PermissionFlowDiagram';
import { InteractivePhoneMockup as ClientInteractivePhoneMockup } from '@/components/mobile-ui/InteractivePhoneMockup';
import ClientInterviewQuestion from '@/components/interactive/InterviewQuestion';
import ClientAccordion from '@/components/ui/Accordion';

export const mobileComponents = {
  MultiLangCodeBlock: (props) => <ClientMultiLangCodeBlock {...props} />,
  PhoneMockup: (props) => <ClientPhoneMockup {...props} />,
  AnimatedDiagram: (props) => <ClientAnimatedDiagram {...props} />,
  ConceptCard: (props) => <ClientConceptCard {...props} />,
  QuizWidget: (props) => <ClientQuizWidget {...props} />,
  Quiz: (props) => <ClientQuizWidget {...props} />,
  InterviewQuestion: (props) => <ClientInterviewQuestion {...props} />,
  Accordion: (props) => <ClientAccordion {...props} />,
  LifecycleTimeline: (props) => <ClientLifecycleTimeline {...props} />,
  NavigationStackVisualizer: (props) => <ClientNavigationStackVisualizer {...props} />,
  NetworkFlowDiagram: (props) => <ClientNetworkFlowDiagram {...props} />,
  StateFlowDiagram: (props) => <ClientStateFlowDiagram {...props} />,
  AuthFlowDiagram: (props) => <ClientAuthFlowDiagram {...props} />,
  BuildPipelineDiagram: (props) => <ClientBuildPipelineDiagram {...props} />,
  RenderingPipelineDiagram: (props) => <ClientRenderingPipelineDiagram {...props} />,
  PermissionFlowDiagram: (props) => <ClientPermissionFlowDiagram {...props} />,
  InteractivePhoneMockup: (props) => <ClientInteractivePhoneMockup {...props} />,
  h1: (props) => <h1 className="text-4xl font-extrabold mb-6 mt-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-orange-400" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mb-4 mt-10 border-b border-neutral-800 pb-2" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold mb-3 mt-8" {...props} />,
  p: (props) => <p className="mb-6 leading-relaxed text-neutral-300 text-lg" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-300 text-lg" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-neutral-300 text-lg" {...props} />,
  li: (props) => <li {...props} />,
  a: (props) => <a className="text-blue-400 hover:text-blue-300 underline underline-offset-4" {...props} />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  blockquote: (props) => <blockquote className="border-l-4 border-blue-500 pl-4 py-1 mb-6 italic text-neutral-400 bg-neutral-900/50 rounded-r-lg" {...props} />,
};
