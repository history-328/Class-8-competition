import React, { useState } from 'react';
import { AppProvider, useAppStore } from './store';
import { TeamsTab } from './components/TeamsTab';
import { GroupStageTab } from './components/GroupStageTab';
import { PlayoffsTab } from './components/PlayoffsTab';
import { RulesTab } from './components/RulesTab';
import { Trophy, Users, CalendarDays, ScrollText, Lock, Unlock } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'group' | 'playoffs' | 'rules'>('group');
  const { isAdmin, login, logout } = useAppStore();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(password);
    setShowLogin(false);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase">
                新星杯 Nova Cup
              </h1>
            </div>
            
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('teams')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'teams'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Users className="w-4 h-4" />
                队伍管理
              </button>
              <button
                onClick={() => setActiveTab('group')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'group'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                小组赛
              </button>
              <button
                onClick={() => setActiveTab('playoffs')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'playoffs'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Trophy className="w-4 h-4" />
                淘汰赛
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'rules'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <ScrollText className="w-4 h-4" />
                赛事规则
              </button>
            </nav>

            <div className="flex items-center gap-4">
              {isAdmin ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                >
                  <Unlock className="w-4 h-4" />
                  管理员已登录
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  管理员登录
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {activeTab === 'teams' && <TeamsTab />}
        {activeTab === 'group' && <GroupStageTab />}
        {activeTab === 'playoffs' && <PlayoffsTab />}
        {activeTab === 'rules' && <RulesTab />}
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-2xl w-96">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              管理员登录
            </h3>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入管理员密码"
                className="w-full bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white mb-6 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition-colors"
                >
                  登录
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
