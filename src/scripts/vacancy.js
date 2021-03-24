let vacancyGallery = new Swiper('.VacancyImages_gallery', {
  spaceBetween: 4,
  slidesPerView: 'auto',
	loop: true,
	loopedSlides: 4,
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 8,
    }
  },
  navigation: {
    nextEl: '.VacancyImages_gallery .VacancyImages_next',
    prevEl: '.VacancyImages_gallery .VacancyImages_prev',
  }
});

let vacancyThumbs = new Swiper('.VacancyImages_thumbs', {
  spaceBetween: 8,
  slidesPerView: 'auto',
  touchRatio: 0.2,
  slideToClickedSlide: true,
	loop: true,
	loopedSlides: 4,
  navigation: {
    nextEl: '.VacancyImages_thumbs .VacancyImages_next',
    prevEl: '.VacancyImages_thumbs .VacancyImages_prev',
  }
});

vacancyGallery.controller.control = vacancyThumbs;
vacancyThumbs.controller.control = vacancyGallery;

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
