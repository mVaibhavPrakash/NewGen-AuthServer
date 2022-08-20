import { query } from 'express';

export const UpdateSocials = (pool, clientData, uid_userprofile, date) => {
  try {
    const data = Object.keys(clientData);

    //CREATING UPDATE QUERY
    let updateValues = `update socials set`;
    for (let i = 0; i < data.length; i++)
      updateValues = updateValues + ` ${data[i]}=${clientData.data[i]}`;
    updateValues =
      updateValues +
      ` xdateupdated=${date} where uid_userprofile=${uid_userprofile}`;

    pool.query('BEGIN');
    pool.query(updateValues);
    pool.query('COMMIT');
  } catch (err) {
    pool.query('ROLLBACK');
  }
};
