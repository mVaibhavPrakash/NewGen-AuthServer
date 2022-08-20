import UserProfileExists from './UserProfileExists.js';

const UpdateUserProfile = async (pool, clientData) => {
  try {
    //CHECK account EXISTS or NOT
    const res = UserProfileExists(pool, clientData);
    // QUERY SETUP
    if (res) {
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

      //CONSIDERING ONLY FIELDS WHICH ARE UPDATING
      const data = Object.keys(clientData);

      //CREATING UPDATE QUERY
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
        `xdateupdated=${date}` +
        `where uid_person=${clientData.uid_person}`;
      updateprofile =
        updateprofile +
        `xdateupdated=${date}` +
        `where uid_userprofile=${clientData.uid_userprofile}`;

      // TRANSACTION
      await pool.query('BEGIN');
      await pool.query(updateprofile);
      await pool.query(updateuser);
      await pool.query('COMMIT');

      return { updated: true, status: 201, data: clientData, err: '' };
    } else {
      return {
        updated: false,
        status: 404,
        data: '',
        err: "Profile doesn't exists, kindly create new one",
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

export default UpdateUserProfile;
