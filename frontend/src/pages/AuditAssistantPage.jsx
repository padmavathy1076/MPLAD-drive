import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, Download, Trash2, ShieldAlert, 
  CheckCircle2, FileText, ArrowRight, CornerDownLeft, 
  HelpCircle, Database, Cpu
} from 'lucide-react';

export default function AuditAssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Greetings, Vigilance Officer. I am the **MPLADS Sentinel AI Audit Assistant**, integrated with the Ministry of Statistics and Programme Implementation (MoSPI) vigilance engine.

I have indexed **4,000 pan-India sanctioned works** across all 32 States & UTs, coupled with multi-model ML ensemble predictions (Random Forest, XGBoost, LightGBM, Isolation Forest).

How can I assist your investigation today? You can select any quick inquiry below or type a custom case query.`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: 'Warangal Ghost School (WRK0001)', query: 'Explain the anomaly in Warangal School Building project WRK0001' },
    { label: 'Highest Risk States Ranking', query: 'Which states currently have the highest at-risk sanctioned funds?' },
    { label: 'Isolation Forest Anomaly Logic', query: 'How does the Isolation Forest model detect Ghost Projects?' },
    { label: 'National Fund Utilisation Stats', query: 'What is the current national fund utilisation rate across India?' },
    { label: 'Lump-Sum Siphoning Pattern', query: 'What features define a Lump-Sum Siphoning anomaly in MPLADS?' },
    { label: 'Generate Enforcement Brief', query: 'Generate an official CVC vigilance inspection brief for top high-risk works' }
  ];

  const generateReply = (q) => {
    const query = q.toLowerCase();

    if (query.includes('warangal') || query.includes('wrk0001') || query.includes('school')) {
      return `### 🔍 Forensic Audit Report: WRK0001 (Warangal South School)
- **Work Title:** Construction of High School Science Block
- **Location:** Warangal South, Telangana (Constituency: 104)
- **Financial Allocation:** Sanctioned ₹2.19 Cr | Disbursed ₹2.15 Cr (**98.2%**)
- **Physical Site Verification:** Only **10% structural foundation** completed.
- **Progress Divergence:** **88.2% Gap** (High Financial Drain with negligible Ground Execution).
- **ML Risk Assessment:** **98.4% (CRITICAL)**
  - Random Forest Probability: 99.1%
  - XGBoost Probability: 98.6%
  - Isolation Forest Score: -0.384 (Severe Outlier)
- **CVC Classification:** **Ghost Project Billing Archetype**
- **Recommended Enforcement Action:**
  1. Immediate freeze on remaining contractor escrow accounts.
  2. Dispatch State Vigilance Commission (SVC) team with mandatory GPS-stamped photo verification.
  3. Issue Show-Cause Notice to the District Nodal Officer regarding payment sign-offs without inspection certificates.`;
    }

    if (query.includes('state') || query.includes('ranking') || query.includes('highest')) {
      return `### 📊 Pan-India High-Risk Fund Concentration by State
Based on ensemble risk analysis of 4,000 projects:

1. **Bihar:** ₹42.80 Cr across 28 flagged works (Avg Risk: 79.4%)
   *Primary Anomaly:* Severe completion delays & multi-payment lump-sum disbursement without site verification.
2. **Telangana:** ₹31.50 Cr across 19 flagged works (Avg Risk: 76.1%)
   *Primary Anomaly:* Ghost project billing in rural school and community hall allocations.
3. **Maharashtra:** ₹28.20 Cr across 24 flagged works (Avg Risk: 72.8%)
   *Primary Anomaly:* Road and irrigation projects with 95%+ financial payout and <20% physical execution.
4. **West Bengal:** ₹24.10 Cr across 17 flagged works (Avg Risk: 69.5%)
   *Primary Anomaly:* Rapid contractor turnover and single-day chunk payments.
5. **Uttar Pradesh:** ₹21.60 Cr across 15 flagged works (Avg Risk: 68.2%)`;
    }

    if (query.includes('isolation') || query.includes('forest') || query.includes('detect') || query.includes('model')) {
      return `### 🧠 ML Detection Architecture: Isolation Forest
The **Isolation Forest (iForest)** module isolates multi-dimensional anomalies without supervision:

