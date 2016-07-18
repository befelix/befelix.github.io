
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

// Make bibtex/abstract toggles clickable
$(document).ready(function (){
  $(".toggle").click(function () {
    var element = $(this).closest("li").attr("content");
    var key = $(this).closest(".reference").attr("key");
    toggleMaterial(key, element);
  });
});

// Mobile: Scroll up after click (only if reference no longer visible)
$(document).ready(function (){
  $(".mobile-close").click(function (){
    // Hide abstract
    var parent = $(this).closest('.reference')
    var element = $(this).parent().attr("class");

    // Hide current element
    toggleMaterial(parent.attr("key"), element);

    // Get offset
    var offset = parent.offset().top;

    // Scroll further if we've scrolled past it
    if ($('html, body').scrollTop() >= offset) {
      $('html, body').scrollTop(offset);
    }
  });
});