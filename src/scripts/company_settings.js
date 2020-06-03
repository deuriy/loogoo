document.addEventListener('DOMContentLoaded', function () {
	// Add office field
	document.addEventListener('click', function (e) {
		let addOfficeLink = e.target.closest('.AddFieldItem-office');

		if (!addOfficeLink) return;

		let fieldItems = addOfficeLink.closest('.CompanySettings_fieldContent').querySelector('.CompanySettings_fieldItems');

		let select = fieldItems.firstElementChild.querySelector('select').cloneNode(true);
		select.classList.remove('hidden');

		let dropdownSelect = document.createElement('div');
		dropdownSelect.className = 'DropdownSelect DropdownSelect-mobile DropdownSelect-companySettings CompanySettings_dropdownSelect';
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
		dropdownSelect.className = 'DropdownSelect DropdownSelect-mobile DropdownSelect-companySettings DropdownSelect-daysWeek CompanySettings_dropdownSelect';
		dropdownSelect.append(select);

		select.name = 'days_week_' + (fieldItemsNumber + 1) + '[]';

		let timeRangeDropdowns = fieldItems.firstElementChild.querySelectorAll('.TimeRangeDropdown');
		let timeRangeDropdownsCloned = [];

		for (let timeRangeDropdown of timeRangeDropdowns) {
			let clonedTimeRangeDropdown = timeRangeDropdown.cloneNode(true);
			let timeRangeFrom = clonedTimeRangeDropdown.querySelector('.TimeRangeDropdown_time-from');
			let timeRangeTo = clonedTimeRangeDropdown.querySelector('.TimeRangeDropdown_time-to');
			let timeRangeCheckboxInput = clonedTimeRangeDropdown.querySelector('.Checkbox_input');
			let timeRangeCheckboxLabel = clonedTimeRangeDropdown.querySelector('.Checkbox_label');

			timeRangeFrom.name += '_' + (fieldItemsNumber + 1);
			timeRangeTo.name += '_' + (fieldItemsNumber + 1);
			timeRangeCheckboxInput.name += '_' + (fieldItemsNumber + 1);
			timeRangeCheckboxInput.id += '_' + (fieldItemsNumber + 1);
			timeRangeCheckboxLabel.htmlFor += '_' + (fieldItemsNumber + 1);

			timeRangeDropdownsCloned.push(clonedTimeRangeDropdown);
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

	function checkTimeFields () {
		let timeFields = document.querySelectorAll('.TimeRangeDropdown_time');

		timeFields.forEach(timeField => {
			if (timeField.defaultValue) {
				timeField.classList.add('TimeRangeDropdown_time-notEmpty');
			}
		});
	}

	checkTimeFields();

	// Add post field
	document.addEventListener('click', function (e) {
		let addPostLink = e.target.closest('.AddFieldItem-post');

		if (!addPostLink) return;

		let currentFieldItem = addPostLink.closest('.CompanySettings_field');

		currentFieldItem.insertAdjacentHTML('beforebegin', '<div class="CompanySettings_field CompanySettings_field-post"><div class="CompanySettings_fieldContent"><div class="CompanySettings_fieldItems"><div class="CompanySettings_fieldItem CompanySettings_fieldItem-post"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="post" placeholder="должность"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="surname" placeholder="Фамилия"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="name" placeholder="Имя"><input class="CompanySettings_formText CompanySettings_formText-col4" type="text" name="patronym" placeholder="Отчество"><a class="CompanySettings_removeFieldItem" href="javascript:;"></a></div></div></div></div>');
		checkExistingPosts();
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

		checkExistingPosts();
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

		if (timeRangeFrom && timeRangeTo) {
			timeRangeDropdownLabel.textContent = timeRangeFrom + '-' + timeRangeTo;
		} else {
			timeRangeDropdownLabel.textContent = timeRangeDropdownLabel.dataset.label;
		}
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
		} else if (timeRangeInputFrom.value && timeRangeInputTo.value) {
			timeRangeDropdownLabel.textContent = timeRangeInputFrom.value + '-' + timeRangeInputTo.value;
		} else {
			timeRangeDropdownLabel.textContent = timeRangeDropdownLabel.dataset.label;
		}
	});

	function checkExistingPosts() {
		let companyPosts = document.querySelectorAll('.CompanySettings_fieldItem-post');
		let companyMobilePosts = document.querySelectorAll('.CompanySettings_post');

		if (!companyPosts.length || !companyMobilePosts.length) return;

		if (companyPosts.length) {
			document.querySelector('.AddFieldItem-post .AddFieldItem_text').textContent = 'Добавить ещё должность';
		} else {
			document.querySelector('.AddFieldItem-post .AddFieldItem_text').textContent = 'Добавить должность';
		}

		if (companyMobilePosts.length) {
			document.querySelector('.AddFieldItem-postMobile .AddFieldItem_text').textContent = 'Добавить ещё должность';
		} else {
			document.querySelector('.AddFieldItem-postMobile .AddFieldItem_text').textContent = 'Добавить должность';
		}
	}

	checkExistingPosts();

	function checkExistingOwner() {
		let companyOwner = document.querySelectorAll('.CompanySettings_owner');

		if (companyOwner) {
			document.querySelector('.AddFieldItem-ownerMobile').classList.add('hidden');
		} else {
			document.querySelector('.AddFieldItem-ownerMobile').classList.remove('hidden');
		}
	}

	let ownerAdditionForm = document.forms['owner_addition'];

	if (ownerAdditionForm) {
		ownerAdditionForm.addEventListener('submit', function (e) {
			let ownerWrapper = document.querySelector('.CompanySettings_ownerWrapper');
	
			let ownerFullName = ownerAdditionForm.owner_surname2.value + ' ' + ownerAdditionForm.owner_name2.value + ' ' + ownerAdditionForm.owner_patronym2.value;
	
			ownerWrapper.insertAdjacentHTML('beforeend', `<div class="CompanySettings_owner"><div class="CompanySettings_ownerHeader"><div class="CompanySettings_ownerFullName">Владелец</div><a href="javascript:;"class="CompanySettings_removeOwner"></a></div><a href="javascript:;" data-fancybox-trigger="owner_edit" class="CompanySettings_link CompanySettings_link-ownerFullNameEdit">${ownerFullName}</a></div>`);
	
			document.querySelector('.AddFieldItem-ownerMobile').classList.add('hidden');
	
			e.preventDefault();
			$.fancybox.close();
		});
	}

	$('a[href="#OwnerAddition"]').fancybox({
		touch: false,
		smallBtn: false,
		toolbar: false,
		animationEffect: false,
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
			ownerAdditionForm.owner_surname2.value = ownerAdditionForm.owner_name2.value = ownerAdditionForm.owner_patronym2.value = '';
    }
	});

	document.addEventListener('click', function (e) {
		let ownerFullNameEditLink = e.target.closest('.CompanySettings_link-ownerFullNameEdit');

		if (!ownerFullNameEditLink) return;

		$.fancybox.open({
	    src: '#OwnerEdit',
	    type: 'inline',
	    opts: {
	    	touch: false,
				smallBtn: false,
				toolbar: false,
				animationEffect: false,
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
		      let [lastName, firstName, patronym] = ownerFullNameEditLink.textContent.split(' ');

		      let currentOwner = document.querySelector('.CompanySettings_owner');

		      let ownerEditForm = document.forms['owner_edit'];

		      ownerEditForm.owner_name3.value = firstName;
		      ownerEditForm.owner_surname3.value = lastName;
		      ownerEditForm.owner_patronym3.value = patronym;

		      ownerEditForm.addEventListener('submit', function (e) {
		      	let ownerFullName = ownerEditForm.owner_surname3.value + ' ' + ownerEditForm.owner_name3.value + ' ' + ownerEditForm.owner_patronym3.value;

		      	document.querySelector('.CompanySettings_link-ownerFullNameEdit').textContent = ownerFullName;

		      	e.preventDefault();
						$.fancybox.close();
		      });
		    }
		  }
		});
	});

	let postAdditionForm = document.forms['post_addition'];

	if (postAdditionForm) {
		postAdditionForm.addEventListener('submit', function (e) {
			let companySettingsPosts = document.querySelector('.CompanySettings_posts');
	
			let fullName = postAdditionForm.surname2.value + ' ' + postAdditionForm.name2.value + ' ' + postAdditionForm.patronym2.value;
	
			companySettingsPosts.insertAdjacentHTML('beforeend', `<div class="CompanySettings_post"><div class="CompanySettings_postHeader"><div class="CompanySettings_jobTitle">${postAdditionForm.post2.value}</div><a href="javascript:;" class="CompanySettings_removePost"></a></div><a href="javascript:;" data-src="#PostAddition" class="CompanySettings_link CompanySettings_link-fullNameEdit">${fullName}</a></div>`);
	
			checkExistingPosts();
			e.preventDefault();
			$.fancybox.close();
		});
	}

	$('[data-src="#PostAddition"]').fancybox({
		touch: false,
		smallBtn: false,
		toolbar: false,
		animationEffect: false,
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
	   	postAdditionForm.post2.value = postAdditionForm.surname2.value = postAdditionForm.name2.value = postAdditionForm.patronym2.value = '';
    }
	});

	document.addEventListener('click', function (e) {
		let fullNameEditLink = e.target.closest('.CompanySettings_link-fullNameEdit');

		if (!fullNameEditLink) return;

		$.fancybox.open({
	    src: '#PostEdit',
	    type: 'inline',
	    opts: {
	    	touch: false,
				smallBtn: false,
				toolbar: false,
				animationEffect: false,
	
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

	$('a[href="#AltAddressAddition"]').fancybox({
		touch: false,
		smallBtn: false,
		toolbar: false,
		animationEffect: false,
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
			// ownerAdditionForm.owner_surname2.value = ownerAdditionForm.owner_name2.value = ownerAdditionForm.owner_patronym2.value = '';
    }
	});

	document.addEventListener('click', function (e) {
		let removePostLink = e.target.closest('.CompanySettings_removePost');

		if (!removePostLink) return;

		removePostLink.closest('.CompanySettings_post').remove();
		checkExistingPosts();
	});

	document.addEventListener('click', function (e) {
		let removeOwnerLink = e.target.closest('.CompanySettings_removeOwner');

		if (!removeOwnerLink) return;

		removeOwnerLink.closest('.CompanySettings_owner').remove();
		document.querySelector('.AddFieldItem-ownerMobile').classList.remove('hidden');
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

	function changeDaysWeekDropdown (dropdownSelect) {
		let selectedOptions = dropdownSelect.querySelectorAll('.fs-option.selected');

		let selectedIndexes = Array.from(selectedOptions).map(item => item.dataset.index * 1);

		let fSelectLabel = dropdownSelect.querySelector('.fs-label');
		let resultArray = [];

		if (!selectedIndexes.length) {
			fSelectLabel.textContent = 'Дни недели';
		}
		else if (selectedIndexes.length == 1) {
			fSelectLabel.textContent = selectedOptions[0].querySelector('.fs-option-label').textContent;
		} else if (isOrderedSequence(selectedIndexes)) {
			let firstOptionIndex = selectedIndexes[0];
			let lastOptionIndex = selectedIndexes[selectedIndexes.length - 1];
			fSelectLabel.textContent = abbreviatedNames[firstOptionIndex] + '-' + abbreviatedNames[lastOptionIndex];
		} else {
			resultArray = selectedIndexes.map(item => abbreviatedNames[item]);
			fSelectLabel.textContent = resultArray.join(', ');
		}

		resultArray = selectedIndexes.map(item => abbreviatedNames[item]);
	}

	function changeDaysWeekDropdowns () {
		let daysWeekDropdowns = document.querySelectorAll('.DropdownSelect-daysWeek');

		daysWeekDropdowns.forEach(daysWeekDropdown => {
			changeDaysWeekDropdown(daysWeekDropdown);
		});
	}

	changeDaysWeekDropdowns();

	document.addEventListener('click', function (e) {
		let clickedOption = e.target.closest('.DropdownSelect-daysWeek .fs-option');

		if (!clickedOption) return;

		let dropdownSelect = clickedOption.closest('.DropdownSelect-daysWeek');
		changeDaysWeekDropdown(dropdownSelect);
	});
	
});