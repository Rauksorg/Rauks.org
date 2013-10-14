// Copyright 2013 Thibaut CONSTANT
// This file is part of Rauks.org.

// Rauks.org is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published
// by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Rauks.org is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Rauks.org. If not, see <http://www.gnu.org/licenses/>.

$(document).on("pageinit", function() {
    $.get('/TEMPLATES/navbar.html', function(template) {
        $(".navbartempl").html(template);
        $(".navbartempl").trigger("create");
    });
});
