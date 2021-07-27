import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  authenticate,
  generateAuthentication,
  serveAuthenticationStatus,
  logout,
} from "./authentication.js";
import {
  verifyCredentials,
  createNewUser,
  serveUsers,
  deleteUser,
  updateUser,
  serveAdmins,
} from "./users.js";
import {
  serveBooks,
  serveBookDescription,
  updateBook,
  addBook,
  deleteBook,
} from "./books.js";
import { addOrder, serveOrders } from "./orders.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

const __dirname = path.resolve();
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../client/build")));

/* Is working */
app.get("/api/books", serveBooks);
app.get("/api/books/:bookId", serveBookDescription);
app.get("/api/users", serveUsers);
app.get("/api/admins", serveAdmins);
app.put("/api/users/:userId", authenticate, updateUser);
app.delete("/api/users/:userId", authenticate, deleteUser);
app.post("/api/books", authenticate, addBook);
app.put("/api/books/:bookId", authenticate, updateBook);
app.delete("/api/books/:bookId", authenticate, deleteBook);
app.get("/api/auth", authenticate, serveAuthenticationStatus);
app.post("/api/auth", verifyCredentials, generateAuthentication);
app.get("/api/logout", logout);
app.post("/api/orders", authenticate, addOrder);

app.post("/api/users", createNewUser, generateAuthentication);

app.get("/api/orders", serveOrders);

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.info(`API is online at http://127.0.0.1:${port}.`);
});
