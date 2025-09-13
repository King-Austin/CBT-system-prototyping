
import React, { useState, useCallback } from 'react';
import type { User, Exam, ExamResult } from './types';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import ExamScreen from './components/ExamScreen';
import ResultsScreen from './components/ResultsScreen';
import { DUMMY_EXAMS } from './constants';

type View = 'login' | 'dashboard' | 'exam' | 'results';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('login');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedExam(null);
    setExamResult(null);
    setView('login');
  };

  const handleStartExam = useCallback((exam: Exam) => {
    setSelectedExam(exam);
    setView('exam');
  }, []);

  const handleFinishExam = useCallback((result: ExamResult) => {
    setExamResult(result);
    setView('results');
  }, []);

  const handleBackToDashboard = () => {
    setSelectedExam(null);
    setExamResult(null);
    setView('dashboard');
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'dashboard':
        return user && <Dashboard user={user} exams={DUMMY_EXAMS} onStartExam={handleStartExam} onLogout={handleLogout} />;
      case 'exam':
        return selectedExam && <ExamScreen exam={selectedExam} onFinishExam={handleFinishExam} />;
      case 'results':
        return examResult && selectedExam && <ResultsScreen result={examResult} exam={selectedExam} onBackToDashboard={handleBackToDashboard} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen container mx-auto p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
