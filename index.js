
var mysql = require('mysql');
const cors = require('cors');
var express = require('express'),
app = express(),
port = process.env.PORT || 3002;
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
        console.log("I AM HERE!!");
        for (const key in req.query) {
        //console.log(key)
       // console.log(req.query[key]);
        }
        pwd = req.query.password;
        username = req.query.username;
        results = verifyUsers(username, pwd);
        return res.send({ error: false, data: results, message: 'users list.' });
})


function verifyUsers(username, pwd)
{
    flag = false;
    con.query('SELECT * FROM GEE_DB.Users', function (error, results, fields) {
        if (results)
        {
            flag = false;
            Object.keys(results).forEach(function(key) {
                var row = results[key];
                if (row.username === username && row.password === pwd)
                {
                    flag = true;
                }
                console.log(row.username)
                console.log(row.password)
              });
            //console.log(results.user);
        }
        console.log("This is flag:" + flag);
        return flag;
    });
}


con.connect(function(err) {
        if (err) throw err;
    });
   

module.exports = con;