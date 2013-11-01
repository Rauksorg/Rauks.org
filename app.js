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
    app = express(),
    server = require('http').createServer(app);
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});
server.listen(process.env.PORT, process.env.IP);
// 
// Routeur :
app.get('/', function(req, res) {
    res.render("home.jade", {"title":"Rauks.org jeu de rôles"});
});
app.get('/about', function(req, res) {
    res.render("about.jade", {"title":"Autour du jeu de rôles Rauks.org"});
});
app.get('/system', function(req, res) {
    res.render("systemindex.jade", {"title":"Système du jeu de rôles Rauks.org"});
});
// system routeur
app.get('/system/character', function(req, res) {
    res.render("systemtemplate.jade",{"title":"Création d’un personnage","text":"<h1></h1><h2>Choix de la civilité</h2><p>Il faut commencer par déterminer la race et l'ethnie d’un personnage, ainsi que son nom et son sexe. De base, un personnage est un commun.</p><p>Les personnages sont également des méta-humain ayant conscience de leur état.</p><h2>Choix des caractéristiques</h2><p>Il faut répartir 18 points dans les 6 caractéristiques du personnage :</p><ul><li><p>Le physique</p></li><li><p>La perception</p></li><li><p>L’intelligence</p></li><li><p>Le charisme</p></li><li><p>Le corps à corps</p></li><li><p>Les relances</p></li></ul><p>Chaque caractéristique peut aller de 2 à 4. </p><p>2 représente un personnage faible, 3 un personnage normal, 4 un personnage fort.</p><h2>Détermination des scores</h2><p>La détermination des scores est simple :</p><ul><li><p>La vitesse est fixée à 5 étant donné qu’il est un humanoïde</p></li><li><p>Son armure est fixée à 7 étant donné qu’il est un humanoïde</p></li><li><p>Le nombre réel de ses relances est déterminé par “Relance multiplié par 3”</p></li></ul><h2>Choix des compétences</h2><p>Le Joueur choisi les 5 compétences de son personnage. Ces compétences facilitent des jet de dés ou en rend possible d’autres.</p><h2>Choix du sort</h2><p>Le MJ propose un sort qui soit utile et cohérent avec le personnage créé. Pour aider le MJ dans son choix, le joueur peut décrire son personnage et la façon dont il se l’imagine</p><h2>Attribution de l’équipement</h2><p>Le MJ donne un peu d’équipement au personnage, en accord avec ses compétences.</p><p>Les personnages peuvent un nombre différente d’objet en fonction de l’armure qu’ils ont sur eux en plus d’objets qu’ils pourraient porter avec leurs bras.</p><h2>Évolution du personnage</h2><p>Les caractéristiques, compétences et sorts du personnages sont définis au début du jeu et n’ont pas vocation à évoluer. Certains réajustements peuvent éventuellement être fait en accord avec le MJ, si une compétence ne représente plus vraiment le personnage tel qu’il a évolué afin de la remplacer vers une autre plus adapté.</p><br><p>Le personnage va cependant évoluer de deux manières :</p><ul><li><p>Ses possessions sont susceptibles d’évoluer, son équipement mais également les propriétés immobilières qu’il pourrait finir par acquérir</p></li><li><p>La principale évolution reste l’évolution sociale du personnage. Se faire des alliés, des ennemis, gagner un meilleur statut, voilà également la plus grande possibilité d’évolution et la meilleur manière de symboliser le vécu du personnage.</p></li></ul>"});
});
app.get('/system/skills', function(req, res) {
    res.sendfile(directory + "/system/skills.html");
});
app.get('/system/dices', function(req, res) {
    res.sendfile(directory + "/system/dices.html");
});
app.get('/system/fighting', function(req, res) {
    res.sendfile(directory + "/system/fighting.html");
});
app.get('/system/melee', function(req, res) {
    res.sendfile(directory + "/system/melee.html");
});
app.get('/system/rerolls', function(req, res) {
    res.sendfile(directory + "/system/rerolls.html");
});
app.get('/system/distance', function(req, res) {
    res.sendfile(directory + "/system/distance.html");
});
app.get('/system/damages', function(req, res) {
    res.sendfile(directory + "/system/damages.html");
});
app.get('/system/inventory', function(req, res) {
    res.sendfile(directory + "/system/inventory.html");
});
app.get('/system/spells', function(req, res) {
    res.sendfile(directory + "/system/spells.html");
});


//Handle 404
app.use(function(req, res, next){
  res.send(404, 'Sorry cant find that!');
});
