import { flushSync } from "react-dom";

export const useTransitionApi = (callback) => {
  return (...args) => {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => {
        flushSync(() => callback(...args));
      });
    } else {
      callback(...args);
    }
  };
};