function adminlist(locals) {
var buf = [];
var locals_ = (locals || {}),name = locals_.name,title = locals_.title,category = locals_.category;buf.push("<li><a" + (jade.attrs({ 'href':('/admin?n='+ name) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "<p class=\"ui-li-aside\">" + (jade.escape(null == (jade.interp = category) ? "" : jade.interp)) + "</p></a></li>");;return buf.join("");
}