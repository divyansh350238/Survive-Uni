# Product Requirements Document (PRD) — Survive Uni

## 1. Executive Summary & Core Game Idea
**Survive Uni** is a lightweight, turn-based resource-management web game built with Next.js (App Router), TypeScript, and Tailwind CSS. Players take on the role of a university student trying to survive a grueling academic semester. 

Through a sequence of 10 branching, dilemma-driven scenarios, players make high-stakes choices that directly affect their three core life bars: **Money**, **Time**, and **Sanity**. The goal is simple: reach the end of the final exam period without depleting any stat to zero, earning a final **Report Card** grading their performance.

---

## 2. Target Audience
- **Primary:** University and college students who can relate to common academic, financial, and social dilemmas.
- **Secondary:** Prospective students, alumni, and casual web gamers who enjoy humorous, quick-play management games (e.g., *Reigns*, *BitLife*, classic choice-driven text adventures).

---

## 3. Core Mechanics & State Tracking

### 3.1 Resource Meters (Stats)
Each player begins the semester with balanced base stats (e.g., 50–70 out of 100). Every choice increases or decreases these values. Stats are clamped between **0** and **100**.

| Resource | Description | Danger Threshold |
| :--- | :--- | :--- |
| **Money ($)** | Financial funds for rent, food, supplies, and social life. | Drops to 0: **Financial Ruin / Eviction** |
| **Time (Hrs)** | Available schedule bandwidth and physical energy. | Drops to 0: **Physical Exhaustion / Missed Deadlines** |
| **Sanity (%)** | Mental well-being, stress tolerance, and morale. | Drops to 0: **Complete Burnout / Meltdown** |

### 3.2 Win / Loss Rules
- **Instant Loss (Game Over):** If any of the three stats hits **0** at any point, the game ends immediately with a specific failure condition screen (e.g., "Dropped out due to exhaustion", "Bank account emptied", "Mental breakdown").
- **Win Condition:** Complete all **10 scenarios** with all three stats strictly greater than **0**.

---

## 4. The 10 Survival Scenarios

Each scenario offers a premise and 2–3 distinct actionable choices, each with deterministic stat trade-offs.

### Scenario 1: The $300 "Required" Textbook
- **Context:** Week 1. Professor states the 12th edition of the textbook with an online access code is strictly mandatory.
- **Option A:** Buy the brand new bundle. *(Money: -30, Time: +10, Sanity: +5)*
- **Option B:** Spend 6 hours hunting for a shady 9th edition PDF online. *(Money: 0, Time: -20, Sanity: -10)*
- **Option C:** Partner up with a classmate and share costs. *(Money: -15, Time: -5, Sanity: +10)*

### Scenario 2: The 8:00 AM Monday Lecture
- **Context:** It is 7:15 AM on Monday. It is raining freezing sleet outside and attendance is "optional but recommended."
- **Option A:** Drag yourself out of bed and attend. *(Money: 0, Time: -15, Sanity: -15)*
- **Option B:** Sleep in and promise to read the slides later. *(Money: 0, Time: +15, Sanity: +10)*
- **Option C:** Buy a $7 triple-shot caramel macchiato and sprint there. *(Money: -10, Time: -10, Sanity: 0)*

### Scenario 3: Group Project MIA Partner
- **Context:** 48 hours before the group presentation deadline, your assigned partner has completely ghosted.
- **Option A:** Pull an all-nighter and do their entire portion yourself. *(Money: 0, Time: -25, Sanity: -20)*
- **Option B:** Report them to the professor and submit your part only. *(Money: 0, Time: -5, Sanity: -10)*
- **Option C:** Bribe a tech-savvy friend with takeout pizza to help you patch it up. *(Money: -20, Time: -10, Sanity: +5)*

### Scenario 4: Midterm Cramming vs. Healthy Sleep
- **Context:** The night before the notoriously difficult Data Structures & Algorithms midterm exam.
- **Option A:** Chug two energy drinks and study until 5:00 AM. *(Money: -5, Time: -20, Sanity: -25)*
- **Option B:** Sleep a solid 8 hours and trust what you already know. *(Money: 0, Time: +15, Sanity: +15)*
- **Option C:** Pay $40 for a student-led crash review session. *(Money: -25, Time: -10, Sanity: +5)*

### Scenario 5: The Ultimate Weekend Party / Trip Invite
- **Context:** Your friends are organizing an epic weekend cabin road trip right in the middle of the semester.
- **Option A:** Go all-in: contribute to cabin rent, drinks, and festivities. *(Money: -35, Time: -25, Sanity: +35)*
- **Option B:** Decline and lock yourself in the library all weekend. *(Money: 0, Time: +20, Sanity: -20)*
- **Option C:** Visit just for Saturday afternoon and return by bus. *(Money: -15, Time: -10, Sanity: +10)*

