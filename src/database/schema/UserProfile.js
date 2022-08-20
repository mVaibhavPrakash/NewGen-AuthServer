export const CreateUserProfileTable = async (pool) => {
  const res = await pool.query(`
        CREATE TABLE IF NOT EXISTS userprofile(
            uid_userprofile varchar(32) PRIMARY KEY NOT NULL,
            uid_person varchar(32) NOT NULL,
            fullname varchar(64) NOT NULL,
            username varchar(32) NOT NULL UNIQUE,
            dateofbirth date NOT NULL,
            bio varchar(150),
            about varchar(150),
            tech varchar(150),
            socials varchar(256),
            email varchar(64) NOT NULL UNIQUE,
            xdateinserted date DEFAULT CURRENT_TIMESTAMP,
            xdateupdated date DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_uid_person
            FOREIGN KEY(uid_person) 
            REFERENCES users(uid_person)
        )
    `);
  return res;
};
