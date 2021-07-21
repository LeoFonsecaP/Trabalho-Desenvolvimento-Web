import express from 'express';
import cookieParser from 'cookie-parser';
import {
  authenticate,
  generateAuthentication
} from './authentication.js';
import { verifyCredentials } from './users.js';
import {
  serveBooks,
  serveBookDescription,
  updateBook,
  addBook,
  deleteBook
} from './books.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/api/books', serveBooks);
app.get('/api/books/:bookId', serveBookDescription);
app.post('/api/books', authenticate, addBook);
app.put('/api/books/:bookId', authenticate, updateBook);
app.delete('/api/books/:bookId', authenticate, deleteBook);

app.get('/api/auth', authenticate, (request, response) => {
  response.status(200).json({
    isAdmin: request.locals.userIsAdmin
  }).send();
});
app.post('/api/auth', verifyCredentials, generateAuthentication);

app.post('/api/users');
app.put('/api/users/:patch');
app.delete('/api/users');
app.get('/api/users');

app.get('/api/purchases');
app.get('/api/purchases/:resource');
app.post('/api/purchases');

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.info(`API is online at http://127.0.0.1:${port}.`);
});
