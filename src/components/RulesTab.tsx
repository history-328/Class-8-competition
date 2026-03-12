import React from 'react';

export const RulesTab: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-slate-300">
      <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-700 shadow-xl prose prose-invert prose-blue max-w-none">
        <h1 className="text-3xl font-bold text-blue-400 mb-8 border-b border-slate-700 pb-4">赛事规则 (Nova Cup Rules)</h1>
        
        <h2 className="text-xl font-semibold text-slate-200 mt-6 mb-3">一、赛事基础信息</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>参赛队伍：</strong>共5支（编号1、2、3、4、5，赛前通过抽签确定编号）。</li>
          <li><strong>赛事规定：</strong>参赛队伍必须在至少一名教练参与的情况下，在新星杯官方KOOK语音频道进行比赛；严禁使用各类破坏比赛公平的手段，经发现取消本次比赛资格。</li>
          <li><strong>参赛人员准则：</strong>教练仅仅负责各队伍赛前训练及战术安排，不可参与正式比赛的BP环节；鼓励替补队员积极研究阵容搭配，替补队员可以参加正式比赛BP环节，并在BP结束后离开语音频道。</li>
          <li><strong>赛制核心：</strong>积分制+胜负分组，小组积分赛采用BO2赛制，加赛采用BO1赛制，淘汰赛采用BO3赛制，最终根据积分排名决出冠军。</li>
          <li><strong>积分规则：</strong>获胜1场积2分，打平（未加赛）各积1分，加赛获胜积1分、加赛失利积0分；败者组失利1场将直接淘汰，胜者组失利则掉入败者组。</li>
          <li><strong>分组规则：</strong>前2轮结束后，根据积分划分胜者组（积分≥3分）和败者组（积分≤2分）；后续轮次，胜者组内争夺晋级资格，败者组内争夺留存资格，最终胜者组冠军与败者组冠军争夺总冠。</li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-200 mt-6 mb-3">二、详细轮次安排</h2>
        
        <h3 className="text-lg font-medium text-blue-300 mt-4">第一轮（小组赛，BO2）</h3>
        <p className="mb-2"><strong>抽签规则：</strong>赛前5支队伍教练抽签，抽取1-5号，其中抽到5号“轮空签”的队伍直接积1分，其余4支队伍两两对阵。</p>
        <p className="mb-4"><strong>积分结果：</strong>获胜队伍积2分，失利队伍积0分；若打平（BO2战平），两队各积1分，无需加赛（第一轮不淘汰队伍）</p>

        <h3 className="text-lg font-medium text-blue-300 mt-4">第二轮（小组赛，BO2）</h3>
        <p className="mb-2"><strong>对阵规则：</strong>采用“积分相近对阵”原则，轮空队伍轮换，与第二轮小组赛抽签，默认为本轮1号，剩余4只队伍中抽取到5号“轮空签”的队伍本轮轮空直接积1分，其余4支队伍两两对阵。</p>
        <p className="mb-2"><strong>积分累计：</strong>本轮积分与第一轮累计，获胜积2分、失利0分，打平各1分</p>
        <p className="mb-4"><strong>分组划分：</strong>本轮结束后，累计积分≥3分的队伍进入胜者组，累计积分≤2分的队伍进入败者组，积分相同的队伍进行BO1加赛，获胜方积1分，失败方不积分。</p>

        <h3 className="text-lg font-medium text-blue-300 mt-4">第三轮（胜负组淘汰赛，BO3）</h3>
        <p className="mb-2"><strong>1. 胜者组比赛：</strong>胜者组按积分排序（积分高者优先），积分最高的队伍轮空，其余2支队伍对阵。对阵获胜者晋级胜者组决赛，失利者掉入败者组；胜者组决赛胜者晋级总决赛，败者进入败者组总决赛。</p>
        <p className="mb-4"><strong>2. 败者组比赛：</strong>败者组2支队伍对战；败者组胜者vs从胜者组掉入的队伍。获胜队伍晋级败者组决赛。</p>

        <h3 className="text-lg font-medium text-blue-300 mt-4">第四轮（败者组决赛+总决赛，BO3）</h3>
        <p className="mb-2"><strong>败者组决赛：</strong>败者组胜者 VS 胜者组决赛失败队伍，胜者晋级总决赛。</p>
        <p className="mb-4"><strong>总决赛：</strong>胜者组冠军 VS 败者组冠军，决出本届比赛冠军！</p>

        <h2 className="text-xl font-semibold text-slate-200 mt-6 mb-3">三、补充规则</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>轮空规则：</strong>前2轮，队伍最多仅轮空1次，轮空位通过抽签确定；第三轮胜负组轮空，按积分排序确定，积分高者轮空</li>
          <li><strong>对阵调整：</strong>若出现积分相同、无法按“相近积分”对阵的情况，通过抽签确定对阵队伍，确保每轮比赛顺利进行</li>
          <li><strong>弃权处理：</strong>队伍弃权，直接判负，对手积2分；若双方同时弃权，均判负，各积0分；弃权队伍直接淘汰，不参与后续轮次</li>
          <li><strong>申诉规则：</strong>比赛中若出现作弊、违规操作（如代打、使用外挂），参赛队伍可在局间休息期间提交申诉，赛事组核实后，判违规队伍负，对手积2分，违规队伍直接淘汰</li>
        </ul>
      </div>
    </div>
  );
};
