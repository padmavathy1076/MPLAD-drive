import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, AlertTriangle, Map, 
  Zap, BarChart3, Bot, FileSpreadsheet, Shield,
  Mic, Award, History
} from 'lucide-react';

export default function Sidebar() {
  const coreLinks = [
    { to: '/', label: 'Dashboard Overview', icon: LayoutDashboard },
    { to: '/projects', label: 'Projects Explorer', icon: FolderKanban },
    { to: '/alerts', label: 'Risk Alerts Feed', icon: AlertTriangle, badge: '245' },
    { to: '/map', label: 'Geographic Map', icon: Map },
  ];

  const intelligenceLinks = [
    { to: '/voice-to-report', label: 'Voice-to-Report', icon: Mic },
    { to: '/best-practices', label: 'Best-Practice Finder', icon: Award },
    { to: '/what-changed', label: '"What Changed?" Alert', icon: History },
  ];

  const aiLinks = [
    { to: '/ml', label: 'Live ML Predictor', icon: Zap },
    { to: '/analytics', label: 'Model & SHAP Analytics', icon: BarChart3 },
    { to: '/audit', label: 'AI Audit Assistant', icon: Bot },
    { to: '/batch-audit', label: 'Batch CSV Audit', icon: FileSpreadsheet },
  ];

  const renderNavGroup = (items) => (
    <ul className="space-y-1">
      {items.map((link) => {
        const Icon = link.icon;
        return (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'hover:bg-[#252b3d] text-slate-300 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon size={15} />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="w-64 bg-[#1a1f2e] text-slate-300 min-h-screen flex flex-col border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-xs">
          <Shield size={22} />
        </div>
        <div>
          <h1 className="font-bold text-white text-sm tracking-wide">
            MPLADS <span className="bg-indigo-900 text-indigo-300 text-[10px] px-1.5 py-0.5 rounded">SENTINEL</span>
          </h1>
          <p className="text-[11px] text-slate-400">Govt. Vigilance Platform</p>
        </div>
      </div>

      {/* Jurisdiction Selector */}
      <div className="p-4 border-b border-slate-800/60">
        <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
          Active Jurisdiction
        </label>
        <select className="w-full bg-[#252b3d] text-xs text-white p-2 rounded border border-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer">
          <option>Ministry (MoSPI) - National</option>
          <option>State - Karnataka</option>
          <option>State - Maharashtra</option>
          <option>State - Bihar</option>
        </select>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-3 space-y-5 overflow-y-auto">
        <div>
          <h2 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-1.5">
            Core Monitoring
          </h2>
          {renderNavGroup(coreLinks)}
        </div>

        <div>
          <h2 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-1.5">
            Citizen & Temporal Audit
          </h2>
          {renderNavGroup(intelligenceLinks)}
        </div>

        <div>
          <h2 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-1.5">
            AI & Forensic Engines
          </h2>
          {renderNavGroup(aiLinks)}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1 bg-[#161a26]">
        <div className="flex justify-between items-center">
          <span>System Integrity</span>
          <span className="text-emerald-400 font-semibold">● Verified GoI</span>
        </div>
        <p className="text-[10px] text-slate-500">v2.4 • In-Browser ML Active</p>
      </div>
    </aside>
  );
}