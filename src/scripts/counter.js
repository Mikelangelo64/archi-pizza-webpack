const countersInit = () => {
  const counters = document.querySelectorAll('.product-counter');

  if (counters.length === 0) {
    return;
  }

  counters.forEach((counter) => {
    const plus = counter.querySelector('.product-counter__plus');
    const minus = counter.querySelector('.product-counter__minus');
    const input = counter.querySelector('.product-counter__input');

    if (!plus || !minus || !input) {
      return;
    }

    plus.addEventListener('click', () => {
      input.value = `${+input.value + 1}`;
    });

    minus.addEventListener('click', () => {
      input.value = `${+input.value === 1 ? 1 : +input.value - 1}`;
    });
  });
};

export default countersInit;
