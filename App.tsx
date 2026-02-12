
import React, { useState, useEffect, useCallback } from 'react';
import { User, Role, ROIMetrics, ChallengeEnrollment } from './types';
import { MOCK_USERS, MOCK_CHALLENGES } from './constants';
import Dashboard from './components/Dashboard';
import EmployeePortal from './components/EmployeePortal';
import ManagerDashboard from './components/ManagerDashboard';
import ROIMetricsView from './components/ROIMetrics';
import ChallengeManagement from './components/ChallengeManagement';
import CompanySettings from './components/CompanySettings';
import TherapyPortal from './components/TherapyPortal';
import ReportsHistory from './components/ReportsHistory';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [view, setView] = useState<'home' | 'challenges' | 'roi' | 'leaderboard' | 'analytics' | 'settings' | 'therapy' | 'reports'>('home');

  // Simulated Login
  const handleLogin = (user: User) => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setCurrentUser(user);
      setIsLoggingIn(false);
      setView('home'); 
    }, 1200);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-main-gradient flex items-center justify-center p-4">
        <div className="max-w-md w-full glass p-10 rounded-[2.5rem] shadow-2xl border border-white/50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1d7dfa] rounded-3xl shadow-lg shadow-blue-200 mb-6">
              <span className="text-white text-4xl font-black">M</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">MANAS360</h1>
            <p className="text-slate-500 font-medium">Corporate Wellness Reimagined</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-center mb-6">Enterprise SSO Sign-in</h2>
            {MOCK_USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user)}
                disabled={isLoggingIn}
                className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all group active:scale-[0.98]"
              >
                <div className="flex flex-col items-start text-left">
                  <span className="font-bold text-slate-800">{user.name}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{user.role.replace('_', ' ')} • {user.department}</span>
                </div>
                <div className="p-2 bg-slate-50 group-hover:bg-blue-50 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-[#1d7dfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-10 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
            Story 8.2 Technical Spec: <br/>SAML 2.0 & OAuth Security active
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (currentUser.role === Role.HR_ADMIN) {
      switch (view) {
        case 'home': return <Dashboard user={currentUser} />;
        case 'roi': return <ROIMetricsView />;
        case 'challenges': return <ChallengeManagement />;
        case 'settings': return <CompanySettings user={currentUser} />;
        case 'reports': return <ReportsHistory />;
        default: return <Dashboard user={currentUser} />;
      }
    }
    
    if (currentUser.role === Role.EMPLOYEE) {
      switch (view) {
        case 'therapy': return <TherapyPortal user={currentUser} />;
        default: return <EmployeePortal user={currentUser} activeView={view as any} onViewChange={setView as any} />;
      }
    }
    
    if (currentUser.role === Role.MANAGER) {
      return <ManagerDashboard user={currentUser} view={view as any} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-main-gradient flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-white/80 backdrop-blur-md border-b md:border-b-0 md:border-r border-slate-100 flex flex-col z-10 sticky top-0 md:h-screen shadow-xl shadow-blue-500/5">
        <div className="p-8 flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1d7dfa] rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">M</div>
          <span className="font-black text-2xl tracking-tighter text-slate-900">MANAS360</span>
        </div>

        <nav className="flex-1 px-6 space-y-2 py-6 overflow-y-auto">
          <NavItem active={view === 'home'} onClick={() => setView('home')} icon="🏠" label="Dashboard" />
          
          {currentUser.role === Role.HR_ADMIN && (
            <>
              <NavItem active={view === 'roi'} onClick={() => setView('roi')} icon="📊" label="ROI Metrics" />
              <NavItem active={view === 'challenges'} onClick={() => setView('challenges')} icon="🏆" label="Challenges" />
              <NavItem active={view === 'reports'} onClick={() => setView('reports')} icon="📄" label="Exec Reports" />
              <NavItem active={view === 'settings'} onClick={() => setView('settings')} icon="⚙️" label="Company Setup" />
            </>
          )}

          {currentUser.role === Role.EMPLOYEE && (
            <>
              <NavItem active={view === 'challenges'} onClick={() => setView('challenges')} icon="🎯" label="Wellness Hub" />
              <NavItem active={view === 'therapy'} onClick={() => setView('therapy')} icon="🧘" label="Mental Health" />
              <NavItem active={view === 'leaderboard'} onClick={() => setView('leaderboard')} icon="🔥" label="Rankings" />
            </>
          )}

          {currentUser.role === Role.MANAGER && (
            <>
              <NavItem active={view === 'analytics'} onClick={() => setView('analytics')} icon="👥" label="Team Analytics" />
              <NavItem active={view === 'leaderboard'} onClick={() => setView('leaderboard')} icon="🏅" label="Team Ranking" />
            </>
          )}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <div className="flex items-center space-x-4 p-4 mb-6 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-[#1d7dfa] flex items-center justify-center text-white font-black shadow-md">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-slate-900 truncate tracking-tight">{currentUser.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{currentUser.role.replace('_', ' ')}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 py-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em]"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all ${
      active 
        ? 'bg-[#1d7dfa] text-white font-bold shadow-xl shadow-blue-200' 
        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-bold'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-sm tracking-tight">{label}</span>
  </button>
);

export default App;
