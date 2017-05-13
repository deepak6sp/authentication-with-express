import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Express-auth-db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connection successful");
});

export default db;

// sequelize.authenticate()
//   .then(function(err) {
//       console.log('Connection has been established successfully.');
//   }, function (err) {
//       console.log('Unable to connect to the database:', err);
//   });
//
//
// export default sequelize;
