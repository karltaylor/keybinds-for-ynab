import { keybinds } from "./keybinds";
import { immediate, waitForElement } from "./utils";

// Run check immmediately
const execute = () => {
  waitForElement(".js-budget-table-row").then(() => {
    const allRows = Array.from(document.querySelectorAll(".budget-table-cell-available"));
    const allButtons = allRows.map((row) => {
      return row.children[0];
    });

    const negativeOrCredit = allButtons.filter((btn) => {
      return btn.classList.contains("negative") || btn.classList.contains("credit");
    });

    console.log(negativeOrCredit);
  });
};
execute();

const keyListener = (key: string, fn: () => void) => (e: KeyboardEvent) => {
  if (e.key === key) {
    fn();
  }
};

const underfundedListener = () => {
  const underfundedButton = document.querySelector(".budget-inspector-button.js-focus-on-start");
  underfundedButton && (underfundedButton as HTMLElement).click();
  console.log("Keybinds for YNAB: Funding current budget item.");
};

const nextListener = () => {
  const btn = document.querySelector(".js-budget-available-number.negative");
  if (!btn) return;

  const row = btn.parentElement?.parentElement;
  const input = row?.querySelector("input");

  /**
   * setTimeout to avoid entering the letter "n"
   */
  immediate(() => row?.click());
  immediate(() => input?.blur());

  window.addEventListener("keydown", keyListener(keybinds.underfunded, underfundedListener));

  console.log("Keybinds for YNAB: Finding next underfunded budget item.");
};

window.addEventListener("keydown", keyListener(keybinds.next, nextListener));
