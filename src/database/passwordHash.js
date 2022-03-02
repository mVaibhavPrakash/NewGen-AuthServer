import crypto from 'crypto';

const passwordHash = async (password, salt, hash) => {
  hash = hash || null;
  salt = salt || null;
  if (hash) {
    const newHash = crypto
      .pbkdf2Sync(password, salt, 100000, 16, 'sha512')
      .toString('hex');
    if (hash === newHash) {
      return new Promise((res, rej) => res(true));
    }
    return new Promise((res, rej) => res(false));
  } else {
    salt = crypto.randomBytes(16).toString('hex');
    const newHash = crypto.pbkdf2Sync(password, salt, 100000, 16, 'sha512');

    return new Promise((res, rej) => res([salt, newHash.toString('hex')]));
  }
};

export default passwordHash;
