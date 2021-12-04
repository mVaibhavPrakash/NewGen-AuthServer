import { Schema } from 'mongoose';

const User = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  username: { type: String, required: true, immutable: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  dateinserted: {
    type: String,
    default: new Date().toString(),
    immutable: true,
  },
  dateupdated: { type: String, default: new Date().toString() },
});

export default User;
