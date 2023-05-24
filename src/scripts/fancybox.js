import { Fancybox } from '@fancyapps/ui';

const fancyboxInit = () => {
  Fancybox.bind('[data-fancybox="gallery"]', {
    ...Fancybox.defaults,
    dragToClose: false,
    backdropClick: 'close',
    compact: false,

    Toolbar: {
      absolute: true,
      display: {
        left: [],
        middle: [],
        right: ['close'],
      },
    },

    Thumbs: {
      type: 'classic',
    },

    Carousel: {
      transition: 'crossfade',
      breakpoints: {
        '(max-width: 900px)': {
          Navigation: false,
        },
      },
    },
  });

  Fancybox.bind('[data-fancybox="product"]', {
    ...Fancybox.defaults,
    dragToClose: false,
    backdropClick: 'close',
    compact: false,

    Toolbar: {
      absolute: true,
      display: {
        left: [],
        middle: [],
        right: ['close'],
      },
    },

    Thumbs: {
      type: 'classic',
    },

    Carousel: {
      transition: 'crossfade',
      breakpoints: {
        '(max-width: 900px)': {
          Navigation: false,
        },
      },
    },

    Images: {
      // Disable animation from/to thumbnail on start/close
      zoom: false,
    },
  });
};

export default fancyboxInit;
