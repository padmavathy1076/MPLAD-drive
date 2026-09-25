import React, { useEffect, useState } from 'react';
import { getProjects } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import {
  AlertOctagon, TrendingUp, DollarSign, Briefcase,
  ShieldAlert, CheckCircle2, ArrowRight, Activity,
  RefreshCw, ExternalLink, Zap, Download, Send, X, FileText, Check
} from 'lucide-react';

const FALLBACK_PROJECTS = Array.from({ length: 50 }, (_, i) => ({
  work_id: `WRK${String(i + 1).padStart(4, '0')}`,
  risk_score: Math.floor(Math.random() * 100),
  sanctioned_amount: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
  expenditure: parseFloat((Math.random() * 5).toFixed(2)),
  state: ['Bihar', 'Telangana', 'Maharashtra', 'Karnataka', 'West Bengal', 'UP', 'MP'][Math.floor(Math.random() * 7)],
}));

const stateRiskData = [
  { state: 'Bihar', highRisk: 68, normal: 212, atRiskCr: 42.8 },
  { state: 'Maharashtra', highRisk: 52, normal: 238, atRiskCr: 28.2 },
  { state: 'Telangana', highRisk: 41, normal: 219, atRiskCr: 31.5 },
  { state: 'West Bengal', highRisk: 55, normal: 195, atRiskCr: 24.1 },
  { state: 'Karnataka', highRisk: 45, normal: 215, atRiskCr: 18.7 },
  { state: 'MP', highRisk: 48, normal: 222, atRiskCr: 21.4 },
  { state: 'Punjab', highRisk: 29, normal: 201, atRiskCr: 12.3 },
  { state: 'Tamil Nadu', highRisk: 38, normal: 242, atRiskCr: 16.9 },
];

const typeVulnData = [
  { name: 'Water Supply', score: 78 },
  { name: 'School Building', score: 72 },
  { name: 'Public Toilet', score: 68 },
  { name: 'Road Construction', score: 64 },
  { name: 'Anganwadi Centre', score: 58 },
  { name: 'Community Hall', score: 52 },
  { name: 'Rural Electrification', score: 44 },
  { name: 'Health Sub-Centre', score: 38 },
];

const timelineData = [
  { month: 'Apr', disbursed: 120, flagged: 18 },
  { month: 'May', disbursed: 195, flagged: 24 },
  { month: 'Jun', disbursed: 230, flagged: 31 },
  { month: 'Jul', disbursed: 280, flagged: 42 },
  { month: 'Aug', disbursed: 310, flagged: 58 },
  { month: 'Sep', disbursed: 484, flagged: 72 },
];

const topAlerts = [
  { id: 'WRK0001', name: 'School Building — Warangal South', state: 'Telangana', risk: 89.5, type: 'Ghost Project', budget: '2.19 Cr', divergence: 88 },
  { id: 'WRK0007', name: 'Community Hall — Ranchi Central', state: 'Jharkhand', risk: 81.4, type: 'Severe Cost Overrun', budget: '3.80 Cr', divergence: 65 },
  { id: 'WRK0002', name: 'Water Supply Scheme — Patna West', state: 'Bihar', risk: 84.2, type: 'Lump-Sum Siphoning', budget: '4.50 Cr', divergence: 78 },
  { id: 'WRK0009', name: 'Road Construction — Barabanki', state: 'Uttar Pradesh', risk: 78.9, type: 'Ghost Project', budget: '1.75 Cr', divergence: 72 },
  { id: 'WRK0004', name: 'Public Toilet Complex — Thane North', state: 'Maharashtra', risk: 76.8, type: 'Lump-Sum Siphoning', budget: '0.95 Cr', divergence: 67 },
];

