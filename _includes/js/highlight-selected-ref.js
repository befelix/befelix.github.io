// Highlight the selected element that we navigate to with the hash

// Get the initial location
var hash = window.location.hash;

highlight = function() {
    // Remove highlight from previous
    $(hash).parent().removeClass("highlight");
    // Get new location
    hash = window.location.hash;
    // hash points to the span object of the reference, so the parent
    // points to the enclosing div (without buttons below).
    $(hash).parent().addClass("highlight");
}

// Run initially once
highlight();
// Keep updating as it changes
$(window).on("hashchange", highlight);
