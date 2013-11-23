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
$(document).on("pagebeforeshow", function() {
    $("#savebutton").on("click", function() {
        // var articleid come from jade template
        console.log($('#descript').val());
        $.ajax({
            url: '/admin/ajax',
            type: 'POST',
            data: JSON.stringify({
                "_id": articleid,
                "category": $('#category').val(),
                "name": $('#name').val(),
                "title": $('#title').html(),
                "descript": $('#descript').val(),
                "text": $('#wysihtml5-textarea').val()
            }),
            contentType: 'application/json',
            success: function(response) {},
            error: function() {
                alert("Oups ! L'enregistrement des modifications n'a pas bien fonctionné. Veuillez vérifier votre connexion internet et réessayer l'enregistrement.");
            }
        });
    });
    $("#buttonnew").on("click", function() {
        $.ajax({
            url: '/admin/ajax',
            type: 'POST',
            data: JSON.stringify({
                newarticle: 1
            }),
            contentType: 'application/json',
            success: function(response) {},
            error: function() {
                alert("Erreur dans l'envoi du texte");
            }
        });
        $("#list").prepend(adminlist({foundarticle:[{name:'nouveau',title:'Nouveau',descript:"Description",category:"nouveau"},]})).listview("refresh");
    });

});
