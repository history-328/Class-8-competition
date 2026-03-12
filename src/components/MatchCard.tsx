import React from 'react';
import { Match, Team } from '../types';
import { useAppStore } from '../store';

interface MatchCardProps {
  match: Match;
  teams: Team[];
  label: string;
  bo: string;
  onChange: (match: Partial<Match>) => void;
  onRemove?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, teams, label, bo, onChange, onRemove }) => {
  const { isAdmin } = useAppStore();

  const handleTeamChange = (teamKey: 'team1Id' | 'team2Id', value: string) => {
    if (!isAdmin) return;
    onChange({ [teamKey]: value === '' ? null : value });
  };

  const handleScoreChange = (scoreKey: 'score1' | 'score2', value: string) => {
    if (!isAdmin) return;
    const num = parseInt(value, 10);
    onChange({ [scoreKey]: isNaN(num) ? '' : num });
  };

  const isWinner1 = match.score1 !== '' && match.score2 !== '' && match.score1 > match.score2;
  const isWinner2 = match.score1 !== '' && match.score2 !== '' && match.score2 > match.score1;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden w-64 shadow-lg flex flex-col relative">
      <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 border-b border-slate-700 flex justify-between items-center">
        <span className="font-semibold text-slate-300">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-blue-400">{bo}</span>
          {isAdmin && onRemove && (
            <button onClick={onRemove} className="text-red-400 hover:text-red-300 ml-2">
              &times;
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        {/* Team 1 */}
        <div className={`flex items-center justify-between px-3 py-2 ${isWinner1 ? 'bg-slate-800/80' : ''}`}>
          <select
            value={match.team1Id || ''}
            onChange={(e) => handleTeamChange('team1Id', e.target.value)}
            disabled={!isAdmin}
            className={`bg-transparent border-none text-sm focus:ring-0 outline-none w-32 ${
              isWinner1 ? 'text-white font-bold' : 'text-slate-300'
            } ${!isAdmin ? 'appearance-none cursor-default' : ''}`}
          >
            <option value="" className="text-slate-800">选择队伍</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id} className="text-slate-800">
                {t.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            value={match.score1}
            onChange={(e) => handleScoreChange('score1', e.target.value)}
            disabled={!isAdmin}
            className={`w-10 text-center bg-slate-900 border border-slate-700 rounded text-sm py-1 ${
              isWinner1 ? 'text-yellow-400 font-bold border-yellow-500/50' : 'text-slate-300'
            } ${!isAdmin ? 'cursor-default' : ''}`}
          />
        </div>
        <div className="h-px bg-slate-700 w-full" />
        {/* Team 2 */}
        <div className={`flex items-center justify-between px-3 py-2 ${isWinner2 ? 'bg-slate-800/80' : ''}`}>
          <select
            value={match.team2Id || ''}
            onChange={(e) => handleTeamChange('team2Id', e.target.value)}
            disabled={!isAdmin}
            className={`bg-transparent border-none text-sm focus:ring-0 outline-none w-32 ${
              isWinner2 ? 'text-white font-bold' : 'text-slate-300'
            } ${!isAdmin ? 'appearance-none cursor-default' : ''}`}
          >
            <option value="" className="text-slate-800">选择队伍</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id} className="text-slate-800">
                {t.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            value={match.score2}
            onChange={(e) => handleScoreChange('score2', e.target.value)}
            disabled={!isAdmin}
            className={`w-10 text-center bg-slate-900 border border-slate-700 rounded text-sm py-1 ${
              isWinner2 ? 'text-yellow-400 font-bold border-yellow-500/50' : 'text-slate-300'
            } ${!isAdmin ? 'cursor-default' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};
