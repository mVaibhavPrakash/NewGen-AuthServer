import base64url from 'base64url';
import express, { json, urlencoded } from 'express';
import mssql from 'mssql';
import sqlConfig from './js/database/dbConfig.js';
import jwtGenerator from './js/jwtGenerator.js';
import jwtValidator from './js/jwtValidator.js';

let jwt = base64url.encode('Hello');
let ww = base64url.decode(jwt);

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

/**
 * CREATING SQL SERVER CONNECTION
 */

async function createConnection() {
  try {
    const pool = await mssql.connect(sqlConfig);
    return pool;
  } catch (err) {
    console.log(err);
  }
}

/**
 * RETURN CONNECTION POOL
 */

const sql = await createConnection().then((res) => {
  return res;
});

const res = await sql.request().query("select * from [user] where name = 'A'");

if (res.recordsets[0][0]) console.log(res.recordsets[0][0]);

/**
 * ROUTES
 */

app.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username !== BACKEND_USER) {
    res.json({
      error: "Username doesn't exists",
      statusCode: '401',
    });
  }

  if (!passwordHash(password)) {
    res.json({
      error: 'Please enter the right Password',
      statusCode: '401',
    });
  }

  const payload = {
    username: username,
    iat: new Date(),
  };

  const hash = jwtGenerator(payload);
  res.json(js);
});

/**
 * CREATING SERVER CONNECTION
 */

app.listen(3002, () => console.log('listening.....'));
