"use client";

import { useState } from "react";
import { FiLayout, FiArrowRight, FiArrowLeft, FiSave } from "react-icons/fi";
import { Toaster, toast } from "sonner";
import { ResumeData } from "@/types/resume";

import Screen1Content from "@/components/Screen1Content";
import Screen2AI from "@/components/Screen2AI";
import Screen3Templates from "@/components/Screen3Templates";
import Screen4Export from "@/components/Screen4Export";
import ResumePreview from "@/components/ResumePreview";
import Screen5Contact from "@/components/Screen5Contact";

const initialData: ResumeData = {
  personal: {
    name: "John Doe",
    title: "Senior Full-Stack Engineer",
    email: "johndoe.dev@example.com",
    phone: "+1 (555) 012-3456",
    location: "San Francisco, CA",
    github: "github.com/johndoe",
    portfolio: "johndoe.design",
    summary: "Strategic Full-Stack Developer with 8+ years of experience building high-scale web applications. Expert in React, Node.js, and cloud architecture with a focus on delivering SaaS products for 1M+ users.",
    image: "",
  },
  experience: [
    {
      title: "Senior Frontend Lead",
      company: "TechFlow Solutions",
      date: "01/2022-Present",
      location: "San Francisco, CA",
      tasks: "Architected a modular micro-frontend system using Next.js, reducing build times by 45%.\nLed a team of 12 developers to migrate a legacy PHP monolith to a modern React/TypeScript stack.\nImplemented a company-wide Design System standardizing UI across 4 product lines.",
    }
  ],
  projects: [
    { 
      title: "OpenSource CRM", 
      date: "2023", 
      url: "https://github.com/johndoe/crm-core", 
      tech: "Next.js 14, Prisma, PostgreSQL, Tailwind CSS" 
    }
  ],
  education: [
    { 
      degree: "MS in Software Engineering", 
      school: "Stanford University", 
      date: "2015-2017", 
      gpa: "3.85 GPA" 
    }
  ],
  skills: "TypeScript, React, Next.js, Node.js, PostgreSQL, AWS, Docker, Tailwind CSS, Jest",
  achievements: "Winner of Global FinTech Hackathon 2023\nSpeaker at React Conf 2022: 'Scaling Large Scale Monorepos'",
  languages: "English (Native), Spanish (Professional)",
  interests: "Open Source Contributing, High-Altitude Trekking, Chess",
};

export default function ResumeBuilder() {
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("resumeData");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error parsing saved resume data", e);
          return initialData;
        }
      }
    }
    return initialData;
  });

  const handleSave = () => {
    try {
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
      toast.success("Progress saved!", {
        description: "Your data is stored locally in your browser.",
        duration: 3000,
      });
    } catch (e) {
      toast.error("Save failed", {
        description: "There was an issue saving to local storage."
      });
    }
  };

  const [template, setTemplate] = useState("modern");
  const [themeColor, setThemeColor] = useState("teal");
  const [bgColor, setBgColor] = useState("slate");


  const nextStep = () => setStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  return (
    // Premium Ambient Background
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-emerald-200 overflow-hidden">
      <Toaster position="top-right" richColors closeButton />
      {/* Sharp Dark Gradient Layer */}
      <div 
        className="absolute inset-0 z-0 print:hidden"
        style={{
          background: `linear-gradient(135deg, #0f172a 0%, #111827 30%, #064e3b 100%)`
        }}
      />

      {/* Subtle Radial Overlay for "Sharp" Center Focus */}
      <div 
        className="absolute inset-0 z-0 opacity-40 print:hidden"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)`
        }}
      />

      {/* Floating Pill Navigation */}
      <div className="pt-4 px-6 print:hidden z-10 shrink-0">
        <nav className="bg-white border border-white/50 h-16 rounded-lg flex items-center justify-between px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="font-extrabold md:text-xl text-sm tracking-tight text-emerald-800 flex items-center md:gap-3 gap-2">
            <div className="p-2 bg-linear-to-tr from-emerald-500 to-teal-400 rounded-xl shadow-sm text-white">
              <FiLayout size={18} />
            </div>
            Genuine Resume Builder
          </div>
          
          {/* Modern Step Indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-500 ${
                  step === i ? "w-8 bg-emerald-500" : step > i ? "w-3 bg-emerald-200" : "w-3 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row  gap-4 p-6 md:pr-6 pr-5 pt-4 md:overflow-hidden overflow-y-scroll max-h-[calc(100vh-5rem)] print:max-h-none print:p-0 print:block z-10">
        
        {/* Left Side: Floating Glass Panel */}
        <div className="w-full md:w-105 flex flex-col min-h-[calc(100vh-9rem)] bg-white border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-lg py-6 px-4 md:px-6 print:hidden h-fit overflow-hidden transition-all">
          <div className="overflow-y-auto max-h-[calc(100vh-14rem)] pr-1">
            {step === 1 && <Screen1Content data={resumeData} initialData={initialData} setData={setResumeData} />}
            {step === 2 && <Screen2AI data={resumeData} setData={setResumeData} />}
            {step === 3 && <Screen3Templates template={template} setTemplate={setTemplate} themeColor={themeColor} setThemeColor={setThemeColor} bgColor={bgColor} setBgColor={setBgColor} />}
            {step === 4 && <Screen4Export />}
            {step === 5 && <Screen5Contact />}
          </div>
          <div className="pt-4 flex justify-between border-b border-slate-200/50 shrink-0">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-4 py-2.5 rounded-lg text-emerald-500 font-medium disabled:opacity-40 flex items-center gap-2 hover:bg-white/80 hover:text-emerald-800 transition-all duration-200 shadow-sm border border-transparent hover:border-white/50"
            >
              <FiArrowLeft size={18} /> Back
            </button>


            <button 
              onClick={handleSave}
              className="bg-white text-emerald-700 border border-emerald-200 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <FiSave size={16} /> Save Progress
            </button>

            <button
              onClick={nextStep}
              disabled={step === 5}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5"
            >
              Next <FiArrowRight size={18} />
            </button>
          </div>
          {/* Premium Bottom Navigation Controls */}
          
        </div>

        {/* Right Side: Clean Preview Canvas */}
        <div className="md:flex-1 min-h-[calc(100vh-7rem)] max-h-[calc(100vh-7rem)] print:max-h-none overflow-y-auto bg-slate-200 border-slate-200/50 rounded-lg py-6 flex justify-center items-start shadow-inner print:w-full print:p-0 print:bg-white print:border-none print:shadow-none print:block print:rounded-none print:min-h-none h-full">
          <div className="origin-top print:scale-100 w-full max-w-212.5 print:shadow-none transition-all duration-500">
            <ResumePreview data={resumeData} template={template} themeColor={themeColor} bgColor={bgColor} />
          </div>
        </div>
      </div>
    </div>
  );
}