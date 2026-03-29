"use client";

import { useState } from "react";
import { FiLayout, FiChevronRight, FiChevronLeft } from "react-icons/fi";
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
  const [template, setTemplate] = useState("modern");
  const [themeColor, setThemeColor] = useState("teal");
  const [bgColor, setBgColor] = useState("slate");


  const nextStep = () => setStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-emerald-600 text-white h-16 flex items-center justify-between px-6 shadow-md print:hidden shrink-0">
        <div className="font-bold text-xl flex items-center gap-2">
          <FiLayout className="text-emerald-200" /> ResumeBuilder
        </div>
        <div className="text-sm font-medium">Step {step} of 4</div>
      </nav>

      <div className="flex-1 flex overflow-hidden print:overflow-visible">
        {/* Left Side: Hidden during print */}
        <div className="w-1/3 overflow-y-scroll border-r border-gray-200 bg-white p-8 print:hidden max-h-[calc(100vh-4rem)]">
          <div className="mb-8 flex justify-between border-b pb-4">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-4 py-2 border rounded text-gray-600 disabled:opacity-50 flex items-center gap-2 hover:bg-gray-50"
            >
              <FiChevronLeft size={16} /> Back
            </button>
            <button
              onClick={nextStep}
              disabled={step === 5}
              className="px-4 py-2 bg-emerald-600 text-white disabled:opacity-50 rounded hover:bg-emerald-700 flex items-center gap-2 transition"
            >
              Next <FiChevronRight size={16} />
            </button>
          </div>

          {step === 1 && <Screen1Content data={resumeData} setData={setResumeData} />}
          {step === 2 && <Screen2AI data={resumeData} setData={setResumeData} />}
          {step === 3 && <Screen3Templates template={template} setTemplate={setTemplate} themeColor={themeColor} setThemeColor={setThemeColor} bgColor={bgColor} setBgColor={setBgColor} />}
          {step === 4 && <Screen4Export />}
          {step === 5 && <Screen5Contact />}

          <div className="mt-8 flex justify-between border-t pt-4">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-4 py-2 border rounded text-gray-600 disabled:opacity-50 flex items-center gap-2 hover:bg-gray-50"
            >
              <FiChevronLeft size={16} /> Back
            </button>
            <button
              onClick={nextStep}
              disabled={step === 5}
              className="px-4 py-2 bg-emerald-600 text-white disabled:opacity-50 rounded hover:bg-emerald-700 flex items-center gap-2 transition"
            >
              Next <FiChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Side: Becomes full width and unscaled during print */}
        <div className="w-2/2 bg-gray-50 overflow-y-scroll p-8 flex justify-center print:w-full print:p-0 print:bg-white print:overflow-visible print:block max-h-[calc(100vh-4rem)]">
          {/* We remove the scale and padding bottom when printing so it matches the PDF perfectly */}
          <div className="origin-top pb-32 print:scale-100 print:pb-0">
            <ResumePreview data={resumeData} template={template} themeColor={themeColor} bgColor={bgColor} />
          </div>
        </div>
      </div>
    </div>
  );
}