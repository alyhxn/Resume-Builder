"use client";

import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiInfo } from "react-icons/fi";
import { BsFiletypeJson } from "react-icons/bs";
import { Experience, Education, Project, ResumeData } from "@/types/resume";

type ResumeArrayKeys = 'experience' | 'projects' | 'education';
type ResumeItem = Experience | Project | Education;

export default function Screen1Content({ data, setData }: { data: ResumeData, setData: React.Dispatch<React.SetStateAction<ResumeData>> }) {
  const [jsonInput, setJsonInput] = useState("");

  // 2. Sync jsonInput whenever data changes
  useEffect(() => {
    setJsonInput(JSON.stringify(data, null, 2));
  }, [data]);
  
  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setData(parsed);
      alert("Data imported successfully!");
    } catch (e) {
      alert("Invalid JSON format. Please check your structure." + e);
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

  const handleSave = () => {
    try {
      localStorage.setItem("resumeData", JSON.stringify(data));
      alert("Progress saved to your browser!");
    } catch (e) {
      alert("Failed to save data: " + e);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">1. Enter Content</h2>
        
        <div className="bg-emerald-50 p-4 border border-emerald-100 rounded-lg shadow-sm mb-6">
          <label className="flex items-center gap-2 text-sm font-bold text-emerald-800 mb-2">
            <BsFiletypeJson size={16} /> Quick Fill via JSON <FiInfo title="Copy this JSON into an AI, ask it to do the edits for you and paste it back!" size={14} className="text-emerald-600" />
          </label>
          <textarea 
            className="w-full text-xs font-mono p-2 border border-emerald-200 rounded h-24 mb-2 focus:ring-2 focus:ring-emerald-400 outline-none"
            placeholder='{"personal": {"name": "John Doe"...}}'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <div className="flex gap-2">
            <button 
              onClick={handleJsonImport}
              className="bg-emerald-700 text-white text-xs px-3 py-1.5 rounded hover:bg-emerald-800 transition"
            >
              Import JSON
            </button>
            <button 
              onClick={handleSave}
              className="bg-white text-emerald-700 border border-emerald-700 text-xs px-3 py-1.5 rounded hover:bg-emerald-50 transition flex items-center gap-1"
            >
              Save Progress
            </button>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Details</h3>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Profile Picture</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="w-full border p-2 rounded text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" value={data.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
          <input type="text" placeholder="Job Title" value={data.personal.title} onChange={(e) => updatePersonal('title', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
          <input type="email" placeholder="Email" value={data.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
          <input type="text" placeholder="Phone" value={data.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
          <input type="text" placeholder="Location" value={data.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
          <input type="text" placeholder="GitHub URL" value={data.personal.github} onChange={(e) => updatePersonal('github', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
          <input type="text" placeholder="Portfolio/Website" value={data.personal.portfolio} onChange={(e) => updatePersonal('portfolio', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm col-span-2" />
          <textarea placeholder="Professional Summary" rows={3} value={data.personal.summary} onChange={(e) => updatePersonal('summary', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 col-span-2 text-sm" />
        </div>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Work Experience</h3>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4 p-4 border rounded-lg bg-gray-50 relative group border-gray-200">
            <button onClick={() => removeItem('experience', i)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><FiTrash2 size={16} /></button>
            <div className="grid grid-cols-2 gap-3 pr-6">
              <input type="text" placeholder="Job Title" value={exp.title} onChange={(e) => updateArray('experience', i, 'title', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
              <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateArray('experience', i, 'company', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
              <input type="text" placeholder="Dates" value={exp.date} onChange={(e) => updateArray('experience', i, 'date', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
              <input type="text" placeholder="Location" value={exp.location} onChange={(e) => updateArray('experience', i, 'location', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
              <textarea placeholder="Tasks/Achievements (Newline separated)" rows={3} value={exp.tasks} onChange={(e) => updateArray('experience', i, 'tasks', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 col-span-2 text-sm mt-1" />
            </div>
          </div>
        ))}
        <button onClick={() => addItem('experience', { title: '', company: '', date: '', location: '', tasks: '' })} className="text-emerald-600 text-sm font-semibold flex items-center gap-1 hover:text-emerald-800">
          <FiPlus size={16} /> Add Experience
        </button>
      </section>

      {/* Projects */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Projects</h3>
        {data.projects.map((proj, i) => (
          <div key={i} className="mb-4 p-4 border rounded-lg bg-gray-50 relative group border-gray-200">
            <button onClick={() => removeItem('projects', i)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><FiTrash2 size={16} /></button>
            <div className="grid grid-cols-2 gap-3 pr-6">
              <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => updateArray('projects', i, 'title', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
              <input type="text" placeholder="Dates" value={proj.date} onChange={(e) => updateArray('projects', i, 'date', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
              <input type="text" placeholder="Project URL" value={proj.url} onChange={(e) => updateArray('projects', i, 'url', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm col-span-2" />
              <textarea placeholder="Main Tech (Comma separated)" rows={2} value={proj.tech} onChange={(e) => updateArray('projects', i, 'tech', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 col-span-2 text-sm mt-1" />
            </div>
          </div>
        ))}
        <button onClick={() => addItem('projects', { title: '', date: '', url: '', tech: '' })} className="text-emerald-600 text-sm font-semibold flex items-center gap-1 hover:text-emerald-800">
          <FiPlus size={16} /> Add Project
        </button>
      </section>

      {/* Education */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Education</h3>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-4 p-4 border rounded-lg bg-gray-50 relative group border-gray-200">
            <button onClick={() => removeItem('education', i)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><FiTrash2 size={16} /></button>
            <div className="grid grid-cols-2 gap-3 pr-6">
              <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateArray('education', i, 'degree', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
              <input type="text" placeholder="Institution" value={edu.school} onChange={(e) => updateArray('education', i, 'school', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
              <input type="text" placeholder="Dates" value={edu.date} onChange={(e) => updateArray('education', i, 'date', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
              <input type="text" placeholder="GPA / Grade" value={edu.gpa} onChange={(e) => updateArray('education', i, 'gpa', e.target.value)} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
            </div>
          </div>
        ))}
        <button onClick={() => addItem('education', { degree: '', school: '', date: '', gpa: '' })} className="text-emerald-600 text-sm font-semibold flex items-center gap-1 hover:text-emerald-800">
          <FiPlus size={16} /> Add Education
        </button>
      </section>

      {/* Skills & Extras */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills & Extras</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Skills (Comma separated)</label>
            <textarea value={data.skills} onChange={(e) => setData({ ...data, skills: e.target.value })} rows={2} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Achievements (Newline separated)</label>
            <textarea value={data.achievements} onChange={(e) => setData({ ...data, achievements: e.target.value })} rows={3} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Languages (Comma separated)</label>
              <textarea value={data.languages} onChange={(e) => setData({ ...data, languages: e.target.value })} rows={2} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Interests (Comma separated)</label>
              <textarea value={data.interests} onChange={(e) => setData({ ...data, interests: e.target.value })} rows={2} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-emerald-300 text-sm" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}