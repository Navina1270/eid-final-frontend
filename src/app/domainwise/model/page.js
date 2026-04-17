"use client";
import React from 'react';
import JupyterLauncher from '@/components/DomainWise/Model/JupyterLauncher';

export default function ModelPage() {
  return (
    <div className="h-full bg-[#f3f3f3] flex text-[#333333]">
      {/* Jupyter Sidebar (File Browser) */}
      <div className="w-64 border-r border-gray-300 bg-white flex flex-col hidden md:flex">
        <div className="flex border-b border-gray-300">
          {/* Main Sidebar Tools */}
          <div className="flex flex-col w-12 border-r border-gray-300 bg-[#fafafa] items-center py-2 gap-4">
            <button className="p-1 hover:bg-gray-200 rounded" title="File Browser">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="Running Terminals and Kernels">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          
          {/* File Browser Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between px-2 py-1 border-b border-gray-300 text-xs">
              <div className="flex gap-1">
                <button className="p-1 hover:bg-gray-200 rounded bg-blue-500 text-white" title="New Launcher">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded" title="New Folder">
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded" title="Upload Files">
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
                <button className="p-1 hover:bg-gray-200 rounded" title="Refresh">
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </div>
            </div>
            {/* Folder path */}
            <div className="flex items-center px-3 py-1.5 text-sm bg-[#fafafa] border-b border-gray-300 text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
              <span>/</span>
            </div>
            {/* Headers */}
            <div className="flex px-3 py-1 text-xs text-gray-500 font-semibold border-b border-gray-300">
              <div className="flex-1">Name</div>
              <div className="w-20 text-right">Modified</div>
            </div>
            {/* Empty file area for realism */}
            <div className="flex-1 bg-white"></div>
          </div>
        </div>
      </div>

      {/* Main Jupyter Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Simplified Header/Menu */}
        <div className="h-8 bg-white border-b border-gray-300 flex items-center px-2 text-sm text-gray-600 flex-shrink-0">
          <div className="px-2 hover:bg-gray-100 cursor-pointer">File</div>
          <div className="px-2 hover:bg-gray-100 cursor-pointer">Edit</div>
          <div className="px-2 hover:bg-gray-100 cursor-pointer">View</div>
          <div className="px-2 hover:bg-gray-100 cursor-pointer">Run</div>
          <div className="px-2 hover:bg-gray-100 cursor-pointer">Kernel</div>
          <div className="px-2 hover:bg-gray-100 cursor-pointer">Tabs</div>
          <div className="px-2 hover:bg-gray-100 cursor-pointer">Settings</div>
          <div className="px-2 hover:bg-gray-100 cursor-pointer">Help</div>
        </div>
        
        {/* Jupyter Tabs */}
        <div className="h-8 flex border-b border-gray-300 bg-[#e0e0e0] flex-shrink-0">
          <div className="bg-white border-r border-[#c0c0c0] flex items-center px-3 text-sm text-gray-800 border-t-2 border-t-blue-500 relative -mb-[1px]">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Launcher
            <button className="ml-3 hover:bg-gray-200 rounded p-0.5">
              <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Launcher Screen Content */}
        <div className="flex-1 overflow-auto bg-white">
          <JupyterLauncher />
        </div>
      </div>
    </div>
  );
}
