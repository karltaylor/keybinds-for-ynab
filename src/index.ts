import { elementHasBeenRemoved } from "./elementHasBeenRemoved";
import { keybinds } from "./keybinds";
import { immediate, waitForElement, keyListener, incrementOrReset, logger } from "./utils";

const getRows = () => {
  const allRows = Array.from(document.querySelectorAll(".budget-table-cell-available"));
  const allButtons = allRows.map((row) => {
    return row.children[0];
  });

  const negativeOrCredit = allButtons.filter((btn) => {
    return btn.classList.contains("negative") || btn.classList.contains("credit");
  });

  return negativeOrCredit;
};

const execute = () => {
  let index = 0;
  let rows: Element[] | null = null;

  waitForElement(".js-budget-table-row").then(() => {
    rows = getRows();

    const underfundedListener = async () => {
      const underfundedButton = document.querySelector(
        ".budget-inspector-button.js-focus-on-start"
      );
      underfundedButton && (underfundedButton as HTMLElement).click();
      logger("Funding current budget item.");

      if (rows) {
        await elementHasBeenRemoved(rows[index]);
        rows = getRows();
      }
    };

    const nextListener = async () => {
      if (!rows) return;

      if (rows.length === 0) {
        window.alert("No more underfunded items.");
        return;
      }

      const current = rows[index];
      const row = current.parentElement?.parentElement;
      const input = row?.querySelector("input");

      immediate(() => row?.click());
      immediate(() => input?.blur());

      index = incrementOrReset(rows.length, index);
    };

    window.addEventListener("keydown", keyListener(keybinds.next, nextListener));
    window.addEventListener("keydown", keyListener(keybinds.underfunded, underfundedListener));
  });
};

execute();
