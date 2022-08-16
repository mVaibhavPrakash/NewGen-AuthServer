import express from 'express';
import Userexists from '../database/Userexists.js';

const signUpFun = function (pool) {
  const router = express.Router();

  router.post('/signup', async (req, res) => {
    try {
      const { username, fullname, password, email } = req.body;
      const exists = await Userexists(
        'signup',
        pool,
        username,
        fullname,
        password,
        email
      );
      if (exists.isTrue) {
        res.status(203).send({ error: exists.error });
      } else {
        console.log(username, fullname);
        res.status(200).send({ username, fullname });
      }
    } catch (err) {
      res.status(203).send({ error: 'A database error occurred' });
    }
  });
  return router;
};

export default signUpFun;
