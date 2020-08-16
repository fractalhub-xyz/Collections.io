export function debounce(fn, delay) {
  let timerID;

  return function (...args) {
    clearTimeout(timerID);
    setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
