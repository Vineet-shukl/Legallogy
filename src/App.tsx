import { useState } from 'react';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DocumentViewer } from './components/DocumentViewer';
import { AnalysisPanel } from './components/AnalysisPanel';
import { ApiKeyModal } from './components/ApiKeyModal';
import { AdvocateBriefModal } from './components/AdvocateBriefModal';
import { SAMPLE_CONTRACTS } from './data/sampleIndianContracts';
import type { ContractAnalysis, Clause } from './types/legal';
import { getStoredApiKey, analyzeLegalDocument } from './services/geminiService';
import { Scale, ExternalLink, Sparkles, FileText, Brain } from 'lucide-react';

export function App() {
  const [currentContract, setCurrentContract] = useState<ContractAnalysis>(SAMPLE_CONTRACTS[0]);
  const [selectedClause, setSelectedClause] = useState<Clause | null>(SAMPLE_CONTRACTS[0].clauses[0]);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showAdvocateBriefModal, setShowAdvocateBriefModal] = useState(false);
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mobile pane switcher: 'document' shows first on mobile (per user preference)
  const [mobilePaneTab, setMobilePaneTab] = useState<'document' | 'analysis'>('document');

  const handleSelectSample = (contract: ContractAnalysis) => {
    setCurrentContract(contract);
    setSelectedClause(contract.clauses[0] || null);
    setMobilePaneTab('document');
    const workspaceElement = document.getElementById('legal-workbench');
    if (workspaceElement) {
      workspaceElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCustomTextAnalyze = async (text: string, title: string, fileData?: { mimeType: string; data: string }) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeLegalDocument(text, title, apiKey, fileData);
      setCurrentContract(result);
      setSelectedClause(result.clauses[0] || null);
      setMobilePaneTab('document');
      const workspaceElement = document.getElementById('legal-workbench');
      if (workspaceElement) {
        workspaceElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyUpdated = () => {
    setApiKey(getStoredApiKey());
  };

  return (
    <div className="min-h-screen bg-[#050A15] text-slate-100 flex flex-col font-sans">
      
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Navbar (sticky, includes mobile sample strip) */}
      <Navbar 
        currentContract={currentContract}
        onSelectSample={handleSelectSample}
        onOpenApiKeyModal={() => setShowApiKeyModal(true)}
        onOpenAdvocateBrief={() => setShowAdvocateBriefModal(true)}
        hasCustomKey={Boolean(apiKey)}
      />

      {/* Hero & Quick Ingestion Section */}
      <HeroSection 
        onSelectSample={handleSelectSample}
        onCustomTextAnalyze={handleCustomTextAnalyze}
        isLoading={isAnalyzing}
      />

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="py-6 bg-amber-500/10 border-y border-amber-500/30 text-center animate-pulse">
          <div className="flex items-center justify-center gap-3 text-amber-300 font-semibold text-sm sm:text-base">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
            <span>Auditing against Indian Contract Act 1872 & DPDP Act 2023…</span>
          </div>
        </div>
      )}

      {/* Main Legal Studio Workbench */}
      <main id="legal-workbench" className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        
        {/* Document Header Bar */}
        <div className="mb-4 sm:mb-6 p-4 sm:p-5 rounded-2xl bg-[#070D1D]/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase font-mono font-semibold shrink-0 badge-compact">
                {currentContract.documentType}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 truncate">
                {currentContract.partiesInvolved.partyA} ⇄ {currentContract.partiesInvolved.partyB}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-['Playfair_Display'] text-slate-100 mt-1 leading-tight">
              {currentContract.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] uppercase font-semibold text-slate-400 whitespace-nowrap">Statutory Fairness</div>
              <div className={`text-lg sm:text-xl font-bold font-['Cinzel'] ${
                currentContract.fairnessScore >= 70 ? 'text-emerald-400' :
                currentContract.fairnessScore >= 45 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {currentContract.fairnessScore}/100
              </div>
            </div>

            <button
              onClick={() => setShowAdvocateBriefModal(true)}
              className="px-3 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20"
            >
              Export Brief 📄
            </button>
          </div>
        </div>

        {/* ── Mobile Pane Switcher (Document shown first by default) ── */}
        <div className="lg:hidden flex mb-4 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950/80 shadow-lg">
          <button
            onClick={() => setMobilePaneTab('document')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${
              mobilePaneTab === 'document'
                ? 'bg-amber-500/15 text-amber-300 border-r border-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 border-r border-slate-700/60'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Document</span>
            {mobilePaneTab === 'document' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setMobilePaneTab('analysis')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-all ${
              mobilePaneTab === 'analysis'
                ? 'bg-amber-500/15 text-amber-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-4 h-4 shrink-0" />
            <span>Analysis</span>
            {mobilePaneTab === 'analysis' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Dual-Pane Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:h-[800px]">
          
          {/* Left Pane: Original Document & Clause Selector */}
          <div className={`lg:col-span-5 lg:h-full ${
            mobilePaneTab === 'document' ? 'block' : 'hidden lg:block'
          }`}>
            <DocumentViewer
              contract={currentContract}
              selectedClause={selectedClause}
              onSelectClause={(clause) => {
                setSelectedClause(clause);
                // Auto-switch to analysis pane on mobile after selecting a clause
                setMobilePaneTab('analysis');
              }}
            />
          </div>

          {/* Right Pane: 5-Tab Intelligence Workbench */}
          <div className={`lg:col-span-7 lg:h-full ${
            mobilePaneTab === 'analysis' ? 'block' : 'hidden lg:block'
          }`}>
            <AnalysisPanel
              contract={currentContract}
              selectedClause={selectedClause}
              onSelectClause={setSelectedClause}
              onOpenAdvocateBrief={() => setShowAdvocateBriefModal(true)}
              apiKey={apiKey}
            />
          </div>

        </div>

      </main>

      {/* Indian Legal Resources Footer */}
      <footer className="mt-12 sm:mt-16 border-t border-slate-800 bg-[#040812] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-['Cinzel'] font-bold text-slate-200 tracking-wider">LEGALLOGY</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Democratizing access to Indian legal intelligence and contract clarity.</p>
            </div>
          </div>

          {/* Official Indian Legal Portals */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <a 
              href="https://www.indiacode.nic.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>India Code (Statutes)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://main.sci.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>Supreme Court of India</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://services.ecourts.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>e-Courts Services</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-[11px] text-slate-500 text-center">
            Compliant with Bar Council of India & Advocates Act, 1961
          </div>

        </div>
      </footer>

      {/* Modals */}
      {showApiKeyModal && (
        <ApiKeyModal 
          onClose={() => setShowApiKeyModal(false)}
          onKeyUpdated={handleKeyUpdated}
        />
      )}

      {showAdvocateBriefModal && (
        <AdvocateBriefModal
          brief={currentContract.advocateBrief}
          onClose={() => setShowAdvocateBriefModal(false)}
        />
      )}

    </div>
  );
}

export default App;