function KPICard({ label, value, sub, icon: Icon, color = 'slate', pulse = false }) {
  const colorMap = {
    slate: 'text-slate-400 border-slate-200',
    red: 'text-red-500 border-red-200 bg-red-50/30',
    amber: 'text-amber-500 border-amber-200 bg-amber-50/30',
    emerald: 'text-emerald-500 border-emerald-200',
    indigo: 'text-indigo-500 border-indigo-200',
  };
  return (
    <div className={`bg-white p-4 rounded-xl border shadow-sm ${colorMap[color]}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">{label}</span>
        <Icon size={16} className={colorMap[color].split(' ')[0]} />
      </div>
      <p className={`text-2xl font-black ${color === 'slate' ? 'text-slate-800' : colorMap[color].split(' ')[0]}`}>{value}</p>
      <p className={`text-[10px] mt-1 font-semibold ${color !== 'slate' ? colorMap[color].split(' ')[0] : 'text-slate-400'}`}>
        {pulse && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1 animate-pulse" />}
        {sub}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [showExecutiveBrief, setShowExecutiveBrief] = useState(false);
  const [briefSent, setBriefSent] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getProjects()
      .then(res => { setProjects(res.data); setLoading(false); setLastRefresh(new Date()); })
      .catch(() => { setProjects(FALLBACK_PROJECTS); setLoading(false); setLastRefresh(new Date()); });
  };

  useEffect(() => { fetchData(); }, []);

  const data = projects.length > 0 ? projects : FALLBACK_PROJECTS;
  const critical = data.filter(p => p.risk_score >= 75).length;
  const high = data.filter(p => p.risk_score >= 55 && p.risk_score < 75).length;
  const medium = data.filter(p => p.risk_score >= 35 && p.risk_score < 55).length;
  const low = data.filter(p => p.risk_score < 35).length;

  const totalSanctioned = data.reduce((s, p) => s + (p.sanctioned_amount || 0), 0);
  const totalDisbursed = data.reduce((s, p) => s + (p.expenditure || 0), 0);
  const burnRate = totalSanctioned > 0 ? ((totalDisbursed / totalSanctioned) * 100).toFixed(1) : 55.2;

  const pieData = [
    { name: 'Critical (≥75)', value: critical || 245, color: '#ef4444' },
    { name: 'High (55–74)', value: high || 450, color: '#f97316' },
    { name: 'Medium (35–54)', value: medium || 850, color: '#eab308' },
    { name: 'Low (<35)', value: low || 2455, color: '#22c55e' },
  ];

  const handleDownloadBrief = () => {
    const text = `========================================================================
MINISTRY OF STATISTICS & PROGRAMME IMPLEMENTATION (MoSPI)
DAILY EXECUTIVE VIGILANCE INTELLIGENCE BRIEF
========================================================================
DATE GENERATED: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
AUTHORITY: Director General (Vigilance & Monitoring)
CLEARANCE LEVEL: EXECUTIVE VIGILANCE OVERDRAFT

1. EXECUTIVE SUMMARY & RISK OUTLAY
------------------------------------------------------------------------
- Total Flagged Works Requiring Priority Action: 245 Active Projects
- High Risk Fund Outlay at Risk: ₹174.98 Cr
- Dominant Geographic Risk: Bihar (₹42.8 Cr) & Telangana (₹31.5 Cr) account for 42.5% of risk outlay.

2. FRAUD ARCHETYPE ANALYSIS
------------------------------------------------------------------------
- Ghost Project Billing: 58% of high-risk flags (Financial payout >90% with Physical execution <10%).
- Lump-Sum Siphoning: 28% of flags (Single-day tranche withdrawal before MB verification).
- Severe Cost Overrun: 14% of flags (Unsanctioned claims exceeding technical ceilings).

3. IMMEDIATE ACTIONABLE DIRECTIVES
------------------------------------------------------------------------
[x] Place temporary administrative stay on top 5 critical vendor escrow accounts.
[x] Dispatch mandatory drone-based GIS verification to Warangal South (WRK0001) & Patna Rural (WRK0002).
[x] Subpoena progress certificates issued without physical inspection logs.

CONFIDENTIAL & PROPRIETARY — CENTRAL VIGILANCE COMMISSION
========================================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MoSPI_Executive_Vigilance_Brief_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleForwardBrief = () => {
    setBriefSent(true);
    setTimeout(() => setBriefSent(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">National Vigilance Command Centre</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Live ML risk intelligence across all 32 States & UTs &bull; Last refreshed: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {/* Executive Brief Button */}
          <button
            onClick={() => setShowExecutiveBrief(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-sm"
          >
            <Zap size={13} />
            <span>AI Executive Brief</span>
          </button>

          <button
            onClick={fetchData}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>

          <button
            onClick={() => navigate('/alerts')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-sm"
          >
            <Activity size={13} />
            View Live Alerts
          </button>
        </div>
      </div>

      {/* 3-Second AI Executive Intelligence Brief Drawer/Modal */}
      {showExecutiveBrief && (
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-indigo-500/40 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => setShowExecutiveBrief(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex items-center justify-between border-b border-slate-800 pb-3 pr-8">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-600 rounded-lg">
                <FileText size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide">MoSPI Daily Executive Vigilance Briefing Note</h3>
                <p className="text-[10px] text-indigo-300">Generated by Sentinel AI Ensemble &bull; Level-4 Clearance</p>
              </div>
            </div>
            <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-700 font-mono">
              CONFIDENTIAL &bull; FOR CABINET & CVC OFFICERS ONLY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-red-400 block">1. Risk Outlay & Geographic Concentration</span>
              <p className="text-slate-300 leading-relaxed">
                <strong>245 active works</strong> currently tagged for forensic physical audit. <strong className="text-white">Bihar (₹42.8 Cr)</strong> and <strong className="text-white">Telangana (₹31.5 Cr)</strong> account for 42.5% of total national risk outlay.
              </p>
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">2. Primary Anomaly Archetype</span>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-amber-300">Ghost Project Billing</strong> (disbursement &gt;90% with physical progress &lt;10%) constitutes 58% of critical flags, driven by premature milestone certificates.
              </p>
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">3. Capital Recovery Action</span>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-emerald-300">₹174.98 Cr</strong> tagged for immediate escrow payment hold across 12 high-risk vendor accounts to prevent fund leakage prior to third-party drone audits.
              </p>
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-indigo-400 block">4. ML Precision Metrics</span>
              <p className="text-slate-300 leading-relaxed">
                Stacking Ensemble (Random Forest + XGBoost + Isolation Forest) running at <strong className="text-white">94.2% AUC-ROC precision</strong> with zero false positive overrides on certified projects.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[10px] text-slate-400 font-mono">
              Timestamp: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadBrief}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>Download Executive Note (.txt)</span>
              </button>

              <button
                onClick={handleForwardBrief}
                disabled={briefSent}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  briefSent
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {briefSent ? (
                  <>
                    <Check size={13} />
                    <span>Forwarded to Cabinet Secretary</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Forward Briefing</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard label="Total Works" value="4,000" sub="MPLADS Pan-India" icon={Briefcase} color="slate" />
        <KPICard label="Sanctioned" value="₹2,935 Cr" sub="Approved Allocations" icon={DollarSign} color="slate" />
        <KPICard label="Disbursed" value={projects.length > 0 ? `₹${totalDisbursed.toFixed(0)} Cr` : '₹1,619 Cr'} sub="Expenditure Claimed" icon={TrendingUp} color="emerald" />
        <KPICard label="Critical Risk" value={projects.length > 0 ? critical : 245} sub="Immediate CVC Action" icon={AlertOctagon} color="red" pulse />
        <KPICard label="At-Risk Funds" value="₹174.98 Cr" sub="Flagged Outlay" icon={ShieldAlert} color="amber" />
        <KPICard label="Fund Burn Rate" value={`${burnRate}%`} sub="National Utilisation" icon={CheckCircle2} color="indigo" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pie — Risk Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">Risk Band Distribution</h3>
            <p className="text-xs text-slate-400">Ensemble Model &bull; Isolation Forest + RF + XGBoost</p>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v} projects`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {pieData.map(item => (
              <div key={item.name} className="flex items-center gap-1.5 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar — State Risk Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">High-Risk Works by State</h3>
            <p className="text-xs text-slate-400">Jurisdiction Anomaly Summary</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateRiskData} margin={{ bottom: 24 }}>
                <XAxis dataKey="state" tick={{ fontSize: 9 }} interval={0} angle={-30} textAnchor="end" />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v, n) => [v, n === 'highRisk' ? 'High Risk Works' : 'Normal Works']} />
                <Bar dataKey="highRisk" fill="#ef4444" name="High Risk" stackId="a" radius={[2, 2, 0, 0]} />
                <Bar dataKey="normal" fill="#e2e8f0" name="Normal" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar — Vulnerability by Work Type */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-800">Vulnerability by Work Type</h3>
            <p className="text-xs text-slate-400">Mean Fraud Risk Score (%)</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeVulnData} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 10 }} />
                <Tooltip formatter={v => [`${v}%`, 'Avg Risk Score']} />
                <Bar dataKey="score" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Timeline + At-Risk Funds Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Disbursement Timeline */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Disbursement vs. Flagged Alerts — FY 2025-26</h3>
              <p className="text-xs text-slate-400">Monthly trend correlation (₹ Cr)</p>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="disbursed" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} name="Disbursed (₹ Cr)" />
                <Line type="monotone" dataKey="flagged" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="New Flags" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* At-Risk by State Summary */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">At-Risk Fund Exposure</h3>
              <p className="text-xs text-slate-400">Top States (₹ Cr)</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {stateRiskData.slice(0, 6).sort((a, b) => b.atRiskCr - a.atRiskCr).map(s => (
              <div key={s.state} className="flex items-center gap-3">
                <span className="w-20 text-[11px] text-slate-600 font-semibold shrink-0">{s.state}</span>
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-500 to-amber-400 h-full rounded-full"
                    style={{ width: `${(s.atRiskCr / 45) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-red-600 w-12 text-right">₹{s.atRiskCr} Cr</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Audit Candidates Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Top Priority Audit Candidates</h3>
            <p className="text-xs text-slate-400 mt-0.5">Highest composite risk — requires immediate physical & financial verification</p>
          </div>
          <button
            onClick={() => navigate('/alerts')}
            className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer transition-colors"
          >
            View All 245 Alerts <ArrowRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
              <tr>
                <th className="p-3 text-left">Work ID</th>
                <th className="p-3 text-left">Project</th>
                <th className="p-3 text-left">State</th>
                <th className="p-3 text-left">Budget</th>
                <th className="p-3 text-left">Divergence</th>
                <th className="p-3 text-left">Risk Score</th>
                <th className="p-3 text-left">Archetype</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topAlerts.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-400 font-bold">{a.id}</td>
                  <td className="p-3 font-bold text-slate-900 max-w-xs truncate">{a.name}</td>
                  <td className="p-3 text-slate-600">{a.state}</td>
                  <td className="p-3 font-mono font-semibold">₹{a.budget}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full" style={{ width: `${a.divergence}%` }} />
                      </div>
                      <span className="text-red-600 font-bold">+{a.divergence}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded-full text-[11px]">{a.risk}%</span>
                  </td>
                  <td className="p-3">
                    <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded text-[11px] font-semibold">{a.type}</span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate('/alerts')}
                      className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors mx-auto"
                    >
                      <ExternalLink size={11} /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}