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
      .input('username', mssql.NVarChar, username)
      .input('salt', mssql.NVarChar, salt)
      .input('hashpwd', mssql.NVarChar, hashpwd)
      .input('firstname', mssql.NVarChar, firstname)
      .input('lastname', mssql.NVarChar, lastname)
      .input('age', mssql.Int, age)
      .input('phone', mssql.Int, phone)
      .query(
        'insert into [user]([username],[salt],[hashpwd],[firstname],[lastname],[age],[phone]) values(@username,@salt,@hashpwd,@firstname,@lastname,@age,@phone)'
      );
    return res;
  } catch (err) {
    return 0;
  }
};
