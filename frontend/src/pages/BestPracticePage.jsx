import React, { useState } from 'react';
import { 
  Award, CheckCircle2, TrendingUp, Download, Star, 
  Filter, Search, Building2, MapPin, Calendar, FileCheck,
  ArrowUpRight, BarChart3, ShieldCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BEST_PRACTICE_PROJECTS = [
  {
    id: 'BENCH-001',
    name: 'Integrated Solar Rooftop & Digital Classroom Initiative',
    state: 'Assam',
    district: 'Kamrup Metro',
    mpName: 'Queen Oja, MP',
    sanctioned: '₹1.80 Cr',
    actualSpent: '₹1.72 Cr',
    savings: '₹8.0 Lakhs (4.4% Under Budget)',
    timeline: '6 Months (Finished 35 Days Early)',
    physProgress: 100,
    finProgress: 95.5,
    efficiencyScore: 99.4,
    sector: 'Education & Solar',
    keyFactors: [
      'Pre-tender vendor technical prequalification',
      'Milestone-locked payments with mandatory 4-point drone geo-tagging',
      'Active citizen parent-teacher committee oversight board'
    ],
    verifiedBy: 'State Technical Auditor & Third-Party IIT Guwahati Inspection'
  },
  {
    id: 'BENCH-002',
    name: 'Smart SCADA Community RO Drinking Water Grid (24 Plants)',
    state: 'Odisha',
    district: 'Ganjam',
    mpName: 'Pramila Bisoyi, MP',
    sanctioned: '₹3.40 Cr',
    actualSpent: '₹3.28 Cr',
    savings: '₹12.0 Lakhs Saved',
    timeline: '8 Months (Zero Delay)',
    physProgress: 100,
    finProgress: 96.4,
    efficiencyScore: 98.8,
    sector: 'Drinking Water',
    keyFactors: [
      'IoT smart water flow meters tied directly to payment releases',
      'Zero single-payment concentration (6 staggered progress tranches)',
      '10-year warranty bond held in municipal escrow'
    ],
    verifiedBy: 'Central Ground Water Board & Public Health Engineering'
  },
  {
    id: 'BENCH-003',
    name: 'All-Weather Rural Bituminous Ring Road Network',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    mpName: 'Parliamentary Constituency Development Cell',
    sanctioned: '₹5.20 Cr',
    actualSpent: '₹5.15 Cr',
    savings: '₹5.0 Lakhs Saved',
    timeline: '10 Months (On-Schedule)',
    physProgress: 100,
    finProgress: 99.0,
    efficiencyScore: 98.2,
    sector: 'Road Connectivity',
    keyFactors: [
      'Geotextile asphalt material testing verified before each layer sign-off',
      'Transparent open e-procurement on GeM portal with 7 bidders',
      'Weekly automated satellite progress matching against planned Gantt chart'
    ],
    verifiedBy: 'State PWD Chief Engineer Inspection'
  },
  {
    id: 'BENCH-004',
    name: 'Model Solar-Powered Anganwadi Early Child Care Hubs',
    state: 'Assam',
    district: 'Dibrugarh',
    mpName: 'Rameswar Teli, MP',
    sanctioned: '₹1.10 Cr',
    actualSpent: '₹1.05 Cr',
    savings: '₹5.0 Lakhs Saved',
    timeline: '5 Months (Finished 2 Weeks Early)',
    physProgress: 100,
    finProgress: 95.4,
    efficiencyScore: 97.9,
    sector: 'Child Welfare',
    keyFactors: [
      'Standardized prefabricated modular construction design',
      'Biometric contractor labor verification',
      'Community self-help group social audit conducted before final disbursement'
    ],
    verifiedBy: 'District Social Welfare Directorate'
  },
  {
    id: 'BENCH-005',
    name: 'High-Density Rural Rainwater Harvesting & Percolation Ponds',
    state: 'Odisha',
    district: 'Mayurbhanj',
    mpName: 'Er. Bishweswar Tudu, MP',
    sanctioned: '₹2.10 Cr',
    actualSpent: '₹1.98 Cr',
    savings: '₹12.0 Lakhs Saved',
    timeline: '7 Months (Zero Cost Escalation)',
    physProgress: 100,
    finProgress: 94.2,
    efficiencyScore: 97.5,
    sector: 'Water Conservation',
    keyFactors: [
      'GIS hydro-geological mapping for optimal site selection',
      'Direct DBT payment transfers to local labor cooperatives',
      'Zero administrative delay in site handover'
    ],
    verifiedBy: 'National Remote Sensing Centre (NRSC) Bhuvan Verification'
  }
];

// Exact Slide 2 Distribution Data
const PERFORMANCE_DATA = [
  { state: 'Assam', sanctioned: 105, disbursed: 85.5, rate: 81.4, category: 'Better Performer' },
  { state: 'Uttar Pradesh', sanctioned: 555, disbursed: 446, rate: 80.4, category: 'Better Performer' },
  { state: 'Odisha', sanctioned: 155, disbursed: 116.5, rate: 75.2, category: 'Better Performer' },
  { state: 'Tamil Nadu', sanctioned: 285, disbursed: 111, rate: 38.9, category: 'Laggard' },
  { state: 'Kerala', sanctioned: 145, disbursed: 54, rate: 37.2, category: 'Laggard' },
  { state: 'Gujarat', sanctioned: 185, disbursed: 66, rate: 35.7, category: 'Laggard' },
];

export default function BestPracticePage() {
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = BEST_PRACTICE_PROJECTS.filter(p => {
    const matchSector = selectedSector === 'ALL' || p.sector.toLowerCase().includes(selectedSector.toLowerCase());
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.mpName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSector && matchSearch;
  });

  const handleDownloadBlueprint = (project) => {
    const text = `========================================================================
MPLADS SENTINEL — REPLICABLE BEST-PRACTICE BLUEPRINT
========================================================================
PROJECT CODE: ${project.id}
PROJECT TITLE: ${project.name}
JURISDICTION: ${project.district}, ${project.state}
SPONSORING MP: ${project.mpName}
EFFICIENCY RATING: ${project.efficiencyScore} / 100 (5-STAR EXCELLENCE)

1. FINANCIAL & TIME INTEGRITY
------------------------------------------------------------------------
Sanctioned Ceiling:     ${project.sanctioned}
Actual Payout:          ${project.actualSpent}
Fiscal Savings:         ${project.savings}
Execution Velocity:     ${project.timeline}
Physical / Fin Ratio:   ${project.physProgress}% Physical | ${project.finProgress}% Disbursed (Zero Leakage)

2. CORE REPLICATION PILLARS (KEY SUCCESS FACTORS)
------------------------------------------------------------------------
${project.keyFactors.map((k, i) => `[${i + 1}] ${k}`).join('\n')}

3. VERIFICATION & OVERSIGHT BENCHMARK
------------------------------------------------------------------------
Certified By: ${project.verifiedBy}

RECOMMENDATION FOR OTHER CONSTITUENCIES:
Adopt this contracting model for ${project.sector} works under revised MoSPI 2023 guidelines.
========================================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MPLADS_BestPractice_Blueprint_${project.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-emerald-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400">
              SIH 2026 Innovation #2
            </span>
            <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-teal-400">
              Positive Governance Engine
            </span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span>🏆 Best-Practice Finder: Benchmark Governance Engine</span>
          </h2>
          <p className="text-xs text-emerald-200 max-w-3xl leading-relaxed">
            Identifies successful, 100% on-time, on-budget, zero-leakage MPLADS projects to create downloadable, replicable operational blueprints for all 543 MPs.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400">Certified Benchmarks</p>
          <p className="text-xl font-black text-emerald-600 mt-1">1,842 Works</p>
          <span className="text-[10px] text-slate-500 font-medium">100% On-Time Execution</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400">Successfully Executed</p>
          <p className="text-xl font-black text-slate-800 mt-1">₹1,215 Cr</p>
          <span className="text-[10px] text-emerald-600 font-medium">Zero Fund Diversion</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400">Public Funds Saved</p>
          <p className="text-xl font-black text-indigo-600 mt-1">₹48.2 Cr</p>
          <span className="text-[10px] text-slate-500 font-medium">Via Competitive E-Tenders</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400">Citizen Satisfaction</p>
          <p className="text-xl font-black text-amber-500 mt-1">4.9 / 5.0</p>
          <span className="text-[10px] text-slate-500 font-medium">Social Audit Sign-Offs</span>
        </div>
      </div>

      {/* Slide 2 Exact Replica: Distribution Picture (Better Performers vs Laggards) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
              Slide 2 Ground Truth Comparison
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              National Distribution Picture: Better Performers vs Laggards
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">MoSPI Expenditure Utilization %</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_DATA} layout="vertical" margin={{ left: 10, right: 30 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="state" type="category" width={90} tick={{ fontSize: 11, fontWeight: 'bold' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Fund Disbursement Rate']} />
                <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
                  {PERFORMANCE_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.category === 'Better Performer' ? '#10b981' : '#f97316'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
              <h4 className="font-bold text-emerald-900 flex items-center gap-1.5 uppercase text-[11px]">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Better Performers
              </h4>
              <div className="space-y-1.5 font-medium text-emerald-950">
                <div className="flex justify-between">
                  <span>Assam (85.5 Cr / 105 Cr)</span>
                  <span className="font-bold text-emerald-700">81.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Uttar Pradesh (446 Cr / 555 Cr)</span>
                  <span className="font-bold text-emerald-700">80.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Odisha (116.5 Cr / 155 Cr)</span>
                  <span className="font-bold text-emerald-700">75.2%</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2.5">
              <h4 className="font-bold text-amber-900 flex items-center gap-1.5 uppercase text-[11px]">
                <TrendingUp size={14} className="text-amber-600" />
                Laggards (Low Burn Rate)
              </h4>
              <div className="space-y-1.5 font-medium text-amber-950">
                <div className="flex justify-between">
                  <span>Tamil Nadu (111 Cr / 285 Cr)</span>
                  <span className="font-bold text-amber-700">38.9%</span>
                </div>
                <div className="flex justify-between">
                  <span>Kerala (54 Cr / 145 Cr)</span>
                  <span className="font-bold text-amber-700">37.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Gujarat (66 Cr / 185 Cr)</span>
                  <span className="font-bold text-amber-700">35.7%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search best practices by MP, title, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs no-scrollbar">
          {['ALL', 'Education', 'Water', 'Road', 'Solar'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-lg font-bold text-[11px] cursor-pointer transition-colors whitespace-nowrap ${
                selectedSector === sec
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sec === 'ALL' ? 'All Sectors' : sec}
            </button>
          ))}
        </div>
      </div>

      {/* Benchmark Project Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {proj.id}
                </span>

                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 text-[11px] font-bold">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  <span>Score: {proj.efficiencyScore}%</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">{proj.name}</h4>

              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin size={13} className="text-slate-400 shrink-0" />
                <span>{proj.district}, {proj.state} &nbsp;|&nbsp; <strong>{proj.mpName}</strong></span>
              </p>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Sanctioned</span>
                  <span className="font-bold text-slate-800">{proj.sanctioned}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Actual Spent</span>
                  <span className="font-bold text-emerald-600">{proj.actualSpent}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block">Fiscal Savings</span>
                  <span className="font-bold text-indigo-600">{proj.savings}</span>
                </div>
              </div>

              {/* Key Factors */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Success Hallmarks:
                </span>
                <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                  {proj.keyFactors.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 italic">
                Verified: {proj.verifiedBy.slice(0, 32)}...
              </span>

              <button
                onClick={() => handleDownloadBlueprint(proj)}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>Replication Blueprint</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
