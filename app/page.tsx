"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FiUnlock, 
  FiCheckCircle, 
  FiLayers, 
  FiFileText, 
  FiHeart 
} from "react-icons/fi";

export default function LandingPage() {
  const router = useRouter();
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = () => {
    setIsUnlocking(true);
    // Wait for the unlock animation to finish before routing
    router.push("/builder");
    
  };

  return (
    <>
      {/* Pure CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      {/* Main Container with Lock Screen Transition */}
      <div 
        className={`bg-slate-50 min-h-screen text-slate-100 font-sans selection:bg-emerald-500/30 transition-transform duration-800 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isUnlocking ? "-translate-y-full opacity-0" : "translate-y-0"
        }`}
      >
        {/* Background Gradient Layer matching Builder */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, #0f172a 0%, #111827 30%, #064e3b 100%)`
          }}
        />

        {/* Ambient Radial Overlay */}
        <div 
          className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.25) 0%, transparent 60%)`
          }}
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          
          {/* HERO SECTION - Completely visible on all screens without scroll */}
          <section className="flex-1 flex flex-col items-center justify-center px-6 min-h-screen pt-10 pb-20 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-8 animate-fade-in-up">
              <FiHeart className="text-emerald-400" />
              100% Free. No Paywalls.
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up delay-100 max-w-5xl">
              The <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200">Genuine</span> Resume Builder
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl animate-fade-in-up delay-200 font-light leading-relaxed">
              Tired of spending hours crafting the perfect resume, only to be hit with a surprise paywall to download? We are too. Experience a radically simple, truly free builder with multi-page support and striking templates.
            </p>

            <div className="animate-fade-in-up delay-300 relative group cursor-pointer" onClick={handleUnlock}>
              {/* Glow effect behind button */}
              <div className="absolute -inset-1 bg-linear-to-r from-emerald-600 to-teal-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              
              <button className="relative px-8 py-4 bg-slate-900 border border-white/10 hover:border-emerald-500/50 rounded-2xl text-lg font-semibold text-white flex items-center gap-3 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] group-hover:-translate-y-1 cursor-pointer">
                <FiUnlock className={`transition-all duration-500 ${isUnlocking ? "scale-125 text-emerald-400 rotate-12" : "text-slate-400"}`} size={22} />
                {isUnlocking ? "Unlocking Builder..." : "Unlock Builder"}
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 animate-fade-in delay-500 flex flex-col items-center gap-2 text-slate-500">
              <span className="text-xs uppercase tracking-widest">Discover More</span>
              <div className="w-px h-12 bg-linear-to-b from-slate-500 to-transparent"></div>
            </div>
          </section>

          {/* FEATURES SECTION - Distinct from Hero */}
          <section className="py-24 px-6 bg-slate-900/50 backdrop-blur-md border-y border-white/5 relative z-10">
            <div className="max-w-6xl mx-auto">
              
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why we built this.</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Finding a genuine free resume builder today is like finding a needle in a haystack. Most are traps. Even fewer support the essential features professionals actually need.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Feature 1 */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/60 transition duration-300 animate-fade-in-up delay-100">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/20">
                    <FiCheckCircle size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Genuinely Free</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    No &quot;premium only&quot;  export buttons, no hidden subscriptions, and no watermarks holding your career hostage. Just build, export, and apply.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/60 transition duration-300 animate-fade-in-up delay-200">
                  <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 text-teal-400 border border-teal-500/20">
                    <FiLayers size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Multi-Page Support</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Most free builders restrict you to a single page. If you have 10 years of experience or an academic CV, our smart layout engine smoothly spans multiple pages.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/60 transition duration-300 animate-fade-in-up delay-300">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/20">
                    <FiFileText size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Elegant Simplicity</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    We removed the clutter. Navigate a clean, exotic glassmorphic interface with multiple highly aesthetic templates that pass ATS tracking out of the box.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* BOTTOM CTA */}
          <section className="py-32 px-6 flex flex-col items-center justify-center text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 animate-fade-in-up">Ready to write your next chapter?</h2>
            <button 
              onClick={handleUnlock}
              className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-emerald-400 hover:text-slate-900 transition-colors duration-300 animate-fade-in-up delay-100 flex items-center gap-2 cursor-pointer"
            >
              Open Builder <FiUnlock />
            </button>
          </section>

        </div>
      </div>
    </>
  );
}