import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppState, Team, Match, GroupStage, Playoffs } from './types';
import { io, Socket } from 'socket.io-client';

const initialTeams: Team[] = [
  { id: '1', name: '队伍 1' },
  { id: '2', name: '队伍 2' },
  { id: '3', name: '队伍 3' },
  { id: '4', name: '队伍 4' },
  { id: '5', name: '队伍 5' },
];

const createEmptyMatch = (id: string): Match => ({
  id,
  team1Id: null,
  team2Id: null,
  score1: '',
  score2: '',
  status: 'pending',
});

const initialGroupStage: GroupStage = {
  round1: {
    match1: createEmptyMatch('r1m1'),
    match2: createEmptyMatch('r1m2'),
    byeTeamId: null,
  },
  round2: {
    match1: createEmptyMatch('r2m1'),
    match2: createEmptyMatch('r2m2'),
    byeTeamId: null,
  },
  tiebreakers: [],
};

const initialPlayoffs: Playoffs = {
  wbRound1: createEmptyMatch('wbR1'),
  wbFinal: createEmptyMatch('wbF'),
  lbRound1: createEmptyMatch('lbR1'),
  lbRound2: createEmptyMatch('lbR2'),
  lbFinal: createEmptyMatch('lbF'),
  grandFinal: createEmptyMatch('gF'),
};

const initialState: AppState = {
  teams: initialTeams,
  groupStage: initialGroupStage,
  playoffs: initialPlayoffs,
};

interface AppContextType {
  state: AppState;
  isAdmin: boolean;
  toast: { message: string; type: 'success' | 'error' } | null;
  login: (password: string) => void;
  logout: () => void;
  updateTeam: (id: string, name: string) => void;
  updateGroupMatch: (round: 'round1' | 'round2', matchId: 'match1' | 'match2', match: Partial<Match>) => void;
  updateGroupBye: (round: 'round1' | 'round2', teamId: string | null) => void;
  addTiebreaker: () => void;
  updateTiebreaker: (index: number, match: Partial<Match>) => void;
  removeTiebreaker: (index: number) => void;
  updatePlayoffMatch: (matchId: keyof Playoffs, match: Partial<Match>) => void;
  resetState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(initialState);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const newSocket = io({
      transports: ['websocket'], // 强制使用 websocket，避免 Cloud Run 环境下长轮询导致的连接丢失
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      showToast('无法连接到服务器，请刷新页面重试。', 'error');
    });

    newSocket.on('stateUpdate', (newState: AppState) => {
      setState(newState);
    });

    newSocket.on('loginSuccess', () => {
      setIsAdmin(true);
      showToast('管理员登录成功！您现在可以编辑赛程了。', 'success');
    });

    newSocket.on('loginFailed', () => {
      showToast('密码错误，请重试！', 'error');
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const emitUpdate = (newState: AppState) => {
    if (isAdmin && socket) {
      socket.emit('updateState', newState);
    }
  };

  const login = (password: string) => {
    if (socket) socket.emit('login', password);
  };

  const logout = () => {
    setIsAdmin(false);
    if (socket) socket.emit('logout');
  };

  const updateTeam = (id: string, name: string) => {
    if (!isAdmin) return;
    setState((prev) => {
      const next = { ...prev, teams: prev.teams.map((t) => (t.id === id ? { ...t, name } : t)) };
      emitUpdate(next);
      return next;
    });
  };

  const updateGroupMatch = (round: 'round1' | 'round2', matchId: 'match1' | 'match2', match: Partial<Match>) => {
    if (!isAdmin) return;
    setState((prev) => {
      const next = {
        ...prev,
        groupStage: {
          ...prev.groupStage,
          [round]: {
            ...prev.groupStage[round],
            [matchId]: { ...prev.groupStage[round][matchId], ...match },
          },
        },
      };
      emitUpdate(next);
      return next;
    });
  };

  const updateGroupBye = (round: 'round1' | 'round2', teamId: string | null) => {
    if (!isAdmin) return;
    setState((prev) => {
      const next = {
        ...prev,
        groupStage: {
          ...prev.groupStage,
          [round]: {
            ...prev.groupStage[round],
            byeTeamId: teamId,
          },
        },
      };
      emitUpdate(next);
      return next;
    });
  };

  const addTiebreaker = () => {
    if (!isAdmin) return;
    setState((prev) => {
      const next = {
        ...prev,
        groupStage: {
          ...prev.groupStage,
          tiebreakers: [...prev.groupStage.tiebreakers, createEmptyMatch(`tb-${Date.now()}`)],
        },
      };
      emitUpdate(next);
      return next;
    });
  };

  const updateTiebreaker = (index: number, match: Partial<Match>) => {
    if (!isAdmin) return;
    setState((prev) => {
      const newTb = [...prev.groupStage.tiebreakers];
      newTb[index] = { ...newTb[index], ...match };
      const next = {
        ...prev,
        groupStage: { ...prev.groupStage, tiebreakers: newTb },
      };
      emitUpdate(next);
      return next;
    });
  };

  const removeTiebreaker = (index: number) => {
    if (!isAdmin) return;
    setState((prev) => {
      const newTb = [...prev.groupStage.tiebreakers];
      newTb.splice(index, 1);
      const next = {
        ...prev,
        groupStage: { ...prev.groupStage, tiebreakers: newTb },
      };
      emitUpdate(next);
      return next;
    });
  };

  const updatePlayoffMatch = (matchId: keyof Playoffs, match: Partial<Match>) => {
    if (!isAdmin) return;
    setState((prev) => {
      const next = {
        ...prev,
        playoffs: {
          ...prev.playoffs,
          [matchId]: { ...prev.playoffs[matchId], ...match },
        },
      };
      emitUpdate(next);
      return next;
    });
  };

  const resetState = () => {
    if (!isAdmin) return;
    setState(initialState);
    emitUpdate(initialState);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        isAdmin,
        toast,
        login,
        logout,
        updateTeam,
        updateGroupMatch,
        updateGroupBye,
        addTiebreaker,
        updateTiebreaker,
        removeTiebreaker,
        updatePlayoffMatch,
        resetState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
};
