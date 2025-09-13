
import type { Exam, Question } from './types';

export const DUMMY_EXAMS: Exam[] = [
  {
    id: 'math101',
    title: 'Mathematics Mid-term Exam',
    subject: 'Mathematics',
    durationMinutes: 45,
    questionCount: 20,
  },
  {
    id: 'phy201',
    title: 'Physics Final Exam',
    subject: 'Physics',
    durationMinutes: 60,
    questionCount: 30,
  },
  {
    id: 'chem101',
    title: 'Chemistry Basics',
    subject: 'Chemistry',
    durationMinutes: 30,
    questionCount: 15,
  },
];

export const DUMMY_QUESTIONS: Record<string, Question[]> = {
  math101: [
    { id: 'm1', text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' },
    { id: 'm2', text: 'What is the square root of 16?', options: ['2', '4', '8', '16'], correctAnswer: '4' },
    { id: 'm3', text: 'What is 5 * 8?', options: ['30', '35', '40', '45'], correctAnswer: '40' },
    { id: 'm4', text: 'Solve for x: 2x = 10', options: ['2', '5', '8', '10'], correctAnswer: '5' },
    { id: 'm5', text: 'What is the area of a square with side length 3?', options: ['3', '6', '9', '12'], correctAnswer: '9' },
    // ... add more questions to reach 20
  ],
  phy201: [
    { id: 'p1', text: 'What is the unit of force?', options: ['Watt', 'Joule', 'Newton', 'Pascal'], correctAnswer: 'Newton' },
    { id: 'p2', text: "What is Newton's first law of motion about?", options: ['Action-Reaction', 'Inertia', 'Gravity', 'Energy'], correctAnswer: 'Inertia' },
    { id: 'p3', text: 'What is the formula for kinetic energy?', options: ['mgh', '1/2 mv^2', 'ma', 'F*d'], correctAnswer: '1/2 mv^2' },
    // ... add more questions to reach 30
  ],
  chem101: [
    { id: 'c1', text: 'What is the chemical symbol for Gold?', options: ['Ag', 'Au', 'G', 'Go'], correctAnswer: 'Au' },
    { id: 'c2', text: 'What is the pH of a neutral solution?', options: ['0', '5', '7', '14'], correctAnswer: '7' },
    { id: 'c3', text: 'H2O is the chemical formula for what?', options: ['Hydrogen Peroxide', 'Salt', 'Sugar', 'Water'], correctAnswer: 'Water' },
    // ... add more questions to reach 15
  ],
};
