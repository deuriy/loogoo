document.addEventListener('DOMContentLoaded', function () {
	function changeOldPriceDisplay () {
		let oldPriceDisplay = document.querySelector('select[name="old_price_display"]');
		let oldPriceField = document.querySelector('.NumberField-oldPrice');

		if (oldPriceDisplay.value === 'no') {
			oldPriceField.hidden = true;
		} else if (oldPriceDisplay.value === 'yes') {
			oldPriceField.hidden = false;
		}
	}

	document.addEventListener('click', function (e) {
		let oldPriceDisplayDropdown = e.target.closest('.DropdownSelect-oldPriceDisplay');

		if (!oldPriceDisplayDropdown) return;

		changeOldPriceDisplay();
	});

	changeOldPriceDisplay();
	
});