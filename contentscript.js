function injectScript() {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('searchandlink.js');
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

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
      if (!isMyScriptLoaded()){
        injectScript();
      };
    }
  })
});
injectScript()
var targetNode = document.querySelector('body');
observer.observe(targetNode, {attributes: false, childList: true, subtree: true});