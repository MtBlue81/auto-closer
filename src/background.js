"use strict";

export const CLOSE_TAB_TYPE = "CLOSE_TAB";

let matches = [];
chrome.storage.sync.get(
  {
    options: [],
  },
  ({ options }) => {
    matches = options;
  }
);

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.options) {
    matches = changes.options.newValue;
  }
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.type === CLOSE_TAB_TYPE) {
    matches.forEach((match) => {
      if (RegExp(match).test(sender.url)) {
        chrome.tabs.remove(sender.tab.id);
      }
    });
  }
});
