// let vacancyThumbs = new Swiper('.VacancyImages_thumbs', {
//   spaceBetween: 8,
//   slidesPerView: 'auto',
//   touchRatio: 0.2,
//   slideToClickedSlide: true,
//   loop: true,
//   loopedSlides: 6,
//   navigation: {
//     nextEl: '.VacancyImages_thumbs .VacancyImages_next',
//     prevEl: '.VacancyImages_thumbs .VacancyImages_prev',
//   }
// });

// let vacancyGallery = new Swiper('.VacancyImages_gallery', {
//   spaceBetween: 4,
//   slidesPerView: 'auto',
// 	loop: true,
// 	loopedSlides: 6,
//   breakpoints: {
//     768: {
//       slidesPerView: 1,
//       spaceBetween: 8,
//     }
//   },
//   navigation: {
//     nextEl: '.VacancyImages_gallery .VacancyImages_next',
//     prevEl: '.VacancyImages_gallery .VacancyImages_prev',
//   },
//   thumbs: {
//     swiper: vacancyThumbs
//   }
// });

// vacancyGallery.on('slideChangeTransitionStart', function() {
//   vacancyThumbs.slideTo(vacancyGallery.activeIndex);
// });

// vacancyThumbs.on('transitionStart', function(){
//   vacancyGallery.slideTo(vacancyThumbs.activeIndex);
// });

// if (vacancyGallery && vacancyThumbs) {
//   vacancyGallery.controller.control = vacancyThumbs;
//   vacancyThumbs.controller.control = vacancyGallery;
// }

// let categoryMenuSticky = document.querySelector('.MenuSection-sticky .CategoryMenu');

// if (categoryMenuSticky) {
//   window.addEventListener('scroll', function (e) {
//     let scrollTop = document.documentElement.scrollTop;

//     if (scrollTop >= 20) {
//       categoryMenuSticky.classList.add('CategoryMenu-small');
//       categoryMenuSticky.parentNode.classList.add('MenuSection-small');
//     } else {
//       categoryMenuSticky.classList.remove('CategoryMenu-small');
//       categoryMenuSticky.parentNode.classList.remove('MenuSection-small');
//     }
//   });
// }


var galleryThumbs = new Swiper('.VacancyImages_thumbs', {
  spaceBetween: 8,
  slidesPerView: 6,
  freeMode: true,
  loop: true,
  loopedSlides: 6,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.VacancyImages_thumbs .VacancyImages_next',
    prevEl: '.VacancyImages_thumbs .VacancyImages_prev',
  }
});

var galleryTop = new Swiper('.VacancyImages_gallery', {
  spaceBetween: 4,
  loop: true,
  loopedSlides: 6,
  navigation: {
    nextEl: '.VacancyImages_gallery .VacancyImages_next',
    prevEl: '.VacancyImages_gallery .VacancyImages_prev',
  },
  thumbs: {
    swiper: galleryThumbs
  }
});

document.addEventListener('click', function (e) {
  let vacancyThumbsPrev = e.target.closest('.VacancyImages_thumbs .VacancyImages_prev');

  if (!vacancyThumbsPrev) return;

  galleryThumbs.slideTo(galleryThumbs.activeIndex - 5);
});

document.addEventListener('click', function (e) {
  let vacancyThumbsNext = e.target.closest('.VacancyImages_thumbs .VacancyImages_next');

  if (!vacancyThumbsNext) return;

  galleryThumbs.slideTo(galleryThumbs.activeIndex + 5);
});

// vacancyGallery.on('slideChangeTransitionStart', function() {
//   vacancyThumbs.slideTo(vacancyGallery.activeIndex);
// });
