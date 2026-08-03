export default function Loading() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)_240px] gap-10 max-w-[1400px] mx-auto px-6 sm:px-8 relative z-[1]">
      {/* Left Sidebar Skeleton */}
      <aside className="hidden xl:block pt-[96px] pb-32 h-[100vh] border-r border-white/10 pr-2">
        <div className="h-4 w-24 bg-white/5 rounded animate-pulse mb-8 ml-2"></div>
        {/* Phase Groups Skeletons */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="mb-6">
            <div className="h-10 w-full bg-white/5 rounded-lg animate-pulse mb-2"></div>
            <div className="pl-4 border-l border-white/10 ml-4 flex flex-col gap-2">
              <div className="h-6 w-3/4 bg-white/5 rounded animate-pulse"></div>
              <div className="h-6 w-5/6 bg-white/5 rounded animate-pulse"></div>
              <div className="h-6 w-2/3 bg-white/5 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </aside>

      {/* Main Content Skeleton */}
      <main className="min-w-0 global-page-pt pb-32">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-3 w-16 bg-white/10 rounded animate-pulse"></div>
          <span className="text-white/20">/</span>
          <div className="h-3 w-24 bg-primary/20 rounded animate-pulse"></div>
        </div>

        {/* Title and Description */}
        <div className="mb-12">
          <div className="h-12 w-3/4 bg-white/10 rounded-xl animate-pulse mb-6"></div>
          <div className="space-y-3">
            <div className="h-5 w-full bg-white/5 rounded animate-pulse"></div>
            <div className="h-5 w-5/6 bg-white/5 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Article Body Skeleton */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div>
            <div className="h-8 w-1/3 bg-white/10 rounded-lg animate-pulse mb-6"></div>
            <div className="space-y-3 mb-6">
              <div className="h-4 w-full bg-white/5 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-white/5 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-white/5 rounded animate-pulse"></div>
            </div>
            {/* Code Block Skeleton */}
            <div className="h-48 w-full bg-[#0d1117] border border-white/10 rounded-xl animate-pulse"></div>
          </div>

          {/* Section 2 */}
          <div className="pt-8">
            <div className="h-8 w-1/4 bg-white/10 rounded-lg animate-pulse mb-6"></div>
            <div className="h-32 w-full bg-white/5 rounded-xl animate-pulse mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-white/5 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar (TOC) Skeleton */}
      <aside className="hidden xl:block pt-[96px] pb-32 h-screen pl-6">
        <div className="h-4 w-24 bg-white/5 rounded animate-pulse mb-6"></div>
        <div className="space-y-4">
          <div className="h-3 w-3/4 bg-white/10 rounded animate-pulse"></div>
          <div className="h-3 w-full bg-white/5 rounded animate-pulse"></div>
          <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse"></div>
          <div className="h-3 w-1/2 bg-white/10 rounded animate-pulse pt-4"></div>
          <div className="h-3 w-4/5 bg-white/5 rounded animate-pulse"></div>
        </div>
        
        {/* Dynamic Loading Message */}
        <div className="mt-12 p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-primary uppercase tracking-widest animate-pulse">Loading Content...</span>
        </div>
      </aside>
    </div>
  );
}
