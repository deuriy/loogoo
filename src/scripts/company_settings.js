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
		newFieldItem.className = 'CompanySettings_fieldItem CompanySettings_fieldItem-additional';
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
		newFieldItem.classList.add('CompanySettings_fieldItem-additional');
		fieldItems.append(newFieldItem);

		newFieldItem.insertAdjacentHTML('beforeend', '<a href="javascript:;" class="CompanySettings_removeFieldItem"></a>');		
	});

	// Add days week field
	document.addEventListener('click', function (e) {
		let addDaysWeekLink = e.target.closest('.AddFieldItem-daysWeek');

		if (!addDaysWeekLink) return;

		let fieldItems = addDaysWeekLink.closest('.CompanySettings_fieldContent').querySelector('.CompanySettings_fieldItems');
		let fieldItemsNumber = fieldItems.children.length;

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
		newFieldItem.className = 'CompanySettings_fieldItem CompanySettings_fieldItem-additional';
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

		let currentFieldItem = addPostLink.closest('.CompanySettings_field');

		currentFieldItem.insertAdjacentHTML('beforebegin', '<div class="CompanySettings_field CompanySettings_field-post"><div class="CompanySettings_fieldContent"><div class="CompanySettings_fieldItems"><div class="CompanySettings_fieldItem CompanySettings_fieldItem-post"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="post" placeholder="должность"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="surname" placeholder="Фамилия"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="name" placeholder="Имя"><input class="CompanySettings_formText CompanySettings_formText-col4" type="text" name="patronym" placeholder="Отчество"><a class="CompanySettings_removeFieldItem" href="javascript:;"></a></div></div></div></div>');
	});

	// Add alternative address
	document.addEventListener('click', function (e) {
		let altAddress = e.target.closest('.AddFieldItem-altAddress');

		if (!altAddress) return;

		let targetSelector = altAddress.getAttribute('href');
		let targetElement = document.querySelector(targetSelector);

		targetElement.classList.toggle('hidden');

		e.preventDefault();
	});

	// Remove additional fields
	document.addEventListener('click', function (e) {
		let removeFieldItemLink = e.target.closest('.CompanySettings_removeFieldItem');

		if (!removeFieldItemLink) return;

		let parentField = removeFieldItemLink.closest('.CompanySettings_field');

		if (!parentField.classList.contains('CompanySettings_field-post')) {
			removeFieldItemLink.closest('.CompanySettings_fieldItem').remove();
		} else {
			parentField.remove();
		}
	});

	// Hide address creation block
	document.addEventListener('click', function (e) {
		let cancelAddressCreation = e.target.closest('.CreateAddress_link-cancel, .CreateAddress_close');

		if (!cancelAddressCreation) return;

		cancelAddressCreation.closest('.CreateAddress').classList.add('hidden');
		e.preventDefault();
	});

	document.addEventListener('click', function (e) {
		let timeRangeDropdownLabel = e.target.closest('.TimeRangeDropdown_label');

		if (!timeRangeDropdownLabel) return;

		let timeRangeDropdown = timeRangeDropdownLabel.parentNode;

		timeRangeDropdown.classList.toggle('TimeRangeDropdown-opened');
	});

	document.addEventListener('click', function (e) {
		let timeRangeDropdowns = document.querySelectorAll('.TimeRangeDropdown');

		if (!timeRangeDropdowns) return;

		for (let timeRangeDropdown of timeRangeDropdowns) {
			let timeRangeDropdownLabel = timeRangeDropdown.querySelector('.TimeRangeDropdown_label');

			if (timeRangeDropdown.classList.contains('TimeRangeDropdown-opened') && !timeRangeDropdown.contains(e.target) && !timeRangeDropdownLabel.contains(e.target)) {
				timeRangeDropdown.classList.remove('TimeRangeDropdown-opened');
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
		
		timeRangeDropdownLabel.textContent = timeRangeFrom + '-' + timeRangeTo;
	});

	document.addEventListener('click', function (e) {
		let checkboxTimeRange = e.target.closest('.Checkbox-timeRangeDropdown');

		if (!checkboxTimeRange) return;

		let isClockAround = checkboxTimeRange.querySelector('.Checkbox_input');

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

	$('[data-src="#PostAddition"]').fancybox({
		touch: false,
		smallBtn: false,
		toolbar: false,
		baseTpl:
	    '<div class="fancybox-container fancybox-container--no-padding" role="dialog" tabindex="-1">' +
	    '<div class="fancybox-bg"></div>' +
	    '<div class="fancybox-inner">' +
	    '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
	    '<div class="fancybox-toolbar">{{buttons}}</div>' +
	    '<div class="fancybox-navigation">{{arrows}}</div>' +
	    '<div class="fancybox-stage"></div>' +
	    '<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
	    '</div>' +
	    '</div>',

	  beforeLoad: function(instance, current) {
	   	let postAdditionForm = document.forms['post_addition'];

	   	postAdditionForm.post2.value = postAdditionForm.surname2.value = postAdditionForm.name2.value = postAdditionForm.patronym2.value = '';

      postAdditionForm.addEventListener('submit', function (e) {
      	let companySettingsPosts = document.querySelector('.CompanySettings_posts');

      	let fullName = postAdditionForm.surname2.value + ' ' + postAdditionForm.name2.value + ' ' + postAdditionForm.patronym2.value;

      	companySettingsPosts.insertAdjacentHTML('beforeend', `<div class="CompanySettings_post"><div class="CompanySettings_postHeader"><div class="CompanySettings_jobTitle">${postAdditionForm.post2.value}</div><a href="javascript:;" class="CompanySettings_removePost"></a></div><a href="javascript:;" data-src="#PostAdditionEdit" class="CompanySettings_link CompanySettings_link-fullNameEdit OpenPopupLink">${fullName}</a></div>`);

      	e.preventDefault();
      	$.fancybox.close();
      });
    }
	});

	document.addEventListener('click', function (e) {
		let fullNameEditLink = e.target.closest('.CompanySettings_link-fullNameEdit');

		if (!fullNameEditLink) return;

		$.fancybox.open({
	    src: '#PostAdditionEdit',
	    type: 'inline',
	    opts: {
	    	touch: false,
				smallBtn: false,
				toolbar: false,
				baseTpl:
			    '<div class="fancybox-container fancybox-container--no-padding" role="dialog" tabindex="-1">' +
			    '<div class="fancybox-bg"></div>' +
			    '<div class="fancybox-inner">' +
			    '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
			    '<div class="fancybox-toolbar">{{buttons}}</div>' +
			    '<div class="fancybox-navigation">{{arrows}}</div>' +
			    '<div class="fancybox-stage"></div>' +
			    '<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
			    '</div>' +
			    '</div>',

	    	beforeLoad: function (instance, current) {
		      let [lastName, firstName, patronym] = fullNameEditLink.textContent.split(' ');

		      let currentPost = fullNameEditLink.closest('.CompanySettings_post');
		      let jobTitle = currentPost.querySelector('.CompanySettings_jobTitle').textContent;

		      let postEditingForm = document.forms['post_editing'];

		      postEditingForm.post3.value = jobTitle;
		      postEditingForm.name3.value = firstName;
		      postEditingForm.surname3.value = lastName;
		      postEditingForm.patronym3.value = patronym;

		      postEditingForm.addEventListener('submit', function (e) {
		      	currentPost.querySelector('.CompanySettings_jobTitle').textContent = postEditingForm.post3.value;

		      	let fullName = postEditingForm.surname3.value + ' ' + postEditingForm.name3.value + ' ' + postEditingForm.patronym3.value;

		      	currentPost.querySelector('.CompanySettings_link-fullNameEdit').textContent = fullName;

		      	e.preventDefault();
		      	$.fancybox.close();
		      });
		    }
		  }
		});
	});

	document.addEventListener('click', function (e) {
		let removePostLink = e.target.closest('.CompanySettings_removePost');

		if (!removePostLink) return;

		removePostLink.closest('.CompanySettings_post').remove();
	});

	function isOrderedSequence(arr) {
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i] + 1 != arr[i + 1]) {
				return false;
			}
		}

		return true;
	}

	let abbreviatedNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

	document.addEventListener('click', function (e) {
		let clickedOption = e.target.closest('.DropdownSelect-daysWeek .fs-option');

		if (!clickedOption) return;

		let dropdownSelect = clickedOption.closest('.DropdownSelect-daysWeek');
		let selectedOptions = dropdownSelect.querySelectorAll('.fs-option.selected');

		let selectedIndexes = Array.from(selectedOptions).map(item => item.dataset.index * 1);

		let fSelectLabel = dropdownSelect.querySelector('.fs-label');
		let resultArray;

		if (selectedIndexes.length == 1) {
			fSelectLabel.textContent = selectedOptions[0].querySelector('.fs-option-label').textContent;
		} else if (isOrderedSequence(selectedIndexes)) {
			let firstOptionIndex = selectedIndexes[0];
			let lastOptionIndex = selectedIndexes[selectedIndexes.length - 1];
			fSelectLabel.textContent = abbreviatedNames[firstOptionIndex] + '-' + abbreviatedNames[lastOptionIndex];
		} else {
			resultArray = selectedIndexes.map(item => abbreviatedNames[item]);
			fSelectLabel.textContent = resultArray.join(', ');
		}

		resultArray = selectedIndexes.map((item, index) => abbreviatedNames[item]);
	});
	
});