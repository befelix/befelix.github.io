// Hide actual email adress
var m_ = "mailto:";
var a_ = "@";
var name = "berkenkamp";
var dom = "gmail.com";
var s = name + a_ + dom;
$("a.email").attr("href", m_ + 'f' + s).text('f' + s);

// Display skype name
var skype = "felix.ber";
$("a.skype").attr("href", "skype:" + skype).text("Skype");
