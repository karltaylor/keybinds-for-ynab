export const elementHasBeenRemoved = async (element: Element) => {
  return new Promise((yes) => {
    const observer = new MutationObserver((mutations) => {
      // Check if attributeName includes "class"
      // If it is we can remove it from our "rows" list
      const find = mutations.find((el) => el.attributeName === "class");
      if (find) yes(void 0);
    });

    observer.observe(element, {
      attributes: true,
    });
  });
};
