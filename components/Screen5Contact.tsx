"use client";

import { FiHeart, FiGithub, FiMail } from "react-icons/fi";

export default function Screen5Contact() {
  return (
    <div className="space-y-6 text-center pt-10 pb-8 px-4">
      {/* Decorative Icon */}
      <div className="flex justify-center mb-2 text-rose-500">
        <FiHeart className="text-4xl animate-pulse fill-rose-500" />
      </div>

      {/* Header & Validation */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">You&apos;re All Set!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        Building a resume takes real effort, but you crushed it. I built this tool to make the process a little less painful and a lot more beautiful. Good luck with your applications!
      </p>

      {/* GitHub Star Request Card */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 max-w-lg mx-auto shadow-sm mb-8 transition hover:shadow-md">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
          <FiGithub className="text-xl" /> Support the Project
        </h3>
        <p className="text-sm text-gray-600 mb-5">
          If this tool helped you stand out, land an interview, or just saved you some valuable time, I&apos;d be incredibly grateful if you gave the repository a star. It helps others find the project and keeps open-source developers like me motivated!
        </p>
        <a 
          href="https://github.com/alyhxn/resume-builder" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition transform hover:-translate-y-0.5 shadow"
        >
          <FiGithub /> Star on GitHub
        </a>
      </div>

      {/* Developer Contact Info */}
      <div className="pt-6 border-t border-gray-100 max-w-md mx-auto mt-8">
        <p className="text-gray-500 text-sm mb-4 font-medium">Have feedback or want to connect?</p>
        <div className="flex justify-center gap-6 text-gray-500">
          <a 
            href="mailto:hassanali8812@gmail.com" 
            className="hover:text-emerald-600 transition p-2 hover:bg-emerald-50 rounded-full" 
            aria-label="Email Me"
          >
            <FiMail className="text-2xl" />
          </a>
          <a 
            href="https://github.com/alyhxn" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-900 transition p-2 hover:bg-gray-100 rounded-full" 
            aria-label="My GitHub Profile"
          >
            <FiGithub className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
}