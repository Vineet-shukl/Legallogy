import React from 'react';
import { Printer, X, Scale, AlertTriangle, HelpCircle, FileCheck, CheckCircle2 } from 'lucide-react';
import type { AdvocateConsultationBrief } from '../types/legal';

interface AdvocateBriefModalProps {
  brief: AdvocateConsultationBrief;
  onClose: () => void;
}

export const AdvocateBriefModal: React.FC<AdvocateBriefModalProps> = ({
  brief,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Container */}
      <div className="bg-[#0A1128] border border-amber-500/40 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-left relative flex flex-col my-8">
        
        {/* Top Action Bar (hidden when printing) */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-sm text-slate-100 font-['Cinzel'] tracking-wider">
              Advocate Consultation Brief • Legal Prep Sheet
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-amber-500/20"
            >
              <Printer className="w-3.5 h-3.5 text-slate-950" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-200 print:text-black print:bg-white print:p-0">
          
          {/* Header */}
          <div className="border-b border-amber-500/30 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 print:text-amber-700">
                CONFIDENTIAL LEGAL CONSULTATION MEMORANDUM
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Playfair_Display'] text-slate-100 print:text-black mt-1">
                {brief.documentTitle}
              </h1>
              <div className="text-xs text-slate-400 print:text-slate-600 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <span>Jurisdiction: <strong>{brief.jurisdiction}</strong></span>
                <span>Date: <strong>{brief.dateGenerated}</strong></span>
                <span>Type: <strong className="capitalize">{brief.documentType}</strong></span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center shrink-0 print:border-black">
              <div className="text-[10px] uppercase font-semibold text-slate-400 print:text-black">Fairness Score</div>
              <div className="text-xl font-bold font-['Cinzel'] text-amber-400 print:text-black">
                {brief.overallFairnessScore} / 100
              </div>
            </div>
          </div>

          {/* Executive Overview */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-400 print:text-amber-800 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              <span>1. Executive Summary for Advocate</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed bg-slate-900/40 print:bg-slate-100 p-3.5 rounded-lg border border-slate-800/80 print:border-slate-300">
              {brief.executiveSummary}
            </p>
          </div>

          {/* Critical Red Flags & Statutory Violations */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-rose-400 print:text-rose-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>2. Identified Red Flags & Statutory Conflicts</span>
            </h2>
            <div className="space-y-2">
              {brief.criticalRedFlags.map((flag, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg bg-rose-950/20 print:bg-red-50 border border-rose-900/40 print:border-red-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-semibold text-rose-300 print:text-red-900">
                    <span>{flag.clauseTitle}</span>
                    <span className="text-[10px] font-mono text-amber-300 print:text-black">
                      {flag.statutoryConflict}
                    </span>
                  </div>
                  <p className="text-slate-300 print:text-slate-700 text-[11px]">
                    <strong>Client Risk:</strong> {flag.issue}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Questions to Ask the Advocate */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-400 print:text-sky-800 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>3. Priority Questions to Ask the Advocate</span>
            </h2>
            <ul className="space-y-2 text-xs">
              {brief.keyQuestionsToAskAdvocate.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-900/50 print:bg-slate-50 p-2.5 rounded-lg border border-slate-800/60 print:border-slate-200">
                  <span className="font-bold text-amber-400 print:text-amber-700">{idx + 1}.</span>
                  <span className="text-slate-200 print:text-black font-medium">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents & Evidence Checklist */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 print:text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>4. Evidence & Documents to Bring to Consultation</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {brief.documentsAndEvidenceToBring.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/40 print:bg-slate-50 border border-slate-800/60 print:border-slate-200 text-slate-300 print:text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Legal Remedies */}
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-400 print:text-amber-800">
              5. Preliminary Legal Remedies Under Indian Law
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-300 print:text-slate-700">
              {brief.suggestedLegalRemedies.map((rem, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400">⚖️</span>
                  <span>{rem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Notice */}
          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 print:text-slate-600 flex items-center justify-between">
            <span>Prepared using Legallogy Digital Legal Assistant</span>
            <span>Subject to Advocate-Client Privilege during professional consultation</span>
          </div>

        </div>

      </div>

    </div>
  );
};
