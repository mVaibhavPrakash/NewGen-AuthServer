export const GetSocials = (pool, uid_userprofile) => {
  try {
    const res = pool.query(
      `select * from socials where uid_userprofile=${uid_userprofile}`
    );
    if (res.rowCount === 0) return {};
    else
      return {
        twitter: res[0].twitter,
        stackoverflow: res[0].stackoverflow,
        youtube: res[0].youtube,
        github: res[0].github,
        linkedin: res[0].linkedin,
        personal: res[0].personal,
      };
  } catch (err) {
    console.log(err);
  }
};
