"use client";
import React from 'react';

const LauncherCard = ({ icon, label, subLabel }) => (
  <div className="flex flex-col items-center p-4 w-32 cursor-pointer hover:bg-[#e5e5e5] rounded transition-colors group">
    <div className="w-16 h-16 bg-white border border-gray-300 shadow-sm flex items-center justify-center mb-2 group-hover:border-gray-400">
      {icon}
    </div>
    <div className="text-xs text-center font-medium text-gray-700 leading-tight">
      {label}
    </div>
    {subLabel && (
      <div className="text-[10px] text-center text-gray-500 mt-0.5">
        ({subLabel})
      </div>
    )}
  </div>
);

const SectionTitle = ({ children }) => (
  <div className="w-full border-b border-gray-300 pb-1 mb-4 mt-6 first:mt-0">
    <span className="text-sm font-semibold text-gray-700">{children}</span>
  </div>
);

export default function JupyterLauncher() {
  return (
    <div className="max-w-screen-lg mx-auto p-12 flex flex-col items-start animate-in fade-in duration-500">
      {/* Notebook Section */}
      <SectionTitle>Notebook</SectionTitle>
      <div className="flex flex-wrap gap-4">
        <LauncherCard 
          label="Python" 
          subLabel="Pyodide"
          icon={
            <div className="text-2xl font-bold flex flex-col items-center leading-none">
              <span className="text-[#3776ab]">PY</span>
              <span className="text-xs bg-[#3776ab] text-white px-1 mt-0.5 rounded-[2px] scale-75">WA</span>
            </div>
          }
        />
      </div>

      {/* Console Section */}
      <SectionTitle>Console</SectionTitle>
      <div className="flex flex-wrap gap-4">
        <LauncherCard 
          label="Python" 
          subLabel="Pyodide"
          icon={
            <div className="text-2xl font-bold flex flex-col items-center leading-none">
              <span className="text-gray-600">PY</span>
              <span className="text-xs bg-gray-600 text-white px-1 mt-0.5 rounded-[2px] scale-75">WA</span>
            </div>
          }
        />
      </div>

      {/* Other Section */}
      <SectionTitle>Other</SectionTitle>
      <div className="flex flex-wrap gap-4">
        <LauncherCard 
          label="Text File" 
          icon={
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        />
        <LauncherCard 
          label="Markdown File" 
          icon={
            <div className="text-2xl font-bold text-[#ae1c8e]">M↓</div>
          }
        />
        <LauncherCard 
          label="Python File" 
          icon={
            <svg className="w-8 h-8 text-[#3776ab]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.25.18l.9.2.73.26.59.33.45.38.34.44.25.51.15.58.06.64v3.82h-3.58l-.13.13-.13.22-.07.3-.03.39-.01.45v3.37l.01.45.03.38.07.3.13.23.13.12h3.58v3.82l-.06.63-.15.58-.25.51-.34.44-.45.38-.59.33-.73.26-.9.2-.95.07h-3.41l-.9-.2-.73-.26-.59-.33-.45-.38-.34-.44-.25-.51-.15-.58-.06-.64v-3.82h3.58l.13-.13.13-.22.07-.3.03-.39.01-.45v-3.37l-.01-.45-.03-.38-.07-.3-.13-.23-.13-.12h-3.58v-3.82l.06-.63.15-.58.25-.51.34-.44.45-.38.59-.33.73-.26.9-.2.95-.07h3.41zM8.88 2.09l-.42.24-.26.3-.15.42-.05.51v1.6l.05.51.15.42.26.3.42.24.51.05.51-.05.42-.24.26-.3.15-.42.05-.51v-1.6l-.05-.51-.15-.42-.26-.3-.42-.24-.51-.05-.51.05zm6.24 16.51l-.42.24-.26.3-.15.42-.05.51v1.6l.05.51.15.42.26.3.42.24.51.05.51-.05.42-.24.26-.3.15-.42.05-.51v-1.6l-.05-.51-.15-.42-.26-.3-.42-.24-.51-.05-.51.05z" />
            </svg>
          }
        />
        <LauncherCard 
          label="Contextual Help" 
          icon={
            <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          }
        />
      </div>
    </div>
  );
}
