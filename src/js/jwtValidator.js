import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const jwtValidator = (token) => {
  const PUB_KEY = fs.readFileSync(__dirname, '/crypto/publicKey.pem', 'utf-8');
  token.verify(token, PUB_KEY, (err, data) => {
    if (err) return { err };
    return data;
  });
};

export default jwtValidator;
