var pool = require("./pool")

module.exports.getUsers = async (req) => {
    if (req.query.username && req.query.password) {
      let values = [req.query.username, req.query.password];
      let query = "SELECT * FROM GEE.DB.Users";
  
      // If set then limit to only a ticket linked to locations the user has access to
      if (req.username) {
        query = "SELECT * FROM GEE.DB.Users";
        values.push(1);
      }
  
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
  