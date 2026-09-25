import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, AlertTriangle, Map, 
  Zap, BarChart3, Bot, FileSpreadsheet, Shield,
  Mic, Award, History, Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const links = [
    { to: '/', label: 'Dashboard Overview', icon: LayoutDashboard },
    { to: '/projects', label: 'Projects Explorer', icon: FolderKanban },
    { to: '/alerts', label: 'Risk Alerts Feed', icon: AlertTriangle, badge: '245' },
    { to: '/map', label: 'Geographic Map', icon: Map },
  ];

  const innovationLinks = [
    { to: '/voice-to-report', label: 'Voice-to-Report', icon: Mic, tag: 'NEW' },
    { to: '/best-practices', label: 'Best-Practice Finder', icon: Award, tag: 'BENCH' },
    { to: '/what-changed', label: '"What Changed?" Alert', icon: History, tag: 'DELTA' },
  ];

  const aiLinks = [
    { to: '/ml', label: 'Live ML Predictor', icon: Zap },
    { to: '/analytics', label: 'Model & SHAP Analytics', icon: BarChart3 },
    { to: '/audit', label: 'AI Audit Assistant', icon: Bot },
    { to: '/batch-audit', label: 'Batch CSV Audit', icon: FileSpreadsheet },
  ];

  return (
    <aside className="w-64 bg-[#1a1f2e] text-slate-300 min-h-screen flex flex-col border-r border-slate-800 select-none">
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <Shield size={22} />
        </div>
        <div>
          <h1 className="font-bold text-white text-sm tracking-wide">MPLADS <span className="bg-indigo-900 text-indigo-300 text-[10px] px-1.5 py-0.5 rounded">SENTINEL</span></h1>
          <p className="text-[11px] text-slate-400">Govt. Vigilance Platform</p>
        </div>
      </div>

      <div className="p-4">
        <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
          Active Jurisdiction
        </label>
        <select className="w-full bg-[#252b3d] text-xs text-white p-2 rounded border border-slate-700 focus:outline-none focus:border-indigo-500">
          <option>Ministry (MoSPI) - National</option>
          <option>State - Karnataka</option>
          <option>State - Maharashtra</option>
          <option>State - Bihar</option>
        </select>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-5 overflow-y-auto">
        <div>
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md'
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
        </div>

        {/* SIH Innovation Suite */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <h2 className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
              <Sparkles size={11} />
              <span>SIH Innovations</span>
            </h2>
            <span className="text-[9px] bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-amber-400/30">
              Slide 2
            </span>
          </div>
          <ul className="space-y-1">
            {innovationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-amber-600 text-white shadow-md font-semibold'
                          : 'hover:bg-[#252b3d] text-slate-300 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={15} className="text-amber-400" />
                      <span>{link.label}</span>
                    </div>
                    {link.tag && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-black px-1.5 py-0.2 rounded">
                        {link.tag}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider px-3 mb-2">
            AI & Audit Engines
          </h2>
          <ul className="space-y-1">
            {aiLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'hover:bg-[#252b3d] text-slate-300 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={15} />
                      <span>{link.label}</span>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
        <div className="flex justify-between items-center">
          <span>System Integrity</span>
          <span className="text-emerald-400 font-semibold">● Verified GoI</span>
        </div>
        <p className="text-[10px] text-slate-500">v2.4 • In-Browser ML Active</p>
      </div>
    </aside>
  );
}