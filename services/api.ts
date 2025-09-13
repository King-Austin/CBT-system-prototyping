
import type { User, Question, Exam, UserAnswer } from '../types';
import { DUMMY_QUESTIONS } from '../constants';

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const login = async (username: string, password: string): Promise<User> => {
  console.log('Logging in with:', { username, password });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'student' && password === 'password') {
        resolve({
          id: 's001',
          username: 'student',
          fullName: 'John Doe',
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const getExamQuestions = async (examId: string): Promise<Question[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = DUMMY_QUESTIONS[examId] || [];
      // Simulate question randomization
      resolve(shuffleArray(questions));
    }, 1500);
  });
};

export const submitExam = async (examId: string, answers: UserAnswer[]): Promise<{ score: number; totalQuestions: number }> => {
  console.log(`Submitting exam ${examId} with answers:`, answers);
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = DUMMY_QUESTIONS[examId] || [];
      let correctAnswers = 0;
      answers.forEach(userAnswer => {
        const question = questions.find(q => q.id === userAnswer.questionId);
        if (question && question.correctAnswer === userAnswer.answer) {
          correctAnswers++;
        }
      });
      resolve({ score: correctAnswers, totalQuestions: questions.length });
    }, 2000);
  });
};
