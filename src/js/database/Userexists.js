import passwordHash from './passwordHash.js';

const Userexists = async (signup, pool, username, password) => {
  try {
    const res = await pool.query(
      'select passwordhash,passwordsalt from users where username=$1',
      [username]
    );
    if (signup === 'signup') {
      if (res.rowCount != 0) {
        return new Promise((resolve, reject) => resolve(true));
      } else {
        const [salt, hash] = await passwordHash(password);
        await pool.query(
          'insert into users(username,passwordhash,passwordsalt,dateupdated,lastupdatereason) values($1,$2,$3,now(),$4)',
          [username, hash, salt, 'Account created']
        );
        return new Promise((resolve, reject) => resolve(false));
      }
    } else {
      if (res.rowCount != 0) {
        const isTrue = await passwordHash(
          password,
          res.rows[0].passwordsalt,
          res.rows[0].passwordhash
        );
        console.log(isTrue);
        return new Promise((resolve, reject) => resolve(isTrue));
      } else return new Promise((resolve, reject) => resolve(false));
    }
  } catch (err) {
    console.log(`An database error occurred ${err}`);
    return new Promise((resolve, reject) => resolve(false));
  }
};

export default Userexists;
