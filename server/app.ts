/* eslint no-console: "off" */

// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
// startServer() is a function that starts the server
// the server will listen on .env.CLIENT_URL if set, otherwise 8000
import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import * as http from 'http';
import path from 'path';

import answerController from './controllers/answer.controller';
import questionController from './controllers/question.controller';
import tagController from './controllers/tag.controller';
import commentController from './controllers/comment.controller';
import { FakeSOSocket } from './types/types';
import userController from './controllers/user.controller';
import messageController from './controllers/message.controller';
import chatController from './controllers/chat.controller';
import gameController from './controllers/game.controller';
import collectionController from './controllers/collection.controller';
import communityController from './controllers/community.controller';

const MONGO_URL = `${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'}/fake_so`;
const PORT = parseInt(process.env.PORT || '8000');

const app = express();
const server = http.createServer(app);
const socket: FakeSOSocket = new Server(server, {});

function connectDatabase() {
  return mongoose.connect(MONGO_URL).catch(err => console.log('MongoDB connection error: ', err));
}

function startServer() {
  connectDatabase();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

socket.on('connection', socket => {
  console.log('A user connected ->', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  socket.close();

  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

app.use(express.json());
app.use('/api/question', questionController(socket));
app.use('/api/tags', tagController());
app.use('/api/answer', answerController(socket));
app.use('/api/comment', commentController(socket));
app.use('/api/message', messageController(socket));
app.use('/api/user', userController(socket));
app.use('/api/chat', chatController(socket));
app.use('/api/games', gameController(socket));
app.use('/api/collection', collectionController(socket));
app.use('/api/community', communityController(socket));

if (process.env.MODE === 'production') {
  app.use(express.static('../client/dist'));
  app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../../client/dist/index.html')));
} else {
  app.get('/*', (_: Request, res: Response) => {
    res.status(404);
    res.send(
      'You are connecting directly to the API server in development mode! ' +
        'You probably want to access the Vite server instead.' +
        'If you were trying to access an API endpoint, double check your URL.',
    );
    res.end();
  });
}

// Export the app instance
export { app, server, startServer };
