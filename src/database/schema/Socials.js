export const CreateSocialsTable = async (pool) => {
  const res = await pool.query(`
          CREATE TABLE IF NOT EXISTS socials(
              uid_userprofile varchar(32) PRIMARY KEY NOT NULL,
              twitter varchar(64),
              stackoverflow varchar(64),
              youtube varchar(64),
              github varchar(64),
              linkedin varchar(64),
              personal varchar(64),
              xdateinserted date DEFAULT CURRENT_TIMESTAMP,
              xdateupdated date DEFAULT CURRENT_TIMESTAMP,
              CONSTRAINT fk_uid_userprofile
              FOREIGN KEY(uid_userprofile) 
              REFERENCES userprofile(uid_userprofile)
          )
      `);
  return res;
};
