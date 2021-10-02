import crypto from 'crypto';
import fs from 'fs';

const generateKey = () => {
  const keypair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,

    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  fs.writeFileSync('../crypto' + '/publicKey.pem', keypair.publicKey);
  fs.writeFileSync('../crypto' + '/privateKey.pem', keypair.privateKey);
};

generateKey();
