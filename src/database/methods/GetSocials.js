export const GetSocials = (pool,clientData) =>{
    try{
        const res = pool.query(`select * from socials where uid_userprofile=${clientData.uid_userprofile}`)
        res.rowCount === 0 ? return {} : return {twitter:res[0].twitter,youtube:res[0].youtube,stackoverflow:res[0].stackoverflow,}
    }
}