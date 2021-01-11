'use strict';

class OptionsData {
  constructor() {
    this.options = [];
  }

  async restore() {
    return new Promise(resolve => {
      chrome.storage.sync.get({
        options: [],
      }, ({ options }) => {
        this.options = options;
        resolve(options);
      });
    });
  }

  async store() {
    return new Promise(resolve => {
      chrome.storage.sync.set({ options: this.options }, () => resolve());
    });
  }

  async append(option) {
    this.options = this.options.concat(option);
    return this.store();
  }

  async remove(option) {
    this.options = this.options.filter(o => o !== option);
    return this.store();
  }

  get data() {
    return this.options;
  }
}

export default OptionsData;
