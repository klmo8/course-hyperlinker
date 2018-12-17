var fullSFU = new RegExp("Simon Fraser University",'i');
var acronymSFU = new RegExp("SFU",'i');

// Added conditional to improve efficiency and prevent false positives (ie: references to CMPT XXX in non-SFU context)
if (document.body.innerHTML.search(fullSFU) != -1 || document.body.innerHTML.search(acronymSFU) != -1) {
  // Adapted from: https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('searchandlink.js');
  s.onload = function() {
      this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}