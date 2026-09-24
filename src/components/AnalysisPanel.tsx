import React, { useState, useRef, useEffect } from 'react';
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
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Namaste! I am **Legallogy**, your Indian legal assistant. I have audited **"${contract.title}"** against the Indian Contract Act, DPDP Act 2023, and Model Tenancy Act.\n\nAsk me any question about your rights, obligations, or penalties under this contract!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userQuery, setUserQuery] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

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

  // Tab config for rendering
  const tabs = [
    { id: 'simplifier', label: 'Plain English', shortLabel: 'EN/हिं', icon: Languages, color: 'text-amber-300', border: 'border-amber-400' },
    { id: 'redflags',   label: 'Red Flags',    shortLabel: 'Flags',  icon: ShieldAlert, color: 'text-rose-300',   border: 'border-rose-400',
      badge: contract.clauses.filter(c => c.riskLevel === 'high').length },
    { id: 'diff',       label: 'Comparison',   shortLabel: 'Diff',   icon: GitCompare,  color: 'text-sky-300',    border: 'border-sky-400' },
    { id: 'qa',         label: 'Legal Q&A',    shortLabel: 'Q&A',    icon: MessageSquare, color: 'text-amber-300', border: 'border-amber-400' },
    { id: 'action',     label: 'Negotiate',    shortLabel: 'Act',    icon: FileCheck2,  color: 'text-emerald-300', border: 'border-emerald-400' },
  ] as const;

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-[#070D1D]/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-left">
      
      {/* Tab Navigation Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 px-1 sm:px-2 pt-2 overflow-x-auto no-scrollbar shrink-0">
        <div className="flex items-center gap-0.5 sm:gap-1 w-max sm:w-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2.5 rounded-t-lg text-xs sm:text-sm font-medium transition-all border-b-2 whitespace-nowrap badge-compact ${
                  isActive
                    ? `bg-slate-900 ${tab.color} ${tab.border} font-semibold`
                    : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? tab.color : ''}`} />
                {/* Full label on sm+, short label on xs */}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-[10px] font-semibold">{tab.shortLabel}</span>
                {'badge' in tab && tab.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500/20 text-rose-300 font-mono leading-none badge-compact">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Body */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5">
        
        {/* ═══════════════ TAB 1: PLAIN ENGLISH & HINDI SIMPLIFIER ═══════════════ */}
        {activeTab === 'simplifier' && (
          <div className="space-y-5">
            
            {/* Reading Level Selector */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Reading Mode:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {[
                  { key: 'citizen', label: 'Plain English' },
                  { key: 'hindi',   label: 'सरल हिंदी' },
                  { key: 'executive', label: 'Executive' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setReadingLevel(key as ReadingLevel)}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all badge-compact ${
                      readingLevel === key
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Clause Deep-Dive Card */}
            {currentDisplayClause && (
              <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                
                <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-semibold text-amber-400">
                      {currentDisplayClause.clauseNumber || 'Clause'}
                    </span>
                    <h3 className="text-base font-semibold text-slate-100 mt-0.5 leading-snug">
                      {currentDisplayClause.title}
                    </h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono shrink-0 badge-compact">
                    {currentDisplayClause.category}
                  </span>
                </div>

                {/* Simplified Explanation Output */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {readingLevel === 'citizen'
                        ? 'Plain English Translation'
                        : readingLevel === 'hindi'
                        ? 'सरल हिंदी व्याख्या'
                        : 'Executive Business Impact'}
                    </span>
                  </div>
                  
                  {/* Hindi gets special Devanagari class, others get legal-text-body */}
                  {readingLevel === 'hindi' ? (
                    <p className="legal-hindi-text">
                      {currentDisplayClause.hindiText}
                    </p>
                  ) : (
                    <p className="legal-text-body">
                      {readingLevel === 'citizen'
                        ? currentDisplayClause.simplifiedText
                        : currentDisplayClause.executiveSummary}
                    </p>
                  )}
                </div>

                {/* Practical Impact */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-300">
                    What does this mean for you in practice?
                  </h4>
                  <p className="legal-text-body bg-slate-950/60 p-3 sm:p-4 rounded-lg border border-slate-800/80">
                    {currentDisplayClause.practicalImpact}
                  </p>
                </div>

                {/* Suggested Fairer Alternative Revision */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-emerald-400">Suggested Counter-Clause:</span>
                    <button
                      onClick={() => handleCopy(currentDisplayClause.suggestedRevision, currentDisplayClause.id)}
                      className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors text-xs badge-compact"
                    >
                      {copiedId === currentDisplayClause.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === currentDisplayClause.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="legal-counter-clause bg-emerald-950/20 p-3 sm:p-4 rounded-lg border border-emerald-800/40">
                    {currentDisplayClause.suggestedRevision}
                  </p>
                </div>

              </div>
            )}

            {/* Interactive Indian Legal Glossary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm font-semibold text-amber-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Indian Legal Glossary (शब्दावली)</span>
                </span>
                <span className="text-xs text-slate-500">Tap any term to decode</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {Object.keys(INDIAN_LEGAL_GLOSSARY).map((key) => {
                  const item = INDIAN_LEGAL_GLOSSARY[key];
                  const isSelected = glossaryTerm === key;

                  return (
                    <button
                      key={key}
                      onClick={() => setGlossaryTerm(isSelected ? null : key)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm transition-all border badge-compact ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {item.term.split('/')[0].trim()}
                    </button>
                  );
                })}
              </div>

              {glossaryTerm && INDIAN_LEGAL_GLOSSARY[glossaryTerm] && (
                <div className="p-4 rounded-lg bg-slate-900 border border-amber-500/30 space-y-2 mt-2">
                  <div className="flex items-center justify-between font-semibold text-amber-300 flex-wrap gap-1">
                    <span className="text-sm">{INDIAN_LEGAL_GLOSSARY[glossaryTerm].term}</span>
                    <span className="text-xs font-normal text-slate-400 legal-hindi-text" style={{ fontSize: '14px', lineHeight: '1.8' }}>
                      {INDIAN_LEGAL_GLOSSARY[glossaryTerm].hindiTerm}
                    </span>
                  </div>
                  <p className="legal-text-body">
                    {INDIAN_LEGAL_GLOSSARY[glossaryTerm].definition}
                  </p>
                  <p className="text-sm text-amber-300/80 italic border-l-2 border-amber-400/50 pl-3 leading-relaxed">
                    <strong>Example:</strong> {INDIAN_LEGAL_GLOSSARY[glossaryTerm].practicalExample}
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ═══════════════ TAB 2: RED FLAG AUDIT MATRIX ═══════════════ */}
        {activeTab === 'redflags' && (
          <div className="space-y-5">
            
            {/* Overall Fairness Gauge */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Document Statutory Fairness Score
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-['Cinzel'] flex items-center gap-2 flex-wrap">
                  <span className={
                    contract.fairnessScore >= 70 ? 'text-emerald-400' :
                    contract.fairnessScore >= 45 ? 'text-amber-400' : 'text-rose-400'
                  }>
                    {contract.fairnessScore} / 100
                  </span>
                  <span className="text-xs sm:text-sm font-sans font-normal text-slate-400">
                    ({contract.fairnessScore < 50 ? 'Predatory / Counterparty Bias' : 'Fair Commercial Standard'})
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  Audited across 5 Indian statutes & 10+ Supreme Court precedents.
                </p>
              </div>

              {/* Visual Score Circle */}
              <div className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center shrink-0 ${
                contract.fairnessScore >= 70 ? 'border-emerald-500/40' :
                contract.fairnessScore >= 45 ? 'border-amber-500/40' : 'border-rose-500/40'
              }`}>
                <div className={`text-sm font-bold font-mono ${
                  contract.fairnessScore >= 70 ? 'text-emerald-400' :
                  contract.fairnessScore >= 45 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {contract.fairnessScore}%
                </div>
              </div>
            </div>

            {/* Red Flag List */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Statutory Violations & Red Flag Clauses</span>
              </h4>

              {contract.clauses
                .filter(c => c.riskLevel === 'high' || c.statutoryViolations.length > 0)
                .map((clause) => (
                  <div 
                    key={clause.id}
                    onClick={() => onSelectClause(clause)}
                    className="p-4 sm:p-5 rounded-xl bg-rose-950/20 border border-rose-900/50 hover:border-rose-700/80 transition-all cursor-pointer space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-semibold text-rose-400">
                          {clause.clauseNumber || 'Clause'}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-100 mt-0.5">
                          {clause.title}
                        </h4>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono font-semibold shrink-0 badge-compact">
                        Risk: {clause.riskScore}/100
                      </span>
                    </div>

                    <p className="legal-text-clause pl-3 border-l-2 border-rose-500/40">
                      "{clause.originalText.length > 200 ? clause.originalText.substring(0, 200) + '…' : clause.originalText}"
                    </p>

                    {/* Statutory Precedent Badges */}
                    {clause.statutoryViolations.map((viol, idx) => (
                      <div key={idx} className="p-3 sm:p-4 rounded-lg bg-slate-950/80 border border-rose-900/40 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2 text-amber-300 font-semibold">
                          <span className="flex items-center gap-1.5 text-sm">
                            <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                            {viol.act} — {viol.section}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-rose-900/50 text-rose-200 font-mono badge-compact">
                            {viol.riskCategory}
                          </span>
                        </div>
                        {viol.landmarkPrecedent && (
                          <p className="text-sm text-slate-400">
                            <strong className="text-slate-300">SC Precedent:</strong> {viol.landmarkPrecedent}
                          </p>
                        )}
                        <p className="legal-text-body">
                          {viol.summary}
                        </p>
                      </div>
                    ))}

                    <div className="text-sm text-amber-400 hover:text-amber-300 text-right">
                      View counter-draft options →
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* ═══════════════ TAB 3: SIDE-BY-SIDE DIFF COMPARATOR ═══════════════ */}
        {activeTab === 'diff' && (
          <div className="space-y-4">
            <div className="p-3 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-400 flex items-center justify-between flex-wrap gap-2">
              <span>
                Comparing: <strong className="text-slate-200">Current Agreement</strong> vs <strong className="text-amber-300">Model Fair Standard</strong>
              </span>
              <span className="text-xs text-slate-500">Semantic Shift Engine</span>
            </div>

            {contract.diffComparison && contract.diffComparison.length > 0 ? (
              <div className="space-y-4">
                {contract.diffComparison.map((diff) => (
                  <div 
                    key={diff.id}
                    className="p-4 sm:p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                        <GitCompare className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>{diff.clauseTitle}</span>
                      </h4>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold badge-compact ${
                        diff.riskShift === 'increased' 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        Risk {diff.riskShift === 'increased' ? '▲' : '▼'} {diff.riskShift.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 sm:p-4 rounded-lg bg-rose-950/20 border border-rose-900/30">
                        <div className="text-xs uppercase font-bold text-rose-400 mb-2">
                          Current Draft
                        </div>
                        <p className="legal-text-clause">
                          "{diff.originalClause}"
                        </p>
                      </div>

                      <div className="p-3 sm:p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/30">
                        <div className="text-xs uppercase font-bold text-emerald-400 mb-2">
                          Model Fair Clause
                        </div>
                        <p className="legal-text-clause">
                          "{diff.comparedClause}"
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-sm">
                      <div><strong className="text-amber-400">Change Impact:</strong> <span className="text-slate-300">{diff.changeSummary}</span></div>
                      <div><strong className="text-sky-400">Statutory Violation:</strong> <span className="text-slate-300">{diff.legalImpact}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 text-sm">
                <div className="text-3xl mb-3">⚖️</div>
                No diff comparison available for this document.
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ TAB 4: GROUNDED LEGAL Q&A ═══════════════ */}
        {activeTab === 'qa' && (
          <div className="flex flex-col" style={{ height: 'max(480px, calc(100vh - 420px))' }}>
            
            {/* Suggested Quick Prompt Chips */}
            <div className="mb-3 flex flex-wrap gap-2">
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
                  className="px-3 py-2 rounded-lg bg-slate-900/90 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-xs sm:text-sm text-slate-300 hover:text-amber-200 transition-colors text-left badge-compact"
                >
                  💬 {suggestion}
                </button>
              ))}
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] p-3.5 sm:p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                    }`}
                  >
                    <div className="legal-text-body whitespace-pre-line" style={{ color: msg.role === 'user' ? '#0c0a00' : undefined }}>
                      {msg.content}
                    </div>

                    {/* Cited Statutes */}
                    {msg.statutoryReferences && msg.statutoryReferences.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                        {msg.statutoryReferences.map((ref, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-slate-950 text-amber-300 font-mono text-xs border border-amber-500/30 badge-compact">
                            ⚖️ {ref}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 mt-1.5 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-center gap-2 text-sm text-amber-400 p-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>Cross-referencing Indian Contract Act & SC database…</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Field */}
            <div className="mt-3 flex items-center gap-2 pt-3 border-t border-slate-800">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about this contract under Indian law…"
                disabled={isChatLoading}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!userQuery.trim() || isChatLoading}
                className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ═══════════════ TAB 5: ACTION KIT & ADVOCATE BRIEF ═══════════════ */}
        {activeTab === 'action' && (
          <div className="space-y-6">
            
            {/* Advocate Brief Export Callout */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-transparent border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-sm uppercase font-bold text-amber-400 tracking-wider flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  <span>1-Page "Ask an Advocate" Brief</span>
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Meeting an advocate? Take this structured sheet with red flags, statutory violations, and targeted legal questions to save billable hours.
                </p>
              </div>

              <button
                onClick={onOpenAdvocateBrief}
                className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold shrink-0 shadow-lg shadow-amber-500/20 w-full sm:w-auto"
              >
                View & Print Brief 📄
              </button>
            </div>

            {/* Critical Obligations & Deadlines */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Critical Obligations & Deadlines</span>
              </h4>

              <div className="space-y-2.5">
                {contract.keyObligations.map((ob) => (
                  <div key={ob.id} className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-200">{ob.title}</div>
                      <div className="text-xs text-slate-400">Party: <strong className="text-amber-300">{ob.party}</strong></div>
                      <div className="text-xs text-rose-400/90">Default: {ob.penaltyOnDefault}</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-slate-950 text-amber-400 font-mono text-xs shrink-0 border border-slate-800 badge-compact">
                      {ob.deadline}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Counter-Proposals & Negotiation Templates */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Copy className="w-4 h-4 text-amber-400" />
                <span>Ready-to-Send Negotiation Templates</span>
              </h4>

              {contract.counterProposals.map((cp) => (
                <div key={cp.id} className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h5 className="text-sm font-semibold text-amber-300">{cp.originalClauseTitle}</h5>
                    <span className="text-xs text-slate-400">Counter-Proposal</span>
                  </div>

                  <p className="legal-text-body">
                    <strong className="text-slate-200">Legal Rationale:</strong> {cp.rationaleForCounterparty}
                  </p>

                  {/* WhatsApp Draft */}
                  <div className="p-3 sm:p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                    <div className="flex items-center justify-between text-sm font-semibold text-emerald-400">
                      <span>WhatsApp / Quick Message Draft</span>
                      <button
                        onClick={() => handleCopy(cp.friendlyWhatsAppMessage, `${cp.id}-wa`)}
                        className="text-slate-400 hover:text-emerald-300 flex items-center gap-1 transition-colors badge-compact"
                      >
                        {copiedId === `${cp.id}-wa` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-xs">{copiedId === `${cp.id}-wa` ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="legal-text-body whitespace-pre-line">
                      {cp.friendlyWhatsAppMessage}
                    </p>
                  </div>

                  {/* Formal Email Draft */}
                  <div className="p-3 sm:p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-sm font-semibold text-sky-400">
                      <span>Formal Email Draft (To HR / Landlord / Client)</span>
                      <button
                        onClick={() => handleCopy(cp.formalEmailDraft, `${cp.id}-email`)}
                        className="text-slate-400 hover:text-sky-300 flex items-center gap-1 transition-colors badge-compact"
                      >
                        {copiedId === `${cp.id}-email` ? <Check className="w-3.5 h-3.5 text-sky-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-xs">{copiedId === `${cp.id}-email` ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="legal-counter-clause whitespace-pre-line" style={{ fontSize: '12px' }}>
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
