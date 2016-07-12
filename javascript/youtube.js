$(document).ready(function () {

  var videos = $("div.youtube");

  // Rescale youtubes to fit page width
  videos.each(function() {
    // Current width/height of the enclosing div
    var height = $(this).height();
    var width = $(this).width();

    // Scale down/up div size to fit surrounding container
    var new_width = $(this).parent().width();
    var new_height = height * new_width / width;

    // Set css for element
    $(this).css({"width": new_width + 'px', "height": new_height + 'px'});

    // Replace div with thumbs
    $(this).append('<img class="thumb" src="http://i.ytimg.com/vi/' + $(this).attr("id") + '/hqdefault.jpg"></img>');

    // Add play button overlay
    $(this).append('<div class="play"></div>');
  });

  // Add click to the video im
  videos.click(function () {

    var parent = $(this).parent()

    $(this).replaceWith("<iframe width='560' height='315' src='https://www.youtube.com/embed/" +
                        this.id +
                        "?autoplay=1' frameborder='0' allowfullscreen></iframe>")

    // Fit the video to the surrounding element (div)
    parent.fitVids();
  });
});

// $(window).resize(function () {
// });
