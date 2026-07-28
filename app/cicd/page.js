import CICDContent from "./CICDContent";

export const metadata = {
  title: "CI/CD Pipeline - QuizKaal Backend Engineering",
  description: "Learn how continuous integration and continuous deployment work in a real-world backend architecture.",
};

export default function CICDPage() {
  return (
    <div className="flex bg-[#050505] min-h-screen text-white font-ui selection:bg-primary/30">
      <div className="flex-1 lg:max-w-[1000px] mx-auto min-h-screen relative border-x border-white/[0.02]">
        <main className="px-6 md:px-12 xl:px-24 pb-32">
          <CICDContent />
        </main>
      </div>
    </div>
  );
}
