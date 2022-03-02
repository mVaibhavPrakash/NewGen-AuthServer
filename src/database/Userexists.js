import passwordHash from './passwordHash.js';

const Userexists = async (signup, pool, username, firstname, password) => {
  try {
    const res = await pool.query(
      'select firstname,passwordhash,passwordsalt from users where username=$1',
      [username]
    );
    if (signup === 'signup') {
      if (res.rowCount != 0) {
        return new Promise((resolve, reject) => resolve(true));
      } else {
        const [salt, hash] = await passwordHash(password);

        await pool.query(
          'insert into users(username,firstname,passwordhash,passwordsalt,updatereason,updatedat) values($1,$2,$3,$4,$5,now())',
          [username, firstname, hash, salt, 'Account created']
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
        await pool.query(
          'update users set lastloginat=now() where username=$1',
          [username]
        );
        return new Promise((resolve, reject) =>
          resolve({ isTrue: isTrue, firstname: res.rows[0].firstname })
        );
      } else
        return new Promise((resolve, reject) => resolve({ isTrue: false }));
    }
  } catch (err) {
    console.log(`An database error occurred ${err}`);
    return new Promise((resolve, reject) => resolve(false));
  }
};

export default Userexists;
