// SWIPER

const swiperGeneral = new Swiper(".swiper-cards-secondary .swiper", {
  loop: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 24,
  autoHeight: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 24,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
      centeredSlides: false,
    },
  },
});
