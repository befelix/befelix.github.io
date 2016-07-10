
function toggleElement(element) {
     $(document).ready($(element).slideToggle("fast"));
}

function toggleMaterial (key, element) {

  var parent = $(".reference[key=" + key + "]");
  var new_element = parent.find("." + element);
  var new_toggle = parent.find("[content=" + element + "]");

  // If current one is visible it needs to go away
  if (new_toggle.is(".active")) {
    new_element.slideToggle('fast');
    new_toggle.removeClass("active");
  }
  else{

    var old_toggle = parent.find(".toggle.active")

    // if it exists, hide current one and show new one
    if (old_toggle.length) {
      $("." + old_toggle.attr("content")).hide()
      old_toggle.removeClass("active")
      new_element.show();
    }
    else{
      // None are visible. show new one
      new_element.slideToggle("fast");
    }
    // Mark new toggle as active
    new_toggle.addClass("active");
  }
}

// Scroll up after click (only if reference no longer visible)
$(document).ready(function (){
  $(".abstract-mobile-close").click(function (){
    // Hide abstract
    var key = $(this).attr('key');
    toggleMaterial(key, 'abstract');

    // Traverse to the base class reference
    var offset = $(this).closest('.reference').offset().top;

    // Scroll further if we've scrolled past it
    if ($('html, body').scrollTop() >= offset) {
      $('html, body').scrollTop(offset);
    }
  });
});

// Hide all abstracts/bibtexs initially
$(document).ready(function (){
  $(".abstract").hide();
  $(".bibtex").hide();
});
