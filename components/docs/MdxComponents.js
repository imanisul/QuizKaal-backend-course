import { Code } from "lucide-react";

export const MdxComponents = {
  h1: (props) => <h1 className="text-4xl font-extrabold tracking-tight mb-6 mt-10 text-white" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold tracking-tight mb-4 mt-12 text-white border-b border-white/10 pb-2" {...props} />,
  h3: (props) => <h3 className="text-xl font-bold tracking-tight mb-3 mt-8 text-white" {...props} />,
  p: (props) => <p className="leading-relaxed text-textSecondary mb-6 text-[15px]" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 mb-6 text-textSecondary space-y-2 text-[15px]" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-6 text-textSecondary space-y-2 text-[15px]" {...props} />,
  li: (props) => <li {...props} />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  a: (props) => <a className="text-primary hover:underline font-medium" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-primary/50 pl-4 py-1 mb-6 bg-primary/5 rounded-r-lg italic text-textSecondary" {...props} />
  ),
  code: (props) => {
    // If it's a code block (handled by rehype-pretty-code), it comes as a figure/pre usually,
    // but inline code comes here.
    if (props.className?.includes('language-')) {
      return <code {...props} />;
    }
    return <code className="bg-white/10 text-white px-1.5 py-0.5 rounded-md text-sm font-mono border border-white/10" {...props} />;
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
