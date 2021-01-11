'use strict';
import { CLOSE_TAB_TYPE } from './background';

setTimeout(() => {
  chrome.runtime.sendMessage({
    type: CLOSE_TAB_TYPE,
  });
}, 1000);
