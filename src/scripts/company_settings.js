document.addEventListener('DOMContentLoaded', function () {
	// Add office field
	document.addEventListener('click', function (e) {
		let addOfficeLink = e.target.closest('.AddFieldItem-office');

		if (!addOfficeLink) return;

		let fieldItems = addOfficeLink.closest('.CompanySettings_fieldContent').querySelector('.CompanySettings_fieldItems');

		let select = fieldItems.firstElementChild.querySelector('select').cloneNode(true);
		select.classList.remove('hidden');

		let dropdownSelect = document.createElement('div');
		dropdownSelect.className = 'DropdownSelect DropdownSelect-companySettings CompanySettings_dropdownSelect';
		dropdownSelect.append(select);

		let formText = fieldItems.firstElementChild.querySelector('.CompanySettings_formText').cloneNode(true);

		let newFieldItem = document.createElement('div');
		newFieldItem.className = 'CompanySettings_fieldItem';
		newFieldItem.append(dropdownSelect, formText);
		newFieldItem.insertAdjacentHTML('beforeend', '<a href="javascript:;" class="CompanySettings_removeFieldItem"></a>');

		fieldItems.insertAdjacentElement('beforeend', newFieldItem);

		$('.DropdownSelect_select').fSelect('reload');
	});

	// Add phone field
	document.addEventListener('click', function (e) {
		let addPhoneLink = e.target.closest('.AddFieldItem-phone');

		if (!addPhoneLink) return;

		let fieldItems = addPhoneLink.closest('.CompanySettings_fieldContent').querySelector('.CompanySettings_fieldItems');
		let newFieldItem = fieldItems.firstElementChild.cloneNode(true);
		fieldItems.append(newFieldItem);

		newFieldItem.insertAdjacentHTML('beforeend', '<a href="javascript:;" class="CompanySettings_removeFieldItem"></a>');		
	});

	// Add days week field
	document.addEventListener('click', function (e) {
		let addDaysWeekLink = e.target.closest('.AddFieldItem-daysWeek');

		if (!addDaysWeekLink) return;

		let fieldItems = addDaysWeekLink.closest('.CompanySettings_fieldContent').querySelector('.CompanySettings_fieldItems');
		let fieldItemsNumber = fieldItems.children.length;
		console.log(fieldItemsNumber);

		let select = fieldItems.firstElementChild.querySelector('select').cloneNode(true);
		select.classList.remove('hidden');

		let dropdownSelect = document.createElement('div');
		dropdownSelect.className = 'DropdownSelect DropdownSelect-companySettings DropdownSelect-daysWeek CompanySettings_dropdownSelect';
		dropdownSelect.append(select);

		let timeRangeDropdowns = fieldItems.firstElementChild.querySelectorAll('.TimeRangeDropdown');
		let timeRangeDropdownsCloned = [];

		for (let timeRangeDropdown of timeRangeDropdowns) {
			timeRangeDropdownsCloned.push(timeRangeDropdown.cloneNode(true));
		}

		let newFieldItem = document.createElement('div');
		newFieldItem.className = 'CompanySettings_fieldItem';
		newFieldItem.append(dropdownSelect, ...timeRangeDropdownsCloned);
		newFieldItem.insertAdjacentHTML('beforeend', '<a href="javascript:;" class="CompanySettings_removeFieldItem"></a>');

		fieldItems.insertAdjacentElement('beforeend', newFieldItem);

		$(select).fSelect({
			placeholder: 'Дни недели',
			overflowText: '{n} выбрано',
			showSearch: false
		});
	});

	// Add post field
	document.addEventListener('click', function (e) {
		let addPostLink = e.target.closest('.AddFieldItem-post');

		if (!addPostLink) return;

		let fieldItemsPostWrapper =  addPostLink.closest('.CompanySettings_fieldContent').querySelector('.CompanySettings_fieldItems');
		let fieldItemsPost = fieldItemsPostWrapper.querySelectorAll('.CompanySettings_fieldItem-post');
		let newFieldItem = fieldItemsPost[0].cloneNode(true);
		// let textFields = fieldItems.children;
		console.log(fieldItemsPost);
		fieldItemsPostWrapper.append(newFieldItem);

		// for (let fieldItemPost of fieldItemsPost) {
		// 	// statement
		// }

		newFieldItem.insertAdjacentHTML('beforeend', '<a href="javascript:;" class="CompanySettings_removeFieldItem"></a>');		
	});

	// Add alternative address
	document.addEventListener('click', function (e) {
		let altAddress = e.target.closest('.AddFieldItem-altAddress');

		if (!altAddress) return;

		let targetSelector = altAddress.getAttribute('href');
		let targetElement = document.querySelector(targetSelector);

		if (targetElement.style.display == 'none') {
			targetElement.style.display = 'block';
		} else {
			targetElement.style.display = 'none';
		}

		e.preventDefault();
	});

	// Remove additional fields
	document.addEventListener('click', function (e) {
		let removeFieldItemLink = e.target.closest('.CompanySettings_removeFieldItem');

		if (!removeFieldItemLink) return;

		removeFieldItemLink.closest('.CompanySettings_fieldItem').remove();
	});

	// Hide address creation block
	document.addEventListener('click', function (e) {
		let cancelAddressCreation = e.target.closest('.CreateAddress_link-cancel');

		if (!cancelAddressCreation) return;

		cancelAddressCreation.closest('.CreateAddress').style.display = 'none';
		e.preventDefault();
	});

	document.addEventListener('click', function (e) {
		let timeRangeDropdownLabel = e.target.closest('.TimeRangeDropdown_label');

		if (!timeRangeDropdownLabel) return;

		let timeRangeDropdown = timeRangeDropdownLabel.parentNode.querySelector('.TimeRangeDropdown_dropdown');

		timeRangeDropdown.classList.toggle('TimeRangeDropdown_dropdown-opened');
	});

	document.addEventListener('click', function (e) {
		let timeRangeDropdowns = document.querySelectorAll('.TimeRangeDropdown_dropdown');

		if (!timeRangeDropdowns) return;

		for (let timeRangeDropdown of timeRangeDropdowns) {
			let timeRangeDropdownLabel = timeRangeDropdown.parentNode.querySelector('.TimeRangeDropdown_label');

			if (timeRangeDropdown.classList.contains('TimeRangeDropdown_dropdown-opened') && !timeRangeDropdown.contains(e.target) && !timeRangeDropdownLabel.contains(e.target)) {
				timeRangeDropdown.classList.remove('TimeRangeDropdown_dropdown-opened');
			}
		}
	});

	let timeRangeFrom = '';
	let timeRangeTo = '';

	document.addEventListener('change', function (e) {
		let timeRangeDropdownTime = e.target.closest('.TimeRangeDropdown_time');

		if (!timeRangeDropdownTime) return;

		let timeRangeDropdownLabel = timeRangeDropdownTime.closest('.TimeRangeDropdown').querySelector('.TimeRangeDropdown_label');

		if (timeRangeDropdownTime.classList.contains('TimeRangeDropdown_time-from')) {
			timeRangeFrom = timeRangeDropdownTime.value;
		}

		if (timeRangeDropdownTime.classList.contains('TimeRangeDropdown_time-to')) {
			timeRangeTo = timeRangeDropdownTime.value;
		}

		if (timeRangeDropdownTime.value) {
			timeRangeDropdownTime.classList.add('TimeRangeDropdown_time-notEmpty');
		} else {
			timeRangeDropdownTime.classList.remove('TimeRangeDropdown_time-notEmpty');
		}

		console.log(timeRangeDropdownTime.value);
		// if (timeRangeDropdownTime.value) {}
		
		timeRangeDropdownLabel.textContent = timeRangeFrom + '-' + timeRangeTo;
	});

	document.addEventListener('click', function (e) {
		let checkboxTimeRange = e.target.closest('.Checkbox-timeRangeDropdown');

		if (!checkboxTimeRange) return;

		let isClockAround = checkboxTimeRange.querySelector('.Checkbox_input');

		// console.log(isClockAround.checked);
		let timeRangeDropdown = checkboxTimeRange.closest('.TimeRangeDropdown');
		let timeRangeDropdownLabel = timeRangeDropdown.querySelector('.TimeRangeDropdown_label');
		let checkboxTimeRangeLabel = checkboxTimeRange.querySelector('.Checkbox_label').textContent;

		let timeRangeInputFrom = timeRangeDropdown.querySelector('.TimeRangeDropdown_time-from');
		let timeRangeInputTo = timeRangeDropdown.querySelector('.TimeRangeDropdown_time-to');

		if (isClockAround.checked) {
			timeRangeDropdownLabel.textContent = checkboxTimeRangeLabel;
		} else {
			timeRangeDropdownLabel.textContent = timeRangeFrom + '-' + timeRangeTo;
		}
	});

	// $('.DropdownSelect-daysWeek .DropdownSelect_select').fSelect('reload');
	
});