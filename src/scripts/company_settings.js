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

		changeDaysWeekDropdowns();
	});

	function createDesktopPostFields () {
		let postAdditionField = document.querySelector('.CompanySettings_field-postAddition');

		let postFieldItems = document.querySelectorAll('.CompanySettings_fieldItem-post');
		let postsNumber = postFieldItems.length;

		if (!postsNumber) {
			postAdditionField.insertAdjacentHTML('beforebegin', `<div class="CompanySettings_field CompanySettings_field-post hidden-xs"><div class="CompanySettings_fieldContent"><div class="CompanySettings_fieldItems"></div></div></div>`);
		}

		let postFieldItemsWrapper = document.querySelector('.CompanySettings_field-post .CompanySettings_fieldItems');
		postFieldItemsWrapper.insertAdjacentHTML('beforeend', `<div class="CompanySettings_fieldItem CompanySettings_fieldItem-post"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="post[${postsNumber}][name]" placeholder="должность"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="post[${postsNumber}][lastName]" placeholder="Фамилия"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="post[${postsNumber}][firstName]" placeholder="Имя"><input class="CompanySettings_formText CompanySettings_formText-col4" type="text" name="post[${postsNumber}][patronym]" placeholder="Отчество"><a class="CompanySettings_removeFieldItem" href="javascript:;"></a></div>`);
		checkExistingPosts();
	}

	function refreshDesktopPostFieldItem (fieldItemIndex) {
		let currentPost;

		if (fieldItemIndex == undefined) {
			currentPost = document.querySelector('.CompanySettings_post:last-child');
			fieldItemIndex = getChildNodeIndex(currentPost) + 1;
		} else {
			currentPost = document.querySelector(`.CompanySettings_post:nth-child(${fieldItemIndex})`);
		}

		let currentPostFullName = currentPost.querySelector('.CompanySettings_link-fullNameEdit');
		let [lastName, firstName, patronym] = currentPostFullName.textContent.split(' ');
		let jobTitle = currentPost.querySelector('.CompanySettings_jobTitle').textContent;

		let currentPostFieldItem = document.querySelector(`.CompanySettings_fieldItem-post:nth-child(${fieldItemIndex})`);
		let postAdditionFormText = currentPostFieldItem.querySelectorAll('.CompanySettings_formText');

		postAdditionFormText[0].value = jobTitle;
		postAdditionFormText[1].value = lastName;
		postAdditionFormText[2].value = firstName;
		postAdditionFormText[3].value = patronym;
	}

	// Add post field
	document.addEventListener('click', function (e) {
		let addPostLink = e.target.closest('.AddFieldItem-post');

		if (!addPostLink) return;

		createDesktopPostFields();
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
		let fieldItem = removeFieldItemLink.closest('.CompanySettings_fieldItem');

		if (!parentField.classList.contains('CompanySettings_field-post')) {
			fieldItem.remove();
		} else {
			let fieldItemIndex = getChildNodeIndex(fieldItem);
			let currentPost = document.querySelector(`.CompanySettings_post:nth-child(${fieldItemIndex + 1})`);

			if (currentPost) {
				currentPost.remove();
			}
			fieldItem.remove();

			let postFieldItems = document.querySelectorAll('.CompanySettings_field-post .CompanySettings_fieldItem');
			if (!postFieldItems.length) {
				document.querySelector('.CompanySettings_field-post').remove();
			}
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

	function syncTimeField (timeRangeDropdown, className, from, to) {
		let timeFieldLabel = timeRangeDropdown.querySelector('.TimeRangeDropdown_label');
		let timeRangeInputFrom = timeRangeDropdown.querySelector('.TimeRangeDropdown_time-from');
		let timeRangeInputTo = timeRangeDropdown.querySelector('.TimeRangeDropdown_time-to');
		let checkboxTimeRange = timeRangeDropdown.querySelector('.Checkbox-timeRangeDropdown');
		let checkboxTimeRangeInput = checkboxTimeRange.querySelector('.Checkbox_input');
		let checkboxTimeRangeLabel = checkboxTimeRange.querySelector('.Checkbox_label');

		if (checkboxTimeRange.classList.contains(className)) {
			if (timeRangeInputFrom.value != from || timeRangeInputTo.value != to) {
				checkboxTimeRangeInput.checked = false;
			} else {
				checkboxTimeRangeInput.checked = true;
				timeFieldLabel.textContent = checkboxTimeRangeLabel.textContent;
			}
		}
	}

	function checkTimeFieldState (timeField) {
		let timeRangeDropdown = timeField.closest('.TimeRangeDropdown');
		let timeFieldLabel = timeRangeDropdown.querySelector('.TimeRangeDropdown_label');
		let timeRangeInputFrom = timeRangeDropdown.querySelector('.TimeRangeDropdown_time-from');
		let timeRangeInputTo = timeRangeDropdown.querySelector('.TimeRangeDropdown_time-to');

		if (timeField.value) {
			timeField.classList.add('TimeRangeDropdown_time-notEmpty');
		} else {
			timeField.classList.remove('TimeRangeDropdown_time-notEmpty');
		}

		if (timeRangeInputFrom.value && timeRangeInputTo.value) {
			timeFieldLabel.textContent = timeRangeInputFrom.value + '-' + timeRangeInputTo.value;

			syncTimeField(timeRangeDropdown, 'Checkbox-nonStop', '00:00', '00:00');
			syncTimeField(timeRangeDropdown, 'Checkbox-aroundClock', '00:00', '23:59');
		} else {
			timeFieldLabel.textContent = timeFieldLabel.dataset.label;
		}
	}

	function checkTimeFieldsState () {
		let timeFields = document.querySelectorAll('.TimeRangeDropdown_time');
		timeFields.forEach(timeField => checkTimeFieldState(timeField));
	}

	checkTimeFieldsState();

	document.addEventListener('change', function (e) {
		let timeRangeDropdownTime = e.target.closest('.TimeRangeDropdown_time');

		if (!timeRangeDropdownTime) return;

		checkTimeFieldState(timeRangeDropdownTime)
	});

	document.addEventListener('click', function (e) {
		let checkboxTimeRange = e.target.closest('.Checkbox-timeRangeDropdown');

		if (!checkboxTimeRange) return;

		let checkboxTimeRangeInput = checkboxTimeRange.querySelector('.Checkbox_input');

		let timeRangeDropdown = checkboxTimeRange.closest('.TimeRangeDropdown');
		let timeRangeDropdownLabel = timeRangeDropdown.querySelector('.TimeRangeDropdown_label');
		let checkboxTimeRangeLabelText = checkboxTimeRange.querySelector('.Checkbox_label').textContent;

		let timeRangeInputFrom = timeRangeDropdown.querySelector('.TimeRangeDropdown_time-from');
		let timeRangeInputTo = timeRangeDropdown.querySelector('.TimeRangeDropdown_time-to');

		if (checkboxTimeRangeInput.checked) {
			timeRangeDropdownLabel.textContent = checkboxTimeRangeLabelText;

			if (checkboxTimeRange.classList.contains('Checkbox-aroundClock')) {
				timeRangeInputFrom.value = '00:00';
				timeRangeInputTo.value = '23:59';
			}

			if (checkboxTimeRange.classList.contains('Checkbox-nonStop')) {
				timeRangeInputFrom.value = '00:00';
				timeRangeInputTo.value = '00:00';
			}
		} else if (timeRangeInputFrom.value && timeRangeInputTo.value) {
			timeRangeDropdownLabel.textContent = timeRangeInputFrom.value + '-' + timeRangeInputTo.value;
		} else {
			timeRangeDropdownLabel.textContent = timeRangeDropdownLabel.dataset.label;
		}
	});

	function checkExistingPosts() {
		let companyPosts = document.querySelectorAll('.CompanySettings_fieldItem-post');
		let companyMobilePosts = document.querySelectorAll('.CompanySettings_post');

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

	// Owner addition
	document.addEventListener('click', function (e) {
		let addOwnerBtn = e.target.closest('.CompanySettings_addButton-owner');

		if (!addOwnerBtn) return;

		let ownerAddition = document.getElementById('OwnerAddition');
		let ownerWrapper = document.querySelector('.CompanySettings_ownerWrapper');
		let ownerAdditionSurname = ownerAddition.querySelector('input[name="owner_surname"]');
		let ownerAdditionName = ownerAddition.querySelector('input[name="owner_name"]');
		let ownerAdditionPatronym = ownerAddition.querySelector('input[name="owner_patronym"]');

		let ownerFullName = ownerAdditionSurname.value + ' ' + ownerAdditionName.value + ' ' + ownerAdditionPatronym.value;

		ownerWrapper.insertAdjacentHTML('beforeend', `<div class="CompanySettings_owner"><div class="CompanySettings_ownerHeader"><div class="CompanySettings_ownerFullName">Владелец</div><a href="javascript:;"class="CompanySettings_removeOwner"></a></div><a href="#owner_edit" class="CompanySettings_link CompanySettings_link-ownerFullNameEdit">${ownerFullName}</a></div>`);

		document.querySelector('.AddFieldItem-ownerMobile').classList.add('hidden');

		e.preventDefault();
		$.fancybox.close();
	});

	// Owner Edit
	document.addEventListener('click', function (e) {
		let ownerEditBtn = e.target.closest('.CompanySettings_addButton-ownerEdit');

		if (!ownerEditBtn) return;

		let ownerAddition = document.getElementById('OwnerAddition');
		let owner = document.querySelector('.CompanySettings_owner');
		let ownerAdditionSurname = ownerAddition.querySelector('input[name="owner_surname"]');
		let ownerAdditionName = ownerAddition.querySelector('input[name="owner_name"]');
		let ownerAdditionPatronym = ownerAddition.querySelector('input[name="owner_patronym"]');

		let ownerFullName = ownerAdditionSurname.value + ' ' + ownerAdditionName.value + ' ' + ownerAdditionPatronym.value;

		owner.querySelector('.CompanySettings_link-ownerFullNameEdit').textContent = ownerFullName.trim();

		e.preventDefault();
		$.fancybox.close();
	});

	document.addEventListener('input', function (e) {
		let ownerFullNameField = e.target.closest('.CompanySettings_field-ownerAdditionDesktop .CompanySettings_formText');

		if (!ownerFullNameField) return;

		let ownerAdditionDesktop = document.querySelector('.CompanySettings_field-ownerAdditionDesktop');
		let ownerAdditionSurname = ownerAdditionDesktop.querySelector('input[name="owner_surname"]');
		let ownerAdditionName = ownerAdditionDesktop.querySelector('input[name="owner_name"]');
		let ownerAdditionPatronym = ownerAdditionDesktop.querySelector('input[name="owner_patronym"]');

		let ownerWrapper = document.querySelector('.CompanySettings_ownerWrapper');
		let companySettingsOwner = ownerWrapper.querySelector('.CompanySettings_owner');

		let ownerFullName = (ownerAdditionSurname.value + ' ' + ownerAdditionName.value + ' ' + ownerAdditionPatronym.value).trim();
		let addOwnerMobileLink = document.querySelector('.AddFieldItem-ownerMobile');

		if (ownerFullName.length) {
			if (!companySettingsOwner) {
				companySettingsOwner = document.createElement('div');
				companySettingsOwner.className = 'CompanySettings_owner';
				ownerWrapper.append(companySettingsOwner);

				companySettingsOwner.insertAdjacentHTML('beforeend', `<div class="CompanySettings_ownerHeader"><div class="CompanySettings_ownerFullName">Владелец</div><a href="javascript:;"class="CompanySettings_removeOwner"></a></div><a href="javascript:;" data-fancybox-trigger="owner_edit" class="CompanySettings_link CompanySettings_link-ownerFullNameEdit">${ownerFullName}</a>`);
			} else {
				let ownerFullNameEditLink = document.querySelector('.CompanySettings_link-ownerFullNameEdit');
				ownerFullNameEditLink.textContent = ownerFullName;
			}

			addOwnerMobileLink.classList.add('hidden');
		} else {
			companySettingsOwner.remove();
			addOwnerMobileLink.classList.remove('hidden');
		}
	});

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
	  	let ownerAddition = document.getElementById('OwnerAddition');
	  	let ownerAdditionSurname = ownerAddition.querySelector('input[name="owner_surname"]');
	  	let ownerAdditionName = ownerAddition.querySelector('input[name="owner_name"]');
	  	let ownerAdditionPatronym = ownerAddition.querySelector('input[name="owner_patronym"]');

	  	if (ownerAdditionSurname && ownerAdditionName && ownerAdditionPatronym) {
	  		ownerAdditionSurname.value = ownerAdditionName.value = ownerAdditionPatronym.value = '';
	  	}
    }
	});

	document.addEventListener('click', function (e) {
		let ownerFullNameEditLink = e.target.closest('.CompanySettings_link-ownerFullNameEdit');

		if (!ownerFullNameEditLink) return;

		$.fancybox.open({
	    src: '#OwnerAddition',
	    type: 'inline',
	    opts: {
	    	touch: false,
				smallBtn: false,
				toolbar: false,
				animationEffect: false,
				hash: false,
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
		      let ownerAddition = document.getElementById('OwnerAddition');
		      let mobileHeaderTitle = ownerAddition.querySelector('.MobileHeader_title');
		      mobileHeaderTitle.textContent = 'Редактировать владельца';

		      let addButton = ownerAddition.querySelector('.CompanySettings_addButton');
		      addButton.textContent = 'Сохранить изменения';
		      addButton.classList.remove('CompanySettings_addButton-owner');
		      addButton.classList.add('CompanySettings_addButton-ownerEdit');
		    }
		  }
		});
	});

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
	  	let companySettingsPost = document.querySelectorAll('.CompanySettings_post');
	  	let postsCount = document.querySelectorAll('.CompanySettings_post').length;
			
	   	let postAddition = document.getElementById('PostAddition');
			let postAdditionName = postAddition.querySelector(`input[name$="[name]"]`);
			let postAdditionLastname = postAddition.querySelector(`input[name$="[lastName]"]`);
			let postAdditionfirstName = postAddition.querySelector(`input[name$="[firstName]"]`);
			let postAdditionPatronym = postAddition.querySelector(`input[name$="[patronym]"]`);

      let mobileHeaderTitle = postAddition.querySelector('.MobileHeader_title');
      mobileHeaderTitle.textContent = 'Добавить должность';

      let addButton = postAddition.querySelector('.CompanySettings_addButton');
      addButton.textContent = 'Добавить должность';
      addButton.classList.remove('CompanySettings_addButton-postEdit');
      addButton.classList.add('CompanySettings_addButton-post');

			postAdditionName.value = postAdditionLastname.value = postAdditionfirstName.value = postAdditionPatronym.value = '';

			postAdditionName.name = `post[${companySettingsPost.length}][name]`;
			postAdditionLastname.name = `post[${companySettingsPost.length}][lastName]`;
			postAdditionfirstName.name = `post[${companySettingsPost.length}][firstName]`;
			postAdditionPatronym.name = `post[${companySettingsPost.length}][patronym]`;
    }
	});

	document.addEventListener('input', function (e) {
		let fieldPostInput = e.target.closest('.CompanySettings_field-post .CompanySettings_formText');

		if (!fieldPostInput) return;

		let postAdditionFieldItems = document.querySelectorAll('.CompanySettings_fieldItem-post');
		let companySettingsPosts = document.querySelector('.CompanySettings_posts');

		postAdditionFieldItems.forEach( (postAdditionFieldItem, postAdditionFieldIndex) => {
			let postAdditionFormText = postAdditionFieldItem.querySelectorAll('.CompanySettings_formText');

			let fullName = (postAdditionFormText[1].value + ' ' + postAdditionFormText[2].value + ' ' + postAdditionFormText[3].value).trim();

			let currentPost = companySettingsPosts.querySelector(`.CompanySettings_post:nth-child(${postAdditionFieldIndex + 1})`);

			if (fullName.length || postAdditionFormText[0].value) {
				if (!currentPost) {
					companySettingsPosts.insertAdjacentHTML('beforeend', `<div class="CompanySettings_post"><div class="CompanySettings_postHeader"><div class="CompanySettings_jobTitle">${postAdditionFormText[0].value}</div><a href="javascript:;" class="CompanySettings_removePost"></a></div><a href="javascript:;"  class="CompanySettings_link CompanySettings_link-fullNameEdit">${fullName}</a></div>`);
				} else {
					let currentPostJobTitle = currentPost.querySelector('.CompanySettings_jobTitle');
					let currentPostFullName = currentPost.querySelector('.CompanySettings_link-fullNameEdit');

					currentPostJobTitle.textContent = postAdditionFormText[0].value;
					currentPostFullName.textContent = fullName;
				}
			} else {
				currentPost.remove();
			}
		});
	});

	function createMobilePost () {
		let postAddition = document.getElementById('PostAddition');
		let postAdditionName = postAddition.querySelector(`input[name$="[name]"]`);
		let postAdditionLastname = postAddition.querySelector(`input[name$="[lastName]"]`);
		let postAdditionfirstName = postAddition.querySelector(`input[name$="[firstName]"]`);
		let postAdditionPatronym = postAddition.querySelector(`input[name$="[patronym]"]`);
		let companySettingsPosts = document.querySelector('.CompanySettings_posts');

		let fullName = postAdditionLastname.value + ' ' + postAdditionfirstName.value + ' ' + postAdditionPatronym.value;

		companySettingsPosts.insertAdjacentHTML('beforeend', `<div class="CompanySettings_post"><div class="CompanySettings_postHeader"><div class="CompanySettings_jobTitle">${postAdditionName.value}</div><a href="javascript:;" class="CompanySettings_removePost"></a></div><a href="javascript:;"  class="CompanySettings_link CompanySettings_link-fullNameEdit">${fullName}</a></div>`);

		checkExistingPosts();
	}

	// Post addition
	document.addEventListener('click', function (e) {
		let addPostBtn = e.target.closest('.CompanySettings_addButton-post');

		if (!addPostBtn) return;

		createMobilePost();
		createDesktopPostFields();
		refreshDesktopPostFieldItem();
		$.fancybox.close();
	});

	// Edit post
	document.addEventListener('click', function (e) {
		let editPostBtn = e.target.closest('.CompanySettings_addButton-postEdit');

		if (!editPostBtn) return;

		let postEdit = document.getElementById('PostAddition');
		let postEditId = postEdit.dataset.postId * 1 + 1;
		let postEditName = postEdit.querySelector('input[name$="[name]"]');
		let postEditLastname = postEdit.querySelector('input[name$="[lastName]"]');
		let postEditfirstName = postEdit.querySelector('input[name$="[firstName]"]');
		let postEditPatronym = postEdit.querySelector('input[name$="[patronym]"]');

		let fullName = postEditLastname.value + ' ' + postEditfirstName.value + ' ' + postEditPatronym.value;

		let currentPost = document.querySelector(`.CompanySettings_post:nth-child(${postEditId})`);
		let currentPostJobTitle = currentPost.querySelector('.CompanySettings_jobTitle');
		let currentPostFullName = currentPost.querySelector('.CompanySettings_link-fullNameEdit');

		currentPostJobTitle.textContent = postEditName.value;
		currentPostFullName.textContent = fullName;

		refreshDesktopPostFieldItem(postEditId);

		e.preventDefault();
		$.fancybox.close();
	});

	document.addEventListener('click', function (e) {
		let fullNameEditLink = e.target.closest('.CompanySettings_link-fullNameEdit');

		if (!fullNameEditLink) return;

		$.fancybox.open({
	    src: '#PostAddition',
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
		      let currentPostIndex = getChildNodeIndex(currentPost);
					let jobTitle = currentPost.querySelector('.CompanySettings_jobTitle').textContent;

		      let postAddition = document.getElementById('PostAddition');
		      let mobileHeaderTitle = postAddition.querySelector('.MobileHeader_title');
		      mobileHeaderTitle.textContent = 'Редактировать должность';

		      postAddition.dataset.postId = currentPostIndex;

		      let addButton = postAddition.querySelector('.CompanySettings_addButton');
		      addButton.textContent = 'Сохранить изменения';
		      addButton.classList.remove('CompanySettings_addButton-post');
		      addButton.classList.add('CompanySettings_addButton-postEdit');

		      let postAdditionName = postAddition.querySelector('input[name$="[name]"]');
					let postAdditionLastname = postAddition.querySelector('input[name$="[lastName]"]');
					let postAdditionfirstName = postAddition.querySelector('input[name$="[firstName]"]');
					let postAdditionPatronym = postAddition.querySelector('input[name$="[patronym]"]');

					postAdditionName.name = `post[${currentPostIndex}][name]`;
					postAdditionLastname.name = `post[${currentPostIndex}][lastName]`;
					postAdditionfirstName.name = `post[${currentPostIndex}][firstName]`;
					postAdditionPatronym.name = `post[${currentPostIndex}][patronym]`;

					postAdditionName.value = jobTitle;
					postAdditionLastname.value = lastName;
					postAdditionfirstName.value = firstName;
					postAdditionPatronym.value = patronym;
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
			
    }
	});

	function getChildNodeIndex (child) {
		let i = 0;

		while ((child = child.previousElementSibling)) {
			i++;
		}

		return i;
	}

	document.addEventListener('click', function (e) {
		let removePostLink = e.target.closest('.CompanySettings_removePost');

		if (!removePostLink) return;

		let currentPost = removePostLink.closest('.CompanySettings_post');
		let currentPostIndex = getChildNodeIndex(currentPost);

		document.querySelector(`.CompanySettings_fieldItem-post:nth-child(${currentPostIndex + 1})`).remove();
		removePostLink.closest('.CompanySettings_post').remove();
		checkExistingPosts();
	});

	document.addEventListener('click', function (e) {
		let removeOwnerLink = e.target.closest('.CompanySettings_removeOwner');

		if (!removeOwnerLink) return;

		removeOwnerLink.closest('.CompanySettings_owner').remove();

		let addOwnerMobileLink = document.querySelector('.AddFieldItem-ownerMobile');
		addOwnerMobileLink.classList.remove('hidden');

		let ownerAdditionFields = document.querySelector('#OwnerAddition .CompanySettings_fields');
		let ownerFullNameDesktop = ownerAdditionFields.querySelectorAll('.CompanySettings_formText');

		ownerFullNameDesktop.forEach( item => {
			item.value = '';
		});
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

		let selectedValue = clickedOption.dataset.value;
		let selectedOption = dropdownSelect.querySelector(`.DropdownSelect_select option[value="${selectedValue}"]`);

		selectedOption.toggleAttribute('selected');
	});

	function wrapElement (elem, wrapperClassName) {
		let newElement = document.createElement('div');
		newElement.className = wrapperClassName;

		newElement.append(elem);
		return newElement;
	}

	function wrapElements (arr, wrapperClassName) {
		let newArr = [];

		arr.forEach( item => {
			newArr.push(wrapElement(item, wrapperClassName));
		});

		return newArr;
	}

	function syncOwnerAdditionField () {
		let windowWidth = document.documentElement.clientWidth;
		let companySettings = document.getElementById('CompanySettings');
		let ownerAdditionFields = document.querySelector('#OwnerAddition .CompanySettings_fields');

		if (windowWidth < 768) {
			let ownerFullNameDesktop = companySettings.querySelectorAll('.CompanySettings_field-ownerAdditionDesktop .CompanySettings_formText');

			let labels = Array.from(ownerFullNameDesktop).map(item => {
				let label = document.createElement('label');
				label.className = 'CompanySettings_label';
				label.htmlFor = item.name;
				label.textContent = item.placeholder;
				return label;
			});

			ownerFullNameDesktop.forEach( item => {
				item.className = 'CompanySettings_formText CompanySettings_formText-fullWidth';
				item.id = item.name;
				item.setAttribute('form', 'CompanySettings');
				item.removeAttribute('placeholder');

				if (item.name !== 'owner_patronym') {
					item.required = true;
				}
			});

			let fullNameWrapped = wrapElements(ownerFullNameDesktop, 'CompanySettings_field').map((item, index) => {
				item.prepend(labels[index]);
				return item;
			});

			ownerAdditionFields.append(...fullNameWrapped);
		} else {
			let ownerFullNameMob = ownerAdditionFields.querySelectorAll('.CompanySettings_formText');
			let labels = ownerAdditionFields.querySelectorAll('.CompanySettings_label');
			let ownerAdditionItemDesktop = document.querySelector('.CompanySettings_field-ownerAdditionDesktop .CompanySettings_fieldItem');

			let labelsText = Array.from(labels).map(item => {
				let text = item.textContent;
				item.parentNode.remove();
				return text;
			});

			ownerFullNameMob.forEach( (item, index) => {
				item.className = 'CompanySettings_formText CompanySettings_formText-col3 CompanySettings_formText-gutter';
				item.placeholder = labelsText[index];
				item.required = false;
				item.removeAttribute('id');
				item.removeAttribute('form');
			});

			ownerAdditionItemDesktop.append(...ownerFullNameMob);

			$.fancybox.close();
		}
	}

	syncOwnerAdditionField();

	window.addEventListener('resize', function () {
		syncOwnerAdditionField();
	});
	
});