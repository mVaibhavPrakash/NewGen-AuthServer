import crypto from 'crypto';
import pg from 'pg'


export const CreateUserProfileTable = async (pool) => {
  pool.query(`
        CREATE TABLE IF NOT EXISTS userprofile(
            uid_userprofile PRIMARY KEY NOT NULL,
            uid_person varchar(32) NOT NULL,
            fullname varchar(64) NOT NULL,
            username varchar(32) NOT NULL UNIQUE,
            dateofbirth date NOT NULL,
            bio varchar(150),
            about varchar(150),
            tech varchar(200),
            socials varchar(500),
            email varchar(64) NOT NULL UNIQUE,
            xdateinserted date DEFAULT CURRENT_TIMESTAMP,
            xdateupdated date DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_uid_person
            FOREIGN KEY(uid_person) 
            REFERENCES customers(uid_person)
        )
    `);
};

const CreateUserProfile = async (pool, clientData) => {
  try {
    const id = crypto.randomBytes(16).toString('hex');
    const value = true;
    const {
      uid_person,
      fullname,
      username,
      dateofbirth,
      bio,
      tech,
      about,
      socials,
      email,
    } = clientData;

    //TRANSACTION
    await pool.query('BEGIN');
    const res = await pool.query(
      `insert into userprofile(uid_userprofile,uid_person,fullname,username,dateofbirth,bio,about,tech,socials,email,xdateinserted)
    values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        id,
        uid_person,
        fullname,
        username,
        dateofbirth,
        bio,
        about,
        tech,
        socials,
        email,
      ]
    );
    await pool.query(
      `update users set isprofilecreated=${value}, updatereason='Profile created', xdateupdated=CURRENT_TIMESTAMP`
    );
    await pool.query('COMMIT');

    return { created: true, status: 201, data: clientData, err: '' };
  } catch (err) {
    await pool.query('ROLLBACK');
    return {
      created: false,
      status: 500,
      data: '',
      err: `${err} : internel error`,
    };
  }
};

const UpdateUserProfile = async (pool, clientData) => {
  try {
    // QUERY SETUP
    const data = Object.keys(clientData);
    let updateuser = `update users set`;
    let updateprofile = `update Userprofile set`;
    for (let i = 0; i < data.length; i++) {
      if (
        data[i] === 'username' ||
        data[i] === 'fullname' ||
        data[i] === 'email'
      ) {
        updateuser = updateuser + `${data[i]}=${clientData.data[i]}`;
      }
      updateprofile = updateprofile + `${data[i]}=${clientData.data[i]}`;
    }
    updateuser =
      updateuser +
      `xdateupdated=CURRENT_TIMESTAMP` +
      `where uid_person=${clientData.uid_person}`;
    updateprofile =
      updateprofile +
      `xdateupdated=CURRENT_TIMESTAMP` +
      `where uid_userprofile=${clientData.uid_userprofile}`;

    // TRANSACTION
    await pool.query('BEGIN');
    await pool.query(updateprofile);
    await pool.query(updateuser);
    await pool.query('COMMIT');

    return { created: true, status: 201, data: clientData, err: '' };
  } catch (err) {
    await pool.query('ROLLBACK');
    return {
      created: false,
      status: 500,
      data: '',
      err: `${err} : internel error`,
    };
  }
};

export const UserProfile = async (pool, isProfileCreated, clientData) => {
  try {
    let result = null;
    if (isProfileCreated) {
      result = await UpdateUserProfile(pool, clientData);
    } else {
      result = await CreateUserProfile(pool, clientData);
    }
    return result;
  } catch (err) {
    return {
      created: false,
      status: 500,
      data: '',
      err: `${err} : internel error`,
    };
  }
};
