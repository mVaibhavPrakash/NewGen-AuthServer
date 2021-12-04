import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';
import User from './user';

dotenv.config({ silent: process.env.NODE_ENV === 'development' });

function createConnection() {
  mongoose.connect(process.env.DB_API);
}

createConnection();

export const user = new Model('User', User);
