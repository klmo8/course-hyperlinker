// Listening for sites (ie: Reddit) that use pushState / replaceState.
// These sites replace the page's history state instead of actual refresh/reload, whenever possible.
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  chrome.tabs.executeScript({ file: "contentscript.js" }, _ => {
    // Handling error that results from trying to inject the script on chrome://extensions page
    // Adapted from: https://stackoverflow.com/questions/26517988/unchecked-runtime-lasterror-while-running-tabs-executescript/45603880#45603880
    let e = chrome.runtime.lastError;
    if (e !== undefined) {
      console.log(_, e);
    }
  });
});
