import { aptitudeQuestions } from "./aptitudeData";

const getQuestions = (subject, difficulty, count = 3) => {
  const filtered = aptitudeQuestions.filter(q => q.subject === subject && q.difficulty === difficulty);
  return [...filtered].sort(() => 0.5 - Math.random()).slice(0, count);
};

export const APTITUDE_LEVELS = [
  {
    id: 1,
    title: "Beginner",
    tagline: "The Foundations of Logic",
    story: "Every journey begins with a single step. Here, you will encounter foundational problems in logic and basic arithmetic. Accuracy is your priority here, not speed.",
    topics: ["Percentage", "Direction Sense", "Basic Grammar"],
    unlockCondition: 0,
    rewardXP: 100,
    rewardCoins: 50,
    concepts: [
      {
        title: "Mastering the Basics",
        description: "Before jumping into complex formulas, ensure your core calculation speed is solid. Memorize tables up to 20, squares to 30, and cubes to 15.",
        proTip: "In real exams, a 5-second calculation error early on can cost you 2 minutes of debugging."
      }
    ],
    quizzes: [
      ...getQuestions("Quantitative Aptitude", "Easy", 1),
      ...getQuestions("Logical Reasoning", "Easy", 1)
    ]
  },
  {
    id: 2,
    title: "Easy",
    tagline: "Pacing Yourself",
    story: "The difficulty slightly rises. These are the most common questions found in the screening rounds of mass recruiters like TCS and Infosys.",
    topics: ["Profit & Loss", "Blood Relations"],
    unlockCondition: 1,
    rewardXP: 150,
    rewardCoins: 75,
    concepts: [
      {
        title: "Pattern Recognition",
        description: "Notice how questions repeat? Most easy questions follow identical structures with just the numbers swapped.",
        proTip: "Once you identify the pattern, apply the shortcut formula immediately rather than solving from scratch."
      }
    ],
    quizzes: [
      ...getQuestions("Quantitative Aptitude", "Easy", 2),
      ...getQuestions("Logical Reasoning", "Easy", 2)
    ]
  },
  {
    id: 3,
    title: "Intermediate",
    tagline: "The Middle Ground",
    story: "You are now facing standard placement difficulty. Time management becomes critical. Can you solve these under 60 seconds?",
    topics: ["Time & Work", "Syllogism"],
    unlockCondition: 2,
    rewardXP: 200,
    rewardCoins: 100,
    concepts: [
      {
        title: "The 60-Second Rule",
        description: "If a question takes longer than 60 seconds to comprehend, skip it and mark for review. Do not let your ego destroy your exam timing.",
        proTip: "Use the 'Fast Calculation Trick' shown at the end of these questions to cut your time in half."
      }
    ],
    quizzes: [
      ...getQuestions("Quantitative Aptitude", "Medium", 2),
      ...getQuestions("Logical Reasoning", "Medium", 1),
      ...getQuestions("Verbal Ability", "Hard", 1)
    ]
  },
  {
    id: 4,
    title: "Advanced",
    tagline: "Breaking the Limits",
    story: "Complex multi-step problems that test your endurance. Companies like Amazon and Oracle use these to filter the top 10% of candidates.",
    topics: ["Speed Time Distance", "Complex Puzzles"],
    unlockCondition: 3,
    rewardXP: 300,
    rewardCoins: 150,
    concepts: [
      {
        title: "Multi-step Logic",
        description: "These problems require combining two different formulas (e.g., finding the speed first, then calculating the distance for a second scenario).",
        proTip: "Write down your intermediate steps clearly on your rough sheet so you don't lose track of variables."
      }
    ],
    quizzes: [
      ...getQuestions("Quantitative Aptitude", "Medium", 3), // We labeled advanced ones as medium in our generator to keep it simple, but we'll fetch them here
      ...getQuestions("Logical Reasoning", "Medium", 2)
    ]
  },
  {
    id: 5,
    title: "Placement Ready",
    tagline: "The Benchmark",
    story: "This is a full-fledged simulation. A mix of Quant, Logic, and Verbal. If you clear this, you are officially ready to sit for campus placements.",
    topics: ["Mixed Aptitude", "Comprehensive Review"],
    unlockCondition: 4,
    rewardXP: 500,
    rewardCoins: 300,
    concepts: [
      {
        title: "Exam Temperament",
        description: "Stay calm. If the paper is hard for you, it is hard for everyone. Percentile matters more than absolute score.",
        proTip: "Never leave a question blank if there is no negative marking!"
      }
    ],
    quizzes: [
      ...getQuestions("Quantitative Aptitude", "Medium", 2),
      ...getQuestions("Verbal Ability", "Hard", 2),
      ...getQuestions("Logical Reasoning", "Medium", 2)
    ]
  },
  {
    id: 6,
    title: "Company Mock Tests",
    tagline: "Targeted Preparation",
    story: "Face the exact historical question patterns of top product and service-based companies. Adapt to their unique testing styles.",
    topics: ["TCS NQT", "Infosys Pseudo-code", "Amazon Assessments"],
    unlockCondition: 5,
    rewardXP: 600,
    rewardCoins: 400,
    concepts: [
      {
        title: "Company Specific Patterns",
        description: "TCS loves advanced Quant. Infosys focuses heavily on tricky Logical Reasoning. Know your enemy.",
        proTip: "Review the 'Interview Tip' section in these answers; it contains specific advice for different companies."
      }
    ],
    quizzes: [
      ...getQuestions("Quantitative Aptitude", "Medium", 3),
      ...getQuestions("Logical Reasoning", "Medium", 3)
    ]
  },
  {
    id: 7,
    title: "Speed Challenge",
    tagline: "Mental Velocity",
    story: "No time to write. Everything must be calculated mentally. Your brain is a supercomputer.",
    topics: ["Vedic Maths", "Approximations"],
    unlockCondition: 6,
    rewardXP: 800,
    rewardCoins: 500,
    concepts: [
      {
        title: "Approximation",
        description: "If options are far apart (e.g., 10, 50, 100, 500), do not calculate exactly. Round 4.9 to 5, and 19.8 to 20.",
        proTip: "Always glance at the options before you start solving."
      }
    ],
    quizzes: [
      ...getQuestions("Quantitative Aptitude", "Easy", 5) // Use easy ones but they should be done fast
    ]
  },
  {
    id: 8,
    title: "Boss Arena",
    tagline: "The Ultimate Gauntlet",
    story: "A colossal challenge. The most twisted, multi-layered problems ever asked in interviews. Only the top 1% clear this.",
    topics: ["FAANG Level Puzzles", "Stress Testing"],
    unlockCondition: 7,
    rewardXP: 1500,
    rewardCoins: 1000,
    isBoss: true,
    concepts: [
      {
        title: "Conquering the Boss",
        description: "This arena tests your persistence as much as your logic. Don't give up halfway through a complex calculation.",
        proTip: "You have unlimited time here, but the margin for error is zero."
      }
    ],
    quizzes: [
      ...getQuestions("Quantitative Aptitude", "Medium", 4),
      ...getQuestions("Verbal Ability", "Hard", 2),
      ...getQuestions("Logical Reasoning", "Medium", 4)
    ]
  }
];
