import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldOff, LayoutDashboard, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0f1320] flex items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-20 h-20 bg-red-900/40 border border-red-700 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldOff size={40} className="text-red-400" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1">Access Error — Code 404</p>
          <h1 className="text-5xl font-black text-white">404</h1>
          <h2 className="text-xl font-bold text-slate-300 mt-2">Classified Resource Not Found</h2>
          <p className="text-sm text-slate-500 mt-3">
            The vigilance asset you requested does not exist, has been redacted, or falls outside your security clearance level.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-colors cursor-pointer border border-slate-700"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-md"
          >
            <LayoutDashboard size={16} />
            Return to Dashboard
          </button>
        </div>
        <p className="text-[10px] text-slate-600 font-mono">MPLADS SENTINEL v2.4 • MoSPI Vigilance Platform</p>
      </div>
    </div>
  );
}
