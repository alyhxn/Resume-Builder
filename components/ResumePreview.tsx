"use client";

import { useEffect, useRef, useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiGlobe, FiBriefcase, FiLink } from "react-icons/fi";
import { LuComponent } from "react-icons/lu";
import { ResumeData } from "@/types/resume";
import Image from "next/image";

interface ThemeColors {
  textMain: string;
  textLight: string;
  border: string;
  icon: string;
}

export default function ResumePreview({ data, template, themeColor, bgColor }: { data: ResumeData, template: string, themeColor: string, bgColor: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [breakLines, setBreakLines] = useState<number[]>([]);

  // --- PAGE BREAK LOGIC ---
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // 1122px is exactly 297mm (A4 height) at 96 DPI used by browser print engines
      const A4_HEIGHT = 1100; 
      const PAGE_PADDING = 40; 

      const items = containerRef.current.querySelectorAll('.section-item') as NodeListOf<HTMLElement>;
      items.forEach(item => {
        item.style.paddingTop = '0px'; // Reset padding on recalculation
      });

      ['preview-left-col', 'preview-right-col', 'minimal-col'].forEach(colId => {
        const column = containerRef.current!.querySelector(`#${colId}`);
        if (!column) return;
        
        const colItems = column.querySelectorAll('.section-item') as NodeListOf<HTMLElement>;
        colItems.forEach(item => {
          const itemTop = item.offsetTop;
          const itemBottom = itemTop + item.offsetHeight;
          const currentPage = Math.ceil((itemTop + 1) / (A4_HEIGHT + PAGE_PADDING));

          if (itemBottom > currentPage * A4_HEIGHT) {
            item.style.paddingTop = `${PAGE_PADDING}px`;
          }
        });
      });

      const totalHeight = containerRef.current.offsetHeight;
      const numBreaks = Math.floor((totalHeight - 1) / A4_HEIGHT);
      const breaks = [];
      for (let i = 1; i <= numBreaks; i++) {
        breaks.push(i * A4_HEIGHT);
      }
      setBreakLines(breaks);

    }, 150);

    return () => clearTimeout(timer);
  }, [data, template]);

  // --- THEME MAPPING ---
  // Tailwind needs full class names, so we map the selected color to the actual classes
  const themeMap: Record<string, ThemeColors> = {
    teal: { textMain: 'text-teal-600', textLight: 'text-teal-400', border: 'border-teal-500', icon: 'text-teal-500' },
    blue: { textMain: 'text-blue-600', textLight: 'text-blue-400', border: 'border-blue-500', icon: 'text-blue-500' },
    indigo: { textMain: 'text-indigo-600', textLight: 'text-indigo-400', border: 'border-indigo-500', icon: 'text-indigo-500' },
    rose: { textMain: 'text-rose-600', textLight: 'text-rose-400', border: 'border-rose-500', icon: 'text-rose-500' },
    amber: { textMain: 'text-amber-600', textLight: 'text-amber-400', border: 'border-amber-500', icon: 'text-amber-500' },
    slate: { textMain: 'text-slate-600', textLight: 'text-slate-400', border: 'border-slate-500', icon: 'text-slate-500' },
  };
  const theme = themeMap[themeColor] || themeMap.teal;

  const bgMap: Record<string, string> = {
    slate: 'bg-slate-800',
    teal: 'bg-teal-800',
    blue: 'bg-blue-800',
    indigo: 'bg-indigo-800',
    rose: 'bg-rose-800',
    amber: 'bg-amber-800',
  }
  const bg = bgMap[bgColor] || bgMap.slate;
  // --- HELPER ARRAYS ---
  const skillArray = data.skills?.split(',').map(s => s.trim()).filter(s => s) || [];
  const langArray = data.languages?.split(',').map(s => s.trim()).filter(s => s) || [];
  const interestsArray = data.interests?.split(',').map(s => s.trim()).filter(s => s) || [];
  const achieveArray = data.achievements?.split('\n').map(s => s.trim()).filter(s => s) || [];

  // ==========================================
  // MODERN SPLIT TEMPLATE
  // ==========================================
  if (template === "modern") {
    return (
      <div 
        ref={containerRef} 
        id="resume-document" 
        className="resume-page flex flex-row overflow-hidden text-gray-800 relative"
      >
        {/* Render Page Break Indicators */}
        {breakLines.map((yPos, i) => (
          <div 
            key={i} 
            className="absolute left-0 right-0 h-0 border-t-2 border-dashed border-red-500 opacity-60 z-50 pointer-events-none print:hidden" 
            style={{ top: `${yPos}px` }}
          >
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full absolute right-4 -top-2.5 font-bold shadow tracking-wider uppercase">
                Page {i + 2}
            </span>
          </div>
        ))}

        {/* === LEFT COLUMN === */}
        <div id="preview-left-col" className={`w-[32%] text-white p-8 block ${bg}`}>
          
          {data.personal.image && (
          <div className="section-item mt-4 mb-8">
            <div className={`w-32 h-32 rounded-full border-4 ${theme.border} overflow-hidden mx-auto bg-slate-700 flex items-center justify-center text-5xl text-slate-400`}>
              <Image src={data.personal.image} alt="Profile" width={200} height={200} className="w-full h-full object-cover" />
            </div>
          </div>
          )}

          <div className="section-item mb-8">
            <h3 className={`text-[13px] font-bold tracking-widest uppercase border-b border-slate-600 pb-1 mb-3 ${theme.textLight}`}>Contact</h3>
            <div className="flex flex-col gap-2 text-[11px]">
              {data.personal.email && <div className="flex items-center gap-3"><FiMail size={14} className={`${theme.icon} shrink-0`} /> <span className="break-all">{data.personal.email}</span></div>}
              {data.personal.phone && <div className="flex items-center gap-3"><FiPhone size={14} className={`${theme.icon} shrink-0`} /> <span>{data.personal.phone}</span></div>}
              {data.personal.location && <div className="flex items-center gap-3"><FiMapPin size={14} className={`${theme.icon} shrink-0`} /> <span>{data.personal.location}</span></div>}
              {data.personal.github && <div className="flex items-center gap-3"><FiGithub size={14} className={`${theme.icon} shrink-0`} /> <span className="break-all">{data.personal.github}</span></div>}
              {data.personal.portfolio && <div className="flex items-center gap-3"><FiGlobe size={14} className={`${theme.icon} shrink-0`} /> <span className="break-all">{data.personal.portfolio}</span></div>}
            </div>
          </div>

          {data.education.length > 0 && (
            <div className="section-item mb-8">
              <h3 className={`text-[13px] font-bold tracking-widest uppercase border-b border-slate-600 pb-1 mb-4 ${theme.textLight}`}>Education</h3>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h4 className="font-bold text-[12px] text-slate-100">{edu.degree}</h4>
                  <div className={`text-[11px] mb-1 ${theme.textLight}`}>{edu.date}</div>
                  <div className="text-[11px] text-slate-300 font-medium">{edu.school}</div>
                  {edu.gpa && <div className="text-[11px] text-slate-400 italic">{edu.gpa}</div>}
                </div>
              ))}
            </div>
          )}

          {skillArray.length > 0 && (
            <div className="section-item mb-8">
              <h3 className={`text-[13px] font-bold tracking-widest uppercase border-b border-slate-600 pb-1 mb-3 ${theme.textLight}`}>Skills</h3>
              <div className="flex flex-wrap gap-1">
                {skillArray.map((skill, i) => (
                  <span key={i} className="bg-[#334155] text-slate-100 px-2 py-1 rounded text-[11px] border border-slate-600">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {achieveArray.length > 0 && (
            <div className="section-item mb-8">
              <h3 className={`text-[13px] font-bold tracking-widest uppercase border-b border-slate-600 pb-1 mb-3 ${theme.textLight}`}>Achievements</h3>
              <ul className="list-disc pl-4 text-[11px] text-slate-200 leading-relaxed">
                {achieveArray.map((achieve, i) => <li key={i} className="mb-1">{achieve}</li>)}
              </ul>
            </div>
          )}

          {langArray.length > 0 && (
            <div className="section-item mb-8">
              <h3 className={`text-[13px] font-bold tracking-widest uppercase border-b border-slate-600 pb-1 mb-3 ${theme.textLight}`}>Languages</h3>
              <ul className="list-none text-[11px]">
                {langArray.map((lang, i) => <li key={i} className="mb-1">{lang}</li>)}
              </ul>
            </div>
          )}

          {interestsArray.length > 0 && (
            <div className="section-item mb-8">
              <h3 className={`text-[13px] font-bold tracking-widest uppercase border-b border-slate-600 pb-1 mb-3 ${theme.textLight}`}>Interests</h3>
              <ul className="list-none text-[11px]">
                {interestsArray.map((int, i) => <li key={i} className="mb-1">{int}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* === RIGHT COLUMN === */}
        <div id="preview-right-col" className="w-[68%] p-8 pt-10 block">
          {/* Header & Title */}
          <div className="mb-6 section-item">
            <h1 className="text-4xl font-extrabold uppercase tracking-tight text-gray-900 leading-none">{data.personal.name || "Your Name"}</h1>
            <h2 className={`text-lg font-semibold mt-2 ${theme.textMain}`}>{data.personal.title || "Your Title"}</h2>
          </div>

          {data.personal.summary && (
            <div className="section-item mb-6">
              <p className="text-xs text-gray-700 leading-relaxed text-justify">{data.personal.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {data.experience.length > 0 && (
            <>
              {data.experience.map((exp, i) => (
                <div key={i} className={`section-item ${i === data.experience.length - 1 ? 'mb-6' : 'mb-4'}`}>
                  {i === 0 && (
                    <h3 className="mb-4 text-[16px] font-bold uppercase tracking-wider text-gray-800 border-b-2 border-gray-200 pb-1 flex items-center gap-2">
                      <FiBriefcase size={16} className={theme.icon} /> Work Experience
                    </h3>
                  )}
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-[14px] text-gray-800">{exp.title}</h4>
                    <span className={`text-xs font-semibold ${theme.textMain}`}>{exp.date}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-semibold text-gray-600">{exp.company}</span>
                    <span className="text-xs text-gray-500 italic">{exp.location}</span>
                  </div>
                  {exp.tasks && (
                    <ul className="list-disc pl-4 text-xs text-gray-700 leading-relaxed">
                      {exp.tasks.split('\n').filter(t => t.trim() !== '').map((task, idx) => (
                        <li key={idx} className="mb-1">{task}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <>
              {data.projects.map((proj, i) => (
                <div key={i} className={`section-item ${i === data.projects.length - 1 ? 'mb-6' : 'mb-4'}`}>
                  {i === 0 && (
                    <h3 className="mb-4 text-[16px] font-bold uppercase tracking-wider text-gray-800 border-b-2 border-gray-200 pb-1 flex items-center gap-2">
                      <LuComponent size={16} className={theme.icon} /> Projects
                    </h3>
                  )}
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-[14px] text-gray-800">{proj.title}</h4>
                    {proj.date && <span className={`text-xs font-semibold whitespace-nowrap ml-2 ${theme.textMain}`}>{proj.date}</span>}
                  </div>
                  {proj.url && (
                    <div className="text-[11px] text-blue-600 mb-2 truncate flex items-center gap-1">
                      <FiLink size={10} />
                      <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" className="hover:underline">
                        {proj.url}
                      </a>
                    </div>
                  )}
                  {proj.tech && (
                    <div className="mt-1 flex flex-wrap gap-y-1 items-center">
                      {proj.tech.split(',').filter(t => t.trim() !== '').map((t, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px] mr-1 border border-gray-200">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
  // ==========================================
  // PROFESSIONAL TEMPLATE (Traditional & Clean)
  // ==========================================
  if (template === "professional") {
    return (
      <div 
        ref={containerRef} 
        id="resume-document" 
        className="resume-page flex flex-col p-10 bg-white text-gray-800 relative"
      >
        {/* Render Page Break Indicators */}
        {breakLines.map((yPos, i) => (
          <div 
            key={i} 
            className="absolute left-0 right-0 h-0 border-t-2 border-dashed border-red-500 opacity-60 z-50 pointer-events-none print:hidden" 
            style={{ top: `${yPos}px` }}
          >
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full absolute right-4 -top-2.5 font-bold shadow tracking-wider uppercase">
                Page {i + 2}
            </span>
          </div>
        ))}

        <div id="minimal-col" className="block">
          
          {/* Header */}
          <div className="section-item mb-6 border-b-[3px] border-gray-800 pb-4 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">{data.personal.name || "Your Name"}</h1>
            <h2 className={`text-md font-medium mt-1 uppercase tracking-widest ${theme.textMain}`}>{data.personal.title || "Professional Title"}</h2>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-[11px] text-gray-600 font-medium">
              {data.personal.email && <div className="flex items-center gap-1"><FiMail size={12} className={theme.icon} /> {data.personal.email}</div>}
              {data.personal.phone && <div className="flex items-center gap-1"><FiPhone size={12} className={theme.icon} /> {data.personal.phone}</div>}
              {data.personal.location && <div className="flex items-center gap-1"><FiMapPin size={12} className={theme.icon} /> {data.personal.location}</div>}
              {data.personal.portfolio && <div className="flex items-center gap-1"><FiGlobe size={12} className={theme.icon} /> {data.personal.portfolio}</div>}
              {data.personal.github && <div className="flex items-center gap-1"><FiGithub size={12} className={theme.icon} /> {data.personal.github}</div>}
            </div>
          </div>

          {/* Summary */}
          {data.personal.summary && (
            <div className="section-item mb-6">
              <p className="text-xs text-gray-700 leading-relaxed text-justify">{data.personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <>
              {data.experience.map((exp, i) => (
                <div key={i} className={`section-item ${i === data.experience.length - 1 ? 'mb-6' : 'mb-4'}`}>
                  {i === 0 && (
                    <h3 className={`mb-4 text-[14px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 ${theme.textMain}`}>Professional Experience</h3>
                  )}
                  <div className="flex justify-between items-end mb-1">
                    <h4 className="font-bold text-[13px] text-gray-800">{exp.title}</h4>
                    <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{exp.date}</span>
                  </div>
                  <div className="text-[12px] font-semibold text-gray-700 mb-2 italic">
                    {exp.company} {exp.location && <span className="text-gray-500 font-normal">| {exp.location}</span>}
                  </div>
                  {exp.tasks && (
                    <ul className="list-disc pl-5 text-[11px] text-gray-700 leading-relaxed">
                      {exp.tasks.split('\n').filter(t => t.trim() !== '').map((task, idx) => (
                        <li key={idx} className="mb-1">{task}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <>
              {data.projects.map((proj, i) => (
                <div key={i} className={`section-item ${i === data.projects.length - 1 ? 'mb-6' : 'mb-3'}`}>
                  {i === 0 && (
                    <h3 className={`mb-3 text-[14px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 ${theme.textMain}`}>Key Projects</h3>
                  )}
                  <div className="flex justify-between items-end mb-1">
                    <h4 className="font-bold text-[13px] text-gray-800">
                      {proj.title} 
                      {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" className={`font-normal text-[10px] ml-2 ${theme.textMain} hover:underline`}><FiLink size={10} className="inline mr-1" />{proj.url}</a>}
                    </h4>
                    {proj.date && <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{proj.date}</span>}
                  </div>
                  {proj.tech && <div className="text-[11px] text-gray-600 mb-1 font-medium">Technologies: {proj.tech}</div>}
                </div>
              ))}
            </>
          )}

          {/* Bottom Grid: Education & Skills */}
          <div className="grid grid-cols-2 gap-8 section-item">
            {data.education.length > 0 && (
              <div>
                <h3 className={`text-[14px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3 ${theme.textMain}`}>Education</h3>
                {data.education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <h4 className="font-bold text-[12px] text-gray-800">{edu.degree}</h4>
                    <div className="text-[11px] text-gray-700 font-medium">{edu.school}</div>
                    <div className="text-[11px] text-gray-500">{edu.date} {edu.gpa && `| ${edu.gpa}`}</div>
                  </div>
                ))}
              </div>
            )}
            
            {skillArray.length > 0 && (
              <div>
                <h3 className={`text-[14px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3 ${theme.textMain}`}>Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skillArray.map((skill, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-sm text-[11px] border border-gray-200 font-medium">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // CREATIVE TEMPLATE (Right Sidebar)
  // ==========================================
  if (template === "creative") {
    return (
      <div 
        ref={containerRef} 
        id="resume-document" 
        className="resume-page flex flex-row overflow-hidden text-gray-800 relative bg-gray-50"
      >
        {/* Render Page Break Indicators */}
        {breakLines.map((yPos, i) => (
          <div 
            key={i} 
            className="absolute left-0 right-0 h-0 border-t-2 border-dashed border-red-500 opacity-60 z-50 pointer-events-none print:hidden" 
            style={{ top: `${yPos}px` }}
          >
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full absolute right-4 -top-2.5 font-bold shadow tracking-wider uppercase">
                Page {i + 2}
            </span>
          </div>
        ))}

        {/* === LEFT COLUMN (Main Content) === */}
        <div id="preview-left-col" className="w-[65%] p-8 pt-10 block bg-white border-r border-gray-200">
          
          <div className="mb-8 section-item">
            <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 leading-none">{data.personal.name || "Your Name"}</h1>
            <h2 className={`text-xl font-bold mt-2 uppercase tracking-widest ${theme.textMain}`}>{data.personal.title || "Your Title"}</h2>
          </div>

          {data.personal.summary && (
            <div className="section-item mb-8">
              <h3 className="text-[15px] font-extrabold uppercase tracking-widest text-gray-800 mb-3 flex items-center gap-2">
                 Profile
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">{data.personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <>
              {data.experience.map((exp, i) => (
                <div key={i} className={`section-item relative pl-4 border-l-2 border-gray-200 ${i === data.experience.length - 1 ? 'mb-8' : 'mb-5'}`}>
                  {i === 0 && (
                    <h3 className="mb-4 text-[15px] font-extrabold uppercase tracking-widest text-gray-800 flex items-center gap-2">Experience</h3>
                  )}
                  <div className={`absolute -left-1.25 top-1.5 w-2 h-2 rounded-full ${bg}`}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-[14px] text-gray-900">{exp.title}</h4>
                  </div>
                  <div className={`text-[11px] font-bold mb-2 ${theme.textMain}`}>
                    {exp.company} <span className="text-gray-400 font-normal px-1">|</span> {exp.date}
                  </div>
                  {exp.tasks && (
                    <ul className="list-disc pl-4 text-xs text-gray-600 leading-relaxed">
                      {exp.tasks.split('\n').filter(t => t.trim() !== '').map((task, idx) => (
                        <li key={idx} className="mb-1">{task}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <>
              {data.projects.map((proj, i) => (
                <div key={i} className={`section-item ${i === data.projects.length - 1 ? 'mb-8' : 'mb-4'}`}>
                  {i === 0 && (
                    <h3 className="mb-4 text-[15px] font-extrabold uppercase tracking-widest text-gray-800 flex items-center gap-2">Projects</h3>
                  )}
                  <h4 className="font-bold text-[13px] text-gray-900">{proj.title}</h4>
                  <div className="text-[11px] text-gray-500 mb-1">{proj.date}</div>
                  {proj.tech && <div className="text-[11px] font-medium text-gray-700 mb-1">{proj.tech}</div>}
                </div>
              ))}
            </>
          )}
        </div>

        {/* === RIGHT COLUMN (Sidebar) === */}
        <div id="preview-right-col" className={`w-[35%] text-white p-8 block ${bg}`}>
          
          {data.personal.image && (
            <div className="section-item mb-8 flex justify-center">
              <Image src={data.personal.image} alt="Profile" width={150} height={150} className={`w-32 h-32 rounded-xl border-4 ${theme.border} object-cover shadow-lg transform rotate-2`} />
            </div>
          )}

          <div className="section-item mb-8 bg-black/10 p-4 rounded-xl">
            <h3 className="text-[12px] font-bold tracking-widest uppercase mb-4 text-white">Contact</h3>
            <div className="flex flex-col gap-3 text-[11px] font-medium text-white/90">
              {data.personal.email && <div className="flex items-center gap-3"><FiMail size={16} className={theme.textLight} /> <span className="break-all">{data.personal.email}</span></div>}
              {data.personal.phone && <div className="flex items-center gap-3"><FiPhone size={16} className={theme.textLight} /> <span>{data.personal.phone}</span></div>}
              {data.personal.location && <div className="flex items-center gap-3"><FiMapPin size={16} className={theme.textLight} /> <span>{data.personal.location}</span></div>}
              {data.personal.portfolio && <div className="flex items-center gap-3"><FiGlobe size={16} className={theme.textLight} /> <span className="break-all">{data.personal.portfolio}</span></div>}
              {data.personal.github && <div className="flex items-center gap-3"><FiGithub size={16} className={theme.textLight} /> <span className="break-all">{data.personal.github}</span></div>}
            </div>
          </div>

          {skillArray.length > 0 && (
            <div className="section-item mb-8">
              <h3 className="text-[12px] font-bold tracking-widest uppercase mb-4 text-white">Expertise</h3>
              <div className="flex flex-col gap-2">
                {skillArray.map((skill, i) => (
                  <div key={i} className="w-full bg-black/20 rounded-full h-6 flex items-center px-3">
                    <span className="text-[11px] font-semibold">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div className="section-item mb-8">
              <h3 className="text-[12px] font-bold tracking-widest uppercase mb-4 text-white">Education</h3>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h4 className="font-bold text-[12px] leading-tight text-white mb-1">{edu.degree}</h4>
                  <div className={`text-[11px] font-semibold mb-1 ${theme.textLight}`}>{edu.school}</div>
                  <div className="text-[10px] text-white/60">{edu.date}</div>
                </div>
              ))}
            </div>
          )}

          {langArray.length > 0 && (
            <div className="section-item mb-8">
              <h3 className="text-[12px] font-bold tracking-widest uppercase mb-3 text-white">Languages</h3>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {langArray.map((lang, i) => <span key={i} className="bg-white/10 px-2 py-1 rounded">{lang}</span>)}
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }
  // ==========================================
  // MINIMALIST TEMPLATE 
  // ==========================================
  return (
    <div 
      ref={containerRef}
      id="resume-document"
      className="resume-page flex flex-col p-12 bg-white text-gray-800 relative"
    >
      {/* Render Page Break Indicators */}
      {breakLines.map((yPos, i) => (
        <div 
          key={i} 
          className="absolute left-0 right-0 h-0 border-t-2 border-dashed border-red-500 opacity-60 z-50 pointer-events-none print:hidden" 
          style={{ top: `${yPos}px` }}
        >
          <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full absolute right-4 -top-2.5 font-bold shadow tracking-wider uppercase">
              Page {i + 2}
          </span>
        </div>
      ))}

      <div id="minimal-col" className="block">
        
        <div className="flex flex-col items-center border-b-2 border-gray-800 pb-6 mb-6 section-item">
          {data.personal.image && (
            <Image src={data.personal.image} width={200} height={200} alt="Profile" className={`w-24 h-24 rounded-full object-cover mb-4 border-2 ${theme.border}`} />
          )}
          <h1 className="text-4xl font-light uppercase tracking-widest text-center">{data.personal.name || "Your Name"}</h1>
          <h2 className={`text-lg tracking-widest mt-2 ${theme.textMain}`}>{data.personal.title || "Job Title"}</h2>
          <div className="flex justify-center flex-wrap gap-4 text-xs mt-4">
            {data.personal.email && <span>{data.personal.email}</span>} 
            {data.personal.phone && <span>• {data.personal.phone}</span>} 
            {data.personal.location && <span>• {data.personal.location}</span>}
          </div>
        </div>
        
        {data.personal.summary && (
          <div className="mb-6 section-item">
            <p className="text-sm leading-relaxed text-gray-600 text-center px-4">{data.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <>
            {data.experience.map((exp, i) => (
              <div key={i} className={`section-item ${i === data.experience.length - 1 ? 'mb-6' : 'mb-4'}`}>
                {i === 0 && (
                  <h3 className={`mb-4 text-lg font-bold uppercase tracking-widest border-b pb-2 ${theme.border} text-gray-800`}>Experience</h3>
                )}
                <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-md">{exp.title}</h4>
                    <span className={`text-sm font-semibold ${theme.textMain}`}>{exp.date}</span>
                </div>
                <div className="text-sm font-medium text-gray-600 mb-2">{exp.company} {exp.location && `| ${exp.location}`}</div>
                <ul className="list-disc pl-4 text-sm text-gray-600 leading-relaxed">
                    {exp.tasks.split('\n').filter(t => t.trim() !== '').map((task, idx) => (
                      <li key={idx} className="mb-1">{task}</li>
                    ))}
                </ul>
              </div>
            ))}
          </>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <>
            {data.projects.map((proj, i) => (
              <div key={i} className={`section-item ${i === data.projects.length - 1 ? 'mb-6' : 'mb-3'}`}>
                {i === 0 && (
                  <h3 className={`mb-4 text-lg font-bold uppercase tracking-widest border-b pb-2 ${theme.border} text-gray-800`}>Projects</h3>
                )}
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-sm">{proj.title} {proj.url && <span className="font-normal text-blue-600 text-xs ml-2">({proj.url})</span>}</h4>
                  <span className={`text-xs font-semibold ${theme.textMain}`}>{proj.date}</span>
                </div>
                <p className="text-xs text-gray-600">{proj.tech}</p>
              </div>
            ))}
          </>
        )}

        <div className="grid grid-cols-2 gap-6 section-item">
          {data.education.length > 0 && (
            <div>
              <h3 className={`text-lg font-bold uppercase tracking-widest border-b pb-2 mb-4 ${theme.border} text-gray-800`}>Education</h3>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <h4 className="font-bold text-sm">{edu.degree}</h4>
                  <div className="text-xs text-gray-600">{edu.school} | <span className={theme.textMain}>{edu.date}</span></div>
                </div>
              ))}
            </div>
          )}
          
          {skillArray.length > 0 && (
            <div>
              <h3 className={`text-lg font-bold uppercase tracking-widest border-b pb-2 mb-4 ${theme.border} text-gray-800`}>Skills</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{data.skills}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}