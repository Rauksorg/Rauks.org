$(document).on("pageinit", function(event) {
    if ($(".centertoolbar")[0]) {
        // Do something here if an element with this class exists

        var editor = new wysihtml5.Editor("wysihtml5-textarea", {
            toolbar: "wysihtml5-toolbar",
            stylesheets: ["js/wysihtml5-jqm/wysihtml5-jqm.css"],
            useLineBreaks: false,
            parserRules: wysihtml5ParserRules

        });

        editor.on('load', function() {
            // The wysiwyg editor is in the DOM. It's safe to make the plugin call
            $(editor.composer.iframe).wysihtml5_size_matters();
        });
        editor.on('change_view', function(e) {
            if (e == "textarea") {
                editor.synchronizer.editor.setValue(html_beautify($('#wysihtml5-textarea').val(), {
                    indent_size: 2

                }));
                $(".btnbar").addClass("ui-disabled");

            }
            if (e == "composer") {
                $(".btnbar").removeClass("ui-disabled");
            }
        });
        $(".btnbar, .srccode").on("mouseover", function() {
            $(this).addClass("ui-btn-hover-a");
        });
        $(".btnbar, .srccode").on("mouseout", function() {
            $(this).removeClass("ui-btn-hover-a");
        });
    };
})
