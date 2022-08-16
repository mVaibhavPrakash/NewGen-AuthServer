const Users = async (sql) => {
  const res = await sql.query(`
  CREATE TABLE IF NOT EXISTS users (
    uid_person varchar(32) PRIMARY KEY NOT NULL,
    email varchar(64) NOT NULL UNIQUE,
    username varchar(32) NOT NULL UNIQUE,
    fullname varchar(24) NOT NULL,
    isprofilecreated boolean default false,
    hash varchar(32) NOT NULL,
    salt varchar(32) NOT NULL,
    updatereason varchar(64) NOT NULL,
    xdatelastlogin timestamp,
    xdateinserted  timestamp NOT NULL,
    xdateupdated timestamp NOT NULL
  )
    `);
  return res;
};

export default Users;
