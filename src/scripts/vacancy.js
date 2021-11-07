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

function initSwiperImagesNumber (swiper) {
  let slider = swiper.$el[0],
  sliderWrapper = slider.closest('.Swiper'),
  slidesCount = sliderWrapper.querySelectorAll('.Swiper_gallery .swiper-slide:not(.swiper-slide-duplicate)').length,
  photosNumber = sliderWrapper.querySelector('.VacancyImages_photosNumber');

  sliderWrapper.classList.add('Swiper-initialized');
  photosNumber.querySelector('.PhotosNumber_current').textContent = 1;
  photosNumber.querySelector('.PhotosNumber_all').textContent = slidesCount;
}

function changeCurrentImageNumber (swiper) {
  let photosNumber = swiper.$el[0].closest('.Swiper').querySelector('.VacancyImages_photosNumber');
  let currentSlideNumber = Number(swiper.$el[0].querySelector('.Swiper_gallery .swiper-slide-active').dataset.swiperSlideIndex) + 1;
  photosNumber.querySelector('.PhotosNumber_current').textContent = currentSlideNumber;
}

document.addEventListener('DOMContentLoaded', function () {
  const countThumbSlides = $(".VacancyImages_thumbs .swiper-slide").length;
  
  const galleryThumbs = new Swiper('.VacancyImages_thumbs', {
    spaceBetween: 8,
    slidesPerView: 6,
    loop: countThumbSlides > 6,
    init: false,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.VacancyImages_thumbs .VacancyImages_next',
      prevEl: '.VacancyImages_thumbs .VacancyImages_prev',
    }
  });

  galleryThumbs.on('afterInit', function () {
    let slidesLength = galleryThumbs.el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;

    if (slidesLength < 7) {
      galleryThumbs.navigation.destroy();
      galleryThumbs.allowTouchMove = false;
      galleryThumbs.el.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach(element => {
        element.remove();
      });
    }
  });
  galleryThumbs.init();
  
  const galleryTop = new Swiper('.VacancyImages_gallery', {
    spaceBetween: 4,
    // loop: true,
    // loopedSlides: 6,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.VacancyImages_gallery .VacancyImages_next',
      prevEl: '.VacancyImages_gallery .VacancyImages_prev',
    },
    thumbs: {
      swiper: galleryThumbs
    },
    on: {
      init: function () {
        initSwiperImagesNumber(this);
        console.log('Init');
      },
    },
  });

  galleryTop.on('slideChange', function () {
    setTimeout(() => changeCurrentImageNumber(this), 0);
  });

  // document.addEventListener('click', function (e) {
  //   let vacancyThumbsPrev = e.target.closest('.VacancyImages_thumbs .VacancyImages_prev');
  
  //   if (!vacancyThumbsPrev) return;
  
  //   galleryThumbs.slideTo(galleryThumbs.activeIndex - 5);
  // });
  
  // document.addEventListener('click', function (e) {
  //   let vacancyThumbsNext = e.target.closest('.VacancyImages_thumbs .VacancyImages_next');
  
  //   if (!vacancyThumbsNext) return;
  
  //   galleryThumbs.slideTo(galleryThumbs.activeIndex + 5);
  // });
  
  // galleryTop.on('slideChangeTransitionStart', function() {
  //   vacancyThumbs.slideTo(galleryTop.activeIndex);
  // });

  // document.addEventListener('click', function (e) {
  //   let vacancyMoreLink = e.target.closest('.Vacancy_moreLink');

  //   if (!vacancyMoreLink) return;

  //   let vacancyTextTruncated = vacancyMoreLink.closest('.Vacancy_text').querySelector('.Vacancy_truncated');
  //   vacancyTextTruncated.classList.remove('Vacancy_truncated');
  //   vacancyMoreLink.classList.add('hidden');
  // });
});




