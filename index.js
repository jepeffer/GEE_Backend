
var mysql = require('mysql');
const cors = require('cors');
var express = require('express'),
app = express(),
port = process.env.PORT || 3001;
app.listen(port)
console.log('open on port: ' + port);

var con = mysql.createConnection({
    host: "localhost",
    user: "foo",
    password: "bar"
    });
   
app.get('/', function(req, res){
    res.send("Please use the API endpoints, try api/getusers");
})

users = require ('./models/user');

/*app.get('/users', function (req, res) {
    con.query('SELECT * FROM GEE_DB.Users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
*/
app.get('/users', cors(), (req, res, next) => {
    con.query('SELECT * FROM GEE_DB.Users', function (error, results, fields) {
        if (error) throw error;
        console.log("This is req: " + req.query);
        pwd;
        username;
        for (const key in req.query) {
            console.log(key, req.query[key])
             if (key == 2)
             {
                 pwd = req.query[key];
             }   
             else{
                    username = req.query[key];
             }
          }
          console.log("This is parameters: " + pwd + " " + username);
        return res.send({ error: false, data: results, message: 'users list.' });
    });
})


verifyUser(username, password)
{

}


con.connect(function(err) {
        if (err) throw err;
    });
   

module.exports = con;

con.query("SELECT * FROM GEE_DB.Users", function (err, res) {
            
    if(err) {
        console.log("error: ", err);
            }
    else{
        console.log(res);
    }
        })     