
import React, { useState } from 'react';
import { User } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';

const ENGAGEMENT_DATA = [
  { day: 'Mon', active: 450 },
  { day: 'Tue', active: 520 },
  { day: 'Wed', active: 610 },
  { day: 'Thu', active: 580 },
  { day: 'Fri', active: 490 },
  { day: 'Sat', active: 210 },
  { day: 'Sun', active: 180 },
];

const DEPT_HEALTH = [
  { name: 'Engineering', engagement: 65, mood: 4.2 },
  { name: 'Sales', engagement: 88, mood: 7.8 },
  { name: 'HR', engagement: 92, mood: 8.5 },
  { name: 'Marketing', engagement: 74, mood: 6.9 },
  { name: 'Finance', engagement: 58, mood: 5.4 },
];

const ALL_LOGS = [
  { id: 1, icon: "🧘", text: "Engineering: User completed mindfulness session", time: "Just now", color: "bg-indigo-50" },
  { id: 2, icon: "💤", text: "Marketing: 4 users started sleep challenge", time: "14m ago", color: "bg-sky-50" },
  { id: 3, icon: "💬", text: "Finance: Anonymous feedback provided", time: "42m ago", color: "bg-emerald-50" },
  { id: 4, icon: "🔥", text: "Sales: Team reached 10-day streak goal", time: "1h ago", color: "bg-orange-50" },
  { id: 5, icon: "🏅", text: "HR: New wellness badge unlocked by 8 users", time: "3h ago", color: "bg-amber-50" },
  { id: 6, icon: "🌊", text: "Operations: Hydration challenge update", time: "5h ago", color: "bg-blue-50" },
  { id: 7, icon: "🚶", text: "IT: 12 users joined the 10k steps challenge", time: "6h ago", color: "bg-green-50" },
  { id: 8, icon: "🍎", text: "Legal: Nutrition workshop registration open", time: "8h ago", color: "bg-red-50" },
  { id: 9, icon: "🧠", text: "Engineering: Weekly stress reduction session completed", time: "10h ago", color: "bg-purple-50" },
  { id: 10, icon: "📅", text: "HR: Quarterly wellness survey published", time: "12h ago", color: "bg-slate-50" },
];

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setReportSuccess(false);
    
    setTimeout(() => {
      setIsGenerating(false);
      setReportSuccess(true);
      setTimeout(() => setReportSuccess(false), 5000);
    }, 2500);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Enterprise System Dashboard</p>
        </div>
        <div className="flex items-center space-x-3 bg-white px-5 py-3 rounded-full border border-slate-100 shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Live Data Stream</span>
        </div>
      </header>

      {reportSuccess && (
        <div className="fixed top-8 right-8 z-[60] animate-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-600 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center space-x-4">
            <span className="text-2xl">📄</span>
            <div>
              <p className="font-black text-sm uppercase tracking-wider">Report Generated</p>
              <p className="text-xs text-emerald-50 font-bold opacity-90">Corporate_Analysis_Q3.pdf is ready.</p>
            </div>
            <button onClick={() => setReportSuccess(false)} className="ml-4 hover:opacity-70 font-black text-xl">×</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-blue-500/5">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">System Engagement</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Active users last 7 days</p>
            </div>
            <div className="flex items-center space-x-1 px-4 py-2 bg-blue-50 text-[#1d7dfa] rounded-full text-xs font-black tracking-widest uppercase">
              <span>+12.5%</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 10l7-7 7 7" /></svg>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ENGAGEMENT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d7dfa" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#1d7dfa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} />
                <Tooltip 
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 30px -5px rgba(0,0,0,0.1)', padding: '16px' }} 
                />
                <Area type="monotone" dataKey="active" stroke="#1d7dfa" strokeWidth={5} fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-blue-500/5 flex flex-col">
          <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Activity Feed</h3>
          <div className="space-y-6 flex-1">
            {ALL_LOGS.slice(0, 5).map((log) => (
              <ActivityItem 
                key={log.id} 
                icon={log.icon} 
                text={log.text} 
                time={log.time} 
                color={log.color} 
              />
            ))}
          </div>
          <button 
            onClick={() => setShowLogsModal(true)}
            className="mt-10 w-full py-5 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:bg-slate-100 hover:text-slate-600 transition-all active:scale-95"
          >
            Explore Detailed Logs
          </button>
        </div>
      </div>

      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 px-4 gap-6">
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Departmental Analytics</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Aggregated Wellness Indicators</p>
          </div>
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className={`px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.25em] transition-all shadow-xl shadow-blue-200 ${
              isGenerating ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-[#1d7dfa] text-white hover:bg-blue-600 active:scale-95'
            }`}
          >
            {isGenerating ? 'Compiling Data...' : 'Generate Exec Report'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {DEPT_HEALTH.map((dept) => (
            <HealthCard key={dept.name} dept={dept} />
          ))}
        </div>
      </section>

      {/* Loading Modal */}
      {isGenerating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/40 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white p-16 rounded-[3.5rem] shadow-2xl border border-slate-100 flex flex-col items-center text-center max-w-sm animate-in zoom-in-95 duration-500">
            <div className="w-28 h-28 relative mb-10">
              <div className="absolute inset-0 border-4 border-blue-50 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#1d7dfa] rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl">📊</div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Crunching Numbers</h3>
            <p className="text-slate-400 text-sm font-bold leading-relaxed uppercase tracking-wider">
              Securely processing departmental data...
            </p>
          </div>
        </div>
      )}

      {/* Logs Modal */}
      {showLogsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/20 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh] overflow-hidden">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Audit Logs</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Anonymized Event History</p>
              </div>
              <button 
                onClick={() => setShowLogsModal(false)}
                className="w-12 h-12 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-full flex items-center justify-center text-slate-300 transition-all font-black"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 space-y-6">
              {ALL_LOGS.map((log) => (
                <div key={log.id} className="flex items-center space-x-6 p-5 rounded-3xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                  <div className={`w-16 h-16 ${log.color} rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                    {log.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-black text-slate-700 truncate tracking-tight">{log.text}</p>
                    <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-[0.2em]">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-10 bg-slate-50 border-t border-slate-100 shrink-0 flex justify-between items-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global System Trace active</p>
              <button 
                onClick={() => setShowLogsModal(false)}
                className="px-10 py-5 bg-[#1d7dfa] text-white rounded-full font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-blue-100 hover:bg-blue-600 transition-all active:scale-95"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HealthCard: React.FC<{ dept: any }> = ({ dept }) => {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (dept.engagement / 100) * circumference;

  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-500/5 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group cursor-default">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-10 group-hover:text-[#1d7dfa] transition-colors">
        {dept.name}
      </p>
      
      <div className="relative mb-10" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            stroke="#f1f5f9"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            stroke="#1d7dfa"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            style={{ 
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-900 tracking-tighter">{dept.engagement}%</span>
        </div>
      </div>

      <div className="w-full pt-8 border-t border-slate-50 flex flex-col items-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Index Score</p>
        <p className="text-2xl font-black text-[#1d7dfa] tracking-tighter">{dept.mood}</p>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{ icon: string, text: string, time: string, color: string }> = ({ icon, text, time, color }) => (
  <div className="flex items-center space-x-5 p-4 rounded-[2rem] transition-all hover:bg-slate-50 group cursor-default">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-black text-slate-700 truncate leading-tight tracking-tight">{text}</p>
      <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">{time}</p>
    </div>
  </div>
);

export default Dashboard;
