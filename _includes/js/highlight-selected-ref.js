// Highlight the selected element that we navigate to with the hash

// Get the initial location
var hash = window.location.hash;

highlight = function() {
    // Remove highlight from previous
    document.querySelector(hash).parentElement.classList.remove("highlight");

    // Get new location
    hash = window.location.hash;

    // points to the enclosing div (without buttons below).
    document.querySelector(hash).parentElement.classList.add("highlight");
}

// Run initially once
highlight();
// Keep updating as it changes
window.addEventListener('hashchange', function() {
    highlight();
});
