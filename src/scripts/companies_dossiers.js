document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (e) {
		let applicationCloseBtn = e.target.closest('.Application_close');

		if (!applicationCloseBtn) return;

		applicationCloseBtn.closest('.Application').classList.add('hidden');
	});

	
});