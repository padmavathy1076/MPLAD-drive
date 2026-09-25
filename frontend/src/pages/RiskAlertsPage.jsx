import React, { useState } from 'react';
import { ShieldAlert, Filter, X, Search, Download, Eye } from 'lucide-react';

const ALL_ALERTS = [
  { id: 'WRK0001', name: 'School Building — Warangal South', state: 'Telangana', district: 'Warangal', risk: 89.5, type: 'Ghost Project', budget: '2.19', vendor: 'VEND271', phys: 10, fin: 98, warning: 'Disbursement Divergence: Financial (98%) is 88% ahead of Physical (10%). Potential Ghost Billing.', rf: 91.2, xgb: 88.6, lgbm: 89.1, if: -0.38 },
  { id: 'WRK0002', name: 'Water Supply Scheme — Patna West', state: 'Bihar', district: 'Patna', risk: 84.2, type: 'Lump-Sum Siphoning', budget: '4.50', vendor: 'VEND104', phys: 22, fin: 95, warning: 'Payment Concentration: 95% of total budget disbursed in a single tranche within 30 days of sanction.', rf: 85.1, xgb: 83.7, lgbm: 84.0, if: -0.31 },
  { id: 'WRK0003', name: 'Community Solar Plant — Nalgonda', state: 'Telangana', district: 'Nalgonda', risk: 82.8, type: 'Ghost Project', budget: '1.85', vendor: 'VEND339', phys: 8, fin: 91, warning: 'Satellite GIS verification shows zero solar panel installation at geo-tagged site coordinates.', rf: 83.2, xgb: 82.5, lgbm: 82.8, if: -0.34 },
  { id: 'WRK0004', name: 'Public Toilet Complex — Thane North', state: 'Maharashtra', district: 'Thane', risk: 76.8, type: 'Lump-Sum Siphoning', budget: '0.95', vendor: 'VEND088', phys: 25, fin: 92, warning: 'Physical lag: 92% disbursed while only 25% structure completed per field inspection report.', rf: 78.3, xgb: 75.9, lgbm: 76.4, if: -0.26 },
  { id: 'WRK0005', name: 'Rural Road Widening — Aurangabad', state: 'Maharashtra', district: 'Aurangabad', risk: 73.4, type: 'Severe Cost Overrun', budget: '2.60', vendor: 'VEND201', phys: 40, fin: 110, warning: 'Expenditure exceeds sanctioned ceiling by 10% without revised technical sanction from MoSPI.', rf: 74.1, xgb: 73.2, lgbm: 72.9, if: -0.22 },
  { id: 'WRK0006', name: 'Anganwadi Centre — Muzaffarpur', state: 'Bihar', district: 'Muzaffarpur', risk: 71.9, type: 'Ghost Project', budget: '0.75', vendor: 'VEND067', phys: 5, fin: 78, warning: 'Zero physical structure found. Contractor VEND067 flagged in 3 other ghost project cases in Bihar.', rf: 72.8, xgb: 71.5, lgbm: 71.4, if: -0.29 },
  { id: 'WRK0007', name: 'Community Hall — Ranchi Central', state: 'Jharkhand', district: 'Ranchi', risk: 81.4, type: 'Severe Cost Overrun', budget: '3.80', vendor: 'VEND155', phys: 55, fin: 135, warning: 'Expenditure claims exceed sanctioned ceiling by 135% without revised MoSPI technical sanction.', rf: 82.1, xgb: 81.0, lgbm: 81.1, if: -0.29 },
  { id: 'WRK0008', name: 'Drinking Water Pipeline — Gorakhpur', state: 'Uttar Pradesh', district: 'Gorakhpur', risk: 79.5, type: 'Lump-Sum Siphoning', budget: '3.20', vendor: 'VEND312', phys: 15, fin: 88, warning: 'High single-tranche payment (82%) to vendor before third-party physical inspection sign-off.', rf: 80.2, xgb: 79.1, lgbm: 79.2, if: -0.28 },
  { id: 'WRK0009', name: 'Road Construction — Barabanki', state: 'Uttar Pradesh', district: 'Barabanki', risk: 78.9, type: 'Ghost Project', budget: '1.75', vendor: 'VEND042', phys: 0, fin: 85, warning: 'Zero road layer found on satellite and physical inspection. 85% funds drained via two tranches.', rf: 79.5, xgb: 78.6, lgbm: 78.6, if: -0.35 },
  { id: 'WRK0010', name: 'Village Market Complex — Saharsa', state: 'Bihar', district: 'Saharsa', risk: 77.3, type: 'Lump-Sum Siphoning', budget: '2.10', vendor: 'VEND199', phys: 18, fin: 90, warning: 'Single-day bulk payment of ₹1.89 Cr flagged. No MB records or inspection certificate on file.', rf: 78.1, xgb: 77.0, lgbm: 76.8, if: -0.24 },
  { id: 'WRK0011', name: 'Rural Health Sub-Centre — Madhubani', state: 'Bihar', district: 'Madhubani', risk: 75.8, type: 'Ghost Project', budget: '1.40', vendor: 'VEND089', phys: 12, fin: 89, warning: 'Drone imagery shows only foundation laid. All 3 progress certificates issued retroactively.', rf: 76.2, xgb: 75.5, lgbm: 75.8, if: -0.27 },
  { id: 'WRK0012', name: 'Check Dam Construction — Bidar', state: 'Karnataka', district: 'Bidar', risk: 72.1, type: 'Severe Cost Overrun', budget: '5.50', vendor: 'VEND441', phys: 60, fin: 118, warning: 'Water retention tests failed but payment released in full. Material grade mismatch reported.', rf: 73.0, xgb: 72.1, lgbm: 71.2, if: -0.20 },
];

