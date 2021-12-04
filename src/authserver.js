import express, { json, urlencoded } from 'express';
import jwt from 'jasonwebtoken';
import cors from 'cors';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createConnection } from './js/database/createConnection.js';
import passwordHash from './js/passwordHash.js';
import router from './js/routes/router.js';
import { user } from './js/database/createConnection.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3012',
    exposedHeaders: 'Authorization',
  })
);

app.use(router);
/**
 * RETURN CONNECTION POOL
 */

const sql = await createConnection().then((res) => {
  return res;
});

const isAuthenticated = new Promise((req, res) => {
  const token = req.headers.authorized;
});

/**
 * ROUTES
 */

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const [salt, hash] = passwordHash(username, password);

  /**
   * adding salt and hash to db
   */

  const PUB_KEY = fs.readFileSync(__dirname, '/crypto/publicKey.pem', 'utf-8');
  jwt.sign(
    { username, iat: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
    PUB_KEY,
    { algorithm: 'RS256' }
  );
});

app.post('/signup', async (req, res) => {});

/**
 * CREATING SERVER CONNECTION
 */

app.listen(3002, () => console.log('listening.....'));
