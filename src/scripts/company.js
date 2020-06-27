document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (e) {
		let closeRemark = e.target.closest('.Remark_close');

		if (!closeRemark) return;

		closeRemark.closest('.Remark').classList.add('hidden');
	});

	// Open/close control dropdown
	document.addEventListener('click', function (e) {
		let controlBtn = e.target.closest('.Control_btn');

		if (!controlBtn) return;

		let controlMenu = controlBtn.parentNode.querySelector('.Control_menu');
		controlMenu.classList.toggle('Control_menu-opened');
	});

	document.addEventListener('click', function (e) {
		let controlMenu = document.querySelector('.Control_menu');

		if (!controlMenu) return;

		let controlBtn = controlMenu.parentNode.querySelector('.Control_btn');

		if (controlMenu.classList.contains('Control_menu-opened') && !controlMenu.contains(e.target) && !controlBtn.contains(e.target)) {
			controlMenu.classList.remove('Control_menu-opened');
		}
	});
});