import React, { useState } from 'react';
import { 
  Zap, AlertTriangle, TrendingUp, ArrowRight, Clock, 
  History, Calendar, DollarSign, Activity, CheckCircle2,
  FileDiff, Eye, ShieldAlert, ArrowUpRight, BarChart2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TEMPORAL_CHANGE_ALERTS = [
  {
    id: 'CHG-101',
    workId: 'WRK0001',
    title: 'School Building — Warangal South',
    state: 'Telangana',
    category: 'Progress Freeze vs Financial Surge',
    detectedAt: 'Yesterday, 18:30 IST',
    before: {
      date: 'Aug 2025 (30 Days Ago)',
      financial: '15% (₹0.32 Cr)',
      physical: '10%',
      status: 'Normal Pacing'
    },
    after: {
      date: 'Current Audit Snapshot',
      financial: '98.2% (₹2.15 Cr)',
      physical: '10% (Zero Structural Change)',
      status: 'Severe Ghost Billing Anomaly'
    },
    deltaMagnitude: '+83.2% Financial Surge with 0% Physical Movement',
    severity: 'CRITICAL',
    triggerDescription: 'System detected ₹1.83 Cr disbursed in 3 rapid tranches within 14 days, while satellite & physical progress remained stalled at foundation level.'
  },
  {
    id: 'CHG-102',
    workId: 'WRK0002',
    title: 'Piped Water Supply Scheme — Patna West',
    state: 'Bihar',
    category: 'Sudden Lump-Sum Disbursement Spike',
    detectedAt: '2 Days Ago',
    before: {
      date: 'May 2025',
      financial: '0% Disbursed (Inactive)',
      physical: '0%',
      status: 'Sanctioned / Dormant'
    },
    after: {
      date: 'Current Audit Snapshot',
      financial: '95.1% Disbursed (₹4.28 Cr)',
      physical: '22% Partial Digging',
      status: 'Siphoning Trigger'
    },
    deltaMagnitude: '0% to 95% Payout in a Single Tranche (48 hrs)',
    severity: 'CRITICAL',
    triggerDescription: 'Project dormant for 7 months suddenly drained 95.1% of sanctioned funds in a single bulk transaction to VEND104 without intermediate measurement book (MB) sign-offs.'
  },
  {
    id: 'CHG-103',
    workId: 'WRK0007',
    title: 'Community Hall — Ranchi Central',
    state: 'Jharkhand',
    category: 'Unauthorized Cost Escalation',
    detectedAt: '3 Days Ago',
    before: {
      date: 'Sanction Approval',
      sanctioned: '₹2.40 Cr',
      expenditure: '₹2.30 Cr',
      status: 'Within Ceiling'
    },
    after: {
      date: 'Revised Claim',
      sanctioned: '₹3.80 Cr (Retroactive)',
      expenditure: '₹3.75 Cr',
      status: '+58.3% Cost Overrun'
    },
    deltaMagnitude: '+₹1.40 Cr Escalation without MoSPI Revision',
    severity: 'HIGH',
    triggerDescription: 'Contractor submitted expenditure claims exceeding original ceiling by 158% without state nodal committee revised technical sanction.'
  },
  {
    id: 'CHG-104',
    workId: 'WRK0009',
    title: 'Road Construction — Barabanki',
    state: 'Uttar Pradesh',
    category: 'Sudden Status Flip (Complete with 0% Work)',
    detectedAt: '4 Days Ago',
    before: {
      date: 'Previous Fortnight',
      status: 'Work In Progress (12%)',
      disbursed: '₹0.20 Cr',
      phys: '5%'
    },
    after: {
      date: 'Current Snapshot',
      status: 'Marked "100% Completed"',
      disbursed: '₹1.49 Cr (85.1%)',
      phys: '0% Road Found'
    },
    deltaMagnitude: 'False "Completed" Tagging on Vacant Dirt Track',
    severity: 'CRITICAL',
    triggerDescription: 'Work marked as 100% completed in district portal to release final bill, but drone survey corroborates zero bitumen or gravel foundation.'
  }
];

// Exact Slide 2 Outlier Comparison Data
const SIMILAR_PROJECTS_DATA = [
  { name: 'Project A (Hubli)', cost: 9.2, type: 'Peer Project', color: '#94a3b8' },
  { name: 'Project B (Belgaum)', cost: 10.1, type: 'Peer Project', color: '#94a3b8' },
  { name: 'Project C (Dharwad)', cost: 9.8, type: 'Peer Project', color: '#94a3b8' },
  { name: 'This Project (WRK9001)', cost: 18.0, type: 'Flagged Outlier', color: '#ef4444' }
];

export default function WhatChangedPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = TEMPORAL_CHANGE_ALERTS.filter(a => {
    if (selectedCategory === 'ALL') return true;
    return a.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-red-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-amber-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-amber-500/30 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400">
              MoSPI Temporal Delta Module
            </span>
            <span className="bg-red-500/20 text-red-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-red-400">
              Temporal Delta Radar
            </span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span>⚡ "What Changed?" Alert & Cost Outlier Benchmark</span>
          </h2>
          <p className="text-xs text-amber-200 max-w-3xl leading-relaxed">
            Highlights sudden anomalous temporal shifts in cost, status, or disbursement velocity, alongside multi-project cost outlier benchmarks.
          </p>
        </div>
      </div>

      {/* EXACT SLIDE 2 REPLICA: Project Analysis & Outlier Detector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block">
              Multi-Project Forensic Cost Analysis
            </span>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>PROJECT ANALYSIS & COST OUTLIER DETECTION</span>
            </h3>
          </div>
          <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
            MISMATCH DETECTED • FINAL RISK: HIGH
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Progress & Fund Utilization Bars (5 cols) */}
          <div className="lg:col-span-5 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Fund vs Physical Divergence
            </h4>

            {/* Fund Utilization Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Fund Utilization</span>
                <span className="text-red-600 font-mono">₹16.5L / ₹18.0L (92%)</span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full transition-all" style={{ width: '92%' }}></div>
              </div>
            </div>

            {/* Physical Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Physical Progress</span>
                <span className="text-indigo-600 font-mono">45%</span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="p-3 bg-red-100/60 border border-red-200 rounded-xl text-xs text-red-800 space-y-1 font-medium">
              <div className="font-bold flex items-center gap-1">
                <AlertTriangle size={14} className="text-red-600" />
                <span>Divergence Gap: +47% Excess Spending</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Financial disbursement is 47% ahead of verified site completion. Potential advance drain.
              </p>
            </div>
          </div>

          {/* Right: Similar Projects Outlier Comparison (7 cols) */}
          <div className="lg:col-span-7 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Similar Projects Peer Comparison (Same Scope)
                </h4>
                <p className="text-[11px] text-slate-400">Community RO Water Plants in neighboring blocks</p>
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                +84% Outlier
              </span>
            </div>

            {/* Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SIMILAR_PROJECTS_DATA} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <XAxis type="number" domain={[0, 22]} tick={{ fontSize: 10 }} unit="L" />
                  <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <Tooltip formatter={(val) => [`₹${val} Lakhs`, 'Sanctioned Cost']} />
                  <Bar dataKey="cost" radius={[0, 6, 6, 0]}>
                    {SIMILAR_PROJECTS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Project A</span>
                <span className="font-bold text-slate-800">₹9.2L</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Project B</span>
                <span className="font-bold text-slate-800">₹10.1L</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Project C</span>
                <span className="font-bold text-slate-800">₹9.8L</span>
              </div>
              <div className="p-2 bg-red-50 rounded-lg border border-red-200 text-red-700">
                <span className="text-[10px] text-red-500 block font-bold">This Project</span>
                <span className="font-black text-red-600">₹18.0L ← OUTLIER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "What Changed?" Temporal Shift Feed */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <History size={18} className="text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Live Temporal Shift Log (Sudden Audit State Changes)
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {['ALL', 'Disbursement', 'Escalation', 'Progress'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'All Deltas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Change Cards */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-300 transition-all space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.workId}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <span className="text-xs text-slate-400">({item.state})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={12} />
                    {item.detectedAt}
                  </span>
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.severity}
                  </span>
                </div>
              </div>

              {/* Before vs After Diff Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* BEFORE */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Baseline Audit State</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.before.date}</span>
                  </div>
                  <div className="font-medium text-slate-700 space-y-1">
                    <p><span className="text-slate-400">Financial:</span> {item.before.financial || item.before.expenditure}</p>
                    <p><span className="text-slate-400">Physical:</span> {item.before.physical || item.before.phys}</p>
                    <p><span className="text-slate-400">Status:</span> <span className="text-slate-600">{item.before.status}</span></p>
                  </div>
                </div>

                {/* AFTER */}
                <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-red-600 flex items-center gap-1">
                      <Zap size={11} className="text-red-500" />
                      Detected Shift (Current)
                    </span>
                    <span className="text-[10px] text-red-500 font-mono font-bold">DELTA ALERT</span>
                  </div>
                  <div className="font-medium text-slate-800 space-y-1">
                    <p><span className="text-slate-400">Financial:</span> <strong className="text-red-600">{item.after.financial || item.after.expenditure}</strong></p>
                    <p><span className="text-slate-400">Physical:</span> <strong className="text-slate-800">{item.after.physical || item.after.phys}</strong></p>
                    <p><span className="text-slate-400">Status:</span> <span className="font-bold text-red-700">{item.after.status}</span></p>
                  </div>
                </div>
              </div>

              {/* Delta Magnitude & Description */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Activity size={14} className="text-amber-700" />
                  <span>Anomalous Shift: {item.deltaMagnitude}</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  {item.triggerDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
