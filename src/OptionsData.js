"use strict";

class OptionsData {
  constructor() {
    this.options = [];
    this.delay = 3;
  }

  async restore() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(
        {
          options: [],
          delay: 3,
        },
        ({ options, delay }) => {
          this.options = options;
          this.delay = delay;
          resolve(options, delay);
        }
      );
    });
  }

  async store() {
    return new Promise((resolve) => {
      chrome.storage.sync.set(
        { options: this.options, delay: this.delay },
        () => resolve()
      );
    });
  }

  async append(option) {
    this.options = this.options.concat(option);
    return this.store();
  }

  async remove(option) {
    this.options = this.options.filter((o) => o !== option);
    return this.store();
  }
}

export default OptionsData;
