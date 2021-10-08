import crypto from 'crypto';

const passwordHash = (password, salt, hash) => {
  hash = hash || null;
  salt = salt || null;
  if (hash) {
    const newHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');

    if (hash === newHash) {
      return true;
    }
    return false;
  } else {
    salt = crypto.randomBytes(32).toString('hex');
    const newHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');

    return [salt, newHash.toString('hex')];
  }
};

export default passwordHash;
