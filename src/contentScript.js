"use strict";
import { CLOSE_TAB_TYPE } from "./background";

function closeTabIfMatched(options, delay) {
  if (options.find((option) => RegExp(option).test(location.href))) {
    setTimeout(() => {
      chrome.runtime.sendMessage({
        type: CLOSE_TAB_TYPE,
      });
    }, parseInt(delay, 10) * 1000);
    return true;
  }
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(
    {
      delay: 3,
      options: [],
    },
    ({ delay, options }) => {
      if (closeTabIfMatched(options, delay)) return;

      window.addEventListener("hashchange", () => {
        closeTabIfMatched(options, delay);
      });
    }
  );
});
