import base64url from 'base64url';
import express, { json, urlencoded } from 'express';
import { createConnection } from './js/database/createConnection.js';
import passwordHash from './js/passwordHash.js';
import jwtGenerator from './js/jwtGenerator.js';
import { createUser, isValidUser } from './js/database/user.js';

let jwt = base64url.encode('Hello');
let ww = base64url.decode(jwt);

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

/**
 * RETURN CONNECTION POOL
 */

const sql = await createConnection().then((res) => {
  return res;
});

/**
 * ROUTES
 */

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let BACKEND_USER = true;
  let AUTHENTICATED;

  /**
   * IF JWT IS NOT PRESENT FOR THIS REQUEST
   */

  const userObj = isValidUser(sql, username);
  if (userObj) {
    AUTHENTICATED = passwordHash(password, userObj.salt, userObj.hash);
  } else {
    BACKEND_USER = false;
  }

  /**
   *
   */

  if (!BACKEND_USER) {
    res.json({
      error: "Username doesn't exists",
      statusCode: '401',
    });
  }

  if (!AUTHENTICATED) {
    res.json({
      error: 'Please enter the correct Password',
      statusCode: '401',
    });
  }

  const payload = {
    username: username,
    iat: new Date(),
  };

  const hash = jwtGenerator(payload);
});

app.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const age = req.body.age;
  const phone = req.body.phone;

  const [salt, hash] = passwordHash(password);
  const saltt = String(salt);
  const hashh = String(hash);

  const ress = await createUser(
    sql,
    username,
    saltt,
    hashh,
    firstname,
    lastname,
    age,
    phone
  );

  const resss = await sql.request().query(`select * from [user]`);
  const isValid = await isValidUser(sql, username);
});

/**
 * CREATING SERVER CONNECTION
 */

app.listen(3002, () => console.log('listening.....'));
