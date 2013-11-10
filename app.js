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
if (process.env.C9_PROJECT) {
    require('./private.js');
}
var express = require("express"),
    app = express();
app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
});
app.use('/admin',express.basicAuth(process.env.ADMIN_LOGIN, process.env.ADMIN_PSWD));
app.listen(process.env.PORT, process.env.IP);
//article_route

//start moongoose
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
//Mongoose schema
var articleSchema = mongoose.Schema({
    name: String,
    pagetitle: String,
    title: String,
    text: String
});
// Mongoose model
var article = mongoose.model('article', articleSchema);
db.once('open', function callback() {
    // db driven routeur

 app.get('/system', function (req, res) {
        var system_name = req.query.n;
        if (system_name === undefined) {
            article.find({}, {
                title: 1,
                name: 1,
                _id: 0
            }, function (err, foundarticle) {
                res.render("system_list.jade", {
                    "foundarticle": foundarticle,
                    "title": "Système de jeu",
                    "pagetitle": "Système de jeu"
                });
            });
        } else {
            article.findOne({
                name: system_name
            }, function (err, foundname) {
                if (err) console.log("name query error");
                if (foundname === null) {
                    res.send(404, 'Sorry cant find that!');
                } else {
                    // foundnam render page title, title and text
                    res.render("system_page.jade", foundname);
                }
            });
        }
    });
app.get('/admin', function (req, res) {
        //Register the get parameter
        var system_name = req.query.n;
        //If the page is the root of system
        if (system_name === undefined) {
            //Find the list of the articles
            article.find({}, {
                title: 1,
                name: 1,
                _id: 0
            }, function (err, foundarticle) {
                res.render("admin_list.jade", {
                    "foundarticle": foundarticle,
                    "title": "Administration",
                    "pagetitle": "Administration"
                });
            });
        } else {
            //Find the article
            article.findOne({
                name: system_name
            }, function (err, foundname) {
                if (err) console.log("name query error");
                // If there is no article found
                if (foundname === null) {
                    res.send(404, 'Sorry cant find that!');
                    // render the found article
                } else {
                    res.render("admin_page.jade", foundname);
                }
            });
        }
    });
    app.post('/admin/ajax', function (req, res) {
        article.update({
            _id: req.body._id
        }, {
            $set: {
                text: req.body.text
            }
        }, callback);
        res.send(200);
    });
});
// Routeur :
app.get('/', function (req, res) {
    res.render("home.jade", {
        "pagetitle": "Rauks.org jeu de rôles Electropunk",
        "title": "Rauks.org jeu de rôles Electropunk"
    });
});
app.get('/about', function (req, res) {
    res.render("about.jade", {
        "pagetitle": "Autour du jeu de rôles Rauks.org",
        "title": "Pourquoi nous avons développé Rauks.org ?"
    });
});
//Handle 404
app.use(function (req, res, next) {
    res.send(404, 'Sorry cant find that!');
});