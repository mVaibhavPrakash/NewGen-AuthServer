import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pg from 'pg';
import 'dotenv/config';
import fs from 'fs';
import CreateUsersTable from './src/database/schema/Users.js';
import { CreateUserProfileTable } from './src/database/schema/UserProfile.js';
import signUpFun from './src/routes/signup.js';
import loginFun from './src/routes/login.js';
import {
  GetProfile,
  PostProfile,
  UpdateProfile,
} from './src/routes/profile.js';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);
app.use(cookieParser());

/**
 * RETURN CONNECTION POOL
 */
const PRI_KEY = fs.readFileSync('./src/crypto/privateKey.pem');

const pool = new pg.Pool({
  user: process.env.SQL_AUTH_USER,
  host: process.env.SQL_AUTH_HOST,
  database: process.env.SQL_AUTH_DB,
  password: process.env.SQL_AUTH_PWD,
  port: process.env.SQL_AUTH_PORT,
  max: 20,
});

// Create Database tables
await CreateUsersTable(pool);
await CreateUserProfileTable(pool);

//pool.query('truncate users')

/**
 * ROUTES
 */

app.use(loginFun(pool, PRI_KEY));
app.use(signUpFun(pool));
app.use(PostProfile(pool));
app.use(UpdateProfile(pool));
app.use(GetProfile(pool));

/**
 * CREATING SERVER CONNECTION
 */

app.listen(3012, () => console.log('listening.....'));
