// Hide actual email adress
var m_ = "mailto:";
var a_ = "@";
var name = "befelix";
var dom = "inf.ethz.ch";
var s = name + a_ + dom;
$("a.email").attr("href", m_ + s).text(s)

// Display skype name
var skype = "felix.ber"
$("a.skype").attr("href", "skype:" + skype).text("Skype")
