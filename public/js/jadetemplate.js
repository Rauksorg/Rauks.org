function adminlist(locals) {
var buf = [];
var locals_ = (locals || {}),foundarticle = locals_.foundarticle;// iterate foundarticle
;(function(){
  var $$obj = foundarticle;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var val = $$obj[index];

buf.push("<li><a" + (jade.attrs({ 'href':('/admin?n='+ foundarticle[index].name) }, {"href":true})) + "><h3>" + (jade.escape(null == (jade.interp = foundarticle[index].title) ? "" : jade.interp)) + "</h3><p>" + (jade.escape(null == (jade.interp = foundarticle[index].descript) ? "" : jade.interp)) + "</p><p class=\"ui-li-aside\">" + (jade.escape(null == (jade.interp = foundarticle[index].category) ? "" : jade.interp)) + "</p></a></li>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var val = $$obj[index];

buf.push("<li><a" + (jade.attrs({ 'href':('/admin?n='+ foundarticle[index].name) }, {"href":true})) + "><h3>" + (jade.escape(null == (jade.interp = foundarticle[index].title) ? "" : jade.interp)) + "</h3><p>" + (jade.escape(null == (jade.interp = foundarticle[index].descript) ? "" : jade.interp)) + "</p><p class=\"ui-li-aside\">" + (jade.escape(null == (jade.interp = foundarticle[index].category) ? "" : jade.interp)) + "</p></a></li>");
    }

  }
}).call(this);
;return buf.join("");
}