import Sequelize from 'sequelize';
import sequelize from './index';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

let User = sequelize.define('users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  id:{type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    },
    instanceMethods: {
        validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
});

var newUser = function (req, res){
    console.log("newuser called");
    User.findOne({where:{ username: req.body.username }})
        .then(function (user) {
          if(!user){
            User.create({
              username: req.body.username,
              password: req.body.password
            })
            .then(function(user){
                  var myToken = jwt.sign({ user: user.id },
                                          'secret',
                                         { expiresIn: 24 * 60 * 60 });
                  res.send(200, {'token': myToken,
                                 'userId':    user.id,
                                 'username': user.username });
            });
          } else {
            res.status(404).json('Username already exist!');
          }
        })
        .catch(function (err) {
          res.send('Error creating user: ', err.message);
        });
};

let allUsers = function (req, res) {
    User.findAll().then(function(user){
        res.send(user);
    });
}

export {
    User,
    newUser,
    allUsers
}
