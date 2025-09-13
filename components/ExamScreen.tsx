
import React, { useState, useEffect, useCallback } from 'react';
import type { Exam, Question, ExamResult, UserAnswer } from '../types';
import { getExamQuestions, submitExam } from '../services/api';
import Timer from './Timer';

interface ExamScreenProps {
  exam: Exam;
  onFinishExam: (result: ExamResult) => void;
}

const ExamScreen: React.FC<ExamScreenProps> = ({ exam, onFinishExam }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const fetchedQuestions = await getExamQuestions(exam.id);
      setQuestions(fetchedQuestions);
      setIsLoading(false);
      setStartTime(Date.now());
    };
    fetchQuestions();
  }, [exam.id]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your progress will be lost.';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const currentQuestion = questions[currentQuestionIndex];

  const finishExam = useCallback(async () => {
    setIsSubmitting(true);
    const userAnswers: UserAnswer[] = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
    
    // Calculate score locally for immediate feedback, though backend would be the source of truth
    let correctAnswers = 0;
    userAnswers.forEach(userAnswer => {
        const question = questions.find(q => q.id === userAnswer.questionId);
        if (question && question.correctAnswer === userAnswer.answer) {
            correctAnswers++;
        }
    });
    
    // Simulate submission to backend
    await submitExam(exam.id, userAnswers);

    const timeTakenSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    onFinishExam({
        score: correctAnswers,
        totalQuestions: questions.length,
        answers: userAnswers,
        timeTakenSeconds: timeTakenSeconds
    });

  }, [answers, exam.id, onFinishExam, questions, startTime]);

  if (isLoading) {
    return <div className="text-center p-10 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold animate-pulse">Loading Exam...</h2>
    </div>;
  }
  
  if (isSubmitting) {
      return <div className="text-center p-10 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold animate-pulse">Submitting your answers...</h2>
        <p>Please wait.</p>
    </div>;
  }

  return (
    <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-8 w-full">
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-700 pb-4">
        <h1 className="text-2xl font-bold">{exam.title}</h1>
        <Timer durationMinutes={exam.durationMinutes} onTimeUp={finishExam} />
      </div>
      
      {currentQuestion && (
        <div>
          <div className="mb-4">
            <p className="text-slate-500 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <p className="text-xl font-semibold mt-2">{currentQuestion.text}</p>
          </div>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label key={option} className={`block w-full text-left p-4 border rounded-lg cursor-pointer transition-colors ${answers[currentQuestion.id] === option ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-500' : 'bg-slate-50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                  className="mr-3"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button onClick={finishExam} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg">
            Submit Exam
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === questions.length - 1}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg disabled:bg-indigo-400"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamScreen;