export default function RiskAlertsPage() {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filtered = ALL_ALERTS.filter(a => {
    const matchType = filterType === 'all' || a.type === filterType;
    const matchSearch = (a.name + a.state + a.id + a.district).toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const handleExport = () => {
    const headers = ['Work ID', 'Work Name', 'State', 'District', 'Budget (Cr)', 'Risk Score', 'Fraud Archetype', 'Vendor'];
    const rows = filtered.map(a => [a.id, `"${a.name}"`, a.state, a.district, a.budget, `${a.risk}%`, a.type, a.vendor]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `MPLADS_Risk_Alerts_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const critCount = ALL_ALERTS.filter(a => a.risk >= 80).length;
  const highCount = ALL_ALERTS.filter(a => a.risk >= 70 && a.risk < 80).length;

  return (
    <div className="space-y-5 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-red-900 to-red-950 text-white p-5 rounded-2xl shadow-lg border border-red-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <ShieldAlert size={22} className="text-red-300" />
              <h2 className="text-xl font-bold tracking-wide">Critical & High-Risk Priority Queue</h2>
              <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-400 animate-pulse">
                245 Active Alerts
              </span>
            </div>
            <p className="text-xs text-red-200 mt-1.5">
              Projects ranked by composite ML risk score • Physical progress lag • Payment concentration anomaly
            </p>
            <div className="flex items-center gap-3 mt-2 text-[11px] font-semibold">
              <span className="bg-red-700/60 border border-red-600 px-2 py-0.5 rounded-full text-red-200">
                🔴 {critCount} Critical (≥80%)
              </span>
              <span className="bg-amber-700/40 border border-amber-600 px-2 py-0.5 rounded-full text-amber-200">
                🟠 {highCount} High (70–79%)
              </span>
              <span className="bg-slate-700/50 border border-slate-600 px-2 py-0.5 rounded-full text-slate-200">
                📋 Showing {filtered.length} of {ALL_ALERTS.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer self-start md:self-auto"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Work ID, name, state, or district..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-2 text-xs w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1 text-xs">
          <Filter size={12} className="text-slate-400 ml-1" />
          {['all', 'Ghost Project', 'Lump-Sum Siphoning', 'Severe Cost Overrun'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors whitespace-nowrap ${
                filterType === type
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white'
              }`}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
            No alerts match your current filters.
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border border-red-100 shadow-xs hover:border-red-300 hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="space-y-2 flex-1 min-w-0">
                {/* Top row: ID, name, badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[11px] text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded">{item.id}</span>
                  <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                  <span
                    className="text-white text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: item.risk >= 85 ? '#dc2626' : item.risk >= 75 ? '#ea580c' : '#d97706' }}
                  >
                    Risk: {item.risk}%
                  </span>
                  <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    {item.type}
                  </span>
                </div>

                {/* Location + budget */}
                <p className="text-xs text-slate-500">
                  📍 {item.district}, {item.state} &nbsp;|&nbsp; 💰 Budget: ₹{item.budget} Cr &nbsp;|&nbsp; 🏢 Vendor: {item.vendor}
                </p>

                {/* Progress bar visual */}
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-slate-500 w-16">Physical:</span>
                  <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${item.phys}%` }} />
                  </div>
                  <span className="font-bold text-indigo-700">{item.phys}%</span>
                  <span className="text-slate-400 mx-1">vs</span>
                  <span className="text-slate-500 w-16">Financial:</span>
                  <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${Math.min(item.fin, 100)}%` }} />
                  </div>
                  <span className="font-bold text-red-600">{item.fin}%</span>
                </div>

                {/* Warning */}
                <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg text-xs text-red-700 font-medium">
                  ⚠️ {item.warning}
                </div>
              </div>

              <button
                onClick={() => setSelectedAlert(item)}
                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap self-start md:self-auto"
              >
                <Eye size={14} />
                Inspect
              </button>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CVC Vigilance Audit File</span>
                <h3 className="font-bold text-base mt-0.5">{selectedAlert.id}: {selectedAlert.name}</h3>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-white cursor-pointer transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Score summary */}
              <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Composite Risk</p>
                  <p className="text-3xl font-black text-red-600">{selectedAlert.risk}%</p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">Random Forest</span>
                    <span className="font-bold text-slate-800">{selectedAlert.rf}%</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">XGBoost</span>
                    <span className="font-bold text-slate-800">{selectedAlert.xgb}%</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">LightGBM</span>
                    <span className="font-bold text-slate-800">{selectedAlert.lgbm}%</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">Isolation Forest</span>
                    <span className="font-bold text-slate-800">{selectedAlert.if}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <p><span className="text-slate-400 font-bold">State/District:</span> <span className="font-semibold text-slate-700">{selectedAlert.district}, {selectedAlert.state}</span></p>
                  <p><span className="text-slate-400 font-bold">Sanctioned Budget:</span> <span className="font-semibold text-slate-700">₹{selectedAlert.budget} Cr</span></p>
                  <p><span className="text-slate-400 font-bold">Vendor ID:</span> <span className="font-semibold text-slate-700">{selectedAlert.vendor}</span></p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <p><span className="text-slate-400 font-bold">Physical Progress:</span> <span className="font-bold text-indigo-600">{selectedAlert.phys}%</span></p>
                  <p><span className="text-slate-400 font-bold">Financial Progress:</span> <span className="font-bold text-red-600">{selectedAlert.fin}%</span></p>
                  <p><span className="text-slate-400 font-bold">Divergence Delta:</span> <span className="font-bold text-red-700">+{selectedAlert.fin - selectedAlert.phys}%</span></p>
                </div>
              </div>

              {/* Warning */}
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium">
                ⚠️ <strong>CVC Finding:</strong> {selectedAlert.warning}
              </div>

              {/* Archetype */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Fraud Classification:</span>
                <span className="bg-purple-100 text-purple-700 border border-purple-200 font-bold px-3 py-1 rounded-lg">{selectedAlert.type}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Close Audit File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}