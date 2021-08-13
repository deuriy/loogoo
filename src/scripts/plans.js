const plansSwiper = new Swiper('.PlansSwiper', {
  slidesPerView: 'auto',
  spaceBetween: 12
});

// Hint
document.addEventListener('click', function (e) {
  let hintIcon = e.target.closest('.Hint_icon');

  if (!hintIcon) return;

  let hint = hintIcon.closest('.Hint');

  let openedHint = document.querySelector('.Hint-opened');
  if (openedHint && openedHint != hint) {
    openedHint.classList.remove('Hint-opened');
  }

  hint.classList.toggle('Hint-opened');

  e.preventDefault();
});

document.addEventListener('click', function (e) {
  let hintClose = e.target.closest('.Hint_close');

  if (!hintClose) return;

  let hint = hintClose.closest('.Hint');
  hint.classList.remove('Hint-opened');

  e.preventDefault();
});

document.addEventListener('click', function (e) {
  let hintWrapper = e.target.closest('.Hint');

  if (hintWrapper) return;

  let openedHint = document.querySelector('.Hint-opened');

  if (!openedHint) return;

  openedHint.classList.remove('Hint-opened');

  e.preventDefault();
});

// Hint popup
$('[data-src="#HintPopup"]').fancybox({
  baseClass: 'fancybox-container--hint',

  beforeLoad(instance, slide) {
    console.log(instance, slide);

    let hintIcon = this.opts.$orig[0];
    let hintTitle = hintIcon.closest('.BenefitsList_item').querySelector('.BenefitsList_itemTitle');
    let hintText = hintIcon.closest('.Hint').querySelector('.Hint_text');
    let hintPopupTitle = document.querySelector(`${this.src} .HintPopup_title`);
    let hintPopupText = document.querySelector(`${this.src} .HintPopup_text`);

    hintPopupTitle.textContent = hintTitle.textContent;
    hintPopupText.innerHTML = hintText.innerHTML;

    console.log(hintPopupText);
  }
});
