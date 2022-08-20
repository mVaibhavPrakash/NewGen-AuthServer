const UserProfileExists = async (pool, clientData) => {
  try {
    const res = await pool.query(
      `select uid_userprofile from userprofile where uid_userprofile=$1`,
      [clientData.uid_userprofile]
    );
    if (res.rowCount === 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return {
      created: false,
      status: 500,
      data: '',
      err: `${err} : internel error`,
    };
  }
};

export default UserProfileExists;
