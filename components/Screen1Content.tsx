"use client";

import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiCpu } from "react-icons/fi";
import { BsFiletypeJson } from "react-icons/bs";
import { Experience, Education, Project, ResumeData } from "@/types/resume";
import { toast } from "sonner";

type ResumeArrayKeys = 'experience' | 'projects' | 'education';
type ResumeItem = Experience | Project | Education;

export default function Screen1Content({ data, initialData, setData }: { data: ResumeData, initialData: ResumeData, setData: React.Dispatch<React.SetStateAction<ResumeData>> }) {
  const [jsonInput, setJsonInput] = useState("");

  useEffect(() => {
    setJsonInput(JSON.stringify(data, null, 2));
  }, [data]);
  
  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setData(parsed);
      toast.success("Data imported successfully!")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      toast.error("Invalid JSON format. Please check your structure. ");
    }
  };

  const updatePersonal = (field: string, value: string) => {
    setData({ ...data, personal: { ...data.personal, [field]: value } });
  };

  const updateArray = (arrayName: ResumeArrayKeys, index: number, field: string, value: string) => {
    const newArray = [...data[arrayName as ResumeArrayKeys]];
    newArray[index][field as keyof ResumeItem] = value;
    setData({ ...data, [arrayName]: newArray });
  };

  const addItem = (arrayName: ResumeArrayKeys, emptyObj: ResumeItem) => {
    setData({ ...data, [arrayName]: [...data[arrayName], emptyObj] });
  };

  const removeItem = (arrayName: ResumeArrayKeys, index: number) => {
    const newArray = [...data[arrayName]];
    newArray.splice(index, 1);
    setData({ ...data, [arrayName]: newArray });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updatePersonal('image', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonInput);
    toast.success("JSON copied to clipboard!");
  };

  const handleReset = () => {
    setJsonInput(JSON.stringify(initialData, null, 2))
    toast.success("Reset to default!");
  }

  // Reusable input class for consistency
  const inputClass = "w-full bg-white/70 border border-slate-200/60 rounded-lg px-4 py-2.5 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 focus:bg-white transition-all text-sm placeholder:text-slate-400 shadow-sm";

  return (
    <div className="space-y-10 pb-10">
      
      {/* Header & JSON Import */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">1. Your Story</h2>
        </div>
        
        <div className="bg-linear-to-br from-emerald-50/80 to-teal-50/40 p-5 rounded-2xl border border-emerald-100 shadow-sm mb-2 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-emerald-500/10 pointer-events-none">
            <FiCpu size={120} />
          </div>
          
          <label className="flex items-center gap-2 font-bold text-emerald-800 mb-2 relative z-10">
            <BsFiletypeJson size={18} className="text-emerald-600" /> Quick Fill
          </label>
          <p className="text-sm text-emerald-700/80 mb-4 relative z-10 font-medium">
            Want to skip manual typing? Copy below code and ask an AI to populate the fields using your existing documents and paste it back!
          </p>
          <textarea 
            className="w-full text-xs font-mono p-3 border border-emerald-200/60 rounded-lg h-28 mb-4 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none bg-white/80 shadow-inner custom-scrollbar relative z-10"
            placeholder='{"personal": {"name": "John Doe"...}}'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <div className="flex gap-3 relative z-10">
            <button 
              onClick={handleCopy}
              className="bg-white text-emerald-700 border border-emerald-200 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-sm"
            >
              Copy
            </button>
            <button 
              onClick={handleJsonImport}
              className="bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
            >
              Apply
            </button>
            <button 
              onClick={handleReset}
              className="bg-white text-emerald-700 border border-emerald-200 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <section>
        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">Personal Details</h3>

        <div className="mb-5 bg-white/40 p-5 border border-emerald-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] backdrop-blur-md">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Profile Picture</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 cursor-pointer outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" value={data.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} className={inputClass} />
          <input type="text" placeholder="Job Title" value={data.personal.title} onChange={(e) => updatePersonal('title', e.target.value)} className={inputClass} />
          <input type="email" placeholder="Email" value={data.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} className={inputClass} />
          <input type="text" placeholder="Phone" value={data.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} className={inputClass} />
          <input type="text" placeholder="Location" value={data.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} className={inputClass} />
          <input type="text" placeholder="GitHub URL" value={data.personal.github} onChange={(e) => updatePersonal('github', e.target.value)} className={inputClass} />
          <input type="text" placeholder="Portfolio/Website" value={data.personal.portfolio} onChange={(e) => updatePersonal('portfolio', e.target.value)} className={`${inputClass} col-span-2`} />
          <textarea placeholder="Professional Summary" rows={3} value={data.personal.summary} onChange={(e) => updatePersonal('summary', e.target.value)} className={`${inputClass} col-span-2 resize-none`} />
        </div>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-lg font-bold text-slate-700 mb-4">Work Experience</h3>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-5 p-5 border border-emerald-100 rounded-2xl bg-white/40 backdrop-blur-sm relative group shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_4px_25px_rgb(0,0,0,0.05)] hover:bg-white/60">
            <div className="flex gap-4 items-center">
              <div className="bg-emerald-300 h-1.5 w-full rounded-lg"></div>
              <button onClick={() => removeItem('experience', i)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 opacity-60 hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all">
                <FiTrash2 size={14} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => updateArray('experience', i, 'title', e.target.value)} className={inputClass} />
              <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateArray('experience', i, 'company', e.target.value)} className={inputClass} />
              <input type="text" placeholder="Dates (e.g. 2020 - Present)" value={exp.date} onChange={(e) => updateArray('experience', i, 'date', e.target.value)} className={inputClass} />
              <input type="text" placeholder="Location" value={exp.location} onChange={(e) => updateArray('experience', i, 'location', e.target.value)} className={inputClass} />
              <textarea placeholder="Tasks/Achievements (Newline separated)" rows={3} value={exp.tasks} onChange={(e) => updateArray('experience', i, 'tasks', e.target.value)} className={`${inputClass} col-span-2 resize-none`} />
            </div>
          </div>
        ))}
        <button onClick={() => addItem('experience', { title: '', company: '', date: '', location: '', tasks: '' })} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-emerald-600 text-sm font-bold hover:bg-emerald-50 transition-all">
          <FiPlus size={18} /> Add Experience
        </button>
      </section>

      {/* Projects */}
      <section>
        <h3 className="text-lg font-bold text-slate-700 mb-4">Projects</h3>
        {data.projects.map((proj, i) => (
          <div key={i} className="mb-5 p-5 border border-emerald-100 rounded-2xl bg-white/40 backdrop-blur-sm relative group shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_4px_25px_rgb(0,0,0,0.05)] hover:bg-white/60">
            <div className="flex gap-4 items-center">
              <div className="bg-emerald-300 h-1.5 w-full rounded-lg"></div>
              <button onClick={() => removeItem('projects', i)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 opacity-60 hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all">
                <FiTrash2 size={14} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => updateArray('projects', i, 'title', e.target.value)} className={inputClass} />
              <input type="text" placeholder="Dates" value={proj.date} onChange={(e) => updateArray('projects', i, 'date', e.target.value)} className={inputClass} />
              <input type="text" placeholder="Project URL" value={proj.url} onChange={(e) => updateArray('projects', i, 'url', e.target.value)} className={`${inputClass} col-span-2`} />
              <textarea placeholder="Main Tech (Comma separated)" rows={2} value={proj.tech} onChange={(e) => updateArray('projects', i, 'tech', e.target.value)} className={`${inputClass} col-span-2 resize-none`} />
            </div>
          </div>
        ))}
        <button onClick={() => addItem('projects', { title: '', date: '', url: '', tech: '' })} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-emerald-600 text-sm font-bold hover:bg-emerald-50 transition-all">
          <FiPlus size={18} /> Add Project
        </button>
      </section>

      {/* Education */}
      <section>
        <h3 className="text-lg font-bold text-slate-700 mb-4">Education</h3>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-5 p-5 border border-emerald-100 rounded-2xl bg-white/40 backdrop-blur-sm relative group shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_4px_25px_rgb(0,0,0,0.05)] hover:bg-white/60">
            <div className="flex gap-4 items-center">
              <div className="bg-emerald-300 h-1.5 w-full rounded-lg"></div>
              <button onClick={() => removeItem('education', i)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 opacity-60 hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all">
                <FiTrash2 size={14} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateArray('education', i, 'degree', e.target.value)} className={inputClass} />
              <input type="text" placeholder="Institution" value={edu.school} onChange={(e) => updateArray('education', i, 'school', e.target.value)} className={inputClass} />
              <input type="text" placeholder="Dates" value={edu.date} onChange={(e) => updateArray('education', i, 'date', e.target.value)} className={inputClass} />
              <input type="text" placeholder="GPA / Grade" value={edu.gpa} onChange={(e) => updateArray('education', i, 'gpa', e.target.value)} className={inputClass} />
            </div>
          </div>
        ))}
        <button onClick={() => addItem('education', { degree: '', school: '', date: '', gpa: '' })} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-emerald-600 text-sm font-bold hover:bg-emerald-50 transition-all">
          <FiPlus size={18} /> Add Education
        </button>
      </section>

      {/* Skills & Extras */}
      <section>
        <h3 className="text-lg font-bold text-slate-700 mb-4">Skills & Extras</h3>
        <div className="space-y-5 bg-white/40 p-5 border border-emerald-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] backdrop-blur-md">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Skills (Comma separated)</label>
            <textarea value={data.skills} onChange={(e) => setData({ ...data, skills: e.target.value })} rows={2} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Achievements (Newline separated)</label>
            <textarea value={data.achievements} onChange={(e) => setData({ ...data, achievements: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Languages</label>
              <textarea value={data.languages} onChange={(e) => setData({ ...data, languages: e.target.value })} rows={2} className={`${inputClass} resize-none`} placeholder="e.g. English, Spanish" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Interests</label>
              <textarea value={data.interests} onChange={(e) => setData({ ...data, interests: e.target.value })} rows={2} className={`${inputClass} resize-none`} placeholder="e.g. Hiking, Chess" />
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}