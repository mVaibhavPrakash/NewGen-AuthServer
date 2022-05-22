
import crypto from 'crypto';

export const CreateUserProfile = (pool) => {
  pool.query(`
        CRAETE TABLE IF NOT EXISTS userprofile(
            uid_userprofile PRIMARY KEY NOT NULL,
            uid_person varchar(32) NOT NULL,
            fullname varchar(64) NOT NULL,
            username varchar(32) NOT NULL,
            dateofbirth date NOT NULL,
            bio varchar(150) NOT NULL,
            about varchar(150) NOT NULL,
            CONSTRAINT fk_uid_person
            FOREIGN KEY(uid_person) 
            REFERENCES customers(uid_person)
        )
    `);
};

const UserProfile = async(pool, isProfileCreated ,clientData) => {
    try{
        let err=null;
        if(isProfileCreated){
            err = await updateProfile(pool,clientData)
        } else{
            err = await CreateUserProfile(pool,clientData)
        }
    }catch(err){
        console.log(err)
    }
};

const CreateUserProfile =async (pool,data) =>{
    const id = crypto.randomBytes(16).toString('hex');
    try{
        await pool.query(
            `update Userprofile
            set uid_userprofile=${id},
            uid_person=${data.uid_person},
            username=${data.username}`
        )
    }catch(err){
        console.log(err)
    }
}

const updateProfile = (pool,data) =>{
    try{
        const 
    }catch(err){
        console.log(err)
    }
}