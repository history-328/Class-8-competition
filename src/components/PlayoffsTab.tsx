import React from 'react';
import { useAppStore } from '../store';
import { MatchCard } from './MatchCard';

export const PlayoffsTab: React.FC = () => {
  const { state, updatePlayoffMatch } = useAppStore();
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
        </div>

        <div className="relative w-full h-[600px]">
          
          {/* SVG Lines Overlay */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            {/* WB R1 (Winner) -> WB Final */}
            <path d="M 256 100 L 320 100" fill="none" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="3" />
            
            {/* WB R1 (Loser) -> LB R2 */}
            <path d="M 256 120 L 288 120 L 288 500 L 320 500" fill="none" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" strokeDasharray="6 4" />
            
            {/* LB R1 (Winner) -> LB R2 */}
            <path d="M 256 500 L 320 500" fill="none" stroke="rgba(248, 113, 113, 0.6)" strokeWidth="3" />
            
            {/* WB Final (Winner) -> Grand Final */}
            <path d="M 576 100 L 928 100 L 928 200 L 960 200" fill="none" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="3" />
            
            {/* WB Final (Loser) -> LB Final */}
            <path d="M 576 120 L 608 120 L 608 300 L 640 300" fill="none" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" strokeDasharray="6 4" />
            
            {/* LB R2 (Winner) -> LB Final */}
            <path d="M 576 500 L 608 500 L 608 300 L 640 300" fill="none" stroke="rgba(248, 113, 113, 0.6)" strokeWidth="3" />
            
            {/* LB Final (Winner) -> Grand Final */}
            <path d="M 896 300 L 928 300 L 928 200 L 960 200" fill="none" stroke="rgba(248, 113, 113, 0.6)" strokeWidth="3" />
          </svg>

          {/* Match Cards */}
          
          {/* Column 1 */}
          <div className="absolute w-64 z-10" style={{ left: '0px', top: '40px' }}>
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
          <div className="absolute w-64 z-10" style={{ left: '320px', top: '40px' }}>
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
          <div className="absolute w-64 z-10" style={{ left: '640px', top: '240px' }}>
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
