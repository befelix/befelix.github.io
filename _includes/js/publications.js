var hash = window.location.hash;

// Default value for hash
// if ($(hash).length == 0) {
//   hash = "#1d_example";
// }

// Expand the wanted element
// $(hash).addClass("active");

// Activate the current link
// $("a.jupyter").removeAttr("href");

// Highlight the element that we've nacigated too
$(hash).parent().css("background-color", "#e6e6ff");
