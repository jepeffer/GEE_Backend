
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
    
        if (error) throw error;
        console.log("I AM HERE!!");
        for (const key in req.query) {
        console.log(key)
        console.log(req.query[key]);
        }
        pwd = req.query.password;
        username = req.query.username;
        verifyUsers(username, pwd);
        return res.send({ error: false, data: results, message: 'users list.' });
})


function verifyUsers(username, pwd)
{
    con.query('SELECT * FROM GEE_DB.Users', function (error, results, fields) {
        if (results)
        {
            results.foreach (result => console.log(result));
        }
    });
}


con.connect(function(err) {
        if (err) throw err;
    });
   

module.exports = con;