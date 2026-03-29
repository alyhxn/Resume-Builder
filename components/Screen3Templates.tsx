"use client";

import React from "react";

export default function Screen3Templates({ template, setTemplate, themeColor, setThemeColor, bgColor, setBgColor }: { template: string, setTemplate: React.Dispatch<React.SetStateAction<string>>, themeColor: string, setThemeColor: React.Dispatch<React.SetStateAction<string>>, bgColor: string, setBgColor: React.Dispatch<React.SetStateAction<string>> }) {
  const colors = [
    { id: 'teal', hex: '#14b8a6', name: 'Teal' },
    { id: 'blue', hex: '#3b82f6', name: 'Blue' },
    { id: 'indigo', hex: '#6366f1', name: 'Indigo' },
    { id: 'rose', hex: '#f43f5e', name: 'Rose' },
    { id: 'amber', hex: '#f59e0b', name: 'Amber' },
    { id: 'slate', hex: '#475569', name: 'Slate' },
  ]; 
  const bgColors = [
    { id: 'teal', hex: '#0f766e', name: 'Teal' },    
    { id: 'blue', hex: '#1e40af', name: 'Blue' },    
    { id: 'indigo', hex: '#3730a3', name: 'Indigo' },
    { id: 'rose', hex: '#9f1239', name: 'Rose' },    
    { id: 'amber', hex: '#92400e', name: 'Amber' },  
    { id: 'slate', hex: '#1e293b', name: 'Slate' },  
  ];

  return (
    <div className="space-y-8">
      {/* Design Selector */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">3. Choose Template Design</h2>
        <div className="flex flex-wrap gap-6">
          
          {/* Modern Split */}
          <div onClick={() => setTemplate("modern")} className={`border-2 p-4 w-30 cursor-pointer rounded-lg text-center transition ${template === 'modern' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="h-32 bg-slate-800 flex flex-row rounded overflow-hidden shadow-sm">
               <div className="w-1/3 bg-slate-700 h-full"></div>
               <div className="w-2/3 bg-white h-full"></div>
            </div>
            <p className="mt-3 font-semibold text-gray-700 text-sm">Modern Split</p>
          </div>

          {/* Minimalist */}
          <div onClick={() => setTemplate("minimal")} className={`border-2 p-4 w-30 cursor-pointer rounded-lg text-center transition ${template === 'minimal' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="h-32 bg-white flex flex-col rounded overflow-hidden border shadow-sm">
               <div className="h-1/4 bg-gray-100 w-full border-b"></div>
               <div className="h-3/4 bg-white w-full"></div>
            </div>
            <p className="mt-3 font-semibold text-gray-700 text-sm">Minimalist</p>
          </div>

          {/* Professional (NEW) */}
          <div onClick={() => setTemplate("professional")} className={`border-2 p-4 w-30 cursor-pointer rounded-lg text-center transition ${template === 'professional' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="h-32 bg-white flex flex-col rounded overflow-hidden border shadow-sm p-2 gap-1.5">
               {/* Mini representation of the top-down header and grid body */}
               <div className="h-3 bg-gray-300 w-3/4 mx-auto rounded-sm"></div>
               <div className="h-1 bg-gray-200 w-1/2 mx-auto rounded-sm mb-1"></div>
               <div className="h-10 bg-gray-100 w-full rounded-sm"></div>
               <div className="flex gap-1 h-8">
                  <div className="w-1/2 bg-gray-100 rounded-sm"></div>
                  <div className="w-1/2 bg-gray-100 rounded-sm"></div>
               </div>
            </div>
            <p className="mt-3 font-semibold text-gray-700 text-sm">Professional</p>
          </div>

          {/* Creative (NEW) */}
          <div onClick={() => setTemplate("creative")} className={`border-2 p-4 w-30 cursor-pointer rounded-lg text-center transition ${template === 'creative' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="h-32 bg-white flex flex-row rounded overflow-hidden shadow-sm border">
               {/* Mini representation of the right-sidebar layout */}
               <div className="w-2/3 bg-gray-50 h-full p-2 flex flex-col gap-1.5">
                  <div className="h-3 bg-gray-300 w-5/6 rounded-sm"></div>
                  <div className="h-8 bg-gray-200 w-full rounded-sm"></div>
               </div>
               <div className="w-1/3 bg-slate-800 h-full"></div>
            </div>
            <p className="mt-3 font-semibold text-gray-700 text-sm">Creative</p>
          </div>

        </div>
      </div>

      {/* Theme Color Selector */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Choose Theme Color</h2>
        <div className="flex flex-wrap gap-4">
          {colors.map((c) => (
            <button
              key={c.id}
              onClick={() => setThemeColor(c.id)}
              className={`w-12 h-12 rounded-full border-4 shadow-sm transition-transform hover:scale-110 flex items-center justify-center ${themeColor === c.id ? 'border-gray-800' : 'border-transparent'}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Background Color Selector */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Choose Background Color</h2>
        <div className="flex flex-wrap gap-4">
          {bgColors.map((c) => (
            <button
              key={c.id}
              onClick={() => setBgColor(c.id)}
              className={`w-12 h-12 rounded-full border-4 shadow-sm transition-transform hover:scale-110 flex items-center justify-center ${bgColor === c.id ? 'border-gray-800' : 'border-transparent'}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}