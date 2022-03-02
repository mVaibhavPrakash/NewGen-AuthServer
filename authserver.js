import jwt from 'jsonwebtoken';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import pg from 'pg';
import 'dotenv/config';
import Userexists from './src/database/Userexists.js';

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
  user: process.env.SQL_AUTH_USER,
  host: process.env.SQL_AUTH_HOST,
  database: process.env.SQL_AUTH_DB,
  password: process.env.SQL_AUTH_PWD,
  port: process.env.SQL_AUTH_PORT,
  max: 20,
});

/**
 * ROUTES
 */

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await Userexists('login', pool, username, '', password);
  if (result.isTrue) {
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
    res.send({ username: username, firstname: result.firstname });
  } else {
    res.status(203);
    res.send("Account doesn't exists");
  }
});

app.post('/signup', async (req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const password = req.body.password;
  const exists = await Userexists(
    'signup',
    pool,
    username,
    firstname,
    password
  );
  if (exists) {
    res.status(203);
    res.send('Account already exists');
  } else {
    res.status(200);
    res.send({ username, firstname });
  }
});

/**
 * CREATING SERVER CONNECTION
 */

app.listen(3002, () => console.log('listening.....'));
