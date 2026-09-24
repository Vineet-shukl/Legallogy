import React, { useState } from 'react';
import { 
  Languages, 
  ShieldAlert, 
  GitCompare, 
  MessageSquare, 
  FileCheck2, 
  Send, 
  Copy, 
  Check, 
  Scale, 
  AlertTriangle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import type { Clause, ContractAnalysis, ReadingLevel, ChatMessage } from '../types/legal';
import { INDIAN_LEGAL_GLOSSARY } from '../services/indianLawRules';
import { askLegalQuestion } from '../services/geminiService';

interface AnalysisPanelProps {
  contract: ContractAnalysis;
  selectedClause: Clause | null;
  onSelectClause: (clause: Clause) => void;
  onOpenAdvocateBrief: () => void;
  apiKey: string;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  contract,
  selectedClause,
  onSelectClause,
  onOpenAdvocateBrief,
  apiKey
}) => {
  const [activeTab, setActiveTab] = useState<'simplifier' | 'redflags' | 'diff' | 'qa' | 'action'>('simplifier');
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('citizen');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [glossaryTerm, setGlossaryTerm] = useState<string | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Namaste! I am **Legallogy**, your Indian legal assistant. I have audited **"${contract.title}"** against benchmark Indian statutes including the Indian Contract Act, DPDP Act 2023, and Model Tenancy Act.\n\nAsk me any question about your obligations, penalties, or rights under this contract!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userQuery, setUserQuery] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (queryText?: string) => {
    const query = queryText || userQuery;
    if (!query.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setUserQuery('');
    setIsChatLoading(true);

    try {
      const docContext = contract.clauses.map(c => `[${c.clauseNumber || 'Clause'} - ${c.title}]: ${c.originalText}`).join('\n\n');
      const response = await askLegalQuestion(docContext, query, chatMessages, apiKey);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citedClauses: response.citedClauses,
        statutoryReferences: response.statutoryReferences
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          content: 'I encountered an error querying the legal engine. Please check your connectivity or API key configuration.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const currentDisplayClause = selectedClause || contract.clauses[0];

  return (
    <div className="flex flex-col h-full bg-[#070D1D]/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-left">
      
      {/* Tab Navigation Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 px-2 pt-2 flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1">
          
          <button
            onClick={() => setActiveTab('simplifier')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-medium transition-all border-b-2 ${
              activeTab === 'simplifier'
                ? 'bg-slate-900 text-amber-300 border-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Plain English & हिंदी</span>
          </button>

          <button
            onClick={() => setActiveTab('redflags')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-medium transition-all border-b-2 ${
              activeTab === 'redflags'
                ? 'bg-slate-900 text-rose-300 border-rose-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Red Flag Audit</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/20 text-rose-300 font-mono">
              {contract.clauses.filter(c => c.riskLevel === 'high').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('diff')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-medium transition-all border-b-2 ${
              activeTab === 'diff'
                ? 'bg-slate-900 text-sky-300 border-sky-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5 text-sky-400" />
            <span>Comparison Diff</span>
          </button>

          <button
            onClick={() => setActiveTab('qa')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-medium transition-all border-b-2 ${
              activeTab === 'qa'
                ? 'bg-slate-900 text-amber-300 border-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Legal Q&A</span>
          </button>

          <button
            onClick={() => setActiveTab('action')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-medium transition-all border-b-2 ${
              activeTab === 'action'
                ? 'bg-slate-900 text-emerald-300 border-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Negotiate & Brief</span>
          </button>

        </div>
      </div>

      {/* Main Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        
        {/* ================= TAB 1: PLAIN ENGLISH & HINDI SIMPLIFIER ================= */}
        {activeTab === 'simplifier' && (
          <div className="space-y-5">
            
            {/* Reading Level Selector */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium pl-1">
                Reading Mode:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setReadingLevel('citizen')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    readingLevel === 'citizen'
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  Citizen Plain English
                </button>
                <button
                  onClick={() => setReadingLevel('hindi')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    readingLevel === 'hindi'
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  सरल हिंदी (Devanagari)
                </button>
                <button
                  onClick={() => setReadingLevel('executive')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    readingLevel === 'executive'
                      ? 'bg-amber-500 text-slate-950 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  Executive Brief
                </button>
              </div>
            </div>

            {/* Selected Clause Deep-Dive Card */}
            {currentDisplayClause && (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                
                <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-semibold text-amber-400">
                      {currentDisplayClause.clauseNumber || 'Clause'}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-100 mt-0.5">
                      {currentDisplayClause.title}
                    </h3>
                  </div>

                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    Category: {currentDisplayClause.category}
                  </span>
                </div>

                {/* Simplified Explanation Output */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-200">
                  <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {readingLevel === 'citizen' ? 'Plain English Translation' : readingLevel === 'hindi' ? 'सरल हिंदी व्याख्या' : 'Executive Business Impact'}
                    </span>
                  </div>
                  
                  <p className="text-sm leading-relaxed font-sans">
                    {readingLevel === 'citizen' 
                      ? currentDisplayClause.simplifiedText 
                      : readingLevel === 'hindi' 
                      ? currentDisplayClause.hindiText 
                      : currentDisplayClause.executiveSummary}
                  </p>
                </div>

                {/* Practical Impact for Citizen */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold text-slate-300">
                    What does this mean for you in practice?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                    {currentDisplayClause.practicalImpact}
                  </p>
                </div>

                {/* Suggested Fairer Alternative Revision */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-400">Suggested Balanced Counter-Clause:</span>
                    <button
                      onClick={() => handleCopy(currentDisplayClause.suggestedRevision, currentDisplayClause.id)}
                      className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    >
                      {copiedId === currentDisplayClause.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === currentDisplayClause.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-emerald-300/90 font-mono bg-emerald-950/20 p-3 rounded-lg border border-emerald-800/40 leading-relaxed">
                    {currentDisplayClause.suggestedRevision}
                  </p>
                </div>

              </div>
            )}

            {/* Interactive Indian Legal Glossary Drawer */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Indian Legal Terminology Explained (शब्दावली)</span>
                </span>
                <span className="text-[11px] text-slate-400">Click any term to decode</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {Object.keys(INDIAN_LEGAL_GLOSSARY).map((key) => {
                  const item = INDIAN_LEGAL_GLOSSARY[key];
                  const isSelected = glossaryTerm === key;

                  return (
                    <button
                      key={key}
                      onClick={() => setGlossaryTerm(isSelected ? null : key)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-all border ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {item.term.split('/')[0].trim()}
                    </button>
                  );
                })}
              </div>

              {glossaryTerm && INDIAN_LEGAL_GLOSSARY[glossaryTerm] && (
                <div className="p-3.5 rounded-lg bg-slate-900 border border-amber-500/30 text-xs space-y-2 mt-2">
                  <div className="flex items-center justify-between font-semibold text-amber-300">
                    <span>{INDIAN_LEGAL_GLOSSARY[glossaryTerm].term}</span>
                    <span className="text-[11px] font-normal text-slate-400">{INDIAN_LEGAL_GLOSSARY[glossaryTerm].hindiTerm}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {INDIAN_LEGAL_GLOSSARY[glossaryTerm].definition}
                  </p>
                  <p className="text-[11px] text-amber-300/80 italic border-l-2 border-amber-400/50 pl-2">
                    <strong>Example:</strong> {INDIAN_LEGAL_GLOSSARY[glossaryTerm].practicalExample}
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= TAB 2: RED FLAG AUDIT MATRIX ================= */}
        {activeTab === 'redflags' && (
          <div className="space-y-5">
            
            {/* Overall Fairness Gauge */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Document Statutory Fairness Score
                </span>
                <div className="text-2xl font-bold font-['Cinzel'] flex items-center gap-2">
                  <span className={
                    contract.fairnessScore >= 70 ? 'text-emerald-400' :
                    contract.fairnessScore >= 45 ? 'text-amber-400' : 'text-rose-400'
                  }>
                    {contract.fairnessScore} / 100
                  </span>
                  <span className="text-xs font-sans font-normal text-slate-400">
                    ({contract.fairnessScore < 50 ? 'Predatory / Heavy Counterparty Bias' : 'Fair Commercial Standard'})
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Audited across 5 benchmark Indian statutes and 10+ Supreme Court landmark precedents.
                </p>
              </div>

              {/* Visual Dial */}
              <div className="relative w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center shrink-0">
                <div 
                  className={`text-sm font-bold font-mono ${
                    contract.fairnessScore >= 70 ? 'text-emerald-400' :
                    contract.fairnessScore >= 45 ? 'text-amber-400' : 'text-rose-400'
                  }`}
                >
                  {contract.fairnessScore}%
                </div>
              </div>
            </div>

            {/* Red Flag List */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Statutory Violations & Red Flag Clauses</span>
              </h4>

              {contract.clauses
                .filter(c => c.riskLevel === 'high' || c.statutoryViolations.length > 0)
                .map((clause) => (
                  <div 
                    key={clause.id}
                    onClick={() => onSelectClause(clause)}
                    className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 hover:border-rose-700/80 transition-all cursor-pointer space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-semibold text-rose-400">
                          {clause.clauseNumber || 'Clause'}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-100">
                          {clause.title}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-semibold">
                        Risk Score: {clause.riskScore}/100
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-serif italic border-l-2 border-rose-500/40 pl-2">
                      "{clause.originalText}"
                    </p>

                    {/* Statutory Precedent Badges */}
                    {clause.statutoryViolations.map((viol, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-rose-900/40 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-amber-300 font-semibold">
                          <span className="flex items-center gap-1">
                            <Scale className="w-3.5 h-3.5 text-amber-400" />
                            {viol.act} — {viol.section}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-900/50 text-rose-200 font-mono">
                            {viol.riskCategory}
                          </span>
                        </div>
                        {viol.landmarkPrecedent && (
                          <div className="text-[11px] text-slate-400">
                            <strong>Supreme Court Precedent:</strong> {viol.landmarkPrecedent}
                          </div>
                        )}
                        <p className="text-slate-300 text-[11px] leading-relaxed pt-0.5">
                          {viol.summary}
                        </p>
                      </div>
                    ))}

                    <div className="flex items-center justify-end text-[11px] text-amber-400 hover:text-amber-300 pt-1">
                      <span>View counter-draft options →</span>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* ================= TAB 3: SIDE-BY-SIDE DIFF COMPARATOR ================= */}
        {activeTab === 'diff' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>
                Comparing: <strong className="text-slate-200">Current Agreement</strong> vs <strong className="text-amber-300">Model Fair Standard</strong>
              </span>
              <span className="text-[11px] text-slate-500">Semantic Shift Engine</span>
            </div>

            {contract.diffComparison && contract.diffComparison.length > 0 ? (
              <div className="space-y-3">
                {contract.diffComparison.map((diff) => (
                  <div 
                    key={diff.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
                        <GitCompare className="w-3.5 h-3.5 text-sky-400" />
                        <span>{diff.clauseTitle}</span>
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                        diff.riskShift === 'increased' 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        Risk Shift: {diff.riskShift.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30">
                        <div className="text-[10px] uppercase font-bold text-rose-400 mb-1">
                          Current Draft (Your Contract)
                        </div>
                        <p className="text-slate-300 font-serif italic text-[11px]">
                          "{diff.originalClause}"
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                        <div className="text-[10px] uppercase font-bold text-emerald-400 mb-1">
                          Benchmark Model Clause
                        </div>
                        <p className="text-slate-300 font-serif italic text-[11px]">
                          "{diff.comparedClause}"
                        </p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] space-y-1">
                      <div><strong className="text-amber-400">Change Impact:</strong> {diff.changeSummary}</div>
                      <div><strong className="text-sky-400">Statutory Violation:</strong> {diff.legalImpact}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                No diff comparison available for this document.
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: GROUNDED LEGAL Q&A ================= */}
        {activeTab === 'qa' && (
          <div className="flex flex-col h-[520px]">
            
            {/* Suggested Quick Prompt Chips */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {[
                'Can my employer stop me from joining a competitor in India?',
                'Can the landlord forfeit my entire deposit?',
                'Who owns side projects built on weekends?',
                'Are unilateral arbitrator appointments legal in India?'
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(suggestion)}
                  disabled={isChatLoading}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-[11px] text-slate-300 hover:text-amber-200 transition-colors text-left"
                >
                  💬 {suggestion}
                </button>
              ))}
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">
                      {msg.content}
                    </div>

                    {/* Cited Clauses & Statutes */}
                    {msg.statutoryReferences && msg.statutoryReferences.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1">
                        {msg.statutoryReferences.map((ref, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-amber-300 font-mono text-[10px] border border-amber-500/30">
                            ⚖️ {ref}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs text-amber-400 p-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Cross-referencing Indian Contract Act & Supreme Court database...</span>
                </div>
              )}
            </div>

            {/* Chat Input Field */}
            <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question about this contract under Indian law..."
                disabled={isChatLoading}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:border-amber-500 outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!userQuery.trim() || isChatLoading}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ================= TAB 5: ACTION KIT & ADVOCATE BRIEF ================= */}
        {activeTab === 'action' && (
          <div className="space-y-6">
            
            {/* Advocate Brief Export Callout */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-transparent border border-amber-500/40 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  <span>1-Page "Ask an Advocate" Printable Brief</span>
                </span>
                <p className="text-xs text-slate-300">
                  Meeting an advocate? Take this structured briefing sheet containing detected red flags, statutory violations, and targeted legal questions to save billable hours.
                </p>
              </div>

              <button
                onClick={onOpenAdvocateBrief}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shrink-0 shadow-lg shadow-amber-500/20"
              >
                View & Print Brief 📄
              </button>
            </div>

            {/* Obligations & Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Critical Obligations & Deadlines</span>
              </h4>

              <div className="space-y-2">
                {contract.keyObligations.map((ob) => (
                  <div key={ob.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-200">{ob.title}</div>
                      <div className="text-slate-400 text-[11px]">Party: <strong className="text-amber-300">{ob.party}</strong></div>
                      <div className="text-rose-400/90 text-[11px]">Default Consequence: {ob.penaltyOnDefault}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-amber-400 font-mono text-[10px] shrink-0 border border-slate-800">
                      {ob.deadline}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Counter-Proposals & Negotiation Templates */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Ready-to-Send Negotiation Templates</span>
              </h4>

              {contract.counterProposals.map((cp) => (
                <div key={cp.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-amber-300">{cp.originalClauseTitle}</h5>
                    <span className="text-[10px] text-slate-400">Polite Counter-Proposal</span>
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong className="text-slate-200">Legal Rationale:</strong> {cp.rationaleForCounterparty}
                  </p>

                  {/* WhatsApp Draft */}
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-400">
                      <span>WhatsApp / Quick Message Draft</span>
                      <button
                        onClick={() => handleCopy(cp.friendlyWhatsAppMessage, `${cp.id}-wa`)}
                        className="text-slate-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        {copiedId === `${cp.id}-wa` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === `${cp.id}-wa` ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-slate-300 font-sans text-[11px] whitespace-pre-line">
                      {cp.friendlyWhatsAppMessage}
                    </p>
                  </div>

                  {/* Formal Email Draft */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-sky-400">
                      <span>Formal Email Draft (To HR / Landlord / Client)</span>
                      <button
                        onClick={() => handleCopy(cp.formalEmailDraft, `${cp.id}-email`)}
                        className="text-slate-400 hover:text-sky-300 flex items-center gap-1"
                      >
                        {copiedId === `${cp.id}-email` ? <Check className="w-3 h-3 text-sky-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === `${cp.id}-email` ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-slate-300 font-mono text-[11px] whitespace-pre-line">
                      {cp.formalEmailDraft}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
