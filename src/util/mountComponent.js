import createElement from "./createElement";

export default function(options) {
  "use strict";
  let { elId, vm, toggleEl } = options;

  const el = document.getElementById(elId);
  // Flag toggleEl determina comportamento nel caso componente esiste già
  // Se toggleEl=true e componente esiste già non lo sostituisco ma lo rendo visibile/invisibile
  if (toggleEl && el) {
    el.style.display =
      el.style.display === "none" || !el.style.display ? "block" : "none";
  } else {
    const el = createElement(options);
    vm.$mount(el);
  }

  return vm;
}
