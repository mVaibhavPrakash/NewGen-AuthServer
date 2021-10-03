import crypto from 'crypto';
import passwodHash from '../passwordHash';

const isAuthenticated = (username, pwd, sql) => {
  const res = await sql
    .request()
    .query('select * from [user] where username=username');
  const userObject = res.recordsets[0][0];

  if (userObject) {
    const hash = userObject.hashPwd;
    const salt = userObject.salt;
  }
};
