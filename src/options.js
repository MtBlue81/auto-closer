"use strict";

import OptionList from "./OptionList";
import OptionsData from "./OptionsData";

customElements.define("option-list", OptionList);

const options = new OptionsData();
const $list = document.getElementById("options");
const $addInput = document.getElementById("addInput");
const $status = document.getElementById("status");

const showStatus = () => {
  $status.classList.add("show");
  setTimeout(() => {
    $status.classList.remove("show");
  }, 4000);
};

const restoreOptions = async () => {
  await options.restore();
  $list.setAttribute("options", options.data);
  $list.addEventListener("remove", async ({ detail }) => {
    await options.remove(detail);
    showStatus();
  });
};

const addOption = async () => {
  const option = $addInput.value;
  if (!option) return;
  $list.addOption(option);
  await options.append(option);
  showStatus();
  $addInput.value = "";
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  addOption();
});
