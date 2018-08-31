// Listening for sites (ie: Reddit) that use pushState / replaceState.
// These sites replace the page's history state instead of actual refresh/reload, whenever possible.
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.executeScript(null,{file:"contentscript.js"});
  // Adding the setInterval to run script every 5 seconds.
  // This is a hacky way of dealing with the infinite scroll feature of certain websites (Reddit, Twitter, etc).
  setInterval(function(){
    chrome.tabs.executeScript(null,{file:"contentscript.js"});
  }, 5000);
});
