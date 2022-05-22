const Users = async (sql) => {
  const res = await sql.query(`
  CREATE TABLE IF NOT EXISTS users (
    uid_person varchar(32) PRIMARY KEY NOT NULL,
    username varchar(32) NOT NULL UNIQUE,
    firstname varchar(24) NOT NULL,
    isprofilecreated boolean default false,
    hash varchar(32) NOT NULL,
    salt varchar(32) NOT NULL,
    updatereason varchar(64) NOT NULL,
    xdatelastlogin date,
    xdateinserted  date default now(),
    xdateupdated date  default now()
  )
    `);
  return res;
};

export default Users;
