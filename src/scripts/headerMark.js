const markInit = () => {
  const header = document.querySelector('.header');
  if (!header) {
    return;
  }

  const mark = header.querySelector('.header__mark');
  const activePage = header.querySelector('.header .menu .menu__item.active');

  if (!mark || !activePage) {
    return;
  }

  let isFirst = true;

  const moveMark = () => {
    const rect = activePage.getBoundingClientRect();
    const leftPosition = rect.left;
    const { width } = rect;

    mark.style.left = `${Math.ceil(leftPosition) + 8}px`;
    mark.style.width = `${Math.ceil(width) - 16}px`;
  };

  const setPositionWidth = () => {
    if (isFirst) {
      setTimeout(() => {
        moveMark();
        mark.style.opacity = 1;
        isFirst = false;
      }, 300);
    } else {
      moveMark();
    }
  };

  if (document.body.clientWidth >= 1650) {
    setPositionWidth();
    window.addEventListener('resize', setPositionWidth);
  }

  const breakpoint = '(max-width: 1649px)';
  const breakpointList = window.matchMedia(breakpoint);

  breakpointList.addEventListener('change', (evt) => {
    if (evt.matches) {
      window.removeEventListener('resize', setPositionWidth);
      mark.style.opacity = 0;
      isFirst = true;
    } else {
      window.addEventListener('resize', setPositionWidth);
    }
  });
};

export default markInit;
