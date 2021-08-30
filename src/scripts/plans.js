const plansSwiper = new Swiper('.PlansSwiper', {
  slidesPerView: 'auto',
  spaceBetween: 12
});

// Hint
document.addEventListener('mouseover', function (e) {
  let hint = e.target.closest('.Hint');

  if (!hint) return;

  hint.classList.add('Hint-opened');

  e.preventDefault();
});

document.addEventListener('mouseout', function (e) {
  let hint = e.target.closest('.Hint');

  if (!hint) return;

  hint.classList.remove('Hint-opened');

  e.preventDefault();
});

document.addEventListener('click', function (e) {
  let hintClose = e.target.closest('.Hint_close');

  if (!hintClose) return;

  let hint = hintClose.closest('.Hint');
  hint.classList.remove('Hint-opened');

  e.preventDefault();
});

// Hint popup
$('[data-src="#HintPopup"]').fancybox({
  baseClass: 'fancybox-container--hint',

  beforeLoad(instance, slide) {
    let hintIcon = this.opts.$orig[0];
    let hintTitle = hintIcon.closest('.BenefitsList_item').querySelector('.BenefitsList_itemTitle');
    let hintText = hintIcon.closest('.Hint').querySelector('.Hint_text');
    let hintPopupTitle = document.querySelector(`${this.src} .HintPopup_title`);
    let hintPopupText = document.querySelector(`${this.src} .HintPopup_text`);

    hintPopupTitle.textContent = hintTitle.textContent;
    hintPopupText.innerHTML = hintText.innerHTML;
  }
});
