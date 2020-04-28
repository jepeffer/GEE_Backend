var pool = require("./pool")

module.exports.getUsers = async (req) => {
    if (req.query.username && req.query.password) {
      let values = [req.query.username, req.query.password];
      // If set then limit to only a ticket linked to locations the user has access to

      let query = "SELECT userid, username FROM Users WHERE username = '" + req.query.username + "'";
      
      let result = await pool.query(query, values);
      if (result.length) 
      {
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
    var file = `/root/Resources/test.txt`;
    var r  = "";
    if (req.query.subject)
    {
      r = r + "Subject Found,";
      console.log("Subject found!");
    }
    if (req.query.gradeLevel)
    {
      r = r + "Grade Level Found,";
      console.log("Grade Level found!");
    }
    if (req.query.contentType)
    {
      r = r + "Content Type Found,";
      console.log("ContentType found!");
    }
    if (req.query.includes)
    {
      r = r + "Includes Found,";
      console.log("ContentType found!");
    }
    if (req.query.keywords) {
      r = r + "Keyword found Found";
      console.log("Keyword found!");
      return r; // All was added correctly.
    } 
    
    else {
    return file;
    }
  };

  module.exports.upload = async (req) => {
    var r  = ""
    if (req.query.fileTitle)
    {
      r = r + "File Title Found,";
      console.log("fileTitle found!")
    }
    if (req.query.tags)
    {
      r = r + "Tags Found,";
      console.log("Tags found!")
    }
    if (req.query.includes)
    {
      r = r + "Includes found";
      console.log("Includes found!")
    }
    if (req.query.contentDescription) {
      r = r + "Content Description";
      console.log("contentDescription found!")
      return r; // All was added correctly.
    } 
    
    else {
      console.error(new Date().toISOString(), req.path, `Search result was incomplete ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };

  