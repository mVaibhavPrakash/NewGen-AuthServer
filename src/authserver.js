import base64url from 'base64url';
import express, { json, urlencoded } from 'express';
import jwtGenerator from './js/jwtGenerator';
import passwordHash from './js/passwordHash';

let jwt = base64url.encode('Hello');
let ww = base64url.decode(jwt);

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
console.log(jwt + ' ' + ww);

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

app.listen(3002, () => console.log('listening.....'));
