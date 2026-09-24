import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Scale, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#0A1124] border-b border-amber-500/20 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-200">Legal Information & Assistance Notice:</span>
          <span className="text-slate-400 hidden sm:inline">
            Legallogy uses Generative AI to analyze legal documents under Indian law. It provides educational clarity and analysis, not formal legal representation.
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors ml-auto text-xs"
        >
          <span>{expanded ? 'Less info' : 'Advocates Act Notice'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto px-4 pb-3 pt-1 text-slate-400 border-t border-slate-800/60 mt-1 space-y-1">
          <p className="flex items-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Compliance with Indian Legal Regulations:</strong> In accordance with the Advocates Act, 1961 and Bar Council of India guidelines, Legallogy is an automated intelligence tool designed to demystify documents and assist in negotiation preparation. It does not solicit clients, establish an attorney-client relationship, or substitute professional advice from an Advocate enrolled with a State Bar Council.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Always verify critical decisions and contentious disputes with a qualified advocate before signing or litigating agreements.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
