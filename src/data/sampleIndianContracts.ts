import type { ContractAnalysis } from '../types/legal';
import { INDIAN_STATUTES } from '../services/indianLawRules';

export const SAMPLE_CONTRACTS: ContractAnalysis[] = [
  {
    id: 'bengaluru-tech-employment',
    title: 'Bengaluru Tech Startup Senior Engineer Employment Agreement',
    documentType: 'employment',
    partiesInvolved: {
      partyA: 'ApexFin Technologies Private Limited (Employer - Bengaluru)',
      partyB: 'Rahul Sharma (Software Engineer)'
    },
    fairnessScore: 38, // Low fairness score due to severe non-compete and IP overreach
    overallSummary: 'This employment agreement contains severe restrictions on post-employment mobility, excessive liquidated damages for early departure during probation, and an overbroad intellectual property assignment that extends to personal weekend work. Under Section 27 of the Indian Contract Act, 1872, the 2-year non-compete is legally void and unenforceable in Indian courts.',
    hindiSummary: 'इस रोजगार समझौते में नौकरी छोड़ने के बाद 2 साल तक किसी प्रतियोगी कंपनी में काम करने पर प्रतिबंध, 3 महीने की नोटिस अवधि और व्यक्तिगत समय में बनाए गए प्रोजेक्ट्स पर कंपनी के अनुचित अधिकार जैसे गंभीर खंड हैं। भारतीय अनुबंध अधिनियम (धारा 27) के अनुसार, नौकरी छोड़ने के बाद का गैर-प्रतिस्पर्धा खंड कानूनी रूप से पूरी तरह अमान्य (Void) है।',
    executiveSummary: 'CRITICAL RISKS IDENTIFIED: 1) Clause 9 imposes a 2-year post-termination non-compete across India and Southeast Asia (Void under Sec 27 ICA; Percept D\'Mark v. Zaheer Khan). 2) Clause 4 demands ₹5,00,000 in liquidated damages if resigning within 12 months (Unenforceable penalty under Sec 74 ICA without proof of actual specialized training costs). 3) Clause 7 claims ownership of all inventions created during term of employment, even outside business hours without company equipment.',
    clauses: [
      {
        id: 'emp-cl-1',
        clauseNumber: 'Clause 9.1',
        title: 'Post-Termination Restraint on Trade & Non-Compete',
        originalText: 'For a period of twenty-four (24) months following the termination or cessation of Employee\'s employment with the Company for any reason whatsoever, the Employee shall not directly or indirectly, whether as an employee, consultant, partner, advisor or shareholder, engage with, work for, or render services to any entity, company, or venture operating in the FinTech, Payment Aggregation, or Digital Lending domains within the territory of India, Singapore, and the United Arab Emirates.',
        simplifiedText: 'You are barred from working at ANY financial technology company anywhere in India, Singapore, or UAE for 2 full years after resigning, regardless of why you left.',
        hindiText: 'नौकरी छोड़ने के बाद 2 साल तक आप पूरे भारत, सिंगापुर या यूएई में किसी भी फिनटेक या डिजिटल लेंडिंग कंपनी में काम नहीं कर सकते।',
        executiveSummary: '24-month regional non-compete covenant barring employment in entire FinTech sector.',
        riskLevel: 'high',
        riskScore: 95,
        statutoryViolations: [INDIAN_STATUTES.ICA_SECTION_27, INDIAN_STATUTES.ICA_SECTION_23],
        explanation: 'Under Section 27 of the Indian Contract Act, 1872, every agreement restraining anyone from exercising a lawful profession, trade, or business is void ab initio. The Supreme Court of India in Percept D\'Mark v. Zaheer Khan (2006) reaffirmed that post-employment non-compete restrictions are completely invalid, irrespective of whether the restraint is reasonable or limited in duration or territory.',
        practicalImpact: 'Even though companies include this clause to intimidate employees, Indian courts will NOT grant an injunction preventing you from taking up employment with a competitor once your employment has ended.',
        suggestedRevision: 'Delete post-employment non-compete entirely, replacing it with a reasonable 6-month non-solicitation of clients and colleagues, and strict confidentiality protections.',
        category: 'Non-Compete'
      },
      {
        id: 'emp-cl-2',
        clauseNumber: 'Clause 4.3',
        title: 'Probation Period & Resignation Clawback Penalty',
        originalText: 'The Employee shall be subject to a probation period of six (6) months. In the event the Employee tenders their resignation or separates from the Company prior to completing twelve (12) continuous months of service, the Employee covenants to pay the Company a liquidated sum of INR 5,00,000 (Rupees Five Lakhs) as training and recruitment compensation, which the Company shall be entitled to deduct from the Full and Final settlement.',
        simplifiedText: 'If you leave within your first year, the company will automatically deduct or demand ₹5,00,000 as a penalty for "training costs".',
        hindiText: 'यदि आप 1 साल के भीतर इस्तीफा देते हैं, तो कंपनी आपके अंतिम वेतन से ₹5,00,000 का हर्जाना काट लेगी।',
        executiveSummary: 'Automatic ₹5 Lakh resignation penalty within first 12 months.',
        riskLevel: 'high',
        riskScore: 88,
        statutoryViolations: [INDIAN_STATUTES.ICA_SECTION_74, INDIAN_STATUTES.SPECIFIC_RELIEF_INJUNCTION],
        explanation: 'Section 74 of the Indian Contract Act permits only reasonable compensation for actual proven damage or specialized training expenses incurred. Supreme Court in Kailash Nath Associates v. DDA (2015) ruled that stipulated sums cannot be collected as a punitive penalty without proving actual loss. Pure employment bonds without distinct, expensive foreign training are unenforceable.',
        practicalImpact: 'The employer cannot arbitrarily withhold your earned salary or experience certificate based on an unjustified penalty clause.',
        suggestedRevision: 'The Employee may terminate employment during probation with thirty (30) days written notice without any monetary penalty, save for repayment of documented actual third-party certification fees.',
        category: 'Penalty/Deposit' as any
      },
      {
        id: 'emp-cl-3',
        clauseNumber: 'Clause 7.2',
        title: 'Overbroad Scope of Intellectual Property Assignment',
        originalText: 'Employee unconditionally assigns to the Company all worldwide right, title, and interest in and to any and all inventions, code, software, concepts, and designs conceived, developed, or reduced to practice by Employee, whether alone or with others, during the term of employment, whether or not conceived during normal business hours or utilizing Company equipment, premises, or confidential data.',
        simplifiedText: 'The company claims ownership of everything you build while employed—even personal side projects or open-source apps you create on your personal laptop during Sunday afternoons.',
        hindiText: 'कंपनी आपके द्वारा बनाए गए हर कोड और ऐप पर अपना मालिकाना हक मांगती है, भले ही आपने उसे सप्ताहांत (रविवार) में अपने निजी लैपटॉप पर बनाया हो।',
        executiveSummary: 'Overbroad assignment covering personal weekend inventions.',
        riskLevel: 'medium',
        riskScore: 72,
        statutoryViolations: [INDIAN_STATUTES.ICA_SECTION_23],
        explanation: 'While Indian Copyright Act, 1957 recognizes work-for-hire in the course of employment (Section 17), claiming IP created outside working hours, without company equipment or proprietary data, is an unconscionable contractual term (Central Inland Water Transport precedent).',
        practicalImpact: 'If you build a SaaS tool or contribute to GitHub in your spare time, the employer could attempt to claim copyright or demand profits.',
        suggestedRevision: 'Limit assignment exclusively to inventions created in the direct scope of the Employee\'s assigned duties, during working hours, or using the Company\'s proprietary infrastructure and confidential trade secrets.',
        category: 'IP Rights'
      },
      {
        id: 'emp-cl-4',
        clauseNumber: 'Clause 14.1',
        title: 'Notice Period & Discretionary Buyout Option',
        originalText: 'Following confirmation, either party may terminate employment by providing ninety (90) days written notice. Provided however, that the Company reserves the sole, unilateral discretion to decline any request by the Employee for payment in lieu of notice (notice buyout), and may compel the Employee to serve the full ninety days without relief.',
        simplifiedText: 'You must serve a mandatory 3-month notice period. The company can reject your buyout offer and force you to stay for 90 days, which can jeopardize new job offers.',
        hindiText: 'इस्तीफे के बाद आपको 90 दिनों (3 महीने) की नोटिस अवधि देनी होगी, और कंपनी नोटिस पे (Buyout) स्वीकार करने से इनकार कर सकती है।',
        executiveSummary: 'Mandatory 90-day notice with unilateral employer veto on buyout.',
        riskLevel: 'medium',
        riskScore: 60,
        statutoryViolations: [],
        explanation: 'While a 90-day notice period is common in India, unilateral refusal to allow standard buyout creates significant friction when transitioning to new roles. Courts will not force personal service under the Specific Relief Act, 1963, though employers can attempt to withhold relieving letters.',
        practicalImpact: 'Most new employers in India cannot wait 90 days, leading to potential offer revocations.',
        suggestedRevision: 'Allow mutually agreed notice buyout (payment of basic salary in lieu of notice) at the election of either party with 30 days minimum handover period.',
        category: 'Termination'
      }
    ],
    keyRisks: [
      'Illegal 2-Year Non-Compete: Supreme Court precedent (Percept D\'Mark) makes post-employment covenants void under Section 27 Indian Contract Act.',
      'Unenforceable ₹5 Lakh Resignation Penalty: Disproportionate penalty under Section 74 without evidence of specialized expenditure.',
      'Moonlighting & Personal IP Overreach: Blanket assignment of weekend projects infringes on personal intellectual property rights.',
      'Extended 90-Day Lock-in: Unilateral veto on notice buyout can obstruct career progression.'
    ],
    keyObligations: [
      {
        id: 'ob-1',
        title: 'Notice Period on Resignation',
        party: 'User',
        deadline: '90 days prior written notice',
        penaltyOnDefault: 'Loss of salary in lieu of notice, withholding of relieving documentation.',
        statutoryReference: 'Specific Relief Act, 1963'
      },
      {
        id: 'ob-2',
        title: 'Non-Disclosure of Trade Secrets',
        party: 'User',
        deadline: 'Perpetual obligation',
        penaltyOnDefault: 'Injunction and civil damages under common law tort and IT Act 2000.',
        statutoryReference: 'Information Technology Act, 2000'
      }
    ],
    counterProposals: [
      {
        id: 'cp-1',
        originalClauseTitle: 'Clause 9.1 (Non-Compete)',
        originalText: 'Employee shall not engage with, work for, or render services to any entity in FinTech across India, Singapore, and UAE for twenty-four (24) months.',
        proposedBalancedText: 'Employee agrees that for a period of six (6) months following termination, Employee shall not solicit the active clients or recruit direct team members of the Company. Post-employment non-compete is acknowledged as superseded by confidentiality and non-solicitation undertakings.',
        rationaleForCounterparty: 'Aligns with Section 27 of the Indian Contract Act, 1872 and Supreme Court jurisprudence, while maintaining full protection for the Company\'s confidential data, client relationships, and team stability.',
        friendlyWhatsAppMessage: 'Hi [HR/Hiring Manager], regarding Clause 9 in the offer agreement: Under Section 27 of the Indian Contract Act, post-exit non-competes are generally not enforceable in India. I have proposed substituting it with strong 6-month non-solicitation and strict non-disclosure clauses to protect ApexFin\'s IP and clients. Looking forward to your positive confirmation!',
        formalEmailDraft: 'Dear HR Team,\n\nThank you for the offer letter with ApexFin Technologies. Upon reviewing the draft agreement, I noted that Clause 9.1 stipulates a 24-month post-employment non-compete across multiple jurisdictions. As established under Section 27 of the Indian Contract Act, 1872 and affirmed by the Hon\'ble Supreme Court in Percept D\'Mark (India) Pvt. Ltd. v. Zaheer Khan, post-termination covenants in restraint of trade are void in India.\n\nI am fully committed to safeguarding all proprietary data and propose replacing this clause with a balanced 6-month non-solicitation clause and rigorous confidentiality covenant.\n\nPlease find the proposed balanced language attached for your legal team\'s review.\n\nWarm regards,\nRahul Sharma'
      }
    ],
    diffComparison: [
      {
        id: 'diff-1',
        clauseTitle: 'Post-Employment Non-Compete',
        type: 'added',
        originalClause: '24-month complete prohibition on working with any FinTech firm across India, Singapore, and UAE.',
        comparedClause: 'Standard Indian IT agreement: No post-employment restraint; 6-month non-solicitation of active clients only.',
        changeSummary: 'Severe geographic and industry-wide restriction added that restricts fundamental right to livelihood.',
        legalImpact: 'Completely void under Section 27 of the Indian Contract Act, 1872.',
        riskShift: 'increased'
      },
      {
        id: 'diff-2',
        clauseTitle: 'Resignation Penalty',
        type: 'added',
        originalClause: 'Automatic ₹5,00,000 penalty deducted from settlement if leaving within 12 months.',
        comparedClause: 'Standard IT agreement: Nil penalty during probation; 30-day notice or payment in lieu.',
        changeSummary: 'Imposes fixed penalty without proving expenditure on employee training.',
        legalImpact: 'Violates Section 74 of Indian Contract Act (Fateh Chand / Kailash Nath rule).',
        riskShift: 'increased'
      }
    ],
    advocateBrief: {
      documentTitle: 'Senior Software Engineer Offer & Employment Agreement',
      documentType: 'employment',
      jurisdiction: 'Bangalore Urban District, Karnataka / Union of India',
      dateGenerated: '24 September 2026',
      overallFairnessScore: 38,
      executiveSummary: 'The agreement contains standard confidentiality terms but suffers from severe illegalities regarding post-termination non-compete covenants (Clause 9), exorbitant fixed liquidated damages (Clause 4), and extraterritorial IP assignment over personal works (Clause 7).',
      criticalRedFlags: [
        {
          clauseTitle: 'Clause 9.1: 2-Year Non-Compete',
          issue: 'Restraint of trade across 3 countries for 24 months post-exit.',
          statutoryConflict: 'Directly violates Section 27 of the Indian Contract Act, 1872. Void ab initio.'
        },
        {
          clauseTitle: 'Clause 4.3: ₹5,00,000 Training Bond Penalty',
          issue: 'Automatic deduction without specialized training or actual loss documentation.',
          statutoryConflict: 'Section 74 Indian Contract Act (Kailash Nath Associates rule against extortionate penalties).'
        }
      ],
      keyQuestionsToAskAdvocate: [
        'If I sign the agreement with the 2-year non-compete clause as-is, can the employer obtain an ex-parte ad-interim injunction against my joining a competitor in Bangalore Civil Court?',
        'If they deduct ₹5,00,000 from my final settlement for early resignation, what is the fastest remedy under the Karnataka Payment of Wages Act or Civil Court for recovery with 18% interest?',
        'Can the employer lawfully refuse to issue my Service Certificate and Relieving Letter under Karnataka Shops and Commercial Establishments Act?'
      ],
      documentsAndEvidenceToBring: [
        'Original Offer Letter and Appointment Letter signed by both parties',
        'Monthly Payslips and Bank Statements showing salary credit',
        'Company Code of Conduct and Employee Handbook policies',
        'Proof of resignation email and communication records'
      ],
      suggestedLegalRemedies: [
        'Issue a legal notice through an advocate highlighting Section 27 of the Indian Contract Act if threatened with an injunction.',
        'File an application before the Deputy Labour Commissioner under the Payment of Wages Act for recovery of unauthorized salary deductions.',
        'File a declaration suit under Section 34 of the Specific Relief Act declaring the penalty clause void.'
      ]
    }
  },

  {
    id: 'bengaluru-residential-rental',
    title: '11-Month Residential Leave and License Agreement (Bengaluru / Mumbai)',
    documentType: 'rental',
    partiesInvolved: {
      partyA: 'K. V. Narayana Swamy (Licensor / Landlord - Indiranagar, Bengaluru)',
      partyB: 'Priya Iyer (Licensee / Tenant)'
    },
    fairnessScore: 42,
    overallSummary: 'This standard 11-month rental agreement contains several heavily landlord-biased clauses prevalent in urban Indian metros, including an excessive 10-month security deposit, arbitrary 10% annual escalation, unannounced inspection rights, and automatic forfeiture of security deposit on early termination.',
    hindiSummary: 'यह 11 महीने का किराया अनुबंध मकान मालिक के पक्ष में झुका हुआ है। इसमें 10 महीने का अत्यधिक सिक्योरिटी डिपॉजिट, बिना पूर्व सूचना के मकान में घुसने का अधिकार और समय से पहले खाली करने पर पूरा डिपॉजिट जब्त करने की अनुचित शर्तें शामिल हैं।',
    executiveSummary: 'KEY RISKS: 1) 10 Months Security Deposit (INR 5,00,000) exceeds the Model Tenancy Act benchmark of 2 months. 2) Clause 6 permits landlord entry at any hour without prior written notice. 3) Clause 11 levies mandatory INR 50,000 painting and refurbishment charge deducted from deposit irrespective of condition.',
    clauses: [
      {
        id: 'rent-cl-1',
        clauseNumber: 'Clause 3.1',
        title: 'Security Deposit & Lock-in Forfeiture',
        originalText: 'The Licensee has paid an interest-free refundable security deposit of INR 5,00,000 (Rupees Five Lakhs, equivalent to 10 months rent) to the Licensor. In the event the Licensee vacates the scheduled premises prior to the completion of the 11-month lock-in period, the entire security deposit amount shall stand forfeited to the Licensor as liquidated compensation.',
        simplifiedText: 'You pay 10 months of rent as a deposit. If you have to move out before 11 months (e.g. job transfer or emergency), the landlord keeps your entire ₹5,00,000 deposit.',
        hindiText: 'आपको 10 महीने का किराया (₹5 लाख) डिपॉजिट देना होगा। यदि आप 11 महीने से पहले कमरा खाली करते हैं, तो मकान मालिक पूरा ₹5 लाख जब्त कर लेगा।',
        executiveSummary: '10-month deposit with complete forfeiture on pre-11 month vacation.',
        riskLevel: 'high',
        riskScore: 92,
        statutoryViolations: [INDIAN_STATUTES.MODEL_TENANCY_ACT_DEPOSIT, INDIAN_STATUTES.ICA_SECTION_74],
        explanation: 'Under the Model Tenancy Act, 2021 (adopted across state tenancy frameworks), security deposits for residential premises are capped at a maximum of two months rent. Furthermore, total forfeiture of a 10-month deposit for early vacation constitutes an unlawful penalty under Section 74 of the Indian Contract Act, as the landlord must mitigate damages by finding a new licensee.',
        practicalImpact: 'If you are transferred or face an emergency, you risk losing half a million rupees without any correlation to actual rent lost.',
        suggestedRevision: 'Security deposit capped at 2-3 months rent. Either party may terminate with one (1) month prior written notice or payment of one month rent in lieu thereof, with deposit refunded within 7 days of peaceful handover.',
        category: 'Deposit/Payment' as any
      },
      {
        id: 'rent-cl-2',
        clauseNumber: 'Clause 6.2',
        title: 'Unrestricted Landlord Inspection and Entry',
        originalText: 'The Licensor or his authorized representatives shall be entitled to enter, inspect, and examine the condition of the licensed premises at any time and hour deemed fit by the Licensor, with or without prior notice to the Licensee.',
        simplifiedText: 'The landlord can enter your home at any time of day or night without giving you any advance notice.',
        hindiText: 'मकान मालिक बिना किसी पूर्व सूचना के किसी भी समय आपके घर के अंदर निरीक्षण के लिए आ सकता है।',
        executiveSummary: 'Unannounced entry rights violating tenant privacy.',
        riskLevel: 'high',
        riskScore: 85,
        statutoryViolations: [INDIAN_STATUTES.MODEL_TENANCY_ACT_DEPOSIT],
        explanation: 'Section 11 of the Model Tenancy Act mandates that the landlord or property manager must provide at least 24 hours prior written notice (via SMS, email, or letter) specifying the time and purpose of entry, which must occur between 7:00 AM and 8:00 PM. Unannounced entry infringes on the licensee\'s right to quiet enjoyment and privacy.',
        practicalImpact: 'Severe invasion of privacy and peace of mind.',
        suggestedRevision: 'Licensor may inspect premises only upon providing at least twenty-four (24) hours prior written notice, during reasonable daytime hours (10:00 AM to 6:00 PM), and in the presence of the Licensee.',
        category: 'General'
      },
      {
        id: 'rent-cl-3',
        clauseNumber: 'Clause 11.1',
        title: 'Mandatory Non-Refundable Painting and Renovation Deduction',
        originalText: 'At the time of vacating the premises, a flat deduction of one full month\'s rent (INR 50,000) shall be unconditionally deducted from the security deposit towards repainting and deep-cleaning the premises, notwithstanding normal wear and tear.',
        simplifiedText: 'When moving out, the landlord will automatically keep ₹50,000 for painting, even if you kept the house in pristine condition.',
        hindiText: 'मकान खाली करते समय ₹50,000 की कटौती रंग-रोगन (Painting) के नाम पर अपने आप काट ली जाएगी।',
        executiveSummary: 'Flat 1-month rent deduction for painting irrespective of condition.',
        riskLevel: 'medium',
        riskScore: 68,
        statutoryViolations: [INDIAN_STATUTES.CPA_UNFAIR_CONTRACTS],
        explanation: 'Under Indian tenancy principles and the Transfer of Property Act, licensees are not liable for normal wear and tear. Mandatory arbitrary deductions without an itemized bill or proof of repainting cost constitute unfair contractual trade practices.',
        practicalImpact: 'Tenants routinely lose significant sums upon vacating Bengaluru apartments due to this boilerplate clause.',
        suggestedRevision: 'Tenant shall return premises in the same condition as received, normal wear and tear excepted. Actual painting costs to be deducted only if tenant caused abnormal damage, backed by valid GST vendor invoice.',
        category: 'Deposit/Payment' as any
      }
    ],
    keyRisks: [
      'Exorbitant 10-Month Deposit: Exceeds standard statutory benchmarks of 2 months rent.',
      'Unlawful 100% Deposit Forfeiture: Threat of losing ₹5 Lakhs violates Section 74 ICA against punitive forfeiture.',
      'Unannounced Entry: Zero privacy protection; violates 24-hour notice standard under Model Tenancy Act.',
      'Automatic Painting Deduction: ₹50,000 deducted regardless of actual condition or normal wear and tear.'
    ],
    keyObligations: [
      {
        id: 'rent-ob-1',
        title: 'Monthly Rent Payment',
        party: 'User',
        deadline: 'On or before 5th of each English calendar month',
        penaltyOnDefault: 'Interest at 18% p.a. on delayed rent and notice to vacate.',
        statutoryReference: 'Transfer of Property Act, 1882'
      },
      {
        id: 'rent-ob-2',
        title: 'Return of Security Deposit',
        party: 'Counterparty',
        deadline: 'Simultaneously on day of vacant possession handover',
        penaltyOnDefault: 'Interest penalty of 12% p.a. on delayed deposit refund.',
        statutoryReference: 'Model Tenancy Act, 2021'
      }
    ],
    counterProposals: [
      {
        id: 'rent-cp-1',
        originalClauseTitle: 'Clause 3.1 (Security Deposit)',
        originalText: 'Deposit of INR 5,00,000 (10 months) forfeited entirely if vacating before 11 months.',
        proposedBalancedText: 'Security deposit shall be INR 1,50,000 (equivalent to 3 months rent). Either party may terminate the agreement after a 3-month lock-in period by providing one (1) month prior written notice. Deposit shall be refunded on the day keys are handed over.',
        rationaleForCounterparty: 'Aligns with Model Tenancy guidelines while providing the owner a fair 1-month notice cushion to find a suitable new tenant.',
        friendlyWhatsAppMessage: 'Hello Uncle/Sir, thank you for sharing the draft agreement. In Clause 3, the 10-month deposit and total forfeiture is quite steep. Under tenancy benchmarks, 3 months deposit is standard, and a 1-month notice period allows you ample time to find a replacement if my company transfers me. Could we update the deposit to 3 months and adjust the lock-in? Thank you!',
        formalEmailDraft: 'Dear Sir,\n\nThank you for forwarding the draft Leave & License Agreement. I have reviewed the terms and would request a couple of adjustments to align with standard Model Tenancy benchmarks:\n\n1. Security Deposit: Reduce from 10 months to 3 months (INR 1,50,000).\n2. Early Vacation: Provide a 1-month notice clause instead of 100% deposit forfeiture, ensuring you have adequate time to arrange another licensee.\n3. Inspection: Add standard 24-hour prior notice for property visits.\n\nLooking forward to signing the finalized copy.\n\nBest regards,\nPriya Iyer'
      }
    ],
    diffComparison: [
      {
        id: 'rent-diff-1',
        clauseTitle: 'Security Deposit Ceiling',
        type: 'modified',
        originalClause: '10 Months Rent (INR 5,00,000) held as interest-free deposit.',
        comparedClause: 'Model Tenancy Act Standard: Maximum 2 months rent for residential premises.',
        changeSummary: 'Demands 5x more capital upfront than statutory benchmark.',
        legalImpact: 'Violates Section 10 of Model Tenancy Act, 2021.',
        riskShift: 'increased'
      },
      {
        id: 'rent-diff-2',
        clauseTitle: 'Inspection Notice',
        type: 'removed',
        originalClause: 'Landlord may inspect anytime without prior notice.',
        comparedClause: 'Standard Tenancy: Minimum 24 hours prior written notice between 7 AM and 8 PM.',
        changeSummary: 'Completely removes statutory privacy protection.',
        legalImpact: 'Violates Section 11 of Model Tenancy Act.',
        riskShift: 'increased'
      }
    ],
    advocateBrief: {
      documentTitle: 'Residential Leave and License Agreement - Indiranagar, Bengaluru',
      documentType: 'rental',
      jurisdiction: 'Bengaluru Urban, Karnataka',
      dateGenerated: '24 September 2026',
      overallFairnessScore: 42,
      executiveSummary: 'Agreement exhibits multiple predatory clauses: an unlawful 10-month security deposit with 100% forfeiture clause, complete absence of inspection notice, and unconditional painting deductions.',
      criticalRedFlags: [
        {
          clauseTitle: 'Clause 3.1: 10-Month Deposit & Forfeiture',
          issue: '100% forfeiture of ₹5 Lakh on early exit.',
          statutoryConflict: 'Section 74 Indian Contract Act (unlawful penalty) and Model Tenancy Act cap.'
        },
        {
          clauseTitle: 'Clause 6.2: Unannounced Entry',
          issue: 'Landlord entering private residence without notice.',
          statutoryConflict: 'Section 11 Model Tenancy Act, 2021 (Mandatory 24h notice).'
        }
      ],
      keyQuestionsToAskAdvocate: [
        'If the landlord refuses to refund my ₹5 Lakh deposit upon handing over keys, what is the fastest summary procedure before the Rent Court under the Karnataka Rent Act?',
        'Can I withhold the last 2-3 months rent and ask the landlord to adjust from the security deposit if there is reasonable apprehension of non-refund?',
        'Does the agreement require mandatory registration and e-stamping under the Karnataka Stamp Act to be admissible before the Rent Authority?'
      ],
      documentsAndEvidenceToBring: [
        'Unexecuted Draft and E-stamped Agreement copy',
        'Bank transfer UTR receipt showing payment of ₹5,00,000 security deposit',
        'Handover checklist with photos of apartment condition at move-in',
        'All WhatsApp/Email message exchanges regarding repairs and notices'
      ],
      suggestedLegalRemedies: [
        'Serve a formal legal notice under Section 106 of the Transfer of Property Act demanding return of deposit within 15 days.',
        'File an application before the Rent Authority / Rent Tribunal for recovery of security deposit with statutory interest.',
        'File a consumer complaint under Section 35 of the Consumer Protection Act, 2019 for deficiency of service and unfair trade practice.'
      ]
    }
  },

  {
    id: 'freelance-services-retainer',
    title: 'Freelance Engineering & Design Master Services Agreement',
    documentType: 'freelance_sow',
    partiesInvolved: {
      partyA: 'Apex Growth Marketing LLC (Client - Delaware/Singapore)',
      partyB: 'Arjun Mehta (Independent Contractor - Pune, India)'
    },
    fairnessScore: 45,
    overallSummary: 'This international freelance agreement imposes high legal and financial risk on the Indian contractor. Key dangers include Net-90 day payment delays, unlimited indemnification for vague third-party IP infringements, and an offshore arbitration clause seated in Singapore under SIAC rules which makes recovering unpaid fees economically unfeasible.',
    hindiSummary: 'यह फ्रीलांस अनुबंध क्लाइंट के पक्ष में बहुत खतरनाक है। इसमें 90 दिनों के भुगतान की देरी (Net-90), असीमित क्षतिपूर्ति (Unlimited Indemnity), और सिंगापुर में महंगे निजी मध्यस्थता (Arbitration) की शर्तें हैं, जिससे भारतीय फ्रीलांसर के लिए अपनी बकाया फीस वसूलना लगभग असंभव हो जाता है।',
    executiveSummary: 'KEY RISKS: 1) Net-90 payment terms with client unilateral right to withhold payment on subjective dissatisfaction. 2) Unlimited indemnification with no liability cap. 3) Singapore arbitration seated under SIAC rules where legal fees will exceed invoice values.',
    clauses: [
      {
        id: 'free-cl-1',
        clauseNumber: 'Clause 8.1',
        title: 'Unlimited Indemnity and Third-Party Claims',
        originalText: 'Contractor shall defend, indemnify, and hold harmless Client, its affiliates, directors, and officers from and against any and all losses, claims, damages, liabilities, and legal expenses (including reasonable attorney fees) arising directly or indirectly from any alleged infringement of third-party intellectual property rights, breach of contract, or defect in deliverables.',
        simplifiedText: 'You must pay for all legal defense fees and damages if ANY third party ever sues the client claiming your work resembles theirs, even if the client asked for that specific design.',
        hindiText: 'यदि कोई तीसरा व्यक्ति क्लाइंट पर कॉपीराइट का दावा करता है, तो सारा हर्जाना और वकीलों की भारी फीस आपको अपने पास से भरनी होगी।',
        executiveSummary: 'Uncapped, one-sided indemnification for IP infringement.',
        riskLevel: 'high',
        riskScore: 94,
        statutoryViolations: [INDIAN_STATUTES.CPA_UNFAIR_CONTRACTS, INDIAN_STATUTES.ICA_SECTION_23],
        explanation: 'Standard commercial practice caps contractor liability to total fees paid under the contract in the preceding 12 months. An unlimited indemnity exposes an individual freelancer\'s personal assets to catastrophic litigation risk, especially in foreign jurisdictions.',
        practicalImpact: 'A single copyright claim from a US company could bankrupt an individual freelancer.',
        suggestedRevision: 'Contractor\'s total aggregate liability under this agreement, whether in contract, tort, or indemnity, shall strictly be capped at the total professional fees actually received by Contractor under the relevant SOW in the 3 months preceding the claim.',
        category: 'Liability'
      },
      {
        id: 'free-cl-2',
        clauseNumber: 'Clause 12.4',
        title: 'Dispute Resolution via Singapore International Arbitration (SIAC)',
        originalText: 'Any dispute, controversy, or claim arising out of or in connection with this Agreement shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre (SIAC) in accordance with the SIAC Rules. The seat of the arbitration shall be Singapore. The proceedings shall be conducted in English.',
        simplifiedText: 'If the client refuses to pay you ₹1,00,000, you have to hire international lawyers and fly to Singapore for arbitration, which costs ₹15,00,000 minimum.',
        hindiText: 'विवाद होने पर आपको केस लड़ने सिंगापुर जाना पड़ेगा, जहाँ का खर्च आपके पूरे प्रोजेक्ट की कमाई से दस गुना ज्यादा होगा।',
        executiveSummary: 'Singapore arbitration seat imposing insurmountable dispute costs.',
        riskLevel: 'high',
        riskScore: 90,
        statutoryViolations: [INDIAN_STATUTES.ARBITRATION_UNILATERAL_APPOINTMENT, INDIAN_STATUTES.ICA_SECTION_28],
        explanation: 'Specifying an expensive foreign seat for relatively small commercial retainers acts as a de facto bar on legal remedies under Section 28 of the Indian Contract Act. Minimum costs for a single SIAC arbitration filing exceed USD 10,000, discouraging freelancers from enforcing legitimate payment claims.',
        practicalImpact: 'The client can default on invoices with impunity, knowing you cannot afford Singapore arbitration.',
        suggestedRevision: 'For disputes under USD 20,000, parties agree to fast-track virtual mediation or online dispute resolution (ODR), or jurisdiction in Contractor\'s local city (Pune / Mumbai, India).',
        category: 'Arbitration'
      },
      {
        id: 'free-cl-3',
        clauseNumber: 'Clause 4.2',
        title: 'Net-90 Days Payment Terms with Subjective Acceptance',
        originalText: 'Invoices shall be payable within ninety (90) days of receipt. Client reserves the right to withhold payment in whole or in part if, in Client\'s sole and unfettered discretion, the Deliverables do not meet Client\'s subjective aesthetic or performance expectations.',
        simplifiedText: 'You get paid 3 months after delivering your work, and the client can withhold your money simply by claiming they "did not like" the design.',
        hindiText: 'काम पूरा होने के 90 दिन (3 महीने) बाद भुगतान किया जाएगा, और यदि क्लाइंट को डिजाइन पसंद नहीं आया तो वह पैसे रोक सकता है।',
        executiveSummary: 'Net-90 terms with unilateral subjective rejection right.',
        riskLevel: 'high',
        riskScore: 86,
        statutoryViolations: [INDIAN_STATUTES.CPA_UNFAIR_CONTRACTS],
        explanation: 'MSME Development Act, 2006 in India mandates payment within 45 days for registered micro and small enterprises. Unilateral subjective rejection clauses without clear objective acceptance criteria violate fair contract principles.',
        practicalImpact: 'Severe cash-flow strain and high risk of non-payment for completed hours.',
        suggestedRevision: 'Payment terms Net-15 days from invoice date. Deliverables deemed accepted unless written objective deficiency notice detailing non-compliance with SOW specs is provided within 7 business days.',
        category: 'Deposit/Payment' as any
      }
    ],
    keyRisks: [
      'Disproportionate Unlimited Indemnity: Puts personal savings at risk for client third-party suits.',
      'Singapore Arbitration Trap: Offshore arbitration makes recovery of invoices under ₹5,00,000 financially impossible.',
      'Net-90 Delayed Cashflow: Unreasonable credit period coupled with subjective rejection discretion.'
    ],
    keyObligations: [
      {
        id: 'free-ob-1',
        title: 'Milestone Deliverable Delivery',
        party: 'User',
        deadline: 'As per SOW timetable',
        penaltyOnDefault: 'Right of client to terminate and withhold milestone payments.',
        statutoryReference: 'Indian Contract Act, 1872'
      },
      {
        id: 'free-ob-2',
        title: 'Timely Invoice Settlement',
        party: 'Counterparty',
        deadline: 'Net 15 days from approval',
        penaltyOnDefault: '1.5% monthly late interest fee on overdue invoices.',
        statutoryReference: 'MSME Development Act, 2006'
      }
    ],
    counterProposals: [
      {
        id: 'free-cp-1',
        originalClauseTitle: 'Clause 8.1 (Unlimited Indemnity)',
        originalText: 'Contractor shall defend and indemnify Client against all claims and damages without limit.',
        proposedBalancedText: 'Contractor\'s total aggregate liability and indemnity under this Agreement shall not exceed the total fees paid to Contractor in the preceding three (3) months. Contractor shall not be liable for consequential or indirect damages.',
        rationaleForCounterparty: 'Standard limitation of liability customary for independent professional service providers worldwide.',
        friendlyWhatsAppMessage: 'Hey [Client Name], regarding the MSA draft: The unlimited indemnity clause is something my insurance does not cover. I\'ve added a standard mutual liability cap equal to 3 months of project fees, and set payment to Net-15 so we keep the delivery pace smooth. Ready to sign as soon as we update this!',
        formalEmailDraft: 'Dear Client Team,\n\nI am excited to kick off our collaboration. In reviewing the Master Services Agreement, I noticed Clause 8.1 contains an uncapped indemnity.\n\nAs an independent contractor, standard commercial practice requires a mutual limitation of liability capped at the fees paid under the relevant Statement of Work. I have also proposed updating payment terms to Net-15 days, which aligns with standard digital delivery workflows.\n\nPlease find the redlined agreement attached for your consideration.\n\nBest regards,\nArjun Mehta'
      }
    ],
    advocateBrief: {
      documentTitle: 'Freelance Design & Development MSA',
      documentType: 'freelance_sow',
      jurisdiction: 'Pune, Maharashtra (Contractor) / Singapore (Client)',
      dateGenerated: '24 September 2026',
      overallFairnessScore: 45,
      executiveSummary: 'The agreement contains heavily skewed risk allocation including unlimited personal indemnification, Net-90 delayed payout, and an exorbitant offshore arbitration mechanism designed to deter legal action.',
      criticalRedFlags: [
        {
          clauseTitle: 'Clause 8.1: Unlimited Indemnity',
          issue: 'No cap on financial liability for third-party IP claims.',
          statutoryConflict: 'Unfair trade practice; disproportionate risk allocation.'
        },
        {
          clauseTitle: 'Clause 12.4: SIAC Singapore Arbitration',
          issue: 'Prohibitive dispute resolution costs for domestic freelancer.',
          statutoryConflict: 'Section 28 Indian Contract Act (De facto restraint on legal remedies).'
        }
      ],
      keyQuestionsToAskAdvocate: [
        'If the foreign client defaults on an invoice of ₹3,00,000, can I file a summary commercial suit in Pune District Court under the Commercial Courts Act, 2015 despite the Singapore arbitration clause?',
        'Does registration under MSME (Udyam) in India allow me to file a reference before the MSME Facilitation Council for recovery with compound interest notwithstanding foreign arbitration clauses?',
        'How can I ensure my IP rights in the code do not transfer until 100% of the invoice is settled?'
      ],
      documentsAndEvidenceToBring: [
        'Executed Master Services Agreement and Statement of Work (SOW)',
        'GitHub commit logs and email approvals of milestones',
        'Invoices submitted and WhatsApp / Slack chats acknowledging delivery',
        'Udyam MSME Registration Certificate (if applicable)'
      ],
      suggestedLegalRemedies: [
        'Insert an IP retention clause: "IP rights transfer only upon receipt of full payment".',
        'File an application before the Micro and Small Enterprise Facilitation Council (MSEFC) which has statutory overriding powers over arbitration clauses.',
        'Issue a formal legal notice under Section 8 of the Insolvency and Bankruptcy Code (if applicable) or summary civil recovery suit.'
      ]
    }
  }
];
