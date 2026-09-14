# AGENT.md — Developer & AI Agent Guidelines

This document outlines the strict technical guidelines, architectural standards, and development protocols for **Survive Uni**. All human developers and AI coding agents working on this repository must adhere to these rules without exception.

---

## 1. Core Directives

1. **NO UNAPPROVED DEPENDENCIES:**
   - **DO NOT install any new npm packages or external libraries without explicit user confirmation.**
   - Rely strictly on built-in Next.js, React, standard Web APIs, and Tailwind CSS.
   - If a feature seems to require a package, propose the solution and ask the user for permission before modifying `package.json`.

2. **FUNCTIONAL REACT ONLY:**
   - Write modern React 18/19 functional components only.
   - Never use React class components.
   - Use hooks (`useState`, `useReducer`, `useMemo`, `useCallback`, `useEffect`) effectively and declare hooks at the top level of components.

3. **STRICT TYPESCRIPT ENFORCEMENT:**
   - Maintain 100% strict TypeScript types.
   - **Never use `any`**. Use explicit interfaces, types, generics, or `unknown` with runtime type narrowing.
   - Define domain types in dedicated modules (e.g., `types/game.ts`).
   - Use discriminated unions for modeling discrete game states (e.g., `'intro' | 'playing' | 'game-over' | 'victory'`).

4. **CLEAN, MOBILE-FIRST TAILWIND CSS:**
   - Write responsive styles using mobile-first methodology: base utility classes target mobile screens (<640px), while `sm:`, `md:`, `lg:` prefixes adapt to larger devices.
   - Use standard Tailwind utility classes for transitions (`transition-all duration-200 ease-in-out`), avoiding complex third-party animation runtimes.
   - Avoid inline `style={{ ... }}` attributes unless computing dynamic percentages for progress bars (e.g., `width: `${stat}%``).
   - Ensure high contrast and accessibility for typography, buttons, and stat indicators.

---

## 2. Architecture & File Structure

Follow Next.js App Router conventions:

```text
/
├── app/
│   ├── favicon.ico
│   ├── globals.css         # Global Tailwind directives & resets
│   ├── layout.tsx          # Root HTML / metadata layout
│   └── page.tsx            # Main game entry view
├── components/
│   ├── GameContainer.tsx   # Top-level state and screen router
│   ├── Header.tsx          # Title and game status
│   ├── StatBar.tsx         # Reusable Money/Time/Sanity meter
│   ├── ScenarioCard.tsx    # Current scenario narrative and choices
│   ├── ReportCard.tsx      # Win/Loss grading summary screen
│   └── GameOverModal.tsx   # Instant failure popup / screen
├── data/
│   └── scenarios.ts        # The 10 survival scenarios with stat deltas
├── types/
│   └── game.ts             # TypeScript interfaces and types
├── PRD.md                  # Product Requirements Document
├── AGENT.md                # Agent & Coding Guidelines
└── tailwind.config.ts      # Tailwind design system configuration
```

---

## 3. State Management Best Practices

- **Predictable Reducer / Hook Logic:**
  - Prefer `useReducer` or a clean custom hook (`useGameState`) to manage the game loop:
    - Current scenario index
    - Player stats (`money`, `time`, `sanity`)
    - Game status (`'intro'`, `'in-progress'`, `'victory'`, `'game-over'`)
    - Game history / choices selected
- **Clamping Values:**
  - Always clamp stats between `0` and `100` (`Math.max(0, Math.min(100, nextValue))`).
  - Check for loss conditions immediately after any stat change: if `money <= 0 || time <= 0 || sanity <= 0`, trigger game over state.

---

## 4. Component Standards

- **Single Responsibility:** Each component should render a distinct part of the UI.
- **Explicit Prop Types:** Every component must have a clearly declared TypeScript interface for its props.
- **Semantic HTML:** Use semantic elements (`<main>`, `<header>`, `<section>`, `<article>`, `<button>`).
- **Interactive Elements:**
  - All buttons must have visible `:focus-visible` and `:hover` states.
  - Buttons must include accessible labels or text and support keyboard navigation (`Tab` + `Enter`/`Space`).

---

## 5. Scope & Limitations Reminder

- **Keep It Lean:** No backend servers, API routes, or databases. The entire state is client-side.
- **No Heavy Animations:** Do not introduce Framer Motion, GSAP, or Three.js. Keep motion subtle and performant using Tailwind's `transition`, `transform`, and keyframe utilities.
