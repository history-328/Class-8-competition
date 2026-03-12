import React, { useMemo } from 'react';
import { useAppStore } from '../store';
import { MatchCard } from './MatchCard';
import { Team, Match } from '../types';

export const GroupStageTab: React.FC = () => {
  const { state, updateGroupMatch, updateGroupBye, addTiebreaker, updateTiebreaker, removeTiebreaker, isAdmin } = useAppStore();
  const { teams, groupStage } = state;

  const standings = useMemo(() => {
    const points: Record<string, number> = {};
    const wins: Record<string, number> = {};
    const draws: Record<string, number> = {};
    const losses: Record<string, number> = {};
    const matchesPlayed: Record<string, number> = {};

    teams.forEach((t) => {
      points[t.id] = 0;
      wins[t.id] = 0;
      draws[t.id] = 0;
      losses[t.id] = 0;
      matchesPlayed[t.id] = 0;
    });

    const processMatch = (m: Match, isTiebreaker = false) => {
      if (m.team1Id && m.team2Id && m.score1 !== '' && m.score2 !== '') {
        const s1 = m.score1 as number;
        const s2 = m.score2 as number;
        
        if (!isTiebreaker) {
          matchesPlayed[m.team1Id]++;
          matchesPlayed[m.team2Id]++;
        }

        if (s1 > s2) {
          points[m.team1Id] += isTiebreaker ? 1 : 2;
          if (!isTiebreaker) { wins[m.team1Id]++; losses[m.team2Id]++; }
        } else if (s2 > s1) {
          points[m.team2Id] += isTiebreaker ? 1 : 2;
          if (!isTiebreaker) { wins[m.team2Id]++; losses[m.team1Id]++; }
        } else if (s1 === s2 && !isTiebreaker) {
          points[m.team1Id] += 1;
          points[m.team2Id] += 1;
          draws[m.team1Id]++;
          draws[m.team2Id]++;
        }
      }
    };

    processMatch(groupStage.round1.match1);
    processMatch(groupStage.round1.match2);
    processMatch(groupStage.round2.match1);
    processMatch(groupStage.round2.match2);
    
    groupStage.tiebreakers.forEach(tb => processMatch(tb, true));

    if (groupStage.round1.byeTeamId) {
      points[groupStage.round1.byeTeamId] += 1;
      matchesPlayed[groupStage.round1.byeTeamId]++;
    }
    if (groupStage.round2.byeTeamId) {
      points[groupStage.round2.byeTeamId] += 1;
      matchesPlayed[groupStage.round2.byeTeamId]++;
    }

    return teams
      .map((t) => ({
        ...t,
        points: points[t.id],
        w: wins[t.id],
        d: draws[t.id],
        l: losses[t.id],
        p: matchesPlayed[t.id],
      }))
      .sort((a, b) => b.points - a.points);
  }, [teams, groupStage]);

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Matches */}
      <div className="lg:col-span-2 space-y-8">
        {/* Round 1 */}
        <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
            <span className="bg-blue-500/20 px-2 py-1 rounded text-sm">第一轮</span>
            小组赛 (BO2)
          </h2>
          <div className="flex flex-wrap gap-6">
            <MatchCard
              match={groupStage.round1.match1}
              teams={teams}
              label="对阵一"
              bo="BO2"
              onChange={(m) => updateGroupMatch('round1', 'match1', m)}
            />
            <MatchCard
              match={groupStage.round1.match2}
              teams={teams}
              label="对阵二"
              bo="BO2"
              onChange={(m) => updateGroupMatch('round1', 'match2', m)}
            />
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 w-64 shadow-lg flex flex-col justify-center">
              <span className="text-xs text-slate-400 mb-2">轮空队伍 (直接积2分)</span>
              <select
                value={groupStage.round1.byeTeamId || ''}
                onChange={(e) => updateGroupBye('round1', e.target.value === '' ? null : e.target.value)}
                disabled={!isAdmin}
                className={`bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-yellow-400 font-bold focus:outline-none focus:border-blue-500 ${!isAdmin ? 'appearance-none cursor-default opacity-80' : ''}`}
              >
                <option value="">选择队伍</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Round 2 */}
        <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
            <span className="bg-blue-500/20 px-2 py-1 rounded text-sm">第二轮</span>
            小组赛 (BO2)
          </h2>
          <div className="flex flex-wrap gap-6">
            <MatchCard
              match={groupStage.round2.match1}
              teams={teams}
              label="对阵一"
              bo="BO2"
              onChange={(m) => updateGroupMatch('round2', 'match1', m)}
            />
            <MatchCard
              match={groupStage.round2.match2}
              teams={teams}
              label="对阵二"
              bo="BO2"
              onChange={(m) => updateGroupMatch('round2', 'match2', m)}
            />
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 w-64 shadow-lg flex flex-col justify-center">
              <span className="text-xs text-slate-400 mb-2">轮空队伍 (直接积2分)</span>
              <select
                value={groupStage.round2.byeTeamId || ''}
                onChange={(e) => updateGroupBye('round2', e.target.value === '' ? null : e.target.value)}
                disabled={!isAdmin}
                className={`bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-yellow-400 font-bold focus:outline-none focus:border-blue-500 ${!isAdmin ? 'appearance-none cursor-default opacity-80' : ''}`}
              >
                <option value="">选择队伍</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Tiebreakers */}
        <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-orange-400">
              <span className="bg-orange-500/20 px-2 py-1 rounded text-sm">加赛</span>
              同分加赛 (BO1)
            </h2>
            {isAdmin && (
              <button
                onClick={addTiebreaker}
                className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 px-3 py-1.5 rounded text-sm font-medium transition-colors border border-orange-500/30"
              >
                + 添加加赛
              </button>
            )}
          </div>
          {groupStage.tiebreakers.length === 0 ? (
            <p className="text-slate-500 text-sm italic">暂无加赛。如有积分相同需争夺胜负组名额，请添加加赛。</p>
          ) : (
            <div className="flex flex-wrap gap-6">
              {groupStage.tiebreakers.map((tb, idx) => (
                <MatchCard
                  key={tb.id}
                  match={tb}
                  teams={teams}
                  label={`加赛 ${idx + 1}`}
                  bo="BO1"
                  onChange={(m) => updateTiebreaker(idx, m)}
                  onRemove={isAdmin ? () => removeTiebreaker(idx) : undefined}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Right Column: Standings */}
      <div className="lg:col-span-1">
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden sticky top-6 shadow-2xl">
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
            <h3 className="text-lg font-bold text-slate-200">积分榜</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 bg-slate-800/50 uppercase border-b border-slate-700">
              <tr>
                <th className="px-4 py-3">排名</th>
                <th className="px-4 py-3">队伍</th>
                <th className="px-2 py-3 text-center">场</th>
                <th className="px-2 py-3 text-center">胜/平/负</th>
                <th className="px-4 py-3 text-right text-blue-400">积分</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => {
                const isWinnerBracket = team.points >= 3;
                const isLoserBracket = team.points <= 2;
                return (
                  <tr
                    key={team.id}
                    className={`border-b border-slate-700/50 last:border-0 ${
                      index < 3 ? 'bg-emerald-900/10' : 'bg-red-900/10'
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-slate-400">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-200">
                      {team.name}
                      {isWinnerBracket && <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">胜者组</span>}
                      {isLoserBracket && <span className="ml-2 text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">败者组</span>}
                    </td>
                    <td className="px-2 py-3 text-center text-slate-400">{team.p}</td>
                    <td className="px-2 py-3 text-center text-slate-400 text-xs">
                      {team.w}-{team.d}-{team.l}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-blue-400 text-lg">{team.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="p-4 bg-slate-900/50 text-xs text-slate-400 border-t border-slate-700">
            <p>分组规则：累计积分≥3分的队伍进入胜者组，累计积分≤2分的队伍进入败者组。</p>
          </div>
        </div>
      </div>
    </div>
  );
};
