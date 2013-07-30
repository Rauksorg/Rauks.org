// Copyright 2013 Thibaut CONSTANT
// This file is part of mj_helper.
// 
//     mj_helper is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
// 
//     mj_helper is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
// 
//     You should have received a copy of the GNU General Public License
//     along with mj_helper.  If not, see <http://www.gnu.org/licenses/>.
// 
// "use strict";
//require the parameters file
var express = require("express"),
    app = express(),
    server = require('http').createServer(app);
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});
server.listen(process.env.PORT, process.env.IP);
app.get('/', function(req, res) {
    res.redirect("../rules.html");
});