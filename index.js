
var mysql = require('mysql');
const cors = require('cors');
const db = require('./USER-DB');
var bodyParser = require('body-parser');
var express = require('express'),
app = express(),
port = process.env.PORT || 3002;
app.listen(port);

// No file bombs here
app.use(bodyParser.json({
    limit: '20mb'
    }));

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

app.get('/userstest', cors(), (req, res, next)=> {
    db.getUsers(req, res).then(result => {
  res.send(result);
}, reject => {
  console.error(new Date().toISOString(), req.path, "the query ", req.query, "resulted in: ", reject);
  res.status(500).send("oops");
});
});

app.get('/users', cors(), (req, res, next) => {
        console.log("I AM HERE!!");
        for (const key in req.query) {
        //console.log(key)
       // console.log(req.query[key]);
        }
        pwd = req.query.password;
        username = req.query.username;
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
                    //console.log(row.username)
                    //console.log(row.password)
                  });
                //console.log(results.user);
            }
            console.log("This is flag:" + flag);
            var final_results;
            if (flag === true)
            {
                final_results = 1;
            }
            else
            {
                final_results = 0;
            }
            console.log("THIS IS RESULTS: " + results);
            return res.send({ error: false, data: final_results, message: 'users list.' });
            
        }); 
})

con.connect(function(err) {
        if (err) throw err;
    });
   
module.exports = con;