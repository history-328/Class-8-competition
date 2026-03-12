export interface Team {
  id: string;
  name: string;
}

export interface Match {
  id: string;
  team1Id: string | null;
  team2Id: string | null;
  score1: number | '';
  score2: number | '';
  status: 'pending' | 'completed';
}

export interface GroupStage {
  round1: {
    match1: Match;
    match2: Match;
    byeTeamId: string | null;
  };
  round2: {
    match1: Match;
    match2: Match;
    byeTeamId: string | null;
  };
  tiebreakers: Match[];
}

export interface Playoffs {
  wbRound1: Match;
  wbFinal: Match;
  lbRound1: Match;
  lbRound2: Match;
  lbFinal: Match;
  grandFinal: Match;
}

export interface AppState {
  teams: Team[];
  groupStage: GroupStage;
  playoffs: Playoffs;
}
