document.addEventListener('DOMContentLoaded', function () {
	function copyInputText (targetElem) {
	  targetElem.select();
	  targetElem.setSelectionRange(0, 99999);

	  document.execCommand("copy");
	}

	let bonusLink = document.querySelector('#BonusLink');
	bonusLink.onclick = function () {
		copyInputText(this);
	};

	let btnCopy = document.querySelector('.BonusForm_btnCopy');
	btnCopy.onclick = function () {
		copyInputText(bonusLink);
	};

	let moreLink = document.querySelector('.ProfileContent_moreLink');
	if (moreLink) {
		moreLink.onclick = function (e) {
			let moreText = this.closest('.ProfileContent').querySelector('.ProfileContent_moreText');

			if (moreText.classList.contains('ProfileContent_moreText-visible')) {
				moreText.classList.remove('ProfileContent_moreText-visible');
				this.textContent = 'Показать больше';
			} else {
				moreText.classList.add('ProfileContent_moreText-visible');
				this.textContent = 'Скрыть';
			}
			
			e.preventDefault();
		}
	}
});