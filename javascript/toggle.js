
function toggleElement(element) {
     $(document).ready($(element).slideToggle("fast"));
}

function toggleMaterial (key, element) {

  var new_element = "." + key + "-" + element

  // If current one is visible it needs to go away
  if ($(new_element).is(":visible")){
    $("." + key + "-" + element).slideToggle('fast')
  }
  else{
    var active_element = ""

    // Get the element that is currently visible
    $("." + key + "-materials").children().each(function (index) {
      if ($(this).is(":visible")){
        active_element += $(this).attr("class");
        return false;
      }
    })

    // if it exists, hide current one and show new one
    if (active_element){
      $("." + active_element).hide()
      $(new_element).show()
    }
    else{
      // None are visible. show new one
      $(new_element).slideToggle('fast')
    }
  }
}
