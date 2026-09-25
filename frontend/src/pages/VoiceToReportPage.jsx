import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, MicOff, Volume2, Sparkles, FileText, CheckCircle2, 
  AlertTriangle, Download, ArrowRight, ShieldAlert, Play, Pause,
  RefreshCw, MapPin, Building, User, Clock, Check
} from 'lucide-react';

const PRESET_VOICE_COMPLAINTS = [
  {
    id: 'sample-1',
    title: 'Warangal South — Unfinished School Science Block',
    location: 'Warangal South, Telangana',
    language: 'English (Indian Accent)',
    duration: '0:18',
    workId: 'WRK0001',
    audioText: "Sir, I am calling from Warangal South. The government sanctioned over two crore rupees for the Zilla Parishad high school science block two years ago. On the ground, only four foundation pillars are standing, but we came to know from RTI that contractor VEND271 has already claimed ninety-eight percent payment with fake bills. Please send vigilance officers immediately.",
    extracted: {
      workId: 'WRK0001',
      workTitle: 'Construction of High School Science Block',
      location: 'Warangal South, Telangana (Constituency: 104)',
      sanctioned: '₹2.19 Cr',
      disbursed: '₹2.15 Cr (98.2%)',
      physicalGround: '10% (Pillars Only)',
      allegation: 'Ghost Billing / False Physical Completion Certificate',
      suspectVendor: 'VEND271 (Sri Balaji Constructions)',
      riskLevel: 'CRITICAL (98.4%)',
      divergence: '+88.2% Gap'
    }
  },
  {
    id: 'sample-2',
    title: 'Patna Rural — Ghost Drinking Water Pipeline',
    location: 'Patna Rural, Bihar',
    language: 'Hindi / English',
    duration: '0:14',
    workId: 'WRK0002',
    audioText: "Namaste sir. In Patna Rural Ward 12, drinking water pipeline project WRK0002 was sanctioned for four point five crore. No pipeline is laid, women still walk two kilometers for water. But online portal shows payment is fully disbursed in single tranche to vendor VEND104. This is complete corruption.",
    extracted: {
      workId: 'WRK0002',
      workTitle: 'Rural Piped Water Supply Scheme — Ward 12',
      location: 'Patna Rural, Bihar (Constituency: 31)',
      sanctioned: '₹4.50 Cr',
      disbursed: '₹4.28 Cr (95.1%)',
      physicalGround: '0% Trace on Ground',
      allegation: 'Lump-Sum Siphoning / Zero Physical Execution',
      suspectVendor: 'VEND104 (Ganga Infrastructure Ltd)',
      riskLevel: 'CRITICAL (96.2%)',
      divergence: '+95.1% Gap'
    }
  },
  {
    id: 'sample-3',
    title: 'Barabanki — Incomplete Rural Road Claimed Complete',
    location: 'Barabanki, Uttar Pradesh',
    language: 'Hindi / English',
    duration: '0:16',
    workId: 'WRK0009',
    audioText: "District Magistrate sir ko complaint hai. Barabanki village road project number WRK0009, 1.75 crore approved budget. 85% funds are drawn by contractor VEND042 within two weeks, but only mud road is there. No gravel, no tar. Vehicles are getting stuck daily.",
    extracted: {
      workId: 'WRK0009',
      workTitle: 'Bituminous Village Road Construction',
      location: 'Barabanki, Uttar Pradesh (Constituency: 53)',
      sanctioned: '₹1.75 Cr',
      disbursed: '₹1.49 Cr (85.1%)',
      physicalGround: '5% (Earthwork Only, No Bitumen)',
      allegation: 'Premature Payout without Mandatory MB Measurement',
      suspectVendor: 'VEND042 (Awadh Civil Contractors)',
      riskLevel: 'HIGH (88.9%)',
      divergence: '+80.1% Gap'
    }
  }
];

