import type { StatutoryCitation } from '../types/legal';

export const INDIAN_STATUTES = {
  ICA_SECTION_27: {
    act: 'Indian Contract Act, 1872',
    section: 'Section 27',
    title: 'Agreement in Restraint of Trade Void',
    landmarkPrecedent: 'Percept D\'Mark (India) Pvt. Ltd. v. Zaheer Khan (2006) 4 SCC 227; Niranjan Shankar Golikari (1967)',
    summary: 'Under Indian law, any agreement that restrains anyone from exercising a lawful profession, trade, or business after termination of employment is void ab initio. Unlike US/UK law, Indian courts do not apply the test of reasonableness to post-termination non-compete clauses.',
    riskCategory: 'Void Agreement'
  } as StatutoryCitation,

  ICA_SECTION_28: {
    act: 'Indian Contract Act, 1872',
    section: 'Section 28',
    title: 'Agreements in Restraint of Legal Proceedings Void',
    landmarkPrecedent: 'Food Corporation of India v. New India Assurance Co. Ltd. (1994)',
    summary: 'Clauses that extinguish a party\'s legal remedies before the statutory period of limitation (typically 3 years under the Limitation Act, 1963) or completely bar court access are void.',
    riskCategory: 'Void Agreement'
  } as StatutoryCitation,

  ICA_SECTION_74: {
    act: 'Indian Contract Act, 1872',
    section: 'Section 74',
    title: 'Compensation for Breach where Penalty Stipulated',
    landmarkPrecedent: 'Kailash Nath Associates v. Delhi Development Authority (2015) 4 SCC 136; Fateh Chand (1964)',
    summary: 'Stipulated damages in contracts are treated as penalty ceilings, not automatic windfalls. A party cannot claim exorbitant damages without proving actual loss suffered due to the breach.',
    riskCategory: 'Penalty Trap'
  } as StatutoryCitation,

  ICA_SECTION_23: {
    act: 'Indian Contract Act, 1872',
    section: 'Section 23',
    title: 'Unlawful Object or Consideration / Against Public Policy',
    landmarkPrecedent: 'Central Inland Water Transport Corp. v. Brojo Nath Ganguly (1986) 3 SCC 156',
    summary: 'The Supreme Court struck down unconscionable, one-sided clauses between parties with unequal bargaining power as violative of Article 14 and public policy under Section 23.',
    riskCategory: 'Void Agreement'
  } as StatutoryCitation,

  CPA_UNFAIR_CONTRACTS: {
    act: 'Consumer Protection Act, 2019',
    section: 'Section 2(46)',
    title: 'Unfair Contract Terms',
    landmarkPrecedent: 'Pioneer Urban Land & Infrastructure Ltd. v. Govindan Raghavan (2019)',
    summary: 'Prohibits one-sided contracts that require excessive security deposits, impose disproportionate penalties, allow unilateral termination without reasonable cause, or permit unilateral assignment to third parties.',
    riskCategory: 'Unfair Term'
  } as StatutoryCitation,

  DPDP_CONSENT_NOTICE: {
    act: 'Digital Personal Data Protection Act, 2023',
    section: 'Sections 5 & 6',
    title: 'Notice and Consent Architecture',
    landmarkPrecedent: 'Justice K.S. Puttaswamy (Retd.) v. Union of India (2017) 10 SCC 1',
    summary: 'Data Fiduciaries must give a clear itemized notice specifying what personal data is collected and for what specified purpose. Users have an unconditional statutory right to withdraw consent at any time as easily as giving it.',
    riskCategory: 'Data Violation'
  } as StatutoryCitation,

  MODEL_TENANCY_ACT_DEPOSIT: {
    act: 'Model Tenancy Act, 2021 & State Rent Control Acts',
    section: 'Section 10 & 11',
    title: 'Ceiling on Security Deposit & Notice of Entry',
    landmarkPrecedent: 'State Tenancy Reforms (Karnataka, Maharashtra, Delhi, Tamil Nadu)',
    summary: 'Caps security deposits for residential premises to a maximum of 2 months rent (standard urban benchmark). Also mandates at least 24 hours prior written notice before a landlord may inspect or enter leased premises.',
    riskCategory: 'Unfair Term'
  } as StatutoryCitation,

  ARBITRATION_UNILATERAL_APPOINTMENT: {
    act: 'Arbitration and Conciliation Act, 1996',
    section: 'Section 12(5) & Seventh Schedule',
    title: 'Ineligibility of Interested Arbitrator / Unilateral Appointment Void',
    landmarkPrecedent: 'Perkins Eastman Architects DPC v. HSCC (India) Ltd. (2020) 20 SCC 760; TRF Ltd. (2017)',
    summary: 'A party that has an interest in the outcome of a dispute is statutorily ineligible to act as sole arbitrator or unilaterally appoint a sole arbitrator. Such arbitration clauses are legally unenforceable.',
    riskCategory: 'Unilateral Power'
  } as StatutoryCitation,

  SPECIFIC_RELIEF_INJUNCTION: {
    act: 'Specific Relief Act, 1963',
    section: 'Section 14 & 41',
    title: 'Contracts not Specifically Enforceable (Personal Service)',
    landmarkPrecedent: 'Nandganj Sihori Sugar Co. Ltd. v. Badri Nath Dixit (1991)',
    summary: 'Courts in India will not grant specific performance of contracts of personal service (e.g. forcing an employee to work against their will or enforcing an employment bond by compelling service).',
    riskCategory: 'Void Agreement'
  } as StatutoryCitation,

  // Alias for Section 12(5) reference used in NDA sample
  ARBITRATION_SECTION_12: {
    act: 'Arbitration and Conciliation Act, 1996',
    section: 'Section 12(5) & Seventh Schedule',
    title: 'Ineligibility of Interested Arbitrator / Unilateral Appointment Void',
    landmarkPrecedent: 'Perkins Eastman Architects DPC v. HSCC (India) Ltd. (2020) 20 SCC 760; TRF Ltd. (2017)',
    summary: 'A party that has an interest in the outcome of a dispute is statutorily ineligible to act as sole arbitrator or unilaterally appoint a sole arbitrator. Such arbitration clauses are legally unenforceable.',
    riskCategory: 'Unilateral Power'
  } as StatutoryCitation
};

