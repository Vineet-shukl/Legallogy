export type DocumentType = 
  | 'employment' 
  | 'rental' 
  | 'nda' 
  | 'consumer_terms' 
  | 'freelance_sow' 
  | 'loan' 
  | 'general';

export type RiskLevel = 'high' | 'medium' | 'low' | 'fair';

export type ReadingLevel = 'citizen' | 'hindi' | 'executive';

export interface StatutoryCitation {
  act: string;
  section: string;
  title: string;
  landmarkPrecedent?: string;
  summary: string;
  riskCategory: 'Void Agreement' | 'Unfair Term' | 'Penalty Trap' | 'Data Violation' | 'Unilateral Power' | 'Procedural Non-Compliance';
}

export interface Clause {
  id: string;
  clauseNumber?: string;
  title: string;
  originalText: string;
  simplifiedText: string;
  hindiText: string;
  executiveSummary: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100 where higher = higher risk
  statutoryViolations: StatutoryCitation[];
  explanation: string;
  practicalImpact: string;
  suggestedRevision: string;
  category: 'Non-Compete' | 'Termination' | 'Liability' | 'Deposit/Payment' | 'IP Rights' | 'Arbitration' | 'Data Privacy' | 'General';
}

export interface LegalDiffItem {
  id: string;
  clauseTitle: string;
  type: 'added' | 'removed' | 'modified' | 'standard';
  originalClause: string;
  comparedClause: string;
  changeSummary: string;
  legalImpact: string;
  riskShift: 'increased' | 'decreased' | 'neutral';
}

export interface LegalObligation {
  id: string;
  title: string;
  party: 'User' | 'Counterparty' | 'Mutual';
  deadline: string;
  penaltyOnDefault: string;
  statutoryReference?: string;
}

export interface CounterProposal {
  id: string;
  originalClauseTitle: string;
  originalText: string;
  proposedBalancedText: string;
  rationaleForCounterparty: string;
  friendlyWhatsAppMessage: string;
  formalEmailDraft: string;
}

export interface AdvocateConsultationBrief {
  documentTitle: string;
  documentType: DocumentType;
  jurisdiction: string;
  dateGenerated: string;
  overallFairnessScore: number;
  executiveSummary: string;
  criticalRedFlags: {
    clauseTitle: string;
    issue: string;
    statutoryConflict: string;
  }[];
  keyQuestionsToAskAdvocate: string[];
  documentsAndEvidenceToBring: string[];
  suggestedLegalRemedies: string[];
}

export interface ContractAnalysis {
  id: string;
  title: string;
  documentType: DocumentType;
  partiesInvolved: {
    partyA: string;
    partyB: string;
  };
  fairnessScore: number; // 0 (Extremely Unfair / Predatory) to 100 (Balanced & Fair)
  overallSummary: string;
  hindiSummary: string;
  executiveSummary: string;
  clauses: Clause[];
  keyRisks: string[];
  keyObligations: LegalObligation[];
  counterProposals: CounterProposal[];
  diffComparison?: LegalDiffItem[];
  advocateBrief: AdvocateConsultationBrief;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citedClauses?: string[];
  statutoryReferences?: string[];
}
