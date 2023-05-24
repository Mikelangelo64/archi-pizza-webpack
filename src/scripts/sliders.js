import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';

const swipersInit = () => {
  const sliders = {};

  const swiperBanner = new Swiper('.slider-banner.swiper', {
    modules: [Navigation, Pagination],
    // If we need pagination
    pagination: {
      el: '.banner .banner__slider__controls .slider-banner-pagination',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.banner .banner__slider__controls .slider-banner-next',
      prevEl: '.banner .banner__slider__controls .slider-banner-prev',
    },

    slidesPerView: 1,
    spaceBetween: 30,
  });

  const swiperProductThumb = new Swiper('.product-slider-thumb.swiper', {
    slidesPerView: 4,
    spaceBetween: 18,
    freeMode: true,
    watchSlidesProgress: true,

    breakpoints: {
      550: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
  });

  const swiperProduct = new Swiper('.product-slider.swiper', {
    modules: [Navigation, Thumbs],

    // Navigation arrows
    navigation: {
      nextEl: '.product .product__slider__controls .slider-product-next',
      prevEl: '.product .product__slider__controls .slider-product-prev',
    },

    slidesPerView: 1,
    spaceBetween: 30,
    thumbs: {
      swiper: swiperProductThumb,
    },
  });

  const swiperCatqalog = new Swiper('.catalog-slider.swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      550: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
    },
  });

  sliders.banner = swiperBanner;
  sliders.product = swiperProduct;
  sliders.catalog = swiperCatqalog;
  return sliders;
};

export default swipersInit;
