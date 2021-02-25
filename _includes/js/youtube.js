// Disable video link
document.querySelectorAll("a.videolink").forEach(function(link) {
  link.removeAttribute("href");
})

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

// Replace a video placeholder by an iframe
function replaceVideoPlaceholder(placeholder, url) {
  iframe = createVideoElement(url);

  // The parent container now embeds a responsive object
  container = placeholder.parentElement;
  container.classList.add("embed-responsive");
  container.classList.add("embed-responsive-16by9");
  
  // Replace the placeholder with the iframe
  placeholder.replaceWith(iframe);
}

// Add click to the Youtube videos
document.querySelectorAll("div.video.youtube").forEach(function(placeholder) {
  placeholder.addEventListener("click", function() {
      var url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1";

      // Add starttime if defined
      var starttime = placeholder.getAttribute('start');
      if (typeof starttime !== 'undefined') {
          url += "&start=" + starttime;
      }

      replaceVideoPlaceholder(placeholder=this, url=url)
  })
})

// Add click to the ETH videos
document.querySelectorAll("div.video.eth").forEach(function(placeholder) {
  placeholder.addEventListener("click", function() {
      replaceVideoPlaceholder(placeholder=this, url=this.id)
  })
})
