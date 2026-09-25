import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, KeyRound, CheckCircle2, Fingerprint, Award, Building, Landmark } from 'lucide-react';

const OFFICIAL_PERSONAS = [
  {
    id: 'cvc_dg',
    role: 'Central CVC Director General',
    name: 'Dr. P. K. Srivastava',
    title: 'Director General (Vigilance & Monitoring)',
    jurisdiction: 'Ministry (MoSPI) - National',
    username: 'admin',
    passcode: 'mplads2024',
    clearance: 'Level 4 (Full Pan-India Escrow Freeze Authority)',
    icon: Landmark,
    badgeColor: 'bg-indigo-900 text-indigo-200 border-indigo-700'
  },
  {
    id: 'dno_warangal',
    role: 'District Nodal Officer (DNO)',
    name: 'Shri A. K. Reddy, IAS',
    title: 'District Collector & Nodal Authority',
    jurisdiction: 'District - Warangal (Telangana)',
    username: 'dno_warangal',
    passcode: 'dno2024',
    clearance: 'Level 2 (District Ground Verification & MB Sign-off)',
    icon: Building,
    badgeColor: 'bg-amber-900 text-amber-200 border-amber-700'
  },
  {
    id: 'mp_warangal',
    role: 'Member of Parliament (MP)',
    name: 'Pasunoori Dayakar, MP',
    title: 'Lok Sabha Representative (Warangal South)',
    jurisdiction: 'Constituency - Warangal South',
    username: 'mp_warangal',
    passcode: 'mp2024',
    clearance: 'Level 1 (Constituency Fund Allocation Oversight)',
    icon: Award,
    badgeColor: 'bg-emerald-900 text-emerald-200 border-emerald-700'
  }
];

export default function LoginPage() {
  const [selectedPersona, setSelectedPersona] = useState(OFFICIAL_PERSONAS[0]);
  const [username, setUsername] = useState(OFFICIAL_PERSONAS[0].username);
  const [password, setPassword] = useState(OFFICIAL_PERSONAS[0].passcode);
  const [usePasskey, setUsePasskey] = useState(false);
  const [passkeyVerifying, setPasskeyVerifying] = useState(false);
  const [passkeyVerified, setPasskeyVerified] = useState(false);

  const navigate = useNavigate();

  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona);
    setUsername(persona.username);
    setPassword(persona.passcode);
    setPasskeyVerified(false);
  };

  const handleSimulatePasskey = () => {
    setPasskeyVerifying(true);
    setTimeout(() => {
      setPasskeyVerifying(false);
      setPasskeyVerified(true);
    }, 1200);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('mplads_auth', 'true');
      localStorage.setItem('mplads_user_persona', JSON.stringify({
        name: selectedPersona.name,
        role: selectedPersona.role,
        title: selectedPersona.title,
        jurisdiction: selectedPersona.jurisdiction,
        clearance: selectedPersona.clearance
      }));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d111d] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Portal Info & Persona Switcher (7 cols) */}
        <div className="md:col-span-7 space-y-5 text-white">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-700/60 px-3 py-1 rounded-full text-indigo-300 text-xs font-semibold">
              <Shield size={14} className="text-indigo-400" />
              <span>MoSPI Central Vigilance Authentication Portal</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">
              MPLADS <span className="text-indigo-400">SENTINEL</span>
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Powered Anomaly Detection & Fund Integrity Platform for Members of Parliament Local Area Development Scheme.
            </p>
          </div>

          {/* Persona Switcher Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Official Gov.in Login Persona:
              </span>
              <span className="text-[10px] text-indigo-400 font-mono">1-Click Auth Demo</span>
            </div>

            <div className="space-y-2.5">
              {OFFICIAL_PERSONAS.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedPersona.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPersona(p)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className={isSelected ? 'text-indigo-400' : 'text-slate-500'} />
                        <span className="font-bold text-xs text-white">{p.role}</span>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${p.badgeColor}`}>
                        {p.clearance.split(' ')[0]}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-300 ml-6">{p.name}</p>
                    <p className="text-[11px] text-slate-500 ml-6 truncate">{p.title} &bull; {p.jurisdiction}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Card (5 cols) */}
        <div className="md:col-span-5 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5">
          <div className="text-center pb-3 border-b border-slate-700/70">
            <div className="w-12 h-12 bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 rounded-xl flex items-center justify-center mx-auto mb-2">
              <KeyRound size={22} />
            </div>
            <h2 className="text-base font-bold text-white">Government Access Gate</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Authenticated for <strong className="text-indigo-300">{selectedPersona.name}</strong>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">Govt Username / Nodal ID</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 font-semibold block mb-1">Security Passcode</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  required
                />
              </div>
            </div>

            {/* Simulated Aadhaar e-Sign / Passkey Bar */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 text-center space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <Fingerprint size={14} className="text-indigo-400" />
                  Aadhaar e-KYC Passkey
                </span>
                <span className="text-[9px] text-emerald-400 font-mono">2FA Hardware Ready</span>
              </div>

              {passkeyVerified ? (
                <div className="p-2 bg-emerald-950/80 border border-emerald-700/60 rounded-lg text-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Passkey Verified: TOKEN-GOV-9821-X</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSimulatePasskey}
                  disabled={passkeyVerifying}
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {passkeyVerifying ? (
                    <span className="text-indigo-400 animate-pulse">Reading Biometric Token...</span>
                  ) : (
                    <span>Simulate Aadhaar Passkey Sign-In</span>
                  )}
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Authenticate & Access Sentinel</span>
            </button>
          </form>

          <div className="text-center text-[10px] text-slate-500 pt-1 border-t border-slate-700/50">
            Security Protocol: <span className="text-slate-400 font-mono">TLS 1.3 &bull; AES-256 Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
