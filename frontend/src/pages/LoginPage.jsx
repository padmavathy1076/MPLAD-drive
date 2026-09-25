import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('mplads2024');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('mplads_auth', 'true');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex bg-indigo-600 p-3 rounded-xl text-white mb-3">
            <Shield size={36} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">MPLADS SENTINEL</h1>
          <p className="text-xs text-indigo-400 font-medium tracking-wider uppercase mt-1">Govt. Vigilance Platform</p>
          <p className="text-xs text-slate-400 mt-3 border-t border-slate-700 pt-3">
            Restricted portal for authorized Central, State, and District government personnel. Authentication required under Public Procurement Vigilance Guidelines.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1">Government ID / Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1">Passcode</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-lg cursor-pointer mt-2"
          >
            Authenticate & Access Portal
          </button>
        </form>

        <div className="mt-6 text-center text-[11px] text-slate-500 border-t border-slate-700/50 pt-4">
          Default Credentials: <span className="text-indigo-400 font-mono">admin / mplads2024</span>
        </div>
      </div>
    </div>
  );
}
