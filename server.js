const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 11453;

app.listen(port);
app.use(express.static(__dirname + '/hw4_public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/list', function(req, res) {
    res.send(fs.readFileSync('students.json'));
});

app.post('/search', function(req, res) {
    var students = JSON.parse(fs.readFileSync('students.json'));
    var found = Object.keys(students).find((element) => {
        return element == req.body.id;
    });
    if (typeof(found) !== 'undefined' && found) {
        res.send(students[req.body.id]);
    } else {
        res.send('Not found.');
    }
});

app.post('/add', function(req, res) {
    var students = JSON.parse(fs.readFileSync('students.json'));
    var found = Object.keys(students).find((element) => {
        return element == req.body.id;
    });
    if (typeof(found) !== 'undefined' && found) {
        res.send('ID already exist!');
    } else {
        students[req.body.id] = req.body.name;
        fs.writeFile('students.json', JSON.stringify(students), (err)=>{
            if(err){throw err;}
        });
        res.send('Add id ' + req.body.id + ' to database.');
    }
});

app.post('/delete', function(req, res) {
    var students = JSON.parse(fs.readFileSync('students.json'));
    var found = Object.keys(students).find((element) => {
        return element == req.body.id;
    });
    if (typeof(found) !== 'undefined' && found) {
        delete students[req.body.id];
        fs.writeFile('students.json', JSON.stringify(students), (err)=>{
            if(err){throw err;}
        });
        res.send('Delete id ' + req.body.id + ' from database.');
    } else {
        res.send('ID does not exist!');
    }
});
