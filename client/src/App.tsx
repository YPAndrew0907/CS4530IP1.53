import { useEffect, useState } from 'react';
import { FakeSOSocket } from './types/types';
import { BrowserRouter as Router } from 'react-router-dom';
import { io } from 'socket.io-client';
import FakeStackOverflow from './components/fakestackoverflow';

const App = () => {
  const [socket, setSocket] = useState<FakeSOSocket | null>(null);

  useEffect(() => {
    if (!socket) {
      setSocket(io());
    }

    return () => {
      if (socket !== null) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <Router>
      <FakeStackOverflow socket={socket} />
    </Router>
  );
};

export default App;
