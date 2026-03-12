import React from 'react';
import { useAppStore } from '../store';

export const TeamsTab: React.FC = () => {
  const { state, updateTeam, isAdmin } = useAppStore();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-slate-700 pb-2">参赛队伍管理</h2>
      <div className="space-y-4">
        {state.teams.map((team, index) => (
          <div key={team.id} className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-mono w-16">队伍 {index + 1}</span>
            <input
              type="text"
              value={team.name}
              onChange={(e) => updateTeam(team.id, e.target.value)}
              disabled={!isAdmin}
              className={`flex-1 bg-slate-900 border border-slate-600 rounded px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors ${
                !isAdmin ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              placeholder={`输入队伍 ${index + 1} 名称`}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
        <h3 className="text-blue-300 font-semibold mb-2">💡 提示</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          请在赛前通过抽签确定各队伍的编号，并在此处填入对应的队伍名称。
          <br />
          后续的赛程图和积分榜将自动使用此处设置的队伍名称。
        </p>
      </div>
    </div>
  );
};
