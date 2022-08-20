import crypto from 'crypto';
import UserProfileExists from './UserProfileExists.js';

const CreateUserProfile = async (pool, clientData) => {
  try {
    //CHECK account EXISTS or NOT
    const res = UserProfileExists(pool, clientData);

    // QUERY to Create Profile
    if (!res) {
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
          date,
          date,
        ]
      );
      await pool.query(
        `update users set isprofilecreated=${value}, updatereason='Profile created', xdateupdated=${date}`
      );
      await pool.query('COMMIT');

      return { created: true, status: 201, data: clientData, err: '' };
    } else {
      return {
        created: false,
        status: 400,
        data: '',
        err: 'Profile already exists',
      };
    }
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

export default CreateUserProfile;
