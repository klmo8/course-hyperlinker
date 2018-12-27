// Adapted from: https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script
function injectScript() {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('searchandlink.js');
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

// Adapted from: https://stackoverflow.com/questions/9659265/check-if-javascript-script-exists-on-page
function isMyScriptLoaded() {
  url = chrome.extension.getURL('searchandlink.js');
  var scripts = document.getElementsByTagName('script');
  for (var i = scripts.length; i--;) {
      if (scripts[i].src == url) {
        return true;
      }
  }
  return false;
}

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length > 0) {
      if (mutation.addedNodes[0].tagName === "DIV") {
        if (!isMyScriptLoaded()){
          injectScript();
        };
      }
    }
  })
});

injectScript()
var targetNode = document.querySelector('body');
observer.observe(targetNode, {childList: true, subtree: true});