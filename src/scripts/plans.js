const plansSwiper = new Swiper('.PlansSwiper', {
  slidesPerView: 'auto',
  spaceBetween: 12
});

function checkHintPosition (hint) {
  if (!hint) return;
  
  let hintIcon = hint.querySelector('.Hint_icon');
  let hintWrapper = hint.querySelector('.Hint_wrapper');

  if (!hintIcon || !hintWrapper) return;

  hint.classList.remove('Hint-top', 'Hint-bottom', 'Hint-left', 'Hint-largeWidth');

  let coords = hintIcon.getBoundingClientRect();
  let windowHeight = document.documentElement.clientHeight;
  let offsetBottom = windowHeight - coords.bottom - hintIcon.offsetHeight - hintWrapper.offsetHeight - 20;
  let offsetTop = hintIcon.getBoundingClientRect().top - hintWrapper.offsetHeight;
  let offsetLeft = hintWrapper.getBoundingClientRect().left;

  if (offsetBottom < 0 && offsetTop < 0) {
    hint.classList.add('Hint-largeWidth');
  }

  if (offsetBottom < 0) {
    hint.classList.add('Hint-top');
  } 

  if (offsetLeft < 0 || hint.classList.contains('Hint-largeWidth')) {
    hint.classList.add('Hint-left');
  }
}

document.querySelectorAll('.Hint').forEach(checkHintPosition);

// Hint
document.addEventListener('mouseover', function (e) {
  let hint = e.target.closest('.Hint');

  if (!hint) return;

  hint.classList.add('Hint-opened');
  checkHintPosition(hint);

  e.preventDefault();
});

document.addEventListener('mouseout', function (e) {
  let hint = e.target.closest('.Hint');

  if (!hint) return;

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