/**
 * Glossary of Indian legal terms simplified for citizens
 */
export const INDIAN_LEGAL_GLOSSARY: Record<string, { term: string; hindiTerm: string; definition: string; practicalExample: string }> = {
  'indemnification': {
    term: 'Indemnity / Indemnification',
    hindiTerm: 'क्षतिपूर्ति (Harpana / Chhatipuri)',
    definition: 'A promise where you agree to pay for any financial losses, court costs, or damages suffered by the other party, even if a third party was at fault.',
    practicalExample: 'If a client is sued by a competitor over design software you used, an unlimited indemnity means you pay their entire multi-lakh lawyer fees.'
  },
  'non-compete': {
    term: 'Non-Compete Covenant',
    hindiTerm: 'प्रतिस्पर्धा-रोधी खंड (Partispardha-rodhi)',
    definition: 'A clause barring you from working for a competitor or starting a rival business after leaving a company. Under Indian law (Sec 27 Contract Act), post-exit non-competes are void.',
    practicalExample: 'A clause saying "You cannot work in any FinTech company in India for 1 year after leaving" is legally void and unenforceable in Indian courts.'
  },
  'arbitration': {
    term: 'Arbitration (Seat vs Venue)',
    hindiTerm: 'मध्यस्थता (Madhyasthata)',
    definition: 'A private dispute resolution process outside of public courts. If the clause specifies a distant city (e.g. Singapore or London), you will have to bear massive private arbitrator fees.',
    practicalExample: 'Specifying arbitration in London for a Bengaluru freelance gig makes fighting for an unpaid ₹50,000 invoice practically impossible.'
  },
  'force-majeure': {
    term: 'Force Majeure (Act of God)',
    hindiTerm: 'अप्रत्याशित घटना (Vishesh Paristhiti)',
    definition: 'Unforeseeable external circumstances (pandemics, floods, war) that legally excuse a party from fulfilling their contractual obligations without penalty.',
    practicalExample: 'During heavy Chennai or Mumbai floods, you cannot be penalized for delayed project delivery if a force majeure clause is in place.'
  },
  'severability': {
    term: 'Severability',
    hindiTerm: 'पृथक्करणीयता (Alag karne yogya)',
    definition: 'A standard clause stating that if a court declares one clause illegal (like an unfair non-compete), the rest of the contract remains valid and alive.',
    practicalExample: 'Even if the non-compete clause is thrown out by a judge, you still get your agreed salary and confidentiality protections.'
  },
  'liquidated-damages': {
    term: 'Liquidated Damages vs Penalty',
    hindiTerm: 'निर्धारित हर्जाना (Nirdharit Harjana)',
    definition: 'A pre-estimated sum written into the contract to be paid upon breach. In India (Sec 74), courts will only award reasonable compensation for actual damage proved, not arbitrary penalty sums.',
    practicalExample: 'A company cannot arbitrarily demand ₹5,00,000 for resigning before 1 year unless they prove they spent that exact amount on specialized external training.'
  },
  'stamp-duty': {
    term: 'Stamp Duty & e-Stamping',
    hindiTerm: 'स्टाम्प शुल्क (Stamp Shulk)',
    definition: 'State tax payable on legal agreements to make them admissible as evidence in Indian courts under the Indian Stamp Act, 1899.',
    practicalExample: 'An unstamped or insufficiently stamped rental agreement cannot be produced as valid evidence before a civil judge until the penalty duty is paid.'
  }
};
