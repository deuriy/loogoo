document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (e) {
		let applicationCloseBtn = e.target.closest('.Application_close');

		if (!applicationCloseBtn) return;

		applicationCloseBtn.closest('.Application').classList.add('hidden');
	});

	document.addEventListener('input', function (e) {
		let companiesSearchText = e.target.closest('.Search-companiesDossiers .Search_text');

		if (!companiesSearchText) return;

		let closeSearchBtn = companiesSearchText.closest('.Search-companiesDossiers').querySelector('.Search_closeBtn');
		if (companiesSearchText.value.length) {
			closeSearchBtn.classList.remove('hidden');
		} else {
			closeSearchBtn.classList.add('hidden');
		}
	});

	document.addEventListener('click', function (e) {
		let closeSearchBtn = e.target.closest('.Search_closeBtn');

		if (!closeSearchBtn) return;

		let companiesSearchText = closeSearchBtn.closest('.Search-companiesDossiers').querySelector('.Search_text');
		companiesSearchText.value = '';
		companiesSearchText.focus();
		closeSearchBtn.classList.add('hidden');
	});
});