import express from 'express';
import passport from 'passport';
import passportService from './services/passport';
const router = express.Router();

import SignUp from './controller/auth';


router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.send('you are in root');
});

router.post('/signup', SignUp);
// router.post('/newUser', newUser);
//
// AuthRoutes.get('/allUsers', allUsers);


export default router;
