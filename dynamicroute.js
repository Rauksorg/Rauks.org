// db driven routeur function
var route = function (route, pagetitle, title) {
    app.get('/' + route, function (req, res) {
        var system_name = req.query.n;
        if (system_name === undefined) {
            article.find({
                category: route
            }, {
                title: 1,
                name: 1,
                _id: 0
            }, function (err, foundarticle) {
                res.render(route + ".jade", {
                    "foundarticle": foundarticle,
                    "pagetitle": pagetitle,
                    "title": title
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
                    // foundname render page title, title and text
                    res.render(route + "_page.jade", foundname);
                }
            });
        }
    });
};
module.exports = route;