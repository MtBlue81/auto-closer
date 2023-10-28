"use strict";
import { CLOSE_TAB_TYPE } from "./background";

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(
    {
      delay: 3,
    },
    ({ delay }) => {
      setTimeout(() => {
        chrome.runtime.sendMessage({
          type: CLOSE_TAB_TYPE,
        });
      }, parseInt(delay, 10) * 1000);
    }
  );
});
