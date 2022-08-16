import express from 'express';
import jwt from 'jsonwebtoken';
import Userexists from '../database/Userexists.js';

const loginFun = function (pool, PRI_KEY) {
  const route = express.Router();

  route.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await Userexists('login', pool, username, '', password);
      if (result.isTrue) {
        const token = jwt.sign(
          { username, iat: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
          PRI_KEY,
          { algorithm: 'RS256' }
        );
        res
          .status(200)
          .cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 10 * 60 * 60 * 1000,
          })
          .send({
            id: result.id,
            username: username,
            fullname: result.fullname,
            token,
            isProfileCreated: result.isProfileCreated
          });
      } else {
        res.status(203).send({ error: "Account doesn't exists" });
      }
    } catch (err) {
      console.log(`An database error occurred ${err.result}`);
      res.status(203).send({ error: 'Database Error' });
    }
  });

  return route;
};

export default loginFun;
