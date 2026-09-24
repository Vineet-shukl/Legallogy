import React, { useState } from 'react';
import { 
  Search, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  FileText,
  Bookmark
} from 'lucide-react';
import type { Clause, ContractAnalysis } from '../types/legal';

interface DocumentViewerProps {
  contract: ContractAnalysis;
  selectedClause: Clause | null;
  onSelectClause: (clause: Clause) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  contract,
  selectedClause,
  onSelectClause
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredClauses = contract.clauses.filter((clause) => {
    const matchesSearch = 
      clause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clause.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (clause.clauseNumber && clause.clauseNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = filterCategory === 'all' || clause.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(contract.clauses.map(c => c.category)))];

  return (
    <div className="flex flex-col h-full bg-[#070D1D]/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-left">
      
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-sm text-slate-100 font-['Cinzel'] tracking-wider">
              Original Document Studio
            </span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            {contract.clauses.length} Clauses Audited
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clauses, terms, or section numbers..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500/50 outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors shrink-0 capitalize ${
                filterCategory === cat
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-medium'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Parties Information Card */}
      <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/60 text-xs flex flex-col gap-1">
        <div className="flex items-center justify-between text-slate-400">
          <span>Party A: <strong className="text-slate-200">{contract.partiesInvolved.partyA}</strong></span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>Party B: <strong className="text-slate-200">{contract.partiesInvolved.partyB}</strong></span>
        </div>
      </div>

      {/* Clauses Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-slate-800/40">
        {filteredClauses.map((clause) => {
          const isSelected = selectedClause?.id === clause.id;

          return (
            <div
              key={clause.id}
              onClick={() => onSelectClause(clause)}
              className={`pt-3.5 first:pt-0 cursor-pointer rounded-xl p-3.5 transition-all border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/5'
                  : 'bg-slate-950/40 hover:bg-slate-900/60 border-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Bookmark className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span className="font-mono text-xs font-semibold text-amber-300">
                    {clause.clauseNumber || 'Clause'}
                  </span>
                  <h4 className="text-xs font-medium text-slate-200">
                    {clause.title}
                  </h4>
                </div>

                {/* Risk Badge */}
                {clause.riskLevel === 'high' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 shrink-0">
                    <ShieldAlert className="w-3 h-3 text-rose-400" />
                    High Risk Trap
                  </span>
                ) : clause.riskLevel === 'medium' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Caution
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Standard
                  </span>
                )}
              </div>

              {/* Original Text Excerpt */}
              <p className="text-xs text-slate-300 font-serif leading-relaxed line-clamp-3 pl-2 border-l-2 border-slate-700/60 italic">
                "{clause.originalText}"
              </p>

              {/* Statutory Violation Alert */}
              {clause.statutoryViolations.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {clause.statutoryViolations.map((stat, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-rose-950/60 text-rose-200 border border-rose-800/60 font-mono"
                    >
                      ⚖️ {stat.act} • {stat.section}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Hint */}
              <div className="mt-2 text-[11px] text-amber-400/80 flex items-center justify-between">
                <span>Category: {clause.category}</span>
                <span className="underline hover:text-amber-300">View Legal Breakdown →</span>
              </div>
            </div>
          );
        })}

        {filteredClauses.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            No clauses match your search or filter.
          </div>
        )}
      </div>

    </div>
  );
};
