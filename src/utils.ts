export const immediate = (fn: () => void) => window.setTimeout(fn, 0);

export const waitForElement = (selector: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        logger("Keys ready");
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

export const keyListener = (key: string, fn: () => void) => (e: KeyboardEvent) => {
  if (e.key === key) {
    fn();
  }
};

export const incrementOrReset = (length: number, index: number) => {
  return length - 1 === index ? 0 : index + 1;
};

export const logger = (message: string, ...args: any) => {
  if (args) {
    return console.log("@ynab-keys:", message, args.join(""));
  }

  console.log("@ynab-keys:", message);
};
