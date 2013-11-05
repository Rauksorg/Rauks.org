$(document).on("pageinit", function() {


    var editor = new wysihtml5.Editor("wysihtml5-textarea", { // id of textarea element
        toolbar: "wysihtml5-toolbar", // id of toolbar element
        parserRules: wysihtml5ParserRules, // defined in parser rules set
        stylesheets: ["/css/jqm_wysihtml5.css"]
    });
    // editor.on('load', function() {
    //     // The wysiwyg editor is in the DOM. It's safe to make the plugin call
    //     $(editor.composer.iframe).wysihtml5_size_matters();
    // });
});
