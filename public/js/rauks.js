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
$(document).bind("pageinit", function () {
    //google analytics
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-28391166-1', 'rauks.org');
    ga('send', 'pageview');
    //
    //
    $("#savebutton").bind("click", function () {
        // var articleid come from jade template
        console.log($('#titleedit').text());
        console.log($('#name').val());
        console.log($('#category').val());

        $.ajax({
            url: '/admin/ajax',
            type: 'POST',
            data: JSON.stringify({
                "_id": articleid,
                "category":$('#category').val(),
                "name":$('#name').val(),
                "title":$('#titleedit').text(),
                "text": $('#textedit').html()
            }),
            
            contentType: 'application/json',
            success: function (response) {},
            error: function () {
                alert("Erreur dans l'envoi du texte");
            }
        });
        $.mobile.changePage("/admin");
    });
    $("#buttonnew").bind("click", function () {
        $.ajax({
            url: '/admin/ajax',
            type: 'POST',
            data: JSON.stringify({newarticle:1}),
            contentType: 'application/json',
            success: function (response) {},
            error: function () {
                alert("Erreur dans l'envoi du texte");
            }
        });
    });
    $("#updatebutton").bind("click", function () {
        $(".textedit").trigger("create");
    });
    tinymce.init({
        selector: "#textedit",
        inline: true,
        plugins: "advlist autolink lists link image charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality charmap",
        toolbar1: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist outdent indent | table link image charmap media | code",
        fixed_toolbar_container: "#header",
        menubar: false
    });
    tinymce.init({
    selector: "#titleedit",
    inline: true,
    toolbar: "undo redo",
    menubar: false
});
});
