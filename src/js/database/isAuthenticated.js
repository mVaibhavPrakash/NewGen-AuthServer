import User from './user';
import passwordHash from '../passwordHash';

const isAuthenticated = (username, password) => {
  User.findOne({ username: username }).then((data) => {
    let isFalse = false;
    if (data) {
      const hash = data.hash;
      const salt = data.salt;
      return (isFalse = passwordHash(password, salt, hash));
    } else return isFalse;
  });
};
