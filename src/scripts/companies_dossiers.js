document.addEventListener('DOMContentLoaded', function () {
	function checkTextBoxFilling (textBox) {
		let closeSearchBtn = textBox.closest('.Search-companiesDossiers').querySelector('.Search_closeBtn');

		if (textBox.value.length) {
			closeSearchBtn.classList.remove('hidden');
		} else {
			closeSearchBtn.classList.add('hidden');
		}
	}

	document.addEventListener('click', function (e) {
		let applicationCloseBtn = e.target.closest('.Application_close');

		if (!applicationCloseBtn) return;

		applicationCloseBtn.closest('.Application').classList.add('hidden');
	});

	document.addEventListener('input', function (e) {
		let companiesSearchText = e.target.closest('.Search-companiesDossiers .Search_text');

		if (!companiesSearchText) return;

		checkTextBoxFilling(companiesSearchText);
	});

	document.addEventListener('click', function (e) {
		let closeSearchBtn = e.target.closest('.Search_closeBtn');

		if (!closeSearchBtn) return;

		let companiesSearchText = closeSearchBtn.closest('.Search-companiesDossiers').querySelector('.Search_text');
		companiesSearchText.value = '';
		companiesSearchText.focus();
		closeSearchBtn.classList.add('hidden');
		location.href = '/companies_dossiers.html';
	});

	checkTextBoxFilling(document.querySelector('.Search-companiesDossiers .Search_text'));

	$('[data-src="#CompanyAdding"]').fancybox({
		touch: false,
		baseClass: 'fancybox-container--no-padding'
	});
});