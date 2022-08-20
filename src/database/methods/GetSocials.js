export const GetSocials = (pool, uid_userprofile) => {
  try {
    const res = pool.query(
      `select * from socials where uid_userprofile=${uid_userprofile}`
    );
    if (res.rowCount === 0) return {};
    else
      return {
        twitter: res[0].twitter,
        linkedin: res[0].linkedin,
        stackoverflow: res[0].stackoverflow,
        github: res[0].github,
        personal: res[0].personal,
        youtube: res[0].youtube,
      };
  } catch (err) {
    console.log(err);
  }
};
