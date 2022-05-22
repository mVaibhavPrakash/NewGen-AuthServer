import jwt from 'jsonwebtoken';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import pg from 'pg';
import 'dotenv/config';
import Userexists from './src/database/Userexists.js';
import Users from './src/database/schema/Users.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:8080',
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

const a = await Users(pool);

/**
 * ROUTES
 */

//pool.query('truncate users')

app.post('/login', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const result = await Userexists('login', pool, username, '', password);
    if (result.result) {
      const PRI_KEY = fs.readFileSync('./src/crypto/privateKey.pem');
      const token = jwt.sign(
        { username, iat: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
        PRI_KEY,
        { algorithm: 'RS256' }
      );
      res.status(200).send({
        id: result.id,
        username: username,
        firstname: result.firstname,
      });
    } else {
      res.status(203).send({ error: "Account doesn't exists" });
    }
  } catch (err) {
    console.log(`An database error occurred ${err.result}`);
    res.status(203).send({ error: 'Database Error' });
  }
});

app.post('/signup', async (req, res) => {
  let exists = null;
  try {
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
    console.log(exists + ' jsks');
    if (exists.result) {
      console.log(exists.result);
      res.status(203).send({ error: exists.result });
    } else {
      console.log(username, firstname);
      res.status(200).send({ username, firstname });
    }
  } catch (err) {
    res.status(203).send({ error: exists.result });
  }
});

app.post('/profile', async(req,res) =>{
  
})

app.get('/logout', (req, res) => {});
app.get('/', (req, res) => {
  res.send('Hiiiiii');
});

/**
 * CREATING SERVER CONNECTION
 */

app.listen(3012, () => console.log('listening.....'));
