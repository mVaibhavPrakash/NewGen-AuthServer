import crypto from 'crypto';

const passwordHash = async (password, salt, hash) => {
  try {
    hash = hash || null;
    salt = salt || null;
    if (hash) {
      const newHash = crypto
        .pbkdf2Sync(password, salt, 100000, 16, 'sha512')
        .toString('hex');
      if (hash === newHash) {
        return { isTrue: true };
      } else return { isTrue: false, error: 'Wrong password entered' };
    }

    // Signup Condition
    else {
      salt = crypto.randomBytes(16).toString('hex');
      const newHash = crypto
        .pbkdf2Sync(password, salt, 100000, 16, 'sha512')
        .toString('hex');
      return [salt, newHash];
    }
  } catch (err) {
    console.log(err + 'gagag');
  }
};

export default passwordHash;
