import { XCircle, CheckCircle, Star } from "lucide-react";

export default function PromptComparison({ bad, better, best }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
      
      {/* Bad Prompt */}
      {bad && (
        <div className="bg-error/5 border border-error/20 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-error/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <XCircle className="text-error w-6 h-6" />
            <h4 className="text-error font-bold uppercase tracking-wider text-sm">Bad Prompt</h4>
          </div>
          <div className="bg-black/40 rounded-xl p-4 border border-error/10 relative z-10">
            <p className="text-white/80 font-mono text-sm whitespace-pre-wrap">{bad.prompt}</p>
          </div>
          {bad.reason && (
            <p className="mt-4 text-sm text-error/80 relative z-10">{bad.reason}</p>
          )}
        </div>
      )}

      {/* Better Prompt */}
      {better && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <CheckCircle className="text-primary w-6 h-6" />
            <h4 className="text-primary font-bold uppercase tracking-wider text-sm">Better Prompt</h4>
          </div>
          <div className="bg-black/40 rounded-xl p-4 border border-primary/10 relative z-10">
            <p className="text-white/90 font-mono text-sm whitespace-pre-wrap">{better.prompt}</p>
          </div>
          {better.reason && (
            <p className="mt-4 text-sm text-primary/80 relative z-10">{better.reason}</p>
          )}
        </div>
      )}

      {/* Best Prompt */}
      {best && (
        <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Star className="text-accent w-6 h-6 fill-accent/20" />
            <h4 className="text-accent font-bold uppercase tracking-wider text-sm">Best Prompt</h4>
          </div>
          <div className="bg-black/40 rounded-xl p-4 border border-accent/10 relative z-10">
            <p className="text-white font-mono text-sm whitespace-pre-wrap leading-relaxed">{best.prompt}</p>
          </div>
          {best.reason && (
            <p className="mt-4 text-sm text-accent/80 font-semibold relative z-10">{best.reason}</p>
          )}
        </div>
      )}

    </div>
  );
}
