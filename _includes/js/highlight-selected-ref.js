// Highlight the selected element that we navigate to with the hash

highlight = function() {
    // Remove any previous highlights
    document.querySelectorAll("div.reference div.highlight").forEach(function (div){
        div.classList.remove("highlight");
    })

    // Get new location
    var hash = window.location.hash;
    if (hash == "") {
        return;
    }
    // points to the enclosing div (without buttons below).
    var new_highlight = document.querySelector(hash);
    if (new_highlight != null) {
        new_highlight.parentElement.classList.add("highlight");
    }
}

// Run initially once
highlight();
// Keep updating as it changes
window.addEventListener('hashchange', function() {
    highlight();
});
