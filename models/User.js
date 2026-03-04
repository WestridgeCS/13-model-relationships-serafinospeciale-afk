import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  posts: Number
});

export const User =  mongoose.model('User', userSchema);