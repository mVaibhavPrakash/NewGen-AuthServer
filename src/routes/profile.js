import { Router } from 'express';
import CreateUserProfile from '../database/methods/CreateUserProfile.js';
import UpdateUserProfile from '../database/UpdateUserProfile.js';
import GetUserProfile from '../database/GetUserProfile.js';

export const PostProfile = (pool) => {
  const Route = Router();
  Route.post('/profile/create', (req, res) => {
    try {
      const Result = CreateUserProfile(pool, req.data);
      res.send(Result);
    } catch (err) {
      res.status(500).send({
        created: false,
        status: 500,
        data: '',
        err: `${err} : internel error`,
      });
    }
  });
  return Route;
};

export const GetProfile = (pool) => {
  const Route = Router();
  Route.get('/profile/get', (req, res) => {
    try{
            const Result = GetUserProfile(pool,data)
            res.send(Result)
        }catch(err){
            res.status(500).send({
                exists: unknown,
                status: 500,
                data: '',
                err: `${err} : internel error`
            })
        }
    res.send('<p>Hakjskajskjaskj</p>');
  });
  return Route;
};

export const UpdateProfile = (pool) => {
  const Route = Router();
  Route.put('/profile/update'),
    async (req, res) => {
      try {
        const Result = UpdateUserProfile(pool, req.data);
        res.send(Result);
      } catch (err) {
        res.status(500).send({
          updated: false,
          status: 500,
          data: '',
          err: `${err} : internel error`,
        });
      }
    };
  return Route;
};
