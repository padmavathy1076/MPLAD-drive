import React, { useState } from 'react';
import { Search, Eye, X, ShieldAlert } from 'lucide-react';

const ALL_INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi (NCT)', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
];

const initialProjects = ALL_INDIAN_STATES.flatMap((state, index) => [
  {
    work_id: `WRK${String(index * 2 + 1).padStart(4, '0')}`,
    work_name: `Road Construction - ${state} Central`,
    state: state,
    district: `${state} District 1`,
    sanctioned_amount: 2.50,
    expenditure: 2.40,
    physical_progress_pct: 20,
    financial_progress_pct: 95,
    risk_score: 84.5,
    vendor_id: `VEND${String(index + 10).padStart(3, '0')}`,
    days_since_sanction: 210,
    fraud_type: 'Lump-Sum Siphoning'
  },
  {
    work_id: `WRK${String(index * 2 + 2).padStart(4, '0')}`,
    work_name: `Water Supply Scheme - ${state} North`,
    state: state,
    district: `${state} District 2`,
    sanctioned_amount: 1.80,
    expenditure: 1.20,
    physical_progress_pct: 70,
    financial_progress_pct: 65,
    risk_score: 24.1,
    vendor_id: `VEND${String(index + 50).padStart(3, '0')}`,
    days_since_sanction: 340,
    fraud_type: 'Normal'
  }
]);

export default function ProjectsPage() {
  const [projects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.work_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.work_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vendor_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = stateFilter === '' || p.state === stateFilter;

    let matchesRisk = true;
    if (riskFilter === 'critical') matchesRisk = p.risk_score >= 75;
    else if (riskFilter === 'high') matchesRisk = p.risk_score >= 55 && p.risk_score < 75;
    else if (riskFilter === 'medium') matchesRisk = p.risk_score >= 35 && p.risk_score < 55;
    else if (riskFilter === 'low') matchesRisk = p.risk_score < 35;

    return matchesSearch && matchesState && matchesRisk;
  });

  const getRiskBadge = (score) => {
    if (score >= 75) return <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Critical ({score}%)</span>;
    if (score >= 55) return <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">High ({score}%)</span>;
    if (score >= 35) return <span className="bg-amber-400 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">Medium ({score}%)</span>;
    return <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Low ({score}%)</span>;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Projects Explorer & Risk Priority Queue</h2>
          <p className="text-xs text-slate-400">Pan-India coverage across all 32 States & UTs ({projects.length} Works)</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search work, ID, vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-60 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* State Filter - All Indian States */}
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="">All States & UTs</option>
            {ALL_INDIAN_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Risk Bands</option>
            <option value="critical">Critical (≥75)</option>
            <option value="high">High (55-74)</option>
            <option value="medium">Medium (35-54)</option>
            <option value="low">Low (&lt;35)</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Work ID</th>
                <th className="p-3.5">Work Name & District</th>
                <th className="p-3.5">State</th>
                <th className="p-3.5">Budget</th>
                <th className="p-3.5">Exp.</th>
                <th className="p-3.5">Phys / Fin %</th>
                <th className="p-3.5">Risk Score</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((p) => (
                <tr key={p.work_id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono text-slate-500 font-medium">{p.work_id}</td>
                  <td className="p-3.5 font-semibold text-slate-800">
                    {p.work_name}
                    <span className="block text-[10px] text-slate-400 font-normal">Vendor: {p.vendor_id}</span>
                  </td>
                  <td className="p-3.5 font-medium">{p.state}</td>
                  <td className="p-3.5 font-medium">₹{p.sanctioned_amount} Cr</td>
                  <td className="p-3.5">₹{p.expenditure} Cr</td>
                  <td className="p-3.5">
                    <div className="space-y-1 w-24">
                      <div className="flex justify-between text-[10px]">
                        <span>Phys: {p.physical_progress_pct}%</span>
                        <span>Fin: {p.financial_progress_pct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(100, p.physical_progress_pct)}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">{getRiskBadge(p.risk_score)}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="inline-flex items-center gap-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      <Eye size={12} /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center font-medium">
          Showing all {filteredProjects.length} works across 32 States & UTs of India
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selectedProject.work_name}</h3>
                <p className="text-xs text-slate-500">Work ID: {selectedProject.work_id} | State: {selectedProject.state}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl text-xs">
              <div><span className="text-slate-400 block">Sanctioned Budget:</span> <strong className="text-slate-800">₹{selectedProject.sanctioned_amount} Cr</strong></div>
              <div><span className="text-slate-400 block">Disbursed Expenditure:</span> <strong className="text-slate-800">₹{selectedProject.expenditure} Cr</strong></div>
              <div><span className="text-slate-400 block">Physical Progress:</span> <strong className="text-slate-800">{selectedProject.physical_progress_pct}%</strong></div>
              <div><span className="text-slate-400 block">Financial Progress:</span> <strong className="text-slate-800">{selectedProject.financial_progress_pct}%</strong></div>
              <div><span className="text-slate-400 block">Vendor ID:</span> <strong className="text-slate-800">{selectedProject.vendor_id}</strong></div>
              <div><span className="text-slate-400 block">Days Since Sanction:</span> <strong className="text-slate-800">{selectedProject.days_since_sanction} days</strong></div>
            </div>

            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <span className="text-xs font-bold text-red-700 block">ML Fraud Classification: {selectedProject.fraud_type}</span>
              <p className="text-xs text-red-600">
                Risk Score: {selectedProject.risk_score}% | Anomaly Score detected by Isolation Forest.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}