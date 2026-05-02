/**
 * knowledgeBase.ts
 * Structured, deterministic FAQ answers for common Indian election queries.
 * Priority 1 in the knowledge handling strategy — served before any AI call.
 * Each entry has keywords (for matching) and a pre-written answer.
 */

export interface KBEntry {
  id: string;
  keywords: string[];
  answer: string;
}

export const KNOWLEDGE_BASE: KBEntry[] = [
  {
    id: 'voting_age',
    keywords: ['minimum age', 'age to vote', 'voting age', 'how old', 'eligible age', 'age limit'],
    answer: `**Minimum Voting Age in India**\n\nThe minimum age to vote in Indian elections is **18 years**. This was established by the **61st Constitutional Amendment Act, 1988**, which reduced the voting age from 21 to 18 years. Any Indian citizen who is 18 years or older on the qualifying date (1st January of the year of electoral roll revision) is eligible to register as a voter.\n\n📋 *To register, you must apply via **Form 6** on the NVSP portal: [nvsp.in](https://www.nvsp.in)*`,
  },
  {
    id: 'voter_registration',
    keywords: ['how to register', 'voter registration', 'register to vote', 'enroll', 'form 6', 'add name', 'electoral roll', 'voter list', 'nvsp'],
    answer: `**How to Register as a Voter in India**\n\nFollow these steps to register:\n\n1. **Visit** [voters.eci.gov.in](https://voters.eci.gov.in) or [nvsp.in](https://www.nvsp.in)\n2. **Fill Form 6** — for new voter registration\n3. **Documents required:**\n   - Age proof (Aadhaar, birth certificate, or passport)\n   - Address proof (Aadhaar, utility bill, or rent agreement)\n   - Recent passport-size photograph\n4. **Submit online** or visit your nearest **Booth Level Officer (BLO)**\n5. **Track your status** on the NVSP portal using your reference number\n\n⏱️ Processing typically takes **2–4 weeks**. You can also call **Voter Helpline: 1950** for assistance.`,
  },
  {
    id: 'epic_voter_id',
    keywords: ['voter id', 'epic', 'voter card', 'elector photo', 'photo identity card', 'voter id card'],
    answer: `**EPIC — Elector's Photo Identity Card**\n\nEPIC (Elector's Photo Identity Card) is the official **Voter ID Card** issued by the Election Commission of India (ECI). It serves as:\n- Proof of voter registration on the Electoral Roll\n- A valid photo ID for voting at the polling booth\n\n**How to get your EPIC:**\n1. Register via **Form 6** on [nvsp.in](https://www.nvsp.in)\n2. After approval, your EPIC is dispatched to your registered address\n3. You can also download the **e-EPIC (digital voter ID)** from the Voter Helpline App\n\n📱 *Download the **Voter Helpline App** from the Play Store or App Store for your e-EPIC.*`,
  },
  {
    id: 'find_polling_booth',
    keywords: ['polling booth', 'find booth', 'polling station', 'where to vote', 'my booth', 'voting center'],
    answer: `**How to Find Your Polling Booth**\n\nUse any of these official ECI methods:\n\n1. **Online Portal:** Visit [voters.eci.gov.in](https://voters.eci.gov.in) → "Find Polling Station"\n2. **Voter Helpline App:** Download from Play Store/App Store → Search by your name or EPIC number\n3. **SMS:** Send **EPIC <your voter ID number>** to **1950**\n4. **Helpline:** Call **1950** (toll-free, all states)\n5. **BLO:** Contact your local Booth Level Officer\n\n📌 *Your polling booth details are also printed on your EPIC (Voter ID Card).*`,
  },
  {
    id: 'evm',
    keywords: ['evm', 'electronic voting machine', 'voting machine', 'how evm works', 'evm tampering'],
    answer: `**Electronic Voting Machines (EVMs)**\n\nEVMs are the electronic devices used in Indian elections to record votes. Key facts:\n\n- **Introduced:** Pilot use in 1982; national rollout from 1999\n- **Standalone devices:** Not connected to the internet, making remote tampering impossible\n- **VVPAT:** Every EVM is paired with a **Voter Verified Paper Audit Trail (VVPAT)** machine that prints a paper slip confirming your vote for 7 seconds\n- **Manufactured by:** BEL (Bharat Electronics Limited) and ECIL under ECI supervision\n- **Battery powered:** Works without electricity, enabling use in remote areas\n\n🔒 *EVMs are sealed and secured under multi-party observation at all stages.*`,
  },
  {
    id: 'nota',
    keywords: ['nota', 'none of the above', 'reject all candidates', 'no vote'],
    answer: `**NOTA — None of the Above**\n\nNOTA is an option on Indian EVMs that allows voters to officially **reject all candidates** on the ballot.\n\n- **Introduced:** October 2013, following a Supreme Court of India directive\n- **Symbol:** A ballot paper with a cross (✗)\n- **Effect:** NOTA votes are **counted and recorded** but do **not** affect the election result — the candidate with the highest votes still wins\n- **Purpose:** Provides voters a constitutional right to express disapproval without abstaining\n\n🗳️ *NOTA is available in all Lok Sabha, State Assembly, and Rajya Sabha biennial elections.*`,
  },
  {
    id: 'vvpat',
    keywords: ['vvpat', 'paper trail', 'voter verified', 'paper slip', 'audit trail'],
    answer: `**VVPAT — Voter Verified Paper Audit Trail**\n\nVVPAT is an independent verification system attached to every EVM.\n\n- **How it works:** After you press the candidate button on the EVM, the VVPAT displays a paper slip showing the **candidate's name, party symbol, and serial number** for **7 seconds**, then the slip drops into a sealed compartment\n- **Purpose:** Lets voters verify their vote was cast correctly\n- **Deployment:** Mandatory in all Indian elections since 2019 general elections\n- **Audit:** During counting, VVPAT slips of 5 randomly selected booths per constituency are physically counted and matched with EVM results\n\n✅ *This dual-verification ensures both electronic speed and paper-based audit capability.*`,
  },
  {
    id: 'model_code_of_conduct',
    keywords: ['model code of conduct', 'mcc', 'election code', 'code of conduct'],
    answer: `**Model Code of Conduct (MCC)**\n\nThe MCC is a set of guidelines issued by the **Election Commission of India** for political parties and candidates during elections.\n\n**Key rules:**\n- No use of government resources for campaigning\n- No use of religious places for political propaganda\n- **48-hour silence period** before polling (no campaigning)\n- No distribution of cash, liquor, or gifts to voters\n- All election-related expenses must be declared\n\n**Timeline:** Comes into effect the moment the **Election Schedule is announced** and remains active until results are declared.\n\n📲 *Report MCC violations using the **cVIGIL app** — Flying squads respond within 100 minutes.*`,
  },
  {
    id: 'election_commission',
    keywords: ['election commission', 'eci', 'who conducts elections', 'election authority', 'article 324'],
    answer: `**Election Commission of India (ECI)**\n\nThe ECI is the **autonomous constitutional authority** responsible for conducting all elections in India.\n\n- **Constitutional basis:** Article 324 of the Indian Constitution\n- **Established:** January 25, 1950 (celebrated as National Voters Day)\n- **Structure:** Chief Election Commissioner + 2 Election Commissioners\n- **Mandate:** Superintendence, direction, and control of elections to:\n  - Lok Sabha (Parliament)\n  - Rajya Sabha\n  - State Legislative Assemblies\n  - Offices of President and Vice-President\n\n🏛️ *Official website: [eci.gov.in](https://www.eci.gov.in)*`,
  },
  {
    id: 'lok_sabha',
    keywords: ['lok sabha', 'lower house', 'house of people', 'lok sabha seats', 'how many seats', '543'],
    answer: `**Lok Sabha — House of the People**\n\nThe Lok Sabha is the **lower house** of India's Parliament.\n\n- **Total seats:** 543 elected constituencies\n- **Election method:** First-Past-The-Post (FPTP) — the candidate with the most votes wins\n- **Eligibility to contest:** Indian citizen, 25 years or older\n- **Term:** 5 years (can be dissolved earlier by the President)\n- **Quorum:** 10% of total membership\n- **Speaker:** Elected by Lok Sabha members\n\n📊 *General elections are held every 5 years. The last Lok Sabha elections were in 2024.*`,
  },
  {
    id: 'rajya_sabha',
    keywords: ['rajya sabha', 'upper house', 'council of states', 'rajya sabha members'],
    answer: `**Rajya Sabha — Council of States**\n\nThe Rajya Sabha is the **upper house** (permanent house) of India's Parliament.\n\n- **Total seats:** 245 (233 elected + 12 nominated by the President)\n- **Election method:** Elected by members of State Legislative Assemblies using proportional representation\n- **Permanent house:** Cannot be dissolved — 1/3 of members retire every 2 years\n- **Term:** 6 years per member\n- **Eligibility to contest:** Indian citizen, 30 years or older\n\n🏛️ *The Vice President of India is the ex-officio Chairman of the Rajya Sabha.*`,
  },
  {
    id: 'form_6',
    keywords: ['form 6', 'new registration form', 'registration form'],
    answer: `**Form 6 — New Voter Registration**\n\nForm 6 is the official application form to **register your name on the Electoral Roll** for the first time.\n\n**Who should fill it:**\n- Citizens turning 18 on or before January 1 of the electoral roll year\n- People who have moved to a new constituency\n\n**How to apply:**\n1. Online: [voters.eci.gov.in](https://voters.eci.gov.in) → Register as Voter → Fill Form 6\n2. Offline: Download Form 6 from [nvsp.in](https://www.nvsp.in) and submit to your local Electoral Registration Officer (ERO)\n\n**Documents:** Age proof + address proof + photograph\n\n⏱️ *Applications can be submitted year-round but electoral rolls are revised annually.*`,
  },
  {
    id: 'cvigil',
    keywords: ['cvigil', 'c-vigil', 'report violation', 'mcc violation', 'election violation', 'complaint'],
    answer: `**cVIGIL — Citizen Vigilance App**\n\ncVIGIL is an official ECI app that lets citizens **report Model Code of Conduct violations** in real-time.\n\n**How it works:**\n1. Download **cVIGIL** from Play Store or App Store\n2. Click a photo or short video of the violation\n3. The app auto-captures **timestamp + GPS location**\n4. Submit — a unique ID is generated for tracking\n5. Flying squads are dispatched within **100 minutes**\n\n**What to report:**\n- Cash/liquor distribution to voters\n- Use of religious places for propaganda\n- Defacement of public property\n- Unauthorized hoardings or banners\n\n📲 *Your identity remains anonymous. Complaints can be tracked using the submission ID.*`,
  },
  {
    id: 'eligibility_criteria',
    keywords: ['eligibility', 'who can vote', 'voter eligibility', 'can i vote', 'am i eligible', 'requirements to vote'],
    answer: `**Voter Eligibility Criteria in India**\n\nTo vote in Indian elections, you must meet **all** of the following:\n\n✅ Indian citizen\n✅ 18 years of age or older on January 1 of the electoral roll revision year\n✅ Ordinary resident of the constituency where you want to vote\n✅ Name on the Electoral Roll of that constituency\n✅ Not declared of unsound mind by a court\n✅ Not disqualified under any law (e.g., corrupt practices)\n\n❌ **Non-resident Indians (NRIs)** can register as overseas voters but must be **physically present** in India on polling day to vote.\n\n📋 *Register at [nvsp.in](https://www.nvsp.in) using Form 6.*`,
  },
  {
    id: 'voting_process',
    keywords: ['how to vote', 'voting process', 'what happens at polling booth', 'voting day', 'casting vote', 'how does voting work'],
    answer: `**How to Cast Your Vote — Step by Step**\n\n1. **Bring ID:** Carry your EPIC (Voter ID) or any of the 12 alternative photo IDs accepted by ECI (Aadhaar, PAN card, Passport, etc.)\n2. **Go to your booth:** Visit the polling station printed on your Voter ID (typically 7 AM – 6 PM)\n3. **Verification:** Polling officer verifies your name on the Electoral Roll and marks your finger with indelible ink\n4. **Vote:** Press the button next to your chosen candidate on the EVM. The VVPAT will display your choice for 7 seconds.\n5. **Exit:** Your vote is securely recorded\n\n⚠️ *Do NOT bring your phone inside the voting compartment. Photography of the EVM or ballot is prohibited.*`,
  },
  {
    id: 'result_declaration',
    keywords: ['result declaration', 'counting day', 'when results', 'vote counting', 'how votes counted', 'election results'],
    answer: `**Vote Counting and Result Declaration**\n\n**Counting Process:**\n- Takes place on a designated **Counting Day**, announced by ECI with the election schedule\n- Conducted at designated Counting Centres under strict security\n- EVM results are tabulated round by round, constituency by constituency\n- Agents of all candidates are present to observe\n\n**Declaration of Results:**\n- The Returning Officer (RO) declares the winner after all rounds\n- Results are simultaneously published on the **ECI Results Portal**\n- The winning candidate receives a certificate of election\n\n📊 *For 2026 state assembly elections (Assam, Kerala, Tamil Nadu, West Bengal, Puducherry), results will be declared on dates announced by ECI.*`,
  },
  {
    id: 'indelible_ink',
    keywords: ['indelible ink', 'ink on finger', 'black ink', 'purple ink', 'ink mark'],
    answer: `**Indelible Ink in Indian Elections**\n\nIndelible ink is applied to the **index finger of the left hand** of every voter after they cast their vote, to **prevent duplicate voting**.\n\n- **Colour:** Dark purple/black — visible under UV light\n- **Manufacturer:** Mysore Paints and Varnish Ltd (MPVL), Karnataka — the sole manufacturer since 1962\n- **Persistence:** Remains visible for approximately **2–3 weeks**\n- **Applied to:** Left index finger's side nail (proximal phalange)\n\n🔒 *Attempting to vote again after receiving the ink mark is a criminal offense under the Representation of the People Act, 1951.*`,
  },
  {
    id: 'election_schedule_2026',
    keywords: ['2026 elections', 'upcoming elections', 'state elections 2026', 'assembly elections 2026', 'when are elections'],
    answer: `**2026 State Assembly Elections in India**\n\nThe following **Legislative Assembly elections** are scheduled in 2026:\n\n| State | Expected Period |\n|---|---|\n| **Assam** | Early 2026 |\n| **Kerala** | April–May 2026 |\n| **Tamil Nadu** | April–May 2026 |\n| **West Bengal** | April–May 2026 |\n| **Puducherry** | April–May 2026 |\n\n📅 *Official dates are announced by the Election Commission of India. Always verify at [eci.gov.in](https://www.eci.gov.in) or call **1950**.*\n\n🔍 *For the latest confirmed schedule, the VoteQuest AI Guide (powered by Google Search) can provide real-time information.*`,
  },
  {
    id: 'article_324',
    keywords: ['article 324', 'constitution election', 'constitutional provision', 'article 326', 'fundamental right to vote'],
    answer: `**Constitutional Provisions for Elections in India**\n\n| Article | Provision |\n|---|---|\n| **Article 324** | Vests superintendence of all elections in the Election Commission of India |\n| **Article 325** | No person excluded from electoral roll on grounds of religion, race, caste, or sex |\n| **Article 326** | Elections to Lok Sabha and State Assemblies on basis of adult suffrage (18+) |\n| **Article 327** | Parliament's power to make laws on elections |\n| **Article 170** | Composition of State Legislative Assemblies |\n\n📖 *The Representation of the People Act, 1951 is the primary legislation governing the conduct of elections in India.*`,
  },
  {
    id: 'helpline',
    keywords: ['helpline', '1950', 'election helpline', 'voter helpline', 'contact eci', 'phone number'],
    answer: `**ECI Voter Helpline**\n\n📞 **Dial 1950** — National Voter Helpline (toll-free, available in all states)\n\n**Services available via 1950:**\n- Check your name on the Electoral Roll\n- Find your polling booth\n- Get your Electoral Registration Officer (ERO) contact\n- Report grievances and MCC violations\n- Track voter ID application status\n\n**Other official channels:**\n- 🌐 [voters.eci.gov.in](https://voters.eci.gov.in)\n- 🌐 [nvsp.in](https://www.nvsp.in)\n- 📱 Voter Helpline App (Play Store / App Store)\n- 📱 cVIGIL App — for reporting violations`,
  },
];

/**
 * Search the knowledge base for a matching answer.
 * Returns the answer string if found, null otherwise.
 */
export function searchKnowledgeBase(query: string): string | null {
  const q = query.toLowerCase().trim();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some(kw => q.includes(kw))) {
      return entry.answer;
    }
  }
  return null;
}
