import { gsap } from 'gsap';

const makeTimelinePopup = (item) => {
  const popupInner = item.querySelector('.popup__scroll');
  if (!popupInner) {
    return undefined;
  }

  const timelinePopup = gsap.timeline({
    defaults: { duration: 0.3, ease: 'power4.inOut' },
  });
  timelinePopup
    .from(item, { display: 'none' })
    .to(item, { display: 'flex', duration: 0.01 })
    .from(item, { opacity: 0 })
    .to(item, { opacity: 1 });

  return timelinePopup;
};

// open popup

const openPopup = (evt, popupAnimations) => {
  const popupClass = evt.target.dataset.popup;
  const popup = document.querySelector(`[data-popupname=${popupClass}]`);

  popupAnimations[popupClass].play();

  popup.classList.add('_opened');
  document.querySelector('html').classList.add('_lock');
  document.querySelector('body').classList.add('_lock');
};

// close popup
const closePopup = (popup, popupAnimations) => {
  if (!popup.classList.contains('_opened')) {
    return;
  }

  popup.classList.remove('_opened');
  const popupClass = popup.dataset.popupname;
  // console.dir(popup.dataset.popupname);
  popupAnimations[popupClass].reverse();

  document.querySelector('html').classList.remove('_lock');
  document.querySelector('body').classList.remove('_lock');
};

const popupsInit = () => {
  // init animation
  const popupAnimations = {};
  const popups = document.querySelectorAll('.popup');

  if (popups.length !== 0) {
    popups.forEach((popup) => {
      const timeline = makeTimelinePopup(popup);
      timeline.pause();
      popupAnimations[popup.dataset.popupname] = timeline;
    });
  }

  // open popup
  const popupOpenBtns = document.querySelectorAll('.popup-open');

  if (popupOpenBtns.length !== 0) {
    popupOpenBtns.forEach((item) => {
      item.addEventListener('click', (evt) => {
        evt.preventDefault();
        openPopup(evt, popupAnimations);
      });
    });
  }

  // close popup
  const popupCloseBtns = document.querySelectorAll('.popup__close');
  const popupArr = document.querySelectorAll('.popup');

  if (popupCloseBtns) {
    Array.from(popupCloseBtns).forEach((item) => {
      item.addEventListener('click', function closeHandler(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const popup = this.parentElement.parentElement.parentElement;
        closePopup(popup, popupAnimations);
      });
    });
  }

  if (popupArr) {
    Array.from(popupArr).forEach((popup) => {
      const wrapper = popup.querySelector('.popup__wrapper');
      if (!wrapper) {
        return;
      }

      const listener = (event) => {
        if (!wrapper.contains(event.target) && event.which === 1) {
          closePopup(popup, popupAnimations);
        }
      };

      document.addEventListener('mousedown', listener);
    });

    window.addEventListener('keydown', function closeHandler(evt) {
      if (evt.keyCode === 27) {
        const popup = document.querySelector('.popup._opened');
        if (popup) {
          closePopup(popup, popupAnimations);
        }
      }
    });
  }
};

export default popupsInit;
