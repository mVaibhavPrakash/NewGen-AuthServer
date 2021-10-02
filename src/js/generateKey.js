const crypto = require('crypto');
const fs = require('fs');

const generateKey = () => {
  keypair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,

    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  fs.writeFileSync(__dirname + '/publicKey.pem', keypair.publicKey);
  fs.writeFileSync(__dirname + '/privateKey.pem', keypair.privateKey);
};

generateKey();
