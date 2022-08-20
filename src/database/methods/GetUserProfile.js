import { GetSocials } from './GetSocials';

const GetUserProfile = async (pool, clientData) => {
  try {
    const res = await pool.query(
      `select * from userprofile where uid_userprofile=$1`,
      [clientData.uid_userprofile]
    );
    if (queryResult.rowCount !== 0) {
      const socials = GetSocials(ppol, clientData.uid_userprofile);
      return {
        exists: true,
        status: 201,
        data: { ...res.row[0], socials },
        err: '',
      };
    } else
      return {
        exists: false,
        status: 500,
        data: '',
        err: "Profile doesn't exists, kindly create new one",
      };
  } catch (err) {
    return {
      exists: unknown,
      status: 500,
      data: '',
      err: `${err} : internel error`,
    };
  }
};

export default GetUserProfile;
