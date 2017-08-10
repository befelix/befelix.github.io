// Resize automatically according to content
function resizeIframe(iframe) {
 $(iframe).height($(iframe).contents().height() + 50);
}

function load_notebook (div, content) {
  // Append notebook iframe to corresponding div
  $(div).append('<iframe src="{{site.baseurl}}'
                + content
                + '" scrolling="no"></iframe>');

  $(div).children("iframe").on("load", function() {
    resizeIframe($(div).children("iframe"));
  });
};

$(document).ready(function () {
  $('a.jupyter.nav-link').each(function() {
    var link = $(this);

    var div = link.attr('tab-target');
    var content = link.attr('href');
    link.attr('href', div);
    link.attr('data-toggle', 'tab');

    link.one('click', function() {
      load_notebook(div, content);
    });
  });

  // Activate the first element
  $('div.container').append('<a href="#">Back to top</a>');
  $('a.jupyter.activate').trigger('click');
});