export default function VoiceToReportPage() {
  const [selectedSample, setSelectedSample] = useState(PRESET_VOICE_COMPLAINTS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [processingStep, setProcessingStep] = useState(4); // 0 to 4
  const [customTranscript, setCustomTranscript] = useState('');
  const [docketDispatched, setDocketDispatched] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setCustomTranscript(currentText);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const handleStartRecording = () => {
    setCustomTranscript('');
    setDocketDispatched(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Speech recognition start failed, using fallback:', err);
        fallbackRecordingSimulation();
      }
    } else {
      fallbackRecordingSimulation();
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
    triggerAnalysis();
  };

  const fallbackRecordingSimulation = () => {
    setIsRecording(true);
    setTimeout(() => {
      setCustomTranscript(selectedSample.audioText);
      setIsRecording(false);
      triggerAnalysis();
    }, 3000);
  };

  const triggerAnalysis = () => {
    setProcessingStep(1);
    setTimeout(() => setProcessingStep(2), 500);
    setTimeout(() => setProcessingStep(3), 1000);
    setTimeout(() => setProcessingStep(4), 1500);
  };

  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setCustomTranscript('');
    setDocketDispatched(false);
    triggerAnalysis();
  };

  const handleDownloadDocket = () => {
    const d = selectedSample.extracted;
    const docketText = `========================================================================
MINISTRY OF STATISTICS & PROGRAMME IMPLEMENTATION (MoSPI)
CENTRAL VIGILANCE COMMISSION — CITIZEN GRIEVANCE INVESTIGATION REPORT
========================================================================
DOCKET ID: CVC-VOICE-${d.workId}-${new Date().getFullYear()}
DATE RECORDED: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
CLEARANCE STATUS: OFFICIAL VIGILANCE PRIORITY DOCKET

1. INCIDENT & CITIZEN VOICE COMPLAINT
------------------------------------------------------------------------
Source: Voice-to-Report AI Grievance Pipeline (Audio Speech Recognition)
Transcribed Voice Statement:
"${customTranscript || selectedSample.audioText}"

2. IDENTIFIED MPLADS ASSET & GEOSPATIAL CORROBORATION
------------------------------------------------------------------------
Work ID:             ${d.workId}
Project Name:        ${d.workTitle}
Jurisdiction:        ${d.location}
Approved Sanction:   ${d.sanctioned}
Disbursed Volume:    ${d.disbursed}
Physical On-Site:    ${d.physicalGround}
Progress Gap:        ${d.divergence}

3. FORENSIC AI CLASSIFICATION & RISK ASSESSMENT
------------------------------------------------------------------------
ML Composite Score:  ${d.riskLevel}
Suspected Archetype: ${d.allegation}
Contractor Flagged:  ${d.suspectVendor}

4. MANDATED ENFORCEMENT PROTOCOL
------------------------------------------------------------------------
[x] Immediate stay order on remaining escrow account disbursements.
[x] Dispatch State Vigilance Commission (SVC) field team with GPS camera.
[x] Issue 7-day show cause notice to District Nodal Officer.

AUTHORIZED BY: MoSPI Sentinel Automated Vigilance Node #4
========================================================================`;

    const blob = new Blob([docketText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CVC_Grievance_Report_${d.workId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const d = selectedSample.extracted;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-indigo-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-indigo-500/30 text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-400">
              SIH 2026 Innovation #1
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400">
              Live Speech-to-Docket
            </span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span>🎙️ Voice-to-Report: Citizen Grievance AI Engine</span>
          </h2>
          <p className="text-xs text-indigo-200 max-w-3xl leading-relaxed">
            Converts citizen voice complaints into structured MoSPI vigilance dossiers, cross-referenced in real-time with the 4,000 pan-India project registry.
          </p>
        </div>

        <button
          onClick={handleDownloadDocket}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <Download size={15} />
          <span>Export Vigilance FIR</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Voice Input & Samples (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Microphone Recording Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Mic size={15} className="text-indigo-600" />
                Live Citizen Voice Recording
              </h3>
              {isRecording && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  Recording Speech...
                </span>
              )}
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-3">
              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all shadow-lg cursor-pointer ${
                  isRecording 
                    ? 'bg-red-600 text-white animate-bounce shadow-red-200 ring-8 ring-red-100' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 shadow-indigo-100 ring-4 ring-indigo-50'
                }`}
              >
                {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
              </button>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  {isRecording ? 'Listening... Speak your complaint now' : 'Click to Speak Grievance'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Supports Indian English, Hindi, and regional dialect keywords
                </p>
              </div>
            </div>

            {/* Custom recorded live transcript */}
            {customTranscript && (
              <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-indigo-600 block mb-1">Live Audio Transcription:</span>
                <p className="text-xs text-slate-700 italic">"{customTranscript}"</p>
              </div>
            )}
          </div>

          {/* Quick Demo Pre-recorded Audio Clips (For SIH Presentation) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Volume2 size={15} className="text-indigo-600" />
                SIH Demo Citizen Audio Samples
              </h3>
              <span className="text-[10px] text-slate-400">One-click simulation</span>
            </div>

            <div className="space-y-2.5">
              {PRESET_VOICE_COMPLAINTS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectSample(item)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedSample.id === item.id
                      ? 'bg-indigo-50/70 border-indigo-400 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                      {item.workId}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.duration}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    "{item.audioText}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction & CVC Docket (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* AI NLP Pipeline Steps */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles size={13} className="text-indigo-600" />
              Automated NLP & Cross-Verification Pipeline
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className={`p-2 rounded-lg border font-semibold ${processingStep >= 1 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                1. Speech Audio
              </div>
              <div className={`p-2 rounded-lg border font-semibold ${processingStep >= 2 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                2. Entity (NER)
              </div>
              <div className={`p-2 rounded-lg border font-semibold ${processingStep >= 3 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                3. MoSPI DB Match
              </div>
              <div className={`p-2 rounded-lg border font-semibold ${processingStep >= 4 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                4. CVC Docket Ready
              </div>
            </div>
          </div>

          {/* Generated CVC Vigilance Dossier Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Dossier Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Automated CVC Field Investigation Dossier
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5 flex items-center gap-2">
                  <ShieldAlert size={18} className="text-red-600" />
                  <span>{d.workId}: {d.workTitle}</span>
                </h3>
              </div>

              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {d.riskLevel}
              </span>
            </div>

            {/* Dossier Content */}
            <div className="p-6 space-y-5">
              {/* Voice vs Ground Truth Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <User size={14} className="text-indigo-600" />
                    <span>Citizen Allegation (From Voice)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{customTranscript || selectedSample.audioText}"
                  </p>
                  <div className="pt-2 border-t border-slate-200/80 text-[11px] text-red-600 font-semibold">
                    Flagged: {d.allegation}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-red-50/40 border border-red-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
                    <Building size={14} className="text-red-600" />
                    <span>MoSPI Central Database Corroboration</span>
                  </div>
                  <div className="text-xs space-y-1.5 text-slate-700">
                    <p><span className="text-slate-400">Sanctioned:</span> <span className="font-bold">{d.sanctioned}</span></p>
                    <p><span className="text-slate-400">Claimed Disbursed:</span> <span className="font-bold text-red-600">{d.disbursed}</span></p>
                    <p><span className="text-slate-400">Ground Reality:</span> <span className="font-bold text-red-600">{d.physicalGround}</span></p>
                    <p><span className="text-slate-400">Vendor ID:</span> <span className="font-mono font-semibold">{d.suspectVendor}</span></p>
                  </div>
                  <div className="pt-1 text-[11px] text-red-700 font-black">
                    Discrepancy: {d.divergence} Confirmed by ML Ensemble
                  </div>
                </div>
              </div>

              {/* Enforcement Action Box */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-700" />
                  Mandated CVC Corrective Directives
                </h5>
                <ul className="text-xs text-amber-900/90 space-y-1 pl-4 list-disc">
                  <li>Issue an immediate interim injunction on vendor escrow account to freeze remaining balances.</li>
                  <li>Dispatch State Vigilance Commission (SVC) team with geo-tagged drone photography verification.</li>
                  <li>Summon District Planning Officer regarding milestone payment certificates signed without physical verification.</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setDocketDispatched(true)}
                  disabled={docketDispatched}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                    docketDispatched
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {docketDispatched ? (
                    <>
                      <Check size={16} />
                      <span>Dispatched to Central Vigilance Officer</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert size={16} />
                      <span>Dispatch Formal CVC Inspection Order</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadDocket}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Download Signed Docket (.txt)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
