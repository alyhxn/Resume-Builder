"use client";

import React, { useState, useEffect } from "react";
import { 
  HiOutlineSparkles, 
  HiCheck, 
  HiArrowUturnLeft, 
  HiArrowsRightLeft,
  HiEye,
  HiInformationCircle
} from "react-icons/hi2";
import { ResumeData } from "@/types/resume";

const MAX_AI_USES = 2;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Screen2AI({ 
  data, 
  setData 
}: { 
  data: ResumeData, 
  setData: React.Dispatch<React.SetStateAction<ResumeData>> 
}) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  // Local Storage Usage Tracking
  const [usageCount, setUsageCount] = useState<number>(0);
  
  // Backup and View States
  const [originalBackup, setOriginalBackup] = useState<ResumeData | null>(null);
  const [aiData, setAiData] = useState<ResumeData | null>(null);
  const [isViewingAI, setIsViewingAI] = useState(false);

  // 1. On mount, check usage count and timestamp
  useEffect(() => {
    const storedData = localStorage.getItem("ai_resume_usage_data");
    
    if (storedData) {
      try {
        const { count, firstUsedAt } = JSON.parse(storedData);
        
        // Check if 24 hours have passed since their first use
        if (Date.now() - firstUsedAt > RESET_INTERVAL_MS) {
          // Timer expired: clear storage and keep count at 0
          localStorage.removeItem("ai_resume_usage_data");
          setUsageCount(0);
        } else {
          // Still within 24 hours: set the saved count
          setUsageCount(count);
        }
      } catch (error) {
        console.error("Failed to parse AI usage data", error);
        setUsageCount(0);
      }
    }
  }, []);

  const handleAIAssist = async () => {
    if (usageCount >= MAX_AI_USES) return;

    setIsEnhancing(true);
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        body: JSON.stringify({ resumeData: data }),
      });
      const result = await response.json();
      
      if (result.enhancedData) {
        // 2. Increment usage and handle timestamp
        const newCount = usageCount + 1;
        setUsageCount(newCount);
        
        // If it's their first use, log the current time. 
        // Otherwise, keep the existing timestamp so the 24h window stays accurate.
        const storedData = localStorage.getItem("ai_resume_usage_data");
        const firstUsedAt = storedData 
          ? JSON.parse(storedData).firstUsedAt 
          : Date.now();

        localStorage.setItem("ai_resume_usage_data", JSON.stringify({
          count: newCount,
          firstUsedAt: firstUsedAt
        }));

        // Save states for toggling
        setOriginalBackup(data);
        setAiData(result.enhancedData);
        setIsViewingAI(true);
        setData(result.enhancedData);
      }
    } catch (error) {
      console.error("AI Enhancement failed", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const toggleView = () => {
    if (isViewingAI && originalBackup) {
      setData(originalBackup);
      setIsViewingAI(false);
    } else if (!isViewingAI && aiData) {
      setData(aiData);
      setIsViewingAI(true);
    }
  };

  const applyChanges = () => {
    if (aiData) setData(aiData);
    clearPreviewState();
  };

  const discardChanges = () => {
    if (originalBackup) setData(originalBackup);
    clearPreviewState();
  };

  const clearPreviewState = () => {
    setOriginalBackup(null);
    setAiData(null);
    setIsViewingAI(false);
  };

  const isPreviewing = originalBackup !== null;
  const isLimitReached = usageCount >= MAX_AI_USES;
  const usesLeft = MAX_AI_USES - usageCount;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        2. AI Screening & Polish
      </h2>
      
      {!isPreviewing ? (
        <div className="border p-6 rounded-lg bg-white border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm text-gray-600">
              Let Gemini review your entire resume, improve the phrasing, and ensure professional formatting.
            </p>
            
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${
              isLimitReached ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
            }`}>
              {usesLeft} {usesLeft === 1 ? 'use' : 'uses'} left
            </span>
          </div>

          <button 
            onClick={handleAIAssist}
            disabled={isEnhancing || isLimitReached}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-emerald-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm font-medium"
          >
            <HiOutlineSparkles size={18} className={isEnhancing ? "animate-spin" : ""} />
            {isEnhancing ? "Gemini is rewriting..." : "Polish Entire Resume"}
          </button>

          {isLimitReached && (
            <p className="text-xs text-red-500 mt-3 flex items-center gap-1">
              <HiInformationCircle size={14} />
              You&apos;ve reached the limit for now. Please come back in 24 hours to use this feature again.
            </p>
          )}
        </div>
      ) : (
        <div className={`border-2 p-6 rounded-lg transition-colors duration-300 shadow-sm animate-in fade-in slide-in-from-top-4 ${
          isViewingAI 
            ? "border-emerald-400 bg-emerald-50" 
            : "border-amber-400 bg-amber-50"
        }`}>
          
          <div className="flex flex-col gap-2 justify-between items-start mb-4">
            <div>
              <h3 className={`font-bold flex items-center gap-2 ${isViewingAI ? "text-emerald-900" : "text-amber-900"}`}>
                {isViewingAI ? (
                  <><HiOutlineSparkles className="text-emerald-600" /> Viewing AI Improvements</>
                ) : (
                  <><HiEye className="text-amber-600" /> Viewing Original Resume</>
                )}
              </h3>
              <p className={`text-sm mt-1 ${isViewingAI ? "text-emerald-800" : "text-amber-800"}`}>
                Compare the versions. You can toggle between them as many times as you want.
              </p>
            </div>

            <button
              onClick={toggleView}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition ${
                isViewingAI 
                  ? "bg-emerald-200 text-emerald-900 hover:bg-emerald-300" 
                  : "bg-amber-200 text-amber-900 hover:bg-amber-300"
              }`}
            >
              <HiArrowsRightLeft size={18} />
              Switch to {isViewingAI ? "Original" : "AI"} Version
            </button>
          </div>
          
          <hr className={`my-4 ${isViewingAI ? "border-emerald-200" : "border-amber-200"}`} />
          
          <div className="flex flex-col gap-3 mt-4">
            <button 
              onClick={applyChanges}
              className="bg-emerald-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition font-medium shadow-sm w-fit"
            >
              <HiCheck size={18} /> Accept AI Version
            </button>
            <button 
              onClick={discardChanges}
              className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition font-medium shadow-sm w-fit"
            >
              <HiArrowUturnLeft size={18} /> Discard AI Version
            </button>
          </div>
        </div>
      )}
    </div>
  );
}