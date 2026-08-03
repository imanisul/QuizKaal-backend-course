import CICDContent from "./CICDContent";



export default function CICDPage() {
  return (
    <div className="flex bg-[#0a0c10] min-h-screen text-white font-ui selection:bg-primary/30">
      <div className="flex-1 w-[95%] max-w-[1800px] mx-auto min-h-screen relative border-x border-white/[0.02]">
        <main className="px-4 lg:px-8 xl:px-12 global-page-pt pb-32">
          <CICDContent />
        </main>
      </div>
    </div>
  );
}
