
import React from 'react';
import type { User, Exam } from '../types';

interface DashboardProps {
  user: User;
  exams: Exam[];
  onStartExam: (exam: Exam) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, exams, onStartExam, onLogout }) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-8 w-full">
      <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Welcome, {user.fullName}</h1>
            <p className="text-slate-500 dark:text-slate-400">Please select an exam to begin.</p>
        </div>
        <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
            Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col justify-between hover:shadow-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300">
            <div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{exam.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">{exam.subject}</p>
            </div>
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                <p><strong>Duration:</strong> {exam.durationMinutes} minutes</p>
                <p><strong>Questions:</strong> {exam.questionCount}</p>
            </div>
            <button
              onClick={() => onStartExam(exam)}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
            >
              Start Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
