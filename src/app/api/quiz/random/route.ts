import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const FALLBACK_QUESTIONS = [
  {
    question: "Which constitutional body is responsible for conducting elections in India?",
    options: ["A) Parliament of India", "B) Election Commission of India (ECI)", "C) Supreme Court of India", "D) National Human Rights Commission"],
    correct: "B",
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering Union and State election processes in India. It was established on January 25, 1950."
  },
  {
    question: "What is the minimum age to be eligible to vote in Indian general elections?",
    options: ["A) 21 years", "B) 25 years", "C) 18 years", "D) 16 years"],
    correct: "C",
    explanation: "Any Indian citizen who is 18 years of age or above is eligible to vote in Indian elections. The voting age was reduced from 21 to 18 by the 61st Constitutional Amendment Act, 1988."
  },
  {
    question: "What does EVM stand for in Indian elections?",
    options: ["A) Electronic Voting Machine", "B) Election Verification Module", "C) Electronic Vote Monitor", "D) Electorate Voter Management"],
    correct: "A",
    explanation: "EVM stands for Electronic Voting Machine. India started using EVMs to eliminate booth capturing, multiple voting, and to make the voting process faster and more reliable. They were first used extensively in 1999 general elections."
  },
  {
    question: "What is EPIC in the context of Indian elections?",
    options: ["A) Election Process in Constituencies", "B) Elector's Photo Identity Card", "C) Electoral Poll Identification Code", "D) Electronic Poll Index Card"],
    correct: "B",
    explanation: "EPIC stands for Elector's Photo Identity Card, commonly known as the Voter ID Card. It serves as proof of registration on the Electoral Roll and is issued by the Election Commission of India."
  },
  {
    question: "How many seats are there in the Lok Sabha (House of the People)?",
    options: ["A) 250", "B) 545", "C) 543", "D) 552"],
    correct: "C",
    explanation: "The Lok Sabha consists of 543 elected members representing constituencies across all states and union territories of India. The President can nominate 2 Anglo-Indian members, making the maximum strength 545."
  },
  {
    question: "What is the Model Code of Conduct (MCC) in Indian elections?",
    options: ["A) A code for voter behavior at polling booths", "B) Guidelines for candidates and parties from election announcement to results", "C) Rules for EVM testing", "D) Code for counting ballot papers"],
    correct: "B",
    explanation: "The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission of India for political parties and candidates during elections. It comes into effect the moment election dates are announced and remains in force until results are declared."
  },
  {
    question: "What is VVPAT in Indian elections?",
    options: ["A) Voter Verified Paper Audit Trail", "B) Voting Verification and Processing Audit Technology", "C) Virtual Voter Poll Assessment Terminal", "D) Vote Verification Public Accountability Tool"],
    correct: "A",
    explanation: "VVPAT (Voter Verified Paper Audit Trail) is an independent verification system attached to EVMs. It allows voters to verify that their vote was cast correctly by displaying a paper slip with the candidate's name and symbol for 7 seconds."
  },
  {
    question: "Which Article of the Indian Constitution establishes the Election Commission?",
    options: ["A) Article 280", "B) Article 324", "C) Article 356", "D) Article 370"],
    correct: "B",
    explanation: "Article 324 of the Indian Constitution vests the superintendence, direction and control of elections to Parliament, State Legislatures, the office of President and Vice-President in the Election Commission of India."
  },
  {
    question: "What is the term duration of a Lok Sabha member?",
    options: ["A) 4 years", "B) 6 years", "C) 5 years", "D) 3 years"],
    correct: "C",
    explanation: "The term of the Lok Sabha is 5 years from the date of its first sitting after a general election. However, the President can dissolve the Lok Sabha before the completion of its term on the advice of the Prime Minister."
  },
  {
    question: "What is the 'None of the Above' option on Indian ballots called?",
    options: ["A) NVP (No Vote Preference)", "B) NOTA", "C) BLANK", "D) ABSTAIN"],
    correct: "B",
    explanation: "NOTA (None of the Above) is an option on Indian electronic voting machines (EVMs) that allows voters to officially reject all candidates. It was introduced by the Supreme Court of India in 2013. NOTA votes are counted but do not affect the election result."
  },
];

type QuizQuestion = {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};

function isValidQuestion(data: unknown): data is QuizQuestion {
  if (!data || typeof data !== 'object') return false;
  const q = data as QuizQuestion;
  return (
    typeof q.question === 'string' &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    q.options.every(opt => typeof opt === 'string' && /^[A-D]\)\s/.test(opt)) &&
    typeof q.correct === 'string' &&
    ['A', 'B', 'C', 'D'].includes(q.correct) &&
    typeof q.explanation === 'string'
  );
}

const pickFallback = () => FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(pickFallback());
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const topics = [
      'the Election Commission of India (ECI) and its powers',
      'the Lok Sabha (House of the People) election process',
      'Rajya Sabha (Council of States) and how members are elected',
      'Electronic Voting Machines (EVMs) and VVPAT in India',
      'voter registration and EPIC (Voter ID Card) in India',
      'Model Code of Conduct during Indian elections',
      'NOTA (None of the Above) option in Indian elections',
      'Indian constitutional provisions for elections (Article 324, 325, 326)',
      'delimitation of constituencies in India',
      'reserved constituencies (SC/ST) in Indian elections',
      'role of State Election Commissions in Panchayat/Municipal elections',
      'anti-defection law and its impact on Indian democracy',
      'right to vote as a constitutional right in India (Article 326)',
      'nomination process and security deposits for Indian elections',
      'counting of votes and declaration of results in Indian elections',
    ];
    const topic = topics[Math.floor(Math.random() * topics.length)];

    const prompt = `Generate a multiple-choice quiz question about "${topic}" for an Indian civic education app called VoteQuest.

Return ONLY valid JSON in this exact format (no markdown, no extra text):
{
  "question": "The full question text here?",
  "options": ["A) First option", "B) Second option", "C) Third option", "D) Fourth option"],
  "correct": "A",
  "explanation": "A brief 1-2 sentence explanation of why this answer is correct, with relevant Indian context."
}

Make the question educational, factually accurate about Indian elections and democracy, and appropriate for adult learners. Focus specifically on India's electoral system. Keep in mind the current year is ${new Date().getFullYear()}.`;

    // Add retry logic for intermittent network "fetch failed" errors
    let result: Awaited<ReturnType<typeof model.generateContent>> | undefined;
    let retries = 2;
    while (retries > 0) {
      try {
        result = await Promise.race([
          model.generateContent(prompt),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Gemini request timeout after 10s')), 10000)
          ),
        ]);
        break; // Success, exit retry loop
      } catch (err: unknown) {
        retries--;
        if (retries === 0) throw err; // Out of retries
        console.warn(`[Quiz API] Gemini fetch failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
      }
    }

    if (!result) throw new Error('Failed to generate content after retries');

    const raw = result.response.text().trim();

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    const parsed = JSON.parse(jsonMatch[0]) as unknown;

    if (!isValidQuestion(parsed)) {
      throw new Error('Invalid question format');
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error('Quiz API error:', error);
    return NextResponse.json(pickFallback());
  }
}
