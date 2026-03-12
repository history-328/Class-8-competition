import React from 'react';
import { useAppStore } from '../store';
import { MatchCard } from './MatchCard';

export const PlayoffsTab: React.FC = () => {
  const { state, updatePlayoffMatch } = useAppStore();
  const { teams, playoffs } = state;

  return (
    <div className="p-6 max-w-[1200px] mx-auto overflow-x-auto">
      <div className="min-w-[1000px] bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-2xl relative">
        <h2 className="text-3xl font-black mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent uppercase tracking-widest">
          胜负组淘汰赛 (Playoffs)
        </h2>

        <div className="flex justify-between relative z-10">
          
          {/* SVG Lines Overlay */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '600px' }}>
            {/* WB R1 to WB Final */}
            <path d="M 256 60 L 298 60 L 298 210 L 340 210" fill="none" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="2" />
            
            {/* LB R1 to LB R2 */}
            <path d="M 256 540 L 340 540" fill="none" stroke="rgba(248, 113, 113, 0.5)" strokeWidth="2" />
            
            {/* WB Final to Grand Final */}
            <path d="M 596 210 L 638 210 L 638 360 L 680 360" fill="none" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="2" />
            
            {/* LB R2 to LB Final */}
            <path d="M 596 540 L 680 540" fill="none" stroke="rgba(248, 113, 113, 0.5)" strokeWidth="2" />
            
            {/* LB Final to Grand Final (Upwards) */}
            <path d="M 808 500 L 808 420" fill="none" stroke="rgba(248, 113, 113, 0.5)" strokeWidth="2" />
            
            {/* WB R1 Loser to LB R2 (Dotted line to indicate drop down) */}
            <path d="M 256 80 L 310 80 L 310 520 L 340 520" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* WB Final Loser to LB Final (Dotted line) */}
            <path d="M 596 230 L 650 230 L 650 520 L 680 520" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Column 1 */}
          <div className="flex flex-col justify-between h-[600px] w-64 z-10">
            <div className="relative">
              <div className="absolute -top-6 left-0 text-xs font-bold text-blue-400 uppercase tracking-wider">胜者组 第一轮</div>
              <MatchCard
                match={playoffs.wbRound1}
                teams={teams}
                label="WB R1"
                bo="BO3"
                onChange={(m) => updatePlayoffMatch('wbRound1', m)}
              />
            </div>

            <div className="relative">
              <div className="absolute -top-6 left-0 text-xs font-bold text-red-400 uppercase tracking-wider">败者组 第一轮</div>
              <MatchCard
                match={playoffs.lbRound1}
                teams={teams}
                label="LB R1"
                bo="BO3"
                onChange={(m) => updatePlayoffMatch('lbRound1', m)}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col justify-between h-[600px] w-64 pt-[150px] z-10">
            <div className="relative">
              <div className="absolute -top-6 left-0 text-xs font-bold text-blue-400 uppercase tracking-wider">胜者组 决赛</div>
              <MatchCard
                match={playoffs.wbFinal}
                teams={teams}
                label="WB Final"
                bo="BO3"
                onChange={(m) => updatePlayoffMatch('wbFinal', m)}
              />
            </div>

            <div className="relative">
              <div className="absolute -top-6 left-0 text-xs font-bold text-red-400 uppercase tracking-wider">败者组 第二轮</div>
              <MatchCard
                match={playoffs.lbRound2}
                teams={teams}
                label="LB R2"
                bo="BO3"
                onChange={(m) => updatePlayoffMatch('lbRound2', m)}
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col justify-between h-[600px] w-64 pt-[300px] z-10">
            <div className="relative">
              <div className="absolute -top-8 left-0 text-sm font-black text-yellow-400 uppercase tracking-widest flex items-center gap-2">
                <span className="text-xl">🏆</span> 总决赛
              </div>
              <div className="ring-2 ring-yellow-500/50 rounded-lg shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                <MatchCard
                  match={playoffs.grandFinal}
                  teams={teams}
                  label="Grand Final"
                  bo="BO3"
                  onChange={(m) => updatePlayoffMatch('grandFinal', m)}
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 left-0 text-xs font-bold text-red-400 uppercase tracking-wider">败者组 决赛</div>
              <MatchCard
                match={playoffs.lbFinal}
                teams={teams}
                label="LB Final"
                bo="BO3"
                onChange={(m) => updatePlayoffMatch('lbFinal', m)}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
