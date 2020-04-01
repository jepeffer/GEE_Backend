var pool = require("./pool")

module.exports.getUsers = async (req) => {
    if (req.query.username && req.query.password) {
      let values = [req.query.username, req.query.password];
      // If set then limit to only a ticket linked to locations the user has access to

      let query = "SELECT * FROM Users";
      values.push(1);
      
  
      let result = await pool.query(query, values);
      if (result.length) {
        return (result[0]);
      }
  
      return null;
    } else {
      console.error(new Date().toISOString(), req.path, `Cannot get users since request incomplete. Submitted from IP address ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };

  module.exports.registerUser = async (req) => {
    if (req.query.username && req.query.password) {
      let values = [req.query.username, req.query.password];
      console.log("Registering user:" + req.query.username);
      // If set then limit to only a ticket linked to locations the user has access to
       let query = "INSERT INTO Users (username, password) VALUES (" + req.query.username + "," + req.query.password + ")";
      
  
      let result = await pool.query(query);
      if (result.length) {
        return (result[0]);
      }
  
      return null;
    } else {
      console.error(new Date().toISOString(), req.path, `Cannot get users since request incomplete. Submitted from IP address ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };