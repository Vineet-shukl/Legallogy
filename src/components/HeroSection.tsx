import React, { useState } from 'react';
import { 
  Upload, 
  Sparkles, 
  Scale, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { SAMPLE_CONTRACTS } from '../data/sampleIndianContracts';
import type { ContractAnalysis } from '../types/legal';

interface HeroSectionProps {
  onSelectSample: (contract: ContractAnalysis) => void;
  onCustomTextAnalyze: (text: string, title: string) => void;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectSample,
  onCustomTextAnalyze,
  isLoading
}) => {
  const [pastedText, setPastedText] = useState('');
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [docTitle, setDocTitle] = useState('Custom Agreement');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onCustomTextAnalyze(content, file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.readAsText(file);
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) return;
    onCustomTextAnalyze(pastedText, docTitle || 'Custom Agreement');
    setShowPasteModal(false);
  };

  return (
    <section className="relative overflow-hidden border-b border-amber-500/15 py-12 lg:py-16">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Grounded in Indian Jurisprudence & Supreme Court Precedents</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-['Playfair_Display'] font-bold text-slate-100 leading-tight">
              Demystifying Indian Law with <span className="gold-gradient-text italic">Autonomous GenAI</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              Every month, millions of Indians sign rental agreements, tech employment bonds, and freelance contracts with severe, unlawful traps. 
              <strong> Legallogy</strong> audits your agreements against the Indian Contract Act, DPDP Act 2023, and Model Tenancy Act in plain English and सरल हिंदी.
            </p>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xl font-bold text-amber-400 font-['Cinzel']">Sec 27 ICA</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Non-Compete Void Audits</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xl font-bold text-emerald-400 font-['Cinzel']">DPDP 2023</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Privacy Notice Validation</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xl font-bold text-sky-400 font-['Cinzel']">Bilingual</div>
                <div className="text-[11px] text-slate-400 mt-0.5">English & सरल हिंदी</div>
              </div>
            </div>

            {/* Action Buttons: Upload, Paste, or Sample */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <label className="cursor-pointer flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95">
                <Upload className="w-4 h-4 text-slate-950" />
                <span>Upload Document (.txt, .md)</span>
                <input 
                  type="file" 
                  accept=".txt,.md,.doc" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  disabled={isLoading}
                />
              </label>

              <button
                onClick={() => setShowPasteModal(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-slate-200 text-sm font-medium transition-all"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Paste Contract Text</span>
              </button>
            </div>

            {/* Curated Indian Case Studies */}
            <div className="pt-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Or Explore a Pre-Audited Indian Legal Scenario:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_CONTRACTS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => onSelectSample(sample)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-300 hover:text-amber-200 transition-all text-left group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="font-medium">{sample.title.split('(')[0].trim()}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10 group">
              <img 
                src="/assets/hero_banner.jpg" 
                alt="Legallogy Legal Studio" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/20 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                  <span className="text-amber-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Supreme Court Benchmark Active
                  </span>
                  <span className="text-slate-400 text-[11px]">Republic of India</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Automatic cross-reference against <em>Percept D'Mark (Zaheer Khan)</em>, <em>Perkins Eastman</em>, and <em>Kailash Nath Associates</em>.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Paste Contract Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0B142B] border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100 font-['Playfair_Display']">
                Paste Agreement Text for Indian Statutory Audit
              </h3>
              <button 
                onClick={() => setShowPasteModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Document Title
              </label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="e.g. Bangalore Rent Agreement or Tech Employment Offer"
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Agreement Text / Clauses
              </label>
              <textarea
                rows={10}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste the contract text or specific contentious clauses here..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono focus:border-amber-500 outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Processed securely under Indian data norms
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPasteModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasteSubmit}
                  disabled={!pastedText.trim()}
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all disabled:opacity-50"
                >
                  Start Statutory Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
