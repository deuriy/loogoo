/*=require ./includes/blocks/*.js*/

document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (e) {
		let bonusLink = e.target.closest('#BonusLink');
		let btnCopy = e.target.closest('.BonusForm_btnCopy');

		if (!bonusLink && !btnCopy) return;

		if (btnCopy) {
			bonusLink = document.querySelector('#BonusLink');
		}

		copyInputText(bonusLink);
	});

	document.addEventListener('click', function (e) {
		let moreLink = e.target.closest('.ProfileContent_moreLink');

		if (!moreLink) return;

		let moreText = moreLink.closest('.ProfileContent').querySelector('.ProfileContent_moreText');

		if (moreText.classList.contains('ProfileContent_moreText-visible')) {
			moreText.classList.remove('ProfileContent_moreText-visible');
			moreLink.textContent = 'Показать больше';
		} else {
			moreText.classList.add('ProfileContent_moreText-visible');
			moreLink.textContent = 'Скрыть';
		}
		
		e.preventDefault();
	});
});