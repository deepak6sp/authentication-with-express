import jwt from 'jwt-simple';
import config from '../jwt';
import User from '../models/users';

const token = (user) => {
  const timeStamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timeStamp}, config.secret);
}

const SignUp = (req, res, next) => {
  let email = req.body.email;
  let password =  req.body.password;

  if(!email || !password) {
    return res.status(422).send('Please provide both email and password');
  }

  User.findOne({email: email}, (err, existingUser) => {
    if(err) { return next(err); }

    if(existingUser) {
     return res.status(422).send('Email already exist');
   } else {
     const user = new User({
       email: email,
       password: password
     });
     user.save((err) => {
       if(err) { return next(err)};
       res.json({ token: token(user)})
     });
   }

  });
};

export default SignUp
