# VoteQuest Upgrade Blueprint
You are building a production-level AI system.

Follow STRICTLY the instructions from the blueprint below.
Do NOT over-engineer.
Do NOT add extra features.

README.md

---

Use the following research ONLY as reference for:
- correctness
- domain knowledge
- election concepts

Do NOT blindly implement everything from it.

read1.md
## PURPOSE

This document defines the exact system behavior for building VoteQuest as a smart, real-world Election Companion AI.

Goal: Build a clean, decision-driven, efficient system that demonstrates intelligence, usability, and strong architecture.

---

# CORE TRANSFORMATION

Current State:

* Chatbot-based responses
* Separate modules (quiz, journey, resources)

Target State:

* Unified AI system
* Context-aware decision making
* Guided user experience

The system must guide users step-by-step instead of only answering queries.

---

# SYSTEM FLOW

User Input → Intent Detection → Decision Engine → Response Type

Response Types:

1. Guided Flow
2. Structured Answer (predefined knowledge)
3. AI Response (only when required)
4. Personalized Advisor Output

The decision engine must act as the central controller.

---

# INTENT HANDLING REQUIREMENTS

The system must detect and classify user intent into categories such as:

* Voter Help
* Results Information
* Eligibility / Advisor
* Learning / Quiz
* General Queries

Intent detection must be simple, fast, and deterministic.

---

# PRIMARY FEATURE: GUIDED ELECTION FLOW

The system must provide a structured voting journey when relevant.

Steps include:

* Eligibility check
* Registration process (Form 6)
* Voter list verification
* EPIC (Voter ID)
* Polling booth identification
* Voting process

Requirements:

* Must be step-based
* Must support progression (Next Step behavior)
* Must be clear and minimal

---

# SECONDARY FEATURE: SMART ELECTION ADVISOR

The system must provide personalized guidance.

Input (minimal):

* Age
* First-time voter status

Output:

* Eligibility status
* Next required step
* Recommended action

This feature must demonstrate logical decision-making.

---

# KNOWLEDGE HANDLING STRATEGY

Priority order:

1. Predefined structured data
2. Cached responses
3. AI-generated responses

Rules:

* Do not rely fully on AI for core information
* Avoid hallucination
* Prefer deterministic outputs where possible

---

# AI USAGE RULES

Use AI only for:

* Complex or unknown queries
* Explanations
* Quiz/scenario generation

Avoid AI for:

* FAQs
* Standard election steps
* Repetitive responses

AI responses must be:

* Neutral
* Short
* Clear
* Instructional when possible

---

# QUIZ SYSTEM UPGRADE

The system must move beyond static MCQs.

New behavior:

* Generate scenario-based questions
* Accept open-ended answers
* Evaluate reasoning (not just correctness)
* Provide explanation feedback

Focus on real-world understanding.

---

# SAFETY AND NEUTRALITY

The system must:

* Remain politically neutral
* Reject biased or promotional requests
* Avoid harmful or misleading outputs

User inputs must be validated before processing.

---

# GOOGLE SERVICES USAGE

Required:

* Gemini (AI generation)

Additional integration (at least one):

* Maps (polling booth visualization)

Optional:

* Firebase (user progress, state)

Integration must be meaningful, not superficial.

---

# PERFORMANCE AND EFFICIENCY

The system must:

* Minimize external API calls
* Use caching where possible
* Respond quickly

Efficiency is a key evaluation factor.

---

# CODE QUALITY EXPECTATIONS

The system must:

* Separate concerns (logic, services, routes)
* Avoid tightly coupled logic
* Maintain readability and modularity

The decision engine must control flow, not UI or API calls directly.

---

# TESTING REQUIREMENTS

Validate:

* Intent detection accuracy
* Guided flow correctness
* Advisor logic accuracy
* AI fallback behavior

Testing can be simple but must exist.

---

# EXCLUDED FEATURES (DO NOT IMPLEMENT)

* Complex RAG pipelines
* Real-time scraping systems
* Voice interfaces
* Heavy multimodal processing

Focus on core system strength.

---

# FINAL SYSTEM IDENTITY

VoteQuest must function as:

* A decision-driven assistant
* A guided election support system
* A real-world usable civic tool

Not just a chatbot.

---

# SUCCESS CONDITION

The system is successful if:

* Users are guided step-by-step
* Responses are accurate and structured
* AI usage is efficient and controlled
* The experience feels practical and usable

---

