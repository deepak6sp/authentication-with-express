import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import router from './router';

//app
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json({type: '*/*' }));

//routes
app.use(router);
app.use(passport.initialize());

//server
const port  = process.env.PORT || 4001;
const server =  http.createServer(app);
server.listen(port, () => {
    console.log("server listening on 4001...");
});
