import { isMobile } from './config/isMobile';
import swipersInit from './sliders';
import popupsInit from './popup';
import fancyboxInit from './fancybox';
import faqInit from './faq';
import useObserver from './config/useObserver';
import countersInit from './counter';
import markInit from './headerMark';

const init = () => {
  if (isMobile.any()) {
    document.querySelector('body').classList.add('v-mobile');
    document.querySelector('html').classList.add('v-mobile');
  } else {
    document.querySelector('body').classList.add('v-desk');
    document.querySelector('html').classList.add('v-desk');
  }

  // normal vh
  let vh = window.innerHeight * 0.01;
  document.body.style.setProperty('--vh', `${vh}px`);

  let vw = document.body.clientWidth * 0.01;
  document.body.style.setProperty('--vw', `${vw}px`);

  window.addEventListener('resize', () => {
    if (vh !== window.innerHeight * 0.01 || document.body.clientWidth >= 900) {
      vh = window.innerHeight * 0.01;
      document.body.style.setProperty('--vh', `${vh}px`);
    }

    if (vw !== document.body.clientWidth * 0.01) {
      vw = document.body.clientWidth * 0.01;
      document.body.style.setProperty('--vw', `${vw}px`);
    }
  });

  popupsInit();
  swipersInit();
  fancyboxInit();
  faqInit();
  countersInit();
  markInit();

  const footerBg = document.querySelector('.footer-bg');
  const faqBg = document.querySelector('.faq-bg');

  const observeIn = (elementObserve) => elementObserve.classList.add('visible');
  const observeOut = (elementObserve) =>
    elementObserve.classList.remove('visible');

  if (footerBg) {
    useObserver(footerBg, observeIn, observeOut);
  }
  if (faqBg) {
    useObserver(faqBg, observeIn, observeOut);
  }
};

export default init;
