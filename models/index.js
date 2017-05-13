import Sequelize from 'sequelize';

var sequelize = new Sequelize('UsersAuth', 'root', '', {
    dialect:'mysql',
    host: 'localhost'
});


sequelize.authenticate()
  .then(function(err) {
      console.log('Connection has been established successfully.');
  }, function (err) {
      console.log('Unable to connect to the database:', err);
  });


export default sequelize;
