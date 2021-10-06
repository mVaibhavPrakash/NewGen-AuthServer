import mssql from 'mssql';
export const isValidUser = async (sql, username) => {
  try {
    const objectset = await sql
      .request()
      .query(
        `select username,salt,hashpwd from [user] where username =${username}`
      );
    if (objectset.recordset[0]) {
      return objectset.recordset[0];
    }

    return null;
  } catch (err) {
    return false;
  }
};

export const createUser = async (
  sql,
  username,
  salt,
  hashpwd,
  firstname,
  lastname,
  age,
  phone
) => {
  try {
    const res = await sql
      .request()
      .input('username', username)
      .input('salt', salt)
      .input('hashpwd', hashpwd)
      .input('firstname', firstname)
      .input('lastname', lastname)
      .input('age', age)
      .input('phone', phone)
      .query(
        'insert into [user]([username],[salt],[hashpwd],[firstname],[lastname],[age],[phone]) values(@username,@salt,@hashpwd,@firstname,@lastname,@age,@phone)'
      );
    return res;
  } catch (err) {
    return err;
  }
};
