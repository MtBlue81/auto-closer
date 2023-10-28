"use strict";

export const CLOSE_TAB_TYPE = "CLOSE_TAB";

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.type === CLOSE_TAB_TYPE) {
    chrome.tabs.remove(sender.tab.id);
  }
});
