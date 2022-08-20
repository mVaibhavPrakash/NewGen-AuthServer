const CreateSocials = (pool,clientData) =>{
    try{
        const {uid_userprofile,twitter,stackoverflow,youtube,github,linkedin,personal} = clientData
        await pool.query(`BEGIN`)
        await pool.query(`insert into socials(uid_userprofile,twitter,stackoverflow,youtube,github,linkedin,personal,xdateinserted,xdateupdated) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [uid_userprofile,twitter,stackoverflow,youtube,github,linkedin,personal,])
    }catch(err){

    }
}