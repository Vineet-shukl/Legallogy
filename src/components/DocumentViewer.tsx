import React, { useState } from 'react';
import { 
  Search, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  FileText,
  Bookmark,
  ChevronDown,
  ChevronUp
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
  const [expandedClause, setExpandedClause] = useState<string | null>(null);

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
    <div className="flex flex-col h-full min-h-[500px] bg-[#070D1D]/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-left">
      
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-sm sm:text-base text-slate-100 font-['Cinzel'] tracking-wide">
              Original Document
            </span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono badge-compact">
            {contract.clauses.length} Clauses
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clauses, terms, section numbers…"
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:border-amber-500/50 outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs transition-colors shrink-0 capitalize badge-compact ${
                filterCategory === cat
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-transparent hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Parties Information Card */}
      <div className="px-4 py-3 bg-slate-900/40 border-b border-slate-800/60">
        <div className="text-xs text-slate-400 space-y-1">
          <div className="flex flex-wrap gap-1">
            <span className="text-slate-500 shrink-0">Party A:</span>
            <strong className="text-slate-200 break-all">{contract.partiesInvolved.partyA}</strong>
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="text-slate-500 shrink-0">Party B:</span>
            <strong className="text-slate-200 break-all">{contract.partiesInvolved.partyB}</strong>
          </div>
        </div>
      </div>

      {/* Clauses Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 divide-y divide-slate-800/40">
        {filteredClauses.map((clause) => {
          const isSelected = selectedClause?.id === clause.id;
          const isExpanded = expandedClause === clause.id;

          return (
            <div
              key={clause.id}
              onClick={() => onSelectClause(clause)}
              className={`pt-3 first:pt-0 cursor-pointer rounded-xl p-3 sm:p-4 transition-all border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/5'
                  : 'bg-slate-950/40 hover:bg-slate-900/60 border-slate-800/60 hover:border-slate-700'
              }`}
            >
              {/* Clause Header */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="flex items-start gap-2 min-w-0">
                  <Bookmark className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-semibold text-amber-300 block">
                      {clause.clauseNumber || 'Clause'}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-100 leading-snug mt-0.5">
                      {clause.title}
                    </h4>
                  </div>
                </div>

                {/* Risk Badge */}
                {clause.riskLevel === 'high' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 shrink-0 badge-compact">
                    <ShieldAlert className="w-3 h-3 text-rose-400" />
                    <span className="hidden sm:inline">High Risk</span>
                    <span className="sm:hidden">⚠</span>
                  </span>
                ) : clause.riskLevel === 'medium' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0 badge-compact">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    <span className="hidden sm:inline">Caution</span>
                    <span className="sm:hidden">!</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0 badge-compact">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span className="hidden sm:inline">Standard</span>
                    <span className="sm:hidden">✓</span>
                  </span>
                )}
              </div>

              {/* Original Text — with expand/collapse */}
              <div className="pl-5">
                <p className={`legal-text-clause pl-3 border-l-2 border-slate-600/80 ${isExpanded ? '' : 'line-clamp-3'}`}>
                  "{clause.originalText}"
                </p>
                
                {/* Expand toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedClause(isExpanded ? null : clause.id);
                  }}
                  className="mt-1.5 flex items-center gap-1 text-xs text-amber-400/70 hover:text-amber-300 transition-colors badge-compact"
                >
                  {isExpanded ? (
                    <><ChevronUp className="w-3 h-3" /> Collapse</>
                  ) : (
                    <><ChevronDown className="w-3 h-3" /> Read full clause</>
                  )}
                </button>
              </div>

              {/* Statutory Violation Tags */}
              {clause.statutoryViolations.length > 0 && (
                <div className="mt-2.5 pl-5 flex flex-wrap gap-1.5">
                  {clause.statutoryViolations.map((stat, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-rose-950/60 text-rose-200 border border-rose-800/60 font-mono statutory-badge badge-compact"
                    >
                      ⚖️ {stat.act} • {stat.section}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Hint */}
              <div className="mt-2.5 pl-5 flex items-center justify-between text-xs text-slate-500">
                <span className="capitalize">{clause.category}</span>
                <span className="text-amber-400/70 hover:text-amber-300 transition-colors">
                  View breakdown →
                </span>
              </div>
            </div>
          );
        })}

        {filteredClauses.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            <div className="text-3xl mb-3">🔍</div>
            No clauses match your search or filter.
          </div>
        )}
      </div>

    </div>
  );
};
