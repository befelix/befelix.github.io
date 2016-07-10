
function toggleElement(element) {
     $(document).ready($(element).slideToggle("fast"));
}

function toggleMaterial (key, element) {

  var new_element = "." + key + "-" + element

  // If current one is visible it needs to go away
  if ($(new_element).is(":visible")){
    $(new_element).slideToggle('fast')
    $("#" + key + "-" + element + "-toggle").toggleClass("active")
  }
  else{
    var old_element = ""

    // Get the element that is currently visible
    $("." + key + "-materials").children().each(function (index) {
      if ($(this).is(":visible")){
        old_element += $(this).attr("class");
        return false;
      }
    })

    // if it exists, hide current one and show new one
    if (old_element){
      $("." + old_element).hide()
      $("#" + key + "-" + old_element.split('-')[1] + "-toggle").toggleClass("active")
      $(new_element).show()
      $("#" + key + "-" + element + "-toggle").toggleClass("active")
    }
    else{
      // None are visible. show new one
      $(new_element).slideToggle("fast")
      $("#" + key + "-" + element + "-toggle").toggleClass("active")
    }
  }
}

// Scroll up after click (only if reference no longer visible)
$(document).ready(function (){
  $(".mobile-only").click(function (){
    // Hide abstract
    var key = $(this).attr('id').split('-')[0];
    toggleMaterial(key, 'abstract');

    // Scroll up
    var offset = $("." + key + "-reference").offset().top
    if ($('html, body').scrollTop() >= offset) {
      $('html, body').scrollTop(offset);
    }
  });
});
