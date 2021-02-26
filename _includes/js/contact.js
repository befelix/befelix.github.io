// Hide actual email adress
var m_ = "mailto:";
var a_ = "@";
var myname = "berkenkamp";
var dom = "gmail.com";
var s = myname + a_ + dom;

document.querySelectorAll("a.email").forEach(element => {
    element.setAttribute("href", m_ + "f" + s);
    element.text = "f" + s
});
