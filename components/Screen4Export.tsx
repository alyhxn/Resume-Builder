"use client";

import React from "react";
import { FiDownload } from "react-icons/fi";

export default function Screen4Export() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-center pt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">4. Ready to Export!</h2>
      <p className="text-gray-600 mb-8 max-w-sm mx-auto">Your resume is ready. Download it as a PDF or print it directly.</p>
      
      <button 
        onClick={handlePrint}
        className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 flex items-center gap-3 mx-auto shadow-lg transition transform hover:-translate-y-0.5"
      >
        <FiDownload /> Download PDF
      </button>
      
      <p className="text-xs text-gray-400 mt-6">
        Tip: When the print dialog opens, make sure to check <strong>&quot;Background Graphics&quot;</strong> and set margins to <strong>&quot;None&quot;</strong>. The paper size should be set to <strong>&quot;A4&quot;</strong>.
      </p>
    </div>
  );
}