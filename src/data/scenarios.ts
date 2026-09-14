export interface StatImpact {
  money: number;
  time: number;
  sanity: number;
}

export interface Choice {
  label: string;
  impact: StatImpact;
}

export interface Scenario {
  id: number;
  description: string;
  choices: [Choice, Choice];
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    description:
      "Your professor insists that the 12th-edition textbook with a single-use digital homework access code is strictly mandatory.",
    choices: [
      {
        label: "Buy the brand-new $250 bookstore bundle.",
        impact: {
          money: -30,
          time: +10,
          sanity: +5,
        },
      },
      {
        label: "Spend 5 hours scouring Reddit for a sketchy 9th-edition PDF.",
        impact: {
          money: 0,
          time: -20,
          sanity: -10,
        },
      },
    ],
  },
  {
    id: 2,
    description:
      "It is 7:15 AM on a freezing Monday morning. Attendance for your 8:00 AM lecture is 'optional but heavily tested.'",
    choices: [
      {
        label: "Drag yourself out of bed, chug an espresso, and march to class.",
        impact: {
          money: -5,
          time: -15,
          sanity: -10,
        },
      },
      {
        label: "Hit snooze, stay in your warm bed, and vow to read the slides later.",
        impact: {
          money: 0,
          time: +15,
          sanity: +10,
        },
      },
    ],
  },
  {
    id: 3,
    description:
      "48 hours before your major term group presentation, your assigned partner has completely ghosted all messages.",
    choices: [
      {
        label: "Pull an exhausting all-nighter and complete their slides yourself.",
        impact: {
          money: 0,
          time: -25,
          sanity: -20,
        },
      },
      {
        label: "Order late-night pizza to bribe a smart friend into helping you finish it.",
        impact: {
          money: -20,
          time: -10,
          sanity: +5,
        },
      },
    ],
  },
  {
    id: 4,
    description:
      "It is 11:00 PM the night before your notoriously brutal Data Structures & Algorithms midterm exam.",
    choices: [
      {
        label: "Crack open two energy drinks and cram practice problems until 4:00 AM.",
        impact: {
          money: -5,
          time: -20,
          sanity: -20,
        },
      },
      {
        label: "Shut your laptop, get a full 8 hours of restorative sleep, and trust your memory.",
        impact: {
          money: 0,
          time: +15,
          sanity: +15,
        },
      },
    ],
  },
  {
    id: 5,
    description:
      "Your close friends invite you on an impromptu weekend lake cabin road trip right in the middle of midterms season.",
    choices: [
      {
        label: "YOLO: Chip in for cabin rent, hit the road, and party away the stress.",
        impact: {
          money: -35,
          time: -25,
          sanity: +30,
        },
      },
      {
        label: "Politely decline and spend the entire weekend studying in the silent library.",
        impact: {
          money: 0,
          time: +20,
          sanity: -15,
        },
      },
    ],
  },
  {
    id: 6,
    description:
      "Your laptop display dies with a frantic blue flicker just 3 hours before your essay submission portal closes.",
    choices: [
      {
        label: "Camp out at the campus 24-hour computer lab and frantically retype from scratch.",
        impact: {
          money: 0,
          time: -20,
          sanity: -25,
        },
      },
      {
        label: "Sprint to the express campus tech repair shop for an expensive emergency fix.",
        impact: {
          money: -40,
          time: -5,
          sanity: -10,
        },
      },
    ],
  },
  {
    id: 7,
    description:
      "Your fridge is completely empty, the dining hall is closed, and you are starving during an intense study sprint.",
    choices: [
      {
        label: "Splurge on an expensive late-night sushi delivery feast.",
        impact: {
          money: -25,
          time: +10,
          sanity: +15,
        },
      },
      {
        label: "Boil plain instant ramen noodles with tap water for the third time today.",
        impact: {
          money: -5,
          time: -5,
          sanity: -15,
        },
      },
    ],
  },
  {
    id: 8,
    description:
      "A prestigious internship networking fair conflicts directly with your scheduled barista shift on campus.",
    choices: [
      {
        label: "Call out sick from work and attend the fair in a borrowed blazer.",
        impact: {
          money: -20,
          time: -15,
          sanity: +10,
        },
      },
      {
        label: "Work your barista shift to guarantee this month's rent and skip the fair.",
        impact: {
          money: +25,
          time: -20,
          sanity: -10,
        },
      },
    ],
  },
  {
    id: 9,
    description:
      "You walk into class unprepared and discover the professor is handing out a surprise graded pop quiz.",
    choices: [
      {
        label: "Power through and answer every question based strictly on intuition and guesswork.",
        impact: {
          money: 0,
          time: -5,
          sanity: -15,
        },
      },
      {
        label: "Carefully whisper and cross-check answers with your desk neighbor.",
        impact: {
          money: 0,
          time: -5,
          sanity: -5,
        },
      },
    ],
  },
  {
    id: 10,
    description:
      "The 72-hour finals marathon has arrived: three cumulative exams back-to-back across three consecutive days.",
    choices: [
      {
        label: "Enter panic mode: study non-stop with minimal catnaps between exams.",
        impact: {
          money: -10,
          time: -30,
          sanity: -25,
        },
      },
      {
        label: "Follow structured 6-hour study blocks, eat balanced meals, and preserve your sleep.",
        impact: {
          money: -15,
          time: -20,
          sanity: +5,
        },
      },
    ],
  },
];