### Scenario 6: Broken Laptop on Submission Eve
- **Context:** Your laptop screen turns into blue lines 4 hours before an essay deadline.
- **Option A:** Rush to the urgent repair shop for an expensive same-day fix. *(Money: -40, Time: -10, Sanity: -10)*
- **Option B:** Camp out overnight at the 24-hour campus computer lab. *(Money: 0, Time: -20, Sanity: -25)*
- **Option C:** Email the TA begging for an emergency 24-hour extension. *(Money: 0, Time: -5, Sanity: -15)*

### Scenario 7: Empty Fridge & Meal Prep Crisis
- **Context:** Your groceries ran out and mid-semester fatigue has fully set in.
- **Option A:** Order premium late-night food delivery three days in a row. *(Money: -30, Time: +15, Sanity: +15)*
- **Option B:** Survive on instant ramen and tap water. *(Money: -5, Time: +5, Sanity: -20)*
- **Option C:** Spend 3 hours grocery shopping and cooking batches of rice and beans. *(Money: -15, Time: -20, Sanity: +5)*

### Scenario 8: Part-Time Job Shift vs. Unpaid Career Fair
- **Context:** A prestigious campus internship networking fair clashes with your scheduled barista shift.
- **Option A:** Call out sick from work and attend the fair in a borrowed suit. *(Money: -20, Time: -15, Sanity: +10)*
- **Option B:** Work your shift to earn this month's rent money and skip the fair. *(Money: +25, Time: -20, Sanity: -10)*
- **Option C:** Beg a coworker to cover half the shift, rushing between both. *(Money: +10, Time: -25, Sanity: -15)*

### Scenario 9: The Surprise Pop Quiz
- **Context:** You walk into class unprepared and the professor starts handing out an unannounced pop quiz.
- **Option A:** Try your best relying strictly on intuition and high school memory. *(Money: 0, Time: -5, Sanity: -10)*
- **Option B:** Whisper frantically with your neighbor to compare answers. *(Money: 0, Time: -5, Sanity: -20)*
- **Option C:** Gracefully accept fate, write funny comments, and submit early. *(Money: 0, Time: +5, Sanity: +5)*

### Scenario 10: The 72-Hour Finals Marathon
- **Context:** Three final exams scheduled back-to-back over three days. The finish line is in sight.
- **Option A:** Sustained panic mode: study non-stop with minimal catnaps. *(Money: -10, Time: -30, Sanity: -25)*
- **Option B:** Balanced revision: strict 6-hour daily study blocks with proper meals. *(Money: -15, Time: -20, Sanity: -5)*
- **Option C:** Strategic triage: sacrifice the elective exam to ace the major core course. *(Money: 0, Time: -10, Sanity: +10)*

---

## 5. Report Card & Ending Screen

Upon completion (or failure), the player arrives at the **Report Card** summary:

### 5.1 Victory Report Card
Calculates a composite GPA / Grade based on final scores:
- **Grade Tiers:**
  - **A+ (Summa Cum Laude):** All stats $\ge 60$
  - **B (Solid Survivor):** All stats $\ge 40$
  - **C (Barely Graduated):** All stats $> 0$
- **Archetype Badges:**
  - *The Caffeinated Zombie* (High Time & Money, Low Sanity)
  - *The Trust Fund Slacker* (High Sanity & Money, Low Time)
  - *The Starving Genius* (High Sanity & Time, Low Money)
  - *The Balanced Legend* (All stats $\ge 70$)
- **Stat Summary:** Clear display of remaining Money, Time, and Sanity.
- **Action:** "Re-enroll for Next Semester" (Restart Game).

### 5.2 Game Over / Drop-Out Screen
- Highlights the specific stat that caused the failure.
- Humorous, relatable obituary message describing how the student dropped out.
- "Try Again" button to restart the run.

---

## 6. Scope Boundaries & Non-Goals

### In Scope
- Single-page interactive flow using Next.js App Router.
- Local state management using React hooks (`useState` / `useReducer`).
- Fully responsive, mobile-first Tailwind CSS UI layout.
- Clear visual stat meters (progress bars / badges).
- Dynamic Report Card and Game Over screens with restart button.

### Strictly Out of Scope
- **Complex Animations:** No 3D Canvas (Three.js/WebGL), complex physics engines, or heavy animation libraries. Transitions should rely on standard CSS/Tailwind transition classes.
- **Backend Authentication & DBs:** No user accounts, OAuth, passwords, Supabase, Firebase, or server databases.
- **Multiplayer / Leaderboards:** No real-time server connections or external leaderboards.
- **In-App Purchases:** No monetary microtransactions or external payment integrations.
