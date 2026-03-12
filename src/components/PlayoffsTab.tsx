import React from 'react';
import { useAppStore } from '../store';
import { MatchCard } from './MatchCard';

export const PlayoffsTab: React.FC = () => {
  const { state, updatePlayoffMatch, isAdmin } = useAppStore();
  const { teams, playoffs } = state;

  return (
    <div className="p-6 max-w-[1300px] mx-auto overflow-x-auto">
      <div className="min-w-[1250px] bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-2xl relative">
        <h2 className="text-3xl font-black mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent uppercase tracking-widest">
          胜负组淘汰赛 (Playoffs)
        </h2>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-12 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-sky-400"></div>
            <span className="text-slate-300">胜者晋级 (胜者组)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-red-400"></div>
            <span className="text-slate-300">胜者晋级 (败者组)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-purple-400"></div>
            <span className="text-slate-300">败者掉落</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-gray-400"></div>
            <span className="text-slate-300">淘汰</span>
          </div>
        </div>

        <div className="relative w-full h-[600px]">
          
          {/* SVG Lines Overlay */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(56, 189, 248, 0.6)" />
              </marker>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(248, 113, 113, 0.6)" />
              </marker>
              <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(168, 85, 247, 0.5)" />
              </marker>
              <marker id="arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(156, 163, 175, 0.5)" />
              </marker>
            </defs>

            {/* WB Bye -> WB Final (Team 1) */}
            <path d="M 256 64 L 288 64 L 288 141 L 315 141" fill="none" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2" markerEnd="url(#arrow-blue)" />

            {/* WB R1 (Winner) -> WB Final (Team 2) */}
            <path d="M 256 215 L 288 215 L 288 178 L 315 178" fill="none" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2" markerEnd="url(#arrow-blue)" />
            
            {/* WB R1 (Loser) -> LB R2 (Team 1) */}
            <path d="M 256 248 L 272 248 L 272 511 L 315 511" fill="none" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-purple)" />
            
            {/* LB R1 (Winner) -> LB R2 (Team 2) */}
            <path d="M 256 515 L 288 515 L 288 548 L 315 548" fill="none" stroke="rgba(248, 113, 113, 0.6)" strokeWidth="2" markerEnd="url(#arrow-red)" />
            
            {/* LB R1 (Loser) -> Eliminated */}
            <path d="M 256 548 L 272 548 L 272 575" fill="none" stroke="rgba(156, 163, 175, 0.5)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-gray)" />

            {/* WB Final (Winner) -> Grand Final (Team 1) */}
            <path d="M 576 145 L 768 145 L 768 217 L 955 217" fill="none" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="2" markerEnd="url(#arrow-blue)" />
            
            {/* WB Final (Loser) -> LB Final (Team 1) */}
            <path d="M 576 178 L 608 178 L 608 331 L 635 331" fill="none" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-purple)" />
            
            {/* LB R2 (Winner) -> LB Final (Team 2) */}
            <path d="M 576 515 L 608 515 L 608 368 L 635 368" fill="none" stroke="rgba(248, 113, 113, 0.6)" strokeWidth="2" markerEnd="url(#arrow-red)" />

            {/* LB R2 (Loser) -> Eliminated */}
            <path d="M 576 548 L 592 548 L 592 575" fill="none" stroke="rgba(156, 163, 175, 0.5)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-gray)" />
            
            {/* LB Final (Winner) -> Grand Final (Team 2) */}
            <path d="M 896 335 L 928 335 L 928 254 L 955 254" fill="none" stroke="rgba(248, 113, 113, 0.6)" strokeWidth="2" markerEnd="url(#arrow-red)" />

            {/* LB Final (Loser) -> Eliminated */}
            <path d="M 896 368 L 912 368 L 912 395" fill="none" stroke="rgba(156, 163, 175, 0.5)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-gray)" />
          </svg>

          {/* Match Cards */}
          
          {/* Column 1 */}
          <div className="absolute w-64 z-10" style={{ left: '0px', top: '0px' }}>
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              小组第1
            </div>
            <div className="bg-slate-800/50 border-2 border-dashed border-sky-500/30 rounded-lg overflow-hidden w-64 shadow-lg flex flex-col relative">
              <div className="flex items-center justify-between px-3 py-3">
                <div className="flex flex-col w-full">
                  <span className="text-[10px] text-sky-500/70 mb-1">首轮轮空 (Bye)</span>
                  <select
                    value={playoffs.wbFinal.team1Id || ''}
                    onChange={(e) => updatePlayoffMatch('wbFinal', { team1Id: e.target.value === '' ? null : e.target.value })}
                    disabled={!isAdmin}
                    className={`bg-transparent border-none text-sm focus:ring-0 outline-none w-full p-0 text-sky-400 font-bold ${!isAdmin ? 'appearance-none cursor-default' : ''}`}
                  >
                    <option value="" className="text-slate-800">选择队伍</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id} className="text-slate-800">
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute w-64 z-10" style={{ left: '0px', top: '140px' }}>
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">胜者组 第一轮</div>
            <MatchCard
              match={playoffs.wbRound1}
              teams={teams}
              label="WB R1"
              bo="BO3"
              onChange={(m) => updatePlayoffMatch('wbRound1', m)}
            />
          </div>

          <div className="absolute w-64 z-10" style={{ left: '0px', top: '440px' }}>
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">败者组 第一轮</div>
            <MatchCard
              match={playoffs.lbRound1}
              teams={teams}
              label="LB R1"
              bo="BO3"
              onChange={(m) => updatePlayoffMatch('lbRound1', m)}
            />
          </div>

          {/* Column 2 */}
          <div className="absolute w-64 z-10" style={{ left: '320px', top: '70px' }}>
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">胜者组 决赛</div>
            <MatchCard
              match={playoffs.wbFinal}
              teams={teams}
              label="WB Final"
              bo="BO3"
              onChange={(m) => updatePlayoffMatch('wbFinal', m)}
            />
          </div>

          <div className="absolute w-64 z-10" style={{ left: '320px', top: '440px' }}>
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">败者组 第二轮</div>
            <MatchCard
              match={playoffs.lbRound2}
              teams={teams}
              label="LB R2"
              bo="BO3"
              onChange={(m) => updatePlayoffMatch('lbRound2', m)}
            />
          </div>

          {/* Column 3 */}
          <div className="absolute w-64 z-10" style={{ left: '640px', top: '260px' }}>
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">败者组 决赛</div>
            <MatchCard
              match={playoffs.lbFinal}
              teams={teams}
              label="LB Final"
              bo="BO3"
              onChange={(m) => updatePlayoffMatch('lbFinal', m)}
            />
          </div>

          {/* Column 4 */}
          <div className="absolute w-64 z-10" style={{ left: '960px', top: '140px' }}>
            <div className="text-sm font-black text-yellow-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="text-xl">🏆</span> 总决赛
            </div>
            <div className="ring-2 ring-yellow-500/50 rounded-lg shadow-[0_0_30px_rgba(234,179,8,0.2)] bg-slate-900">
              <MatchCard
                match={playoffs.grandFinal}
                teams={teams}
                label="Grand Final"
                bo="BO3"
                onChange={(m) => updatePlayoffMatch('grandFinal', m)}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

