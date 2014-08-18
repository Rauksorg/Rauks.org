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
var express = require("express"),
    app = express(),
    oneYear = 31557600000;


app.use(express.compress());
app.use(express.static('./public', {
    maxAge: oneYear
}));
app.use(express.json());
app.use(express.urlencoded());
app.use('/admin', express.basicAuth(process.env.ADMIN_LOGIN, process.env.ADMIN_PSWD));


app.listen(process.env.PORT, process.env.IP);
//
// Routeur simple
app.get('/', function(req, res) {
    res.render("home.jade", {
        "title": "Rauks.org jeu de rôle Electropunk"
    });
});

// 
//start moongoose
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL);
var db = mongoose.connection;
//DB open function
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function callback() {
    var namesSchema = new mongoose.Schema({
        name: String,
        gender: String,
        type: String,
        people: String,
        rand: {
            type: mongoose.Schema.Types.Mixed,
            default: [Math.random(), 0]
        }
    });
    var name = mongoose.model('name', namesSchema);
    name.findOne({
        type: "f",
        rand: {
            $near: [Math.random(), 0]
        }
    }, function(error, result) {
        var respeople = result.people
        console.log(result.name);
        name.findOne({
            type: "l",
            people: respeople,
            rand: {
                $near: [Math.random(), 0]
            }
        }, function(error, result) {
            console.log(result.name);

        });

    });

    //
    //Mongoose schema
    var articleSchema = mongoose.Schema({
        name: String,
        category: String,
        title: String,
        descript: String,
        text: String
    });
    // articleSchema.set('autoIndex', false);
    // 
    // Mongoose model
    var article = mongoose.model('article', articleSchema);
    // db driven routeur function
    var db_driven_route = function(route, title) {
        app.get('/' + route, function(req, res) {
            var article_name = req.query.n;
            var categ = {
                category: route
            };
            if (route == "admin") {
                categ = {};
            }
            if (article_name === undefined) {
                article.find(categ, null, {
                    sort: {
                        title: 1
                    }
                }, function(err, foundarticle) {
                    res.render(route + ".jade", {
                        "foundarticle": foundarticle,
                        "title": title
                    });
                });
            }
            else {
                article.findOne({
                    name: article_name
                }, function(err, foundarticle) {
                    if (err) console.log("name query error");
                    if (foundarticle === null) {
                        res.send(404, 'Sorry cant find that!');
                    }
                    else {
                        // foundname render page title, title and text
                        res.render(route + "_page.jade", foundarticle);
                    }
                });
            }
        });
    };
    // 
    // declare routes
    db_driven_route("about", "Pourquoi nous avons développé Rauks.org ?");
    db_driven_route("system", "Système de jeu");
    db_driven_route("background", "Univers du jeu");
    db_driven_route("tools", "Outils pour le jeu");
    db_driven_route("admin", "Administration");


    app.get('/namegen', function(req, res) {
        res.render("namegen.jade");
    });

    // 
    // route receiving texte modifications
    app.post('/admin/ajax', function(req, res) {
        // to create new article
        if (req.body.newarticle == 1) {
            var createarticle = new article({
                name: "nouveau",
                category: "nouveau",
                title: "Nouveau",
                descript: "Description",
                text: "<h2>Titre</h2><p>Paragraphe</p>"
            });
            createarticle.save(function(err) {
                if (err) return console.log(err);
                res.send(200);
            });
        }
        else {
            //update articles
            article.update({
                "_id": req.body._id
            }, {
                "text": req.body.text,
                "category": req.body.category,
                "name": req.body.name,
                "descript": req.body.descript,
                "title": req.body.title
            }, function(err, numberAffected, raw) {
                if (err) return console.log(err);
                res.send(200);
            });
        }
    });
});
//
//Handle 404
app.use(function(req, res, next) {
    res.send(404, 'Sorry cant find that!');
});