var article_route = function (article, defaulttitle, defaultpagetitle) {
    app.get('/' + article, function (req, res) {
        //Register the get parameter
        var article_name = req.query.n;
        //If the page is the root of system
        if (article_name === undefined) {
            //Find the list of the articles
            article.find({}, {
                title: 1,
                name: 1,
                _id: 0
            }, function (err, foundarticles) {
                res.render(article + "_list.jade", {
                    "foundarticles": foundarticles,
                    "title": defaulttitle,
                    "pagetitle": defaultpagetitle
                });
            });
        } else {
            //Find the article
            article.findOne({
                name: article_name
            }, function (err, foundarticle) {
                if (err) console.log("name query error");
                // If there is no article found
                if (foundarticle === null) {
                    res.send(404, 'Sorry cant find that!');
                    // render the found article
                } else {
                    res.render(article + "_page.jade", foundarticle);
                }
            });
        }
    });
};