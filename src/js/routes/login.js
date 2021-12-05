import jwt from 'jsonwebtoken';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import isAuthenticated from '../database/isAuthenticated';
const __dirname = dirname(fileURLToPath(import.meta.url));

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const isTrue = isAuthenticated(username, password);
  if (isTrue) {
    const PUB_KEY = fs.readFileSync(
      __dirname,
      '/crypto/publicKey.pem',
      'utf-8'
    );
    jwt.sign(
      { username, iat: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
      PUB_KEY,
      { algorithm: 'RS256' }
    );
  } else res.status(404).json({ error: 'Incorrect username or password' });
};
