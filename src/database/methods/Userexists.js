import passwordHash from './passwordHash.js';
import crypto from 'crypto';

const Userexists = async (
  signup,
  pool,
  username,
  fullname,
  password,
  email
) => {
  try {
    const queryResult = await pool.query(
      `select uid_person,fullname,hash,salt,isprofilecreated from users where username=$1`,
      [username]
    );

    const isUserExists = queryResult.rowCount === 0 ? false : true;

    if (signup === 'signup') {
      if (isUserExists) {
        return {
          isTrue: true,
          error: 'This email address is already taken',
        };
      } else {
        const [salt, hash] = await passwordHash(password);
        const id = crypto.randomBytes(16).toString('hex');
        const currentDate = new Date();

        let date =
          currentDate.getFullYear() +
          '-' +
          currentDate.getMonth() +
          '-' +
          currentDate.getDate() +
          ' ' +
          currentDate.getHours() +
          ':' +
          currentDate.getMinutes() +
          ':' +
          currentDate.getSeconds();

        await pool.query(
          `insert into users(uid_person,email,username,fullname,hash,salt,updatereason,xdateinserted,xdateupdated) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
          [
            id,
            email,
            username,
            fullname,
            hash,
            salt,
            'Account created',
            date,
            date,
          ]
        );

        return { isTrue: false, error: '' };
      }
    } else {
      if (isUserExists) {
        const result = await passwordHash(
          password,
          queryResult.rows[0].salt,
          queryResult.rows[0].hash
        );
        if (result.isTrue) {
          await pool.query(
            `update users set xdatelastlogin=CURRENT_TIMESTAMP where username=$1`,
            [username]
          );
          return {
            isTrue: true,
            id: queryResult.rows[0].uid_person,
            fullname: queryResult.rows[0].fullname,
            isProfileCreated: queryResult.rows[0].isprofilecreated,
            error: '',
          };
        } else return { isTrue: false, error: 'A Database error occurred' };
      } else return { isTrue: false, error: "User doesn't exists" };
    }
  } catch (err) {
    console.log(err);
  }
};

export default Userexists;
