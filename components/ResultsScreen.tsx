
import React, { useState } from 'react';
import type { ExamResult, Exam, Question } from '../types';
import { DUMMY_QUESTIONS } from '../constants';
import { getAnswerExplanation } from '../services/geminiService';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';
import SparklesIcon from './icons/SparklesIcon';

interface ResultsScreenProps {
  result: ExamResult;
  exam: Exam;
  onBackToDashboard: () => void;
}

const ExplanationBox: React.FC<{ question: Question; userAnswer: string }> = ({ question, userAnswer }) => {
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchExplanation = async () => {
        setIsLoading(true);
        setError('');
        try {
            const expl = await getAnswerExplanation(question, userAnswer);
            setExplanation(expl);
        } catch (err) {
            setError('Failed to fetch explanation.');
        } finally {
            setIsLoading(false);
        }
    };
    
    if (explanation) {
        return <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm whitespace-pre-wrap font-mono">{explanation}</div>;
    }

    return (
        <div className="mt-3">
            <button
                onClick={fetchExplanation}
                disabled={isLoading}
                className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50"
            >
                <SparklesIcon className="w-4 h-4" />
                {isLoading ? 'Getting AI explanation...' : 'Explain my mistake'}
            </button>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, exam, onBackToDashboard }) => {
  const questions = DUMMY_QUESTIONS[exam.id] || [];
  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-8 w-full">
      <h1 className="text-3xl font-bold text-center">Exam Results</h1>
      <h2 className="text-xl text-slate-600 dark:text-slate-300 text-center mb-6">{exam.title}</h2>

      <div className="text-center bg-slate-100 dark:bg-slate-900/50 rounded-lg p-6 mb-8">
        <p className="text-lg">Your Score</p>
        <p className="text-6xl font-bold my-2 text-indigo-600 dark:text-indigo-400">{percentage}%</p>
        <p className="text-slate-500 dark:text-slate-400">
            You answered {result.score} out of {result.totalQuestions} questions correctly.
        </p>
      </div>
      
      <h3 className="text-2xl font-semibold mb-4">Answer Review</h3>
      <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-4">
        {questions.map((question, index) => {
          const userAnswerObj = result.answers.find(a => a.questionId === question.id);
          const userAnswer = userAnswerObj ? userAnswerObj.answer : 'Not answered';
          const isCorrect = userAnswer === question.correctAnswer;
          
          return (
            <div key={question.id} className="border-b border-slate-200 dark:border-slate-700 pb-4">
                <div className="flex items-start gap-3">
                    {isCorrect ? <CheckIcon className="text-green-500 w-5 h-5 mt-1 flex-shrink-0" /> : <XIcon className="text-red-500 w-5 h-5 mt-1 flex-shrink-0" />}
                    <div>
                        <p className="font-semibold">{index + 1}. {question.text}</p>
                        <p className={`text-sm mt-2 ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            Your answer: {userAnswer}
                        </p>
                        {!isCorrect && (
                            <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
                                Correct answer: {question.correctAnswer}
                            </p>
                        )}
                        {!isCorrect && <ExplanationBox question={question} userAnswer={userAnswer} />}
                    </div>
                </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={onBackToDashboard}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
