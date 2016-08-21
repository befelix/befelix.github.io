// Resize automatically according to content
function resizeIframe(iframe) {
 $(iframe).height($(iframe).contents().height() + 30)
}

// Adaptive size of notebook
$(window).resize(function () {
  $("div.jupyter.active").children("iframe").each(function() {
    resizeIframe(this)
  });
});

function load_notebook (div) {
  // Append notebook iframe to corresponding div
  div.append('<iframe src="{{site.baseurl}}/assets/jupyter/' +
             div.attr("content") +
             '" scrolling="no"></iframe>');

  div.children("iframe").on("load", function() {
    resizeIframe(div.children("iframe"))
  });
}


$(document).ready(function () {

  // Load active notebook
  var default_notebook = $("div.jupyter.active");
  load_notebook(default_notebook)
  $("a.jupyter[target=" + default_notebook.attr("target") + "]").addClass("active")

  // Load iframes on click (except the default, active one)
  $("a.jupyter:not('.active')").one("click", function (event) {
    // div corresponding to the
    var div = $("div.jupyter[target=" + $(this).attr("target") + "]");
    load_notebook(div);
  })

  // Switch between notebooks
  $("a.jupyter").on("click", function (event) {

    // Highlight current link, unhighlight previous
    $("a.jupyter.active").removeClass("active")
    $(this).addClass("active")

    // Show current div, hide previous
    $("div.jupyter.active").removeClass("active")
    $("div.jupyter[target=" + $(this).attr("target") + "]").addClass("active")

    // Resize current iframe
    resizeIframe($("div.jupyter.active").children("iframe"))
  });
})
