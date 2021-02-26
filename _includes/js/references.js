function createVideoElement(url) {
    // Create new video iframe
    var iframe = document.createElement("iframe");
    iframe.classList.add("embed-responsive-item");
    iframe.setAttribute("width", "560");
    iframe.setAttribute("height", "315");
    iframe.setAttribute("src", url);
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    return iframe
  }

// A function to add videos to divs
function add_video(link, autoplay=1) {
    // Extract video information
    var target = link.getAttribute('href');
    var video_id = link.getAttribute('video-id');
    var starttime = link.getAttribute('start');

    var url = "https://www.youtube.com/embed/" + video_id + "?autoplay=" + autoplay;
    // Add starttime to url if defined
    if (typeof starttime !== 'undefined') {
        url += "&start=" + starttime;
    }

    // Add iframe
    video_iframe = createVideoElement(url);
    document.querySelector(target).appendChild(video_iframe);
}

function getParameterByName(url, name) {
    // Extract url parameters
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

document.addEventListener("DOMContentLoaded", function(event) {

    // Make video point to tab instead and add information
    document.querySelectorAll("a.video-tab").forEach(function (link) {
        var video_url = link.getAttribute("href");

        var video_id = getParameterByName(video_url, 'v');
        var starttime = getParameterByName(video_url, 'start');
        var key = link.closest('div.reference').getAttribute('data-key');
        var target = '#' + key + '-video';

        link.setAttribute("data-toggle", "tab");
        link.setAttribute("href", target);
        link.setAttribute("video-id", video_id);
        if (starttime) {
          link.setAttribute('start', starttime);
        }
    })

    // handle the closing of active tabs
    document.querySelectorAll("div.reference a.nav-link").forEach(function(link) {
        link.addEventListener("click", function() {
            var link = this

            // If we're opening a new tab with content, let's remove existing videos (iframes)
            if (link.hasAttribute("data-toggle")) {
                // Make sure we cleaned up any active children of the current tab
                var iframes = link.closest("div.reference").querySelectorAll("iframe");
                iframes.forEach(function(iframe) {
                    iframe.remove();
                })
            };

            if (link.classList.contains('active')) {
                // timeout to allow bootstrap code to finish
                window.setTimeout(function(){
                    target = link.getAttribute("href");
                    document.querySelector(target).classList.remove("active");
                    // $(link.attr('href')).removeClass('active');
                    link.classList.remove('active')
                }, 1);
            } else if (link.classList.contains('video-tab')) {
                // Add the current video
                add_video(link, 1)
            }
        });
    });

    // Clicking the close button at the bottom of the abstract is equivalent to
    // clicking the Abstract button
    document.querySelectorAll("a.duplicate").forEach(function(link) {
        link.addEventListener("click", function(){
            var parent = this.getAttribute("duplicate-target");
            document.querySelector(parent).click();
        })
    })
});
