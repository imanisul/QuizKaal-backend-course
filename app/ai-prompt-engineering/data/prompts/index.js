import { everydayPrompts } from "./everyday";
import { studentPrompts } from "./students";
import { teacherPrompts } from "./teachers";
import { developerPrompts } from "./developers";
import { cloudPrompts } from "./cloud";
import { aiPrompts } from "./ai";
import { professionalPrompts } from "./professionals";
import { marketingPrompts } from "./marketing";
import { creativePrompts } from "./creative";
import { interviewPrompts } from "./interview";

export const PROMPT_LIBRARY = [
  ...everydayPrompts,
  ...studentPrompts,
  ...teacherPrompts,
  ...developerPrompts,
  ...cloudPrompts,
  ...aiPrompts,
  ...professionalPrompts,
  ...marketingPrompts,
  ...creativePrompts,
  ...interviewPrompts
];

export const CATEGORIES = [
  "All",
  "Everyday AI",
  "Students",
  "Teachers",
  "Developers",
  "Cloud & DevOps",
  "AI & Prompt Engineering",
  "Working Professionals",
  "Marketing & Business",
  "Creative",
  "Interview Preparation"
];

export const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];
