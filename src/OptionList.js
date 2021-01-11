'use strict';

class OptionList extends HTMLElement {
  static get observedAttributes() {
    return ['options'];
  }

  get root() {
    return this.shadowRoot.querySelector('.list');
  }

  get style() {
    const style = document.createElement('style');
    style.textContent = `
      .list {
        margin: 12px 0;
        padding: 0 0 0 4px;
        max-width: 400px;
      }

      .item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #8c8c8c;
        padding: 4px;
        box-sizing: border-box;
      }

      .button {
        text-decoration: none;
        user-select: none;
        background: transparent;
        padding:  0;
        margin: 0;
        border: 0;
        appearance: none;
        -webkit-tap-highlight-color: transparent;
        font-size: 1rem;
        text-align: center;
        flex-basis: 1.4rem;
        cursor: pointer;
        color: #8c8c8c;
        flex-shrink: 0;
      }

      .button::focus {
        border: 1px solid black;
      }

      .label {
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `;
    return style;
  }

  constructor(...args) {
    super(...args);
    const shadow = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');

    style.textContent = `
      .list {
        margin: 12px 0;
        padding: 0 0 0 4px;
        max-width: 400px;
      }

      .item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #8c8c8c;
        padding: 4px;
        box-sizing: border-box;
      }

      .button {
        text-decoration: none;
        user-select: none;
        background: transparent;
        padding:  0;
        margin: 0;
        border: 0;
        appearance: none;
        -webkit-tap-highlight-color: transparent;
        font-size: 1rem;
        text-align: center;
        flex-basis: 1.4rem;
        cursor: pointer;
        color: #8c8c8c;
        flex-shrink: 0;
      }

      .button::focus {
        border: 1px solid black;
      }

      .label {
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `;
    shadow.appendChild(this.style);
  }

  parseOptions() {
    return this.getAttribute('options') ? this.getAttribute('options').split(',') : [];
  }

  addOption(text) {
    if (!text) return;
    this.root.appendChild(this.buildOption(text));
  }

  fireRemoveEvent(detail) {
    const event = new CustomEvent('remove', {
      bubbles: true,
      composed: true,
      detail,
    })
    this.dispatchEvent(event)
  }

  buildOption(text) {
    const wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'item');

    const label = document.createElement('span');
    label.setAttribute('class', 'label');
    label.setAttribute('title', text);
    label.textContent = text;

    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'button');
    removeButton.textContent = 'x';
    removeButton.onclick = () => {
      this.fireRemoveEvent(text);
      this.root.removeChild(wrapper);
    };

    wrapper.appendChild(label);
    wrapper.appendChild(removeButton);
    return wrapper;
  }

  attributeChangedCallback() {
    this.options = this.parseOptions();
    if (this.root) {
      this.shadowRoot.remove(this.root);
    }
    const root = document.createElement('ul');
    root.setAttribute('class', 'list');
    this.shadowRoot.appendChild(root);
    this.options.forEach(option => this.addOption(option));
  }
}

export default OptionList;
