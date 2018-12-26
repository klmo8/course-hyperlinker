// Adapted from: https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script
var s = document.createElement('script');
s.src = chrome.extension.getURL('searchandlink.js');

function injectScript() {
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

// Adapted from: https://stackoverflow.com/questions/9659265/check-if-javascript-script-exists-on-page
function isMyScriptLoaded() {
  url = s.src;
  var scripts = document.getElementsByTagName('script');
  for (var i = scripts.length; i--;) {
      console.log("SCRIPT LOADED");
      if (scripts[i].src == url) return true;
  }
  return false;
}

var observer = new MutationObserver(function(mutations) {
    if (document.querySelector('.m-commentspage') !== null) {
      console.log("COMMENTS CLASS FOUND");
      injectScript();
    }
  });

injectScript()
observer.observe(document, {childList: true, subtree: true});
// observer.disconnect();
