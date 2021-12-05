import mongoose from 'mongoose';
import user from '../database/user';
import passwordHash from '../passwordHash';

const signup = (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const [salt, hash] = passwordHash(password);

  let newUser;
  user.findOne({username:username}).then((data) =>{
      
      if(data)
      res.status(409).json({error:'User already exists, please try with new email id'})
      
      newUser =new user({_id = username,
        name = name,
        username = username,
        salt = salt,
        hash = hash
        })
  })

  newUser.save().then(()=>console.log(`User ${username} created sucessfully`));

};
