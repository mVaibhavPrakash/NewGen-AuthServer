import crypto from 'crypto';
import base64url from 'base64url';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const jwtValidator = (token) => {
  const [head, payload, hash] = token.split('.');

  const payloadJsonString = base64url.decode(payload);
  const payloadJson = JSON.parse(payloadJsonString);

  const currTime = new Date();
  const tokenTime = payloadJson.iat;

  const verify = {
    isTrue: false,
    isExpired: true,
  };

  if (
    currTime.getMonth() - tokenTime.getMonth() > 0 &&
    currTime.getDay() - tokenTime.getDay() > 0 &&
    currTime.getHours() - tokenTime.getHours() > 12
  ) {
    verify.isExpired = true;
    return verify;
  }

  const verifyFunction = crypto.createVerify('RSA-SHA256');

  const PUB_KEY = fs.readFileSync(__dirname, '/crypto/publicKey.pem', 'utf-8');

  const value = base64url.decode(hash);

  verifyFunction.write(head + '.' + payload);
  verifyFunction.end();

  const isVerify = verifyFunction.verify(PUB_KEY, value, 'base64');

  verify.isTrue = isVerify;

  return verify;
};

export default jwtValidator;
