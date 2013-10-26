// Copyright 2013 Thibaut CONSTANT
// This file is part of Rauks.org.
// 
//     Rauks.org is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
// 
//     Rauks.org is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
// 
//     You should have received a copy of the GNU General Public License
//     along with Rauks.org.  If not, see <http://www.gnu.org/licenses/>.
// 
// "use strict";
var directory = __dirname + '/public';
var express = require("express"),
    app = express(),
    server = require('http').createServer(app);
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});
server.listen(process.env.PORT, process.env.IP);
// 
// Routeur :
app.get('/', function(req, res) {
    res.sendfile( directory + "/home.html");
});
app.get('/about', function(req, res) {
    res.sendfile(directory + "/about.html");
});
app.get('/rules', function(req, res) {
    res.sendfile(directory + "/rules.html");
});
// Rules routeur
app.get('/rules/character', function(req, res) {
    res.sendfile(directory + "/rules/character.html");
});
app.get('/rules/skills', function(req, res) {
    res.sendfile(directory + "/rules/skills.html");
});
app.get('/rules/dices', function(req, res) {
    res.sendfile(directory + "/rules/dices.html");
});
app.get('/rules/fighting', function(req, res) {
    res.sendfile(directory + "/rules/fighting.html");
});
app.get('/rules/melee', function(req, res) {
    res.sendfile(directory + "/rules/melee.html");
});
app.get('/rules/rerolls', function(req, res) {
    res.sendfile(directory + "/rules/rerolls.html");
});


//Handle 404
app.use(function(req, res, next){
  res.send(404, 'Sorry cant find that!');
});
