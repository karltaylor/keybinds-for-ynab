export const immediate = (fn: () => void) => window.setTimeout(fn, 0);

export const waitForElement = (selector: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        console.log("Keys ready");
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
