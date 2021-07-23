import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {
  authenticate,
  generateAuthentication,
  serveAuthenticationStatus
} from './authentication.js';
import { 
  verifyCredentials,
  createNewUser
} from './users.js';
import {
  serveBooks,
  serveBookDescription,
  updateBook,
  addBook,
  deleteBook
} from './books.js';
import {
  addOrder,
  serveOrders
} from './orders.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

/* Is working */
app.get('/api/books', serveBooks);
app.get('/api/books/:bookId', serveBookDescription);

/* Needs to be tested */
app.post('/api/books', authenticate, addBook);
app.put('/api/books/:bookId', authenticate, updateBook);
app.delete('/api/books/:bookId', authenticate, deleteBook);
app.get('/api/auth', authenticate, serveAuthenticationStatus);
app.post('/api/auth', verifyCredentials, generateAuthentication);

/* Needs to work */
app.post('/api/users', createNewUser, generateAuthentication);
app.put('/api/users/:patch');
app.delete('/api/users');
app.get('/api/users');

app.post('/api/orders', authenticate, addOrder);
app.get('/api/orders', authenticate, serveOrders);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.info(`API is online at http://127.0.0.1:${port}.`);
});
