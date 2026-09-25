import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Zap, Bell, Shield } from 'lucide-react';

const PAGE_TITLES = {
  '/': 'National Dashboard Overview',
  '/projects': 'Projects Explorer',
  '/alerts': 'Risk Alerts Feed',
  '/map': 'Geographic Intelligence Map',
  '/voice-to-report': 'Voice-to-Report: Citizen Grievance AI',
  '/best-practices': 'Best-Practice Finder & Benchmarks',
  '/what-changed': '"What Changed?" Temporal Anomaly Radar',
  '/ml': 'Live ML Predictor',
  '/analytics': 'Model & SHAP Analytics',
  '/audit': 'AI Vigilance Audit Assistant',
  '/batch-audit': 'Batch CSV Audit & ML Processor',
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || 'MPLADS Sentinel';

  const handleLogout = () => {
    localStorage.removeItem('mplads_auth');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs sticky top-0 z-40">
      {/* Left: Jurisdiction + current page */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-200 shrink-0">
          MoSPI National
        </span>
        <span className="text-xs text-slate-500 truncate hidden sm:block">
          <strong className="text-slate-700">{pageTitle}</strong>
          &nbsp;— All 32 States & UTs
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5">
        {/* Live status pill */}
        <div className="hidden md:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ML Active
        </div>

        {/* User chip */}
        <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200">
          <div className="w-6 h-6 rounded-full bg-indigo-900 text-white flex items-center justify-center text-[10px] font-bold">
            PS
          </div>
          <div className="text-left">
            <p className="text-[11px] font-bold text-slate-800 leading-none">Dr. P. K. Srivastava</p>
            <p className="text-[9px] text-slate-400">DG Vigilance</p>
          </div>
        </div>

        {/* Alerts shortcut */}
        <button
          onClick={() => navigate('/alerts')}
          className="relative p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
          title="Risk Alerts"
        >
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center">
            !
          </span>
        </button>

        {/* ML button */}
        <button
          onClick={() => navigate('/ml')}
          className="hidden sm:flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer"
        >
          <Zap size={13} />
          ML Test
        </button>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-red-600 border border-slate-300 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut size={13} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}