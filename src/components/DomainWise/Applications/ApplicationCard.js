import React from 'react'

const ApplicationCard = ({ title, description, icon: Icon, onClick }) => (
    <div
        onClick={onClick}
        className="group bg-slate-800 hover:bg-slate-700 transition-all duration-300 border border-slate-700 rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-cyan-500/20"
    >
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-lime-400 bg-opacity-20 text-cyan-300">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400">{title}</h3>
        </div>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

export default ApplicationCard