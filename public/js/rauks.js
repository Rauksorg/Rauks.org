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

    $("#savebutton").bind("click", function () {
        $.ajax({
            url: '/admin/ajax',
            type: 'POST',
            data: JSON.stringify({"_id":articleid,"text":$('.textedit').html()}),
            contentType: 'application/json',
            success: function (response) {
            },
            error: function () {
                alert("Erreur dans l'envoi du texte");
            }
        });
    });
    tinymce.init({
        selector: "div.textedit",
        inline: true,
        plugins: "advlist autolink lists link image charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality charmap",
        toolbar1: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist outdent indent | table link image charmap media | code",
        fixed_toolbar_container: "#header",
        menubar: false
    });
});
