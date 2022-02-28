import jwt from 'jsonwebtoken';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import pg from 'pg';
import Userexists from './src/js/database/Userexists.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:8080',
    exposedHeaders: 'authorization',
    credentials: true,
  })
);
app.use(cookieParser());

/**
 * RETURN CONNECTION POOL
 */

const pool = new pg.Pool({
  user: 'newgen_admin',
  host: 'localhost',
  database: 'NEWGEN',
  password: 'Vp@261997',
  port: 5432,
});

/**
 * ROUTES
 */

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await Userexists('login', pool, username, password);
  if (result) {
    const PRI_KEY = fs.readFileSync('./src/crypto/privateKey.pem');
    const token = jwt.sign(
      { username, iat: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
      PRI_KEY,
      { algorithm: 'RS256' }
    );
    res.status(200);
    res.cookie('jwt', token, {
      maxAge: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      httpOnly: true,
    });
    console.log({ username });
    res.send({ username });
  } else {
    res.status(203);
    res.send("Account doesn't exists");
  }
});

app.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const exists = await Userexists('signup', pool, username, password);
  if (exists) {
    res.status(203);
    res.send('Account already exists');
  } else {
    res.status(200);
    res.send({ username });
  }
});

/**
 * CREATING SERVER CONNECTION
 */

app.listen(3002, () => console.log('listening.....'));
