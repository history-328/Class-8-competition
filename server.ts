import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';

const initialTeams = [
  { id: '1', name: '队伍 1' },
  { id: '2', name: '队伍 2' },
  { id: '3', name: '队伍 3' },
  { id: '4', name: '队伍 4' },
  { id: '5', name: '队伍 5' },
];

const createEmptyMatch = (id: string) => ({
  id,
  team1Id: null,
  team2Id: null,
  score1: '',
  score2: '',
  status: 'pending',
});

let appState = {
  teams: initialTeams,
  groupStage: {
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
  },
  playoffs: {
    wbRound1: createEmptyMatch('wbR1'),
    wbFinal: createEmptyMatch('wbF'),
    lbRound1: createEmptyMatch('lbR1'),
    lbRound2: createEmptyMatch('lbR2'),
    lbFinal: createEmptyMatch('lbF'),
    grandFinal: createEmptyMatch('gF'),
  },
};

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    // Send current state to newly connected client
    socket.emit('stateUpdate', appState);

    socket.on('login', (password) => {
      if (password === '8888') {
        socket.data.isAdmin = true;
        socket.emit('loginSuccess');
      } else {
        socket.emit('loginFailed');
      }
    });

    socket.on('logout', () => {
      socket.data.isAdmin = false;
    });

    socket.on('updateState', (newState) => {
      if (socket.data.isAdmin) {
        appState = newState;
        // Broadcast to all other connected clients
        socket.broadcast.emit('stateUpdate', appState);
      }
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
