// Hide actual email adress
var m_ = "mailto:";
var a_ = "@";

function mail(name, dom)
{
	var s = name + a_ + dom;
	document.write('<a href="' + m_ + s + '">' + s + '</a>');
}

function mail2(name, dom, display)
{
	document.write('<a href="' + m_ + name + a_ + dom + '">' + display + '</a>');
}

function skype(name, display)
{
    document.write('<a href="skype:' + name + '">' + display + '</a>');
}