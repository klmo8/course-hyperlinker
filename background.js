// Listening for sites (ie: Reddit) that use pushState / replaceState.
// These sites replace the page's history state instead of actual refresh/reload, whenever possible.
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  // Adding the setInterval to run script every 5 seconds.
  // This is a hacky way of dealing with the infinite scroll feature of certain websites (Reddit, Twitter, etc).
  setInterval(function(){
    chrome.tabs.executeScript(tabId,{file:"contentscript.js"}, _=> {
      // Handling error that results from trying to inject the script on chrome://extensions page
      // Adapted from: https://stackoverflow.com/questions/26517988/unchecked-runtime-lasterror-while-running-tabs-executescript/45603880#45603880
      let e = chrome.runtime.lastError;
      if(e !== undefined){
        console.log(tabId, _, e);
      }
    }, 5000);
  });
});
