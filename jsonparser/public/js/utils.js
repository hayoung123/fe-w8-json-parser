// const curry = (fn) => (arg, ...args) =>
//   args.length ? fn(arg, ...args) : (...args) => fn(arg, ...args);

const _ = {
  add: (target, className) => target.classList.add(className),

  remove: (target, className) => target.classList.remove(className),

  toggle: (target, className) => target.classList.toggle(className),

  replace: (target, oldClassName, newClassName) =>
    target.classList.replace(oldClassName, newClassName),
  $: (selector, base = document) => base.querySelector(selector),

  $A: (selector, base = document) => base.querySelectorAll(selector),

  on: (target, type, listener, useCapture = false) =>
    target.addEventListener(type, listener, useCapture),

  delay: (time) => new Promise((resolve) => setTimeout(() => resolve(), time)),

  go: (arg, ...fns) => fns.reduce((res, fn) => fn(res), arg),

  pipe: (fn, ...fns) => (...args) => _.go(fn(...args), ...fns),
};

export default _;
