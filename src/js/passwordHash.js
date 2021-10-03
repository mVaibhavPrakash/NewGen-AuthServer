import crypto from 'crypto';

const passwordHash = (password, hash = null, salt = null) => {
  if (hash) {
    const newHash = crypto
      .pbkdf2(password, salt, 100000, 64, 'sha512')
      .toString('hex');

    if (hash === newHash) {
      return true;
    }

    return false;
  } else {
    const salt = crypto.randomBytes(32).toString('hex');

    const newHash = crypto
      .pbkdf2(password, salt, 100000, 64, 'sha512')
      .toString('hex');

    return { newHash, salt };
  }
};

module.exports = passwordHash;
