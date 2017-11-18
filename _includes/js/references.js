// A function to add videos to divs
function add_video(link, autoplay=1) {
    // Extract video information
    var target = link.attr('href');
    var video_id = link.attr('video-id');
    var starttime = link.attr('start');

    var url = "https://www.youtube.com/embed/" + video_id + "?autoplay=" + autoplay;
    // Add starttime to url if defined
    if (typeof starttime !== 'undefined') {
        url += "&start=" + starttime;
    }

    // Add iframe
    $(target).append("<iframe class='embed-responsive-item' width='560' height='315' src='"
        + url
        + "' frameborder='0' allowfullscreen></iframe>");
}

function getParameterByName(url, name) {
    // Extract url parameters
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

$(document).ready(function(){

    // Make video point to tab instead and add information
    $('a.video-tab').each(function () {
        var link = $(this);
        var video_url = link.attr('href');
        // var video_id = video_url.split('?v=')[1];
        // var params = video_url.split('?')[1];

        // var video_id = params.split('v=')[1].split('&')[0];
        // var time = params.split('time=')[1].split('&')[0];
        var video_id = getParameterByName(video_url, 'v');
        var starttime = getParameterByName(video_url, 'start');
        // alert(time)

        var key = link.closest('div.reference').attr('data-key');
        var target = '#' + key + '-video';

        link.attr('data-toggle', 'tab');
        link.attr('href', target);
        link.attr('video-id', video_id)
        if (starttime) {
          link.attr('start', starttime);
        }
    });

    // handle the closing of active tabs
    $('div.reference a.nav-link').click(function (e) {
        var link = $(this);

        // Make sure that the current video stops playing
        if (link.is('[data-toggle]')) {
            // if we're switching to another tab -- remove the video.
            link.closest('div.reference').find('iframe').remove();
        } else if (link.is('[target]')) {
            // if we're going to an external website, let's reload video
            // Get the active video tab
            var video_link = link.closest('div.reference').find('a.active.video-tab');
            var target = video_link.attr('href');
            // Remove the current iframe
            $(target).find('iframe').remove();
            // add the video without autoplay
            add_video(video_link, 0)
        }

        // Remove the active field (allow closing of open tabs)
        if (link.hasClass('active')) {
            // timeout to allow bootstrap code to finish
            window.setTimeout(function(){
                $(link.attr('href')).removeClass('active');
                link.removeClass('active')
            }, 1);
        } else if (link.hasClass('video-tab')) {
            // Add the current video
            add_video(link, 1)
        }
    });

    // add code for close button on mobile
    $('a.duplicate').click(function () {
        var parent = $(this).attr('dublicate-target');
        $(parent).trigger('click');
    });
});
