var pool = require("./pool")

module.exports.getUsers = async (req) => {
    if (req.query.username && req.query.password) {
      let values = [req.query.username, req.query.password];
      // If set then limit to only a ticket linked to locations the user has access to

      let query = "SELECT * FROM Users";
      
  
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
    if (req.query.username && req.query.password && req.query.email) {
      console.log("Registering user:" + req.query.username);
      let query = "SELECT * FROM Users WHERE username = '" + req.query.username +"' OR email = '" + req.query.email + "'";
      let result = await pool.query(query);
      if (result.length) // User is already taken!
      {
        return "2";
      }
      else{
      let query2 = "INSERT INTO Users (username, password, email) VALUES ('" + req.query.username + "', '" + req.query.password + "','" + req.query.email + "')";
      let result2 = await pool.query(query2);
      return "1"; // All was added correctly.
      }
    } else {
      console.error(new Date().toISOString(), req.path, `Cannot get users since request incomplete. Submitted from IP address ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };

  module.exports.changePassword = async (req) => {
    if (req.query.username && req.query.password) {
      console.log("Registering user:" + req.query.username);

      let query2 = "INSERT INTO Users (username, password) VALUES ('" + req.query.username + "', '" + req.query.password + "','" + req.query.email + "')";
      let result2 = await pool.query(query2);
      return "1"; // All was added correctly.
      
    } else {
      console.error(new Date().toISOString(), req.path, `Cannot get users since request incomplete. Submitted from IP address ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };

  module.exports.search = async (req) => {
    if (req.query.subject)
    {
      console.log("Subject found!")
    }
    if (req.query.keywords) {
      console.log("Keyword found!")
      return "1"; // All was added correctly.
      
    } 
    
    else {
      console.error(new Date().toISOString(), req.path, `Search result was incomplete ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };

  