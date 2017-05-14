import express from 'express';
import passport from 'passport';
import passportService from './services/passport';
const router = express.Router();

import {SignUp, SignIn} from './controller/auth';


router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.send('you are in root');
});

router.post('/signup', SignUp);
router.post('/signin', passport.authenticate('local', { session: false }), SignIn);
// router.post('/newUser', newUser); passport.authenticate('local', { session: false }),
//
// AuthRoutes.get('/allUsers', allUsers);


export default router;
