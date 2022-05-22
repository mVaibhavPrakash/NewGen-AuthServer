import passwordHash from './passwordHash.js';
import crypto from 'crypto';

export const em = {
  uid_person: 'uid_person',
  username: 'username',
  firstname: 'firstname',
  isprofilecreated: 'isprofilecreated',
  hash: 'hash',
  salt: 'salt',
  updatereason: 'updatereason',
  xdatelastlogin: 'xdatelastlogin',
  xdateinserted: 'xdateinserted',
  xdateupdated: 'xdateupdated',
  uid_userprofile : 'uid_userprofile',
  fullname : 'fullname',
  dateofbirth : 'dateofbirth',
  bio : 'bio',
  about : 'about'
};

const Userexists = async (signup, pool, username, firstname, password, res) => {
  try {
    const res = await pool.query(
      `select uid_person,firstname,hash,salt from users where ${em.username}=$1`,
      [username]
    );
    if (signup === 'signup') {
      if (res.rowCount != 0) {
        return new Promise((resolve, reject) =>
          resolve({ result: 'This email address is already taken' })
        );
      } else {
        const [salt, hash] = await passwordHash(password);
        const id = crypto.randomBytes(16).toString('hex');
        await pool.query(
          `insert into users(${em.uid_person},${em.username},${em.firstname},${em.hash},${em.salt},${em.updatereason}) values($1,$2,$3,$4,$5,$6)`,
          [id, username, firstname, hash, salt, 'Account created']
        );

        return new Promise((resolve, reject) => resolve({ result: false }));
      }
    } else {
      if (res.rowCount != 0) {
        const result = await passwordHash(
          password,
          res.rows[0].salt,
          res.rows[0].hash
        );
        if (result.result) {
          await pool.query(
            `update users set ${xdatelastlogin}=now() where username=$1`,
            [username]
          );
          return new Promise((resolve, reject) =>
            resolve({
              result: true,
              id: res.rows[0].uid_person,
              firstname: res.rows[0].firstname,
            })
          );
        } else {
          return new Promise((resolve, reject) =>
            resolve({ result: false, data: 'A Database error occurred' })
          );
        }
      } else
        return new Promise((resolve, reject) => resolve({ result: false }));
    }
  } catch (err) {
    console.log(err);
  }
};

export default Userexists;
