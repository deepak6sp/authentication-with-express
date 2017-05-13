import db from './db';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.pre('save', function (next) {
  let User = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(User.password, salt, function(err, hash) {
        // Store hash in your password DB.
        User.password = hash;
        next();
    });
  });
})

let User = mongoose.model('User', userSchema);

export default User;
