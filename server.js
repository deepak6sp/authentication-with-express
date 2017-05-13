import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import {User, newUser, allUsers} from './models/users';


const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json({type: '*/*' }));

app.get('/', (req, res, next) => {
    res.send({
        username: "deepak",
        password: "123456"
    });
});

app.post('/newUser', newUser);

app.get('/allUsers', allUsers);


const port  = process.env.PORT || 4001;
const server =  http.createServer(app);
server.listen(port, () => {
    console.log("server listening on 4001...");
});
