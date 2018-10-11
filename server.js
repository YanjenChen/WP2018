const express = require('express');
const fs = require('fs');
const app = express();
const port = 11453;

app.listen(port);
app.use(express.static(__dirname + 'hw4_public'));

app.get('/list', function(req, res) {
    res.send(fs.readFileSync('students.json'));
});

app.post('/search', function(req, res) {
    var students = JSON.parse(fs.readFileSync('students.json'));
    var found = Object.keys(students).find((element) => {
        element == req.id;
    });
    if (typeof(found) !== 'undefined' && found) {
        res.send(students[req.id]);
    } else {
        res.send('Not found.');
    }
});

app.post('/add', function(req, res) {
    var students = JSON.parse(fs.readFileSync('students.json'));
    var found = Object.keys(students).find((element) => {
        element == req.id;
    });
    if (typeof(found) !== 'undefined' && found) {
        res.send('ID already exist!');
    } else {
        students[req.id] = req.name;
        fs.writeFile('students.json', JSON.stringify(students));
        res.send('Add id ' + req.id + ' to database.');
    }
});

app.post('/delete', function(req, res) {
    var students = JSON.parse(fs.readFileSync('students.json'));
    var found = Object.keys(students).find((element) => {
        element == req.id;
    });
    if (typeof(found) !== 'undefined' && found) {
        delete students[req.id];
        fs.writeFile('students.json', JSON.stringify(students));
        res.send('Delete id ' + req.id + ' from database.');
    } else {
        res.send('ID does not exist!');
    }
});