var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static('public'));
app.use(express.json());

app.get('/', function (req, res) { 
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', function (req, res) { 
    var userData = req.body;
    // console.log(`this is the user data: ${userData}`);
    var user = {
        email: userData.email,
        password: userData.password
    };

    // console.log(`this is the user EMAIL : ${user.email}`);
    // console.log(`this is the user PASSWORD : ${user.password}`);
    
    fs.readFile('./db.txt', 'utf-8', function (err, data) {
        // if (err) {
        //     console.log(err);
        //     return;
        // }

        if (data !== "") {
            var users = JSON.parse(data);
            console.log(`this is parsed data: ${users}`);
            var found = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === user.email && users[i].password === user.password) {
                    found = true;
                    break;
                }
            }

            if (found) {
                res.send("1");
            }
            else {
                res.send("0");
            }
        }

        else
            res.send("0");

        // console.log(`this is the data: ${data}`);
    });
});

app.listen(3000, function () { 
    console.log('Example app listening on port 3000!');
});