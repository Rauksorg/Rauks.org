/*
Copyright 2013 Thibaut CONSTANT
This file is part of Rauks.org.
 
Rauks.org is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
 
Rauks.org is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with Rauks.org.  If not, see <http://www.gnu.org/licenses/>.
*/

var directory = __dirname + '/public';
var express = require("express"),
    app = express();
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});
app.listen(process.env.PORT, process.env.IP);

//start moongoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://test:test@dharma.mongohq.com:10009/app17028231");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function callback() {
    
    //Mongoose schema
    var systemSchema = mongoose.Schema({
        name: String,
        pagetitle: String,
        title: String,
        text: String
    });
    
    // Mongoose model
    var system = mongoose.model('system', systemSchema);

    // Routeur :
    app.get('/', function(req, res) {
        res.render("home.jade", {
            "pagetitle": "Rauks.org jeu de rôles",
            "title": "Rauks.org jeu de rôles Electropunk"
        });
    });
    app.get('/about', function(req, res) {
        res.render("about.jade", {
            "pagetitle": "Autour du jeu de rôles Rauks.org",
            "title": "Autour du jeu"
        });
    });
    app.get('/system_index', function(req, res) {
        res.render("system_index.jade", {
            "pagetitle": "Système du jeu de rôles Rauks.org",
            "title": "Système de jeu"
        });
    });
    
    // system routeur
    app.get('/system', function(req, res) {
        var system_name = req.query.n;
        system.findOne({
            name: system_name

        }, function(err, foundname) {
            if (err) console.log("name query error");
            if (foundname === null) {
                res.send(404, 'Sorry cant find that!');
            }
            else {
                res.render("system_template.jade", foundname);
            }
        });
    });
    //Handle 404
    app.use(function(req, res, next) {
        res.send(404, 'Sorry cant find that!');
    });
});