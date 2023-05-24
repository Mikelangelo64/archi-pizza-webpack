import { gsap } from 'gsap';

const makeTimeline = (item) => {
  const timelineFaq = gsap.timeline({
    defaults: { duration: 0.6, ease: 'power4.inOut' },
  });
  timelineFaq.to(item, { height: 'auto' }).to(item, { opacity: 1 }, '<0.3');

  return timelineFaq;
};

// additional footer accordion
const initAccordionAnimations = (accordionDetails, accordionAnimations) => {
  if (accordionDetails.length === 0) {
    return;
  }
  accordionDetails.forEach((item) => {
    const itemAnimation = makeTimeline(item);
    itemAnimation.pause();
    accordionAnimations.push(itemAnimation);
  });
};

const initAccordionButtonListeners = (
  accordionBtns,
  accordionButtonHandler
) => {
  if (accordionBtns.length === 0) {
    return;
  }

  accordionBtns.forEach((item) => {
    item.addEventListener('click', accordionButtonHandler);
  });
};

const resetAccordionAnimations = (
  accordionBtns,
  accordionButtonHandler,
  accordionDetails,
  accordionAnimations
) => {
  if (accordionBtns.length === 0 && accordionDetails.length === 0) {
    return;
  }

  accordionDetails.forEach((item) => {
    const element = item;
    element.style = '';
  });

  accordionBtns.forEach((item, index) => {
    const parent = item.parentElement.parentElement.parentElement;
    if (!parent) {
      return;
    }
    // console.log(accordionAnimations);
    accordionAnimations[index].kill();
    // console.log(accordionButtonListeners);
    item.removeEventListener('click', accordionButtonHandler);

    parent.classList.remove('_active');
  });

  accordionAnimations.splice(0, accordionAnimations.length);
};

const faqInit = () => {
  const faqBtns = document.querySelectorAll('.faq-list__summary');
  const faqDetails = document.querySelectorAll('.faq-list__details');
  const animations = [];

  if (faqDetails.length !== 0) {
    Array.from(faqDetails).forEach((item) => {
      const itemAnimation = makeTimeline(item);
      itemAnimation.pause();
      animations.push(itemAnimation);
    });
  }

  if (faqBtns.length !== 0) {
    faqBtns.forEach((item, index) => {
      item.addEventListener('click', (evt) => {
        evt.preventDefault();
        const parent = item.parentElement.parentElement;
        if (!parent) {
          return;
        }

        if (parent.classList.contains('_active')) {
          animations[index].reverse();
        } else {
          animations[index].play();
        }
        parent.classList.toggle('_active');
      });
    });
  }

  // additional footer accordion
  const accordionBtns = document.querySelectorAll('.footer-accordion__summary');
  const accordionDetails = document.querySelectorAll(
    '.footer-accordion__details'
  );
  const accordionAnimations = [];
  // const accordionButtonListeners = [];

  const accordionButtonHandler = (evt) => {
    evt.preventDefault();
    // console.log('listener!', evt.target);
    const parent = evt.target.parentElement.parentElement.parentElement;
    if (!parent) {
      return;
    }

    const { index } = parent.dataset;
    // console.log(index);

    if (parent.classList.contains('_active')) {
      accordionAnimations[index].reverse();
    } else {
      accordionAnimations[index].play();
    }
    parent.classList.toggle('_active');
  };

  const footerAccordionBreakpoint = '(max-width: 899px)';
  const footerAccrdionBreakpointList = window.matchMedia(
    footerAccordionBreakpoint
  );

  if (document.body.clientWidth < 900) {
    initAccordionAnimations(accordionDetails, accordionAnimations);
    initAccordionButtonListeners(accordionBtns, accordionButtonHandler);
  }

  footerAccrdionBreakpointList.addEventListener('change', (evt) => {
    if (evt.matches) {
      initAccordionAnimations(accordionDetails, accordionAnimations);
      initAccordionButtonListeners(accordionBtns, accordionButtonHandler);
    } else {
      resetAccordionAnimations(
        accordionBtns,
        accordionButtonHandler,
        accordionDetails,
        accordionAnimations
      );
    }
  });
};

export default faqInit;