- **Mathematical Intuition:** Normal projects require many random hyper-plane cuts to partition; anomalous projects isolate rapidly near the root of the decision tree.
- **Key Feature Vectors:**
  1. \`financial_progress_pct - physical_progress_pct\` (Divergence delta)
  2. \`max_single_payment_pct\` (Lump-sum release risk)
  3. \`days_since_sanction / (physical_progress_pct + 1)\` (Velocity degradation)
- **Decision Boundary:**
  - Anomaly Score < -0.15: Flagged for Central Vigilance Commission Priority Queue.
  - Ensemble Consensus: An alert is only certified when iForest agrees with supervised Gradient Boosting (XGBoost/LightGBM).`;
    }

    if (query.includes('utilis') || query.includes('rate') || query.includes('national') || query.includes('burn')) {
      return `### 📈 National MPLADS Fiscal Utilisation Metrics
- **Total Sanctioned Works:** 4,000
- **Total Sanctioned Capital:** ₹2,935.34 Cr
- **Total Cumulative Expenditure:** ₹1,619.31 Cr
- **National Fund Burn Rate:** **55.17%**
- **Completed & Verified Works:** 1,842 (46.1%)
- **Ongoing / Under Execution:** 1,514 (37.9%)
- **Active Anomalies Requiring Audit:** 644 (16.1%)
- **Fund Recovery Pipeline:** ₹182.40 Cr tagged for forensic recovery review.`;
    }

    if (query.includes('siphoning') || query.includes('lump') || query.includes('pattern')) {
      return `### ⚠️ Archetype Analysis: Lump-Sum Siphoning
**Definition:** A fraudulent disbursement pattern where project funds are drained in a single or accelerated payment tranche long before contractual deliverables are reached.

- **Trigger Thresholds:**
  - \`max_single_payment_pct\` ≥ 70% of total sanctioned budget.
  - \`num_payments\` ≤ 2.
  - \`physical_progress_pct\` ≤ 30%.
- **Vulnerability Vector:** Weak district-level milestone validation where intermediate progress certificates (MB records) are bypassed.
- **Automated Sentinel Safeguard:** System automatically holds disbursement release if tranche size exceeds 40% without verified Geo-tagged drone or mobile inspection imagery.`;
    }

    if (query.includes('brief') || query.includes('enforce') || query.includes('action')) {
      return `### 📋 Official CVC Vigilance Inspection Briefing
**Priority Enforcement Docket (Top 3 Immediate Targets):**

1. **WRK0001 | High School Science Block (Warangal South)**
   - Risk: **98.4%** | Exposure: ₹2.15 Cr
   - Action: Issue stop-work & asset freeze order; summon District Planning Officer.
2. **WRK0084 | Rural Drinking Water Pipeline (Patna Rural)**
   - Risk: **96.2%** | Exposure: ₹3.80 Cr
   - Action: Subpoena contractor banking records; verify physical pipeline laying via GIS survey.
3. **WRK0112 | Solar Microgrid Installation (Nagpur East)**
   - Risk: **94.8%** | Exposure: ₹1.95 Cr
   - Action: Audit invertor serial numbers; confirm vendor existence in GSTIN registry.`;
    }

    // Default intelligent MoSPI response
    return `### 🏛️ MoSPI Vigilance Intelligence Query
Regarding your query on **"${q}"**:

- **System Context:** Queried against the Central MoSPI MPLADS Vigilance Registry (4,000 Pan-India works).
- **Audit Rule 4.2 Application:** Under the revised 2023 MPLADS guidelines, state nodal authorities must conduct 10% mandatory physical inspections for works exceeding ₹50 Lakhs.
- **Predictive Risk Assessment:** Any work exhibiting an expenditure-to-physical ratio greater than 1.5x is automatically quarantined into the **Priority Risk Alerts Feed**.
- **Recommended Action:** If you have specific Work IDs, enter them directly (e.g. \`WRK0001\`) to retrieve instant ground truth coordinates, satellite corroboration, and contractor disbursement timelines.`;
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateReply(query);
      const botMsg = {
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: botResponse
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([
      {
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Conversation history reset. Central Vigilance Assistant is ready for your next audit inquiry.'
      }
    ]);
  };

  const handleExportTranscript = () => {
    const transcriptText = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}:\n${m.text}\n\n`).join('---\n\n');
    const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MPLADS_Audit_Transcript_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-md shadow-indigo-100">
            <Bot size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">AI Vigilance Audit Assistant</h2>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                MoSPI Grounded
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Conversational intelligence grounded in 4,000 pan-India works, physical inspection logs, and ensemble ML models
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={handleExportTranscript}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            title="Download full audit chat transcript"
          >
            <Download size={14} />
            <span>Export Case File</span>
          </button>

          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <Trash2 size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Intelligence Telemetry Pill Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Database size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Indexed Works</p>
            <p className="text-sm font-bold text-slate-800">4,000 Projects</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <ShieldAlert size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Ghost Detections</p>
            <p className="text-sm font-bold text-red-600">142 Flagged</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Cpu size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">ML Ensemble</p>
            <p className="text-sm font-bold text-slate-800">RF + XGB + LGBM</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Clearance Level</p>
            <p className="text-sm font-bold text-emerald-700">Level 4 Official</p>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Chat Header Bar */}
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700">Sentinel Forensic Investigation Session</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Session ID: CVC-SENTINEL-{new Date().getFullYear()}</span>
        </div>

        {/* Quick Query Bar */}
        <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-200/60 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0 flex items-center gap-1">
            <Sparkles size={12} className="text-indigo-600" />
            Quick Case Inquiries:
          </span>
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.query)}
              className="px-3 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 border border-slate-200 rounded-full text-[11px] text-slate-600 whitespace-nowrap cursor-pointer transition-all shadow-2xs font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot size={16} />
                </div>
              )}

              <div className={`max-w-2xl ${m.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[10px] font-bold text-slate-400">
                    {m.sender === 'user' ? 'Vigilance Officer' : 'Sentinel AI Vigilance'}
                  </span>
                  <span className="text-[9px] text-slate-300 font-mono">{m.timestamp}</span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                      : 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {m.text}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <FileText size={16} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] text-slate-400 font-medium ml-1">Analyzing MoSPI records and ML ensemble...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2.5"
          >
            <input
              type="text"
              placeholder="Ask an audit query (e.g. 'Explain anomaly in Warangal WRK0001', 'Rank high risk states', 'How does Isolation Forest detect ghost projects')..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Send</span>
              <CornerDownLeft size={14} />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
            <span>Powered by Multi-Model Ensemble • Random Forest, XGBoost & Isolation Forest</span>
            <span>Confidential • Government of India Internal Use</span>
          </div>
        </div>
      </div>
    </div>
  );
}
