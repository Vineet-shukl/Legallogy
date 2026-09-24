import React from 'react';
import { 
  Key, 
  FileText, 
  Printer, 
  ChevronDown
} from 'lucide-react';
import { SAMPLE_CONTRACTS } from '../data/sampleIndianContracts';
import type { ContractAnalysis } from '../types/legal';

interface NavbarProps {
  currentContract: ContractAnalysis;
  onSelectSample: (contract: ContractAnalysis) => void;
  onOpenApiKeyModal: () => void;
  onOpenAdvocateBrief: () => void;
  hasCustomKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentContract,
  onSelectSample,
  onOpenApiKeyModal,
  onOpenAdvocateBrief,
  hasCustomKey
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070D1D]/90 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Authority Emblem */}
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-500/40 shadow-lg shadow-amber-500/10 transition-transform group-hover:scale-105">
              <img 
                src="/assets/emblem_logo.jpg" 
                alt="Legallogy Official Emblem" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#070D1D] rounded-full" title="Engine Active" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Cinzel'] tracking-widest text-xl font-bold gold-gradient-text">
                LEGALLOGY
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                India 🇮🇳
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans tracking-wide">
              Digital Legal Assistant & Statutory Auditor
            </p>
          </div>
        </div>

        {/* Center: Sample Contract Switcher */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative group">
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 hover:border-amber-500/50 text-xs text-slate-200 transition-all">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span className="truncate max-w-[200px] font-medium">{currentContract.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-1.5 w-80 bg-[#0B142B] border border-amber-500/30 rounded-xl shadow-2xl p-1.5 hidden group-hover:block z-50">
              <div className="px-2.5 py-1.5 text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                Select Indian Legal Case Study
              </div>
              {SAMPLE_CONTRACTS.map((contract) => (
                <button
                  key={contract.id}
                  onClick={() => onSelectSample(contract)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex flex-col gap-0.5 ${
                    currentContract.id === contract.id
                      ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <span className="font-medium text-slate-100">{contract.title}</span>
                  <span className="text-[10px] text-slate-400 capitalize">
                    {contract.documentType} • Fairness: {contract.fairnessScore}/100
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Printable Advocate Brief Trigger */}
          <button
            onClick={onOpenAdvocateBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600/20 to-amber-500/20 hover:from-amber-600/30 hover:to-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-medium transition-all shadow-sm shadow-amber-500/10"
            title="Export 1-Page Legal Brief for Meeting an Indian Advocate"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Advocate Brief</span>
          </button>

          {/* Gemini API Key Configuration */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all border ${
              hasCustomKey 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                : 'bg-slate-900/80 border-slate-700/80 hover:border-amber-500/50 text-slate-300'
            }`}
            title="Configure Google Gemini 2.5 Flash API Key"
          >
            <Key className={`w-3.5 h-3.5 ${hasCustomKey ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">{hasCustomKey ? 'Gemini 2.5 Active' : 'API Key'}</span>
          </button>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/vineetshukla-work/Legallogy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
            title="View on GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>

      </div>
    </header>
  );
};
