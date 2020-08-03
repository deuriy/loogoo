/*=require ./includes/blocks/*.js*/

document.addEventListener('DOMContentLoaded', function () {
	let fancyboxOpts = {
		touch: false,
		smallBtn: false,
		toolbar: false,
		animationEffect: false,
		baseClass: "fancybox-container--no-padding"
	};

	function clearFieldItemError (fieldItem) {
		let elemsWithErrors = fieldItem.querySelectorAll('.HasError');
		elemsWithErrors.forEach(elemWithErors => elemWithErors.classList.remove('HasError'));
	}

	function removeFieldAndError (field) {
		if (field) {
			let fieldError = field.nextElementSibling;

			if (fieldError && fieldError.classList.contains('Error')) {
				fieldError.remove();
			}

			field.remove();
		}
	}

	function createDesktopPostFields (postKey) {
		let postAdditionField = document.querySelector('.CompanySettings_field-postAddition');
		let postFieldItems = document.querySelectorAll('.CompanySettings_fieldItem-post');
		let postsNumber = postFieldItems.length;

		if (!postsNumber) {
			postAdditionField.insertAdjacentHTML('beforebegin', `<div class="CompanySettings_field CompanySettings_field-post hidden-xs"><div class="CompanySettings_fieldContent"><div class="CompanySettings_fieldItems"></div></div></div>`);
		}

		let postFieldItemsWrapper = document.querySelector('.CompanySettings_field-post .CompanySettings_fieldItems');
		postFieldItemsWrapper.insertAdjacentHTML('beforeend', `<div class="CompanySettings_fieldItem CompanySettings_fieldItem-post" data-post-key="${postKey}"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="person[${postKey}][post]" placeholder="должность"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="person[${postKey}][last_name]" placeholder="Фамилия"><input class="CompanySettings_formText CompanySettings_formText-col4 CompanySettings_formText-gutter" type="text" name="person[${postKey}][first_name]" placeholder="Имя"><input class="CompanySettings_formText CompanySettings_formText-col4" type="text" name="person[${postKey}][patronymic]" placeholder="Отчество"><a class="CompanySettings_removeFieldItem" href="javascript:;"></a></div><div class="Error Error-small CompanySettings_fieldError hidden"></div>`);

		checkExistingPosts();
	}

	function updateDesktopPostFieldItem (postKey) {
		let posts = document.querySelectorAll('.CompanySettings_post');

		if (postKey === undefined) {
			postKey = posts[posts.length - 1].dataset.postKey;
		}

		let currentPost = document.querySelector(`.CompanySettings_post[data-post-key="${postKey}"]`);
		let currentPostFullName = currentPost.querySelector('.CompanySettings_link-fullNameEdit');

		let [lastName, firstName, patronym] = currentPostFullName.textContent.split(' ');
		let jobTitle = currentPost.querySelector('.CompanySettings_jobTitle').textContent;

		let currentPostFieldItem = document.querySelector(`.CompanySettings_fieldItem-post[data-post-key="${postKey}"]`);
		let postAdditionFormText = currentPostFieldItem.querySelectorAll('.CompanySettings_formText');

		postAdditionFormText[0].value = jobTitle;
		postAdditionFormText[1].value = lastName;
		postAdditionFormText[2].value = firstName;
		postAdditionFormText[3].value = patronym;
	}

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

	function checkExistingPosts() {
		let companyPosts = document.querySelectorAll('.CompanySettings_fieldItem-post');
		let companyMobilePosts = document.querySelectorAll('.CompanySettings_post');
		let addFieldItemPost = document.querySelector('.AddFieldItem-post .AddFieldItem_text');
		let addFieldItemPostMobile = document.querySelector('.AddFieldItem-postMobile .AddFieldItem_text');

		if (addFieldItemPost) {
			if (companyPosts.length) {
				addFieldItemPost.textContent = 'Добавить ещё должность';
			} else {
				addFieldItemPost.textContent = 'Добавить должность';
			}
		}
		
		if (addFieldItemPostMobile) {
			if (companyMobilePosts.length) {
				addFieldItemPostMobile.textContent = 'Добавить ещё должность';
			} else {
				addFieldItemPostMobile.textContent = 'Добавить должность';
			}
		}
	}

	function saveMobileOwner () {
		let ownerAddition = document.getElementById('OwnerAddition');
		let ownerWrapper = document.querySelector('.CompanySettings_ownerWrapper');
		let owner = document.querySelector('.CompanySettings_owner');
		let ownerAdditionFormText = ownerAddition.querySelectorAll('.CompanySettings_formText');
		let ownerFullName = (ownerAdditionFormText[0].value + ' ' + ownerAdditionFormText[1].value + ' ' + ownerAdditionFormText[2].value).trim();

		if (!owner) {
			ownerWrapper.insertAdjacentHTML('beforeend', `<div class="CompanySettings_owner"><div class="CompanySettings_ownerHeader"><div class="CompanySettings_ownerFullName">Владелец</div><a href="javascript:;"class="CompanySettings_removeOwner"></a></div><a href="#owner_edit" class="CompanySettings_link CompanySettings_link-ownerFullNameEdit">${ownerFullName}</a></div><div class="Error Error-small CompanySettings_ownerError hidden"></div>`);
			document.querySelector('.AddFieldItem-ownerMobile').classList.add('hidden');
		} else {
			owner.querySelector('.CompanySettings_link-ownerFullNameEdit').textContent = ownerFullName;
		}
	}

	function saveMobilePost () {
		let actionType = document.querySelector('#PostAddition').dataset.actionType;
		let postKey = document.querySelector('#PostAddition').dataset.postKey;

		if (actionType === 'create') {
			createMobilePost(postKey);
			createDesktopPostFields(postKey);
			updateDesktopPostFieldItem();
		} else if (actionType === 'edit') {
			updateMobilePost(postKey);
			updateDesktopPostFieldItem(postKey);
		}
	}

	function createMobilePost (postKey) {
		let formText = document.querySelectorAll('#PostAddition .CompanySettings_formText');
		let posts = document.querySelector('.CompanySettings_posts');
		let fullName = formText[1].value + ' ' + formText[2].value + ' ' + formText[3].value;

		posts.insertAdjacentHTML('beforeend', `<div class="CompanySettings_post" data-post-key="${postKey}"><div class="CompanySettings_postHeader"><div class="CompanySettings_jobTitle">${formText[0].value}</div><a href="javascript:;" class="CompanySettings_removePost"></a></div><a href="javascript:;"  class="CompanySettings_link CompanySettings_link-fullNameEdit">${fullName}</a></div><div class="Error Error-small CompanySettings_postError hidden"></div>`);

		checkExistingPosts();
	}

	function updateMobilePost (postKey, context) {
		if (context === undefined) {
			context = document.querySelector('#PostAddition');
		}

		let formText = context.querySelectorAll('.CompanySettings_formText');
		let fullName = formText[1].value + ' ' + formText[2].value + ' ' + formText[3].value;

		let currentPost = document.querySelector(`.CompanySettings_post[data-post-key="${postKey}"]`);
		let currentPostJobTitle = currentPost.querySelector('.CompanySettings_jobTitle');
		let currentPostFullName = currentPost.querySelector('.CompanySettings_link-fullNameEdit');

		currentPostJobTitle.textContent = formText[0].value;
		currentPostFullName.textContent = fullName;
	}

	function setAttributes (el, attrs) {
		for (let key in attrs) {
			if (key === 'value') {
				el.value = attrs[key];
			} else {
				el.setAttribute(key, attrs[key]);
			}
		}
	}

	function isOrderedSequence(arr) {
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i] + 1 != arr[i + 1]) {
				return false;
			}
		}

		return true;
	}

	function changeDaysWeekDropdown (dropdownSelect) {
		let abbreviatedNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
		let selectedOptions = dropdownSelect.querySelectorAll('.fs-option.selected');
		let selectedIndexes = Array.from(selectedOptions).map(item => item.dataset.index * 1);
		let fSelectLabel = dropdownSelect.querySelector('.fs-label');
		let resultArray = [];

		if (!selectedIndexes.length) {
			fSelectLabel.textContent = 'Дни недели';
		} else if (selectedIndexes.length == 1) {
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
		daysWeekDropdowns.forEach(daysWeekDropdown => changeDaysWeekDropdown(daysWeekDropdown));
	}

	function wrapElement (elem, wrapperClassName) {
		let newElement = document.createElement('div');
		newElement.className = wrapperClassName;

		newElement.append(elem);
		return newElement;
	}

	function wrapElements (arr, wrapperClassName) {
		let newArr = [];

		arr.forEach(item => newArr.push(wrapElement(item, wrapperClassName)));

		return newArr;
	}

	function updateMobileOwner () {
		let windowWidth = document.documentElement.clientWidth;
		let context = (windowWidth < 768) ? document.getElementById('OwnerAddition') : document.querySelector('.CompanySettings_field-ownerAdditionDesktop');
		let ownerFormText = context.querySelectorAll('.CompanySettings_formText');
		let ownerFullName = (ownerFormText[0].value + ' ' + ownerFormText[1].value + ' ' + ownerFormText[2].value).trim();
		let ownerWrapper = document.querySelector('.CompanySettings_ownerWrapper');
		let owner = ownerWrapper.querySelector('.CompanySettings_owner');
		let addOwnerMobileLink = document.querySelector('.AddFieldItem-ownerMobile');

		if (ownerFullName.length) {
			if (!owner) {
				owner = document.createElement('div');
				owner.className = 'CompanySettings_owner';
				ownerWrapper.append(owner);

				owner.insertAdjacentHTML('beforeend', `<div class="CompanySettings_ownerHeader"><div class="CompanySettings_ownerFullName">Владелец</div><a href="javascript:;"class="CompanySettings_removeOwner"></a></div><a href="javascript:;" class="CompanySettings_link CompanySettings_link-ownerFullNameEdit">${ownerFullName}</a>`);
				owner.insertAdjacentHTML('afterend', '<div class="Error Error-small CompanySettings_ownerError hidden"></div>');
			} else {
				let ownerFullNameEditLink = document.querySelector('.CompanySettings_link-ownerFullNameEdit');
				ownerFullNameEditLink.textContent = ownerFullName;
			}

			addOwnerMobileLink.classList.add('hidden');
		} else {
			if (owner) owner.remove();
			addOwnerMobileLink.classList.remove('hidden');
		}
	}

	function syncOwnerAdditionField () {
		let windowWidth = document.documentElement.clientWidth;
		let companySettingsForm = document.getElementById('CompanySettingsForm');
		let ownerAdditionFields = document.querySelector('#OwnerAddition .CompanySettings_fields');

		if (!ownerAdditionFields) return;

		if (windowWidth < 768) {
			let ownerFormText = companySettingsForm.querySelectorAll('.CompanySettings_field-ownerAdditionDesktop .CompanySettings_formText');

			let labels = Array.from(ownerFormText).map(item => {
				let label = document.createElement('label');
				label.className = 'CompanySettings_label';
				label.htmlFor = item.name;
				label.textContent = item.placeholder;
				return label;
			});

			ownerFormText.forEach( item => {
				item.className = 'CompanySettings_formText CompanySettings_formText-fullWidth';
				item.id = item.name;
				item.setAttribute('form', 'CompanySettingsForm');
				item.removeAttribute('placeholder');

				if (item.name !== 'owner[patronymic]') {
					item.required = true;
				}
			});

			let wrappedFields = wrapElements(ownerFormText, 'CompanySettings_field').map((item, index) => {
				item.prepend(labels[index]);
				return item;
			});

			ownerAdditionFields.append(...wrappedFields);
			updateMobileOwner();
		} else {
			let ownerFormTextMob = ownerAdditionFields.querySelectorAll('.CompanySettings_formText');
			let labels = ownerAdditionFields.querySelectorAll('.CompanySettings_label');
			let ownerAdditionItemDesktop = document.querySelector('.CompanySettings_field-ownerAdditionDesktop .CompanySettings_fieldItem');

			let labelsText = Array.from(labels).map(item => {
				let text = item.textContent;
				item.parentNode.remove();
				return text;
			});

			ownerFormTextMob.forEach( (item, index) => {
				item.className = 'CompanySettings_formText CompanySettings_formText-col3 CompanySettings_formText-gutter';
				item.placeholder = labelsText[index];
				item.required = false;
				item.removeAttribute('id');
				item.removeAttribute('form');
			});

			ownerAdditionItemDesktop.append(...ownerFormTextMob);
			$.fancybox.close();
		}
	}

	function changePopupOptions (popupId, popupTitle, buttonText, clearFields = false) {
		let popup = document.querySelector(popupId);
    let mobileHeaderTitle = popup.querySelector('.MobileHeader_title');
    mobileHeaderTitle.textContent = popupTitle;

    let addButton = popup.querySelector('.CompanySettings_addButton');
    addButton.textContent = buttonText;

  	let popupFormText = popup.querySelectorAll('.CompanySettings_formText');
  	popupFormText.forEach(formText => formText.classList.remove('HasError'));

    if (clearFields) {
    	popupFormText.forEach(formText => formText.value = '');
    }
	}

	function syncPostField () {
		let postFieldItems = document.querySelectorAll('.CompanySettings_fieldItem-post');
		postFieldItems.forEach( (fieldItem, index) => {
			let formText = fieldItem.querySelectorAll('.CompanySettings_formText');
			let fullName = (formText[1].value + ' ' + formText[2].value + ' ' + formText[3].value).trim();
			let postKey = fieldItem.dataset.postKey;
			let currentPost = document.querySelector(`.CompanySettings_post[data-post-key="${postKey}"]`);

			if (fullName.length || formText[0].value.length) {
				if (!currentPost) createMobilePost(postKey);
				updateMobilePost(postKey, fieldItem);
			} else {
				removeFieldAndError(currentPost);
			}
		});
	}

	function countFieldItems (field) {
		return field.querySelectorAll('.CompanySettings_fieldItem').length;
	}

	function checkWriteBtnField () {
		let writeBtnFieldItems = document.querySelectorAll('.CompanySettings_fieldItem-writeBtn');

		writeBtnFieldItems.forEach(fieldItem => {
			let selectedOption = fieldItem.querySelector('.DropdownSelect .fs-option.selected');

			let formText = fieldItem.querySelector('.CompanySettings_formText');
			formText.disabled = selectedOption.dataset.value === '';

			let checkboxWrapper = fieldItem.querySelector('.CompanySettings_checkboxWrapper');
			let isLogin = checkboxWrapper.querySelector('[data-action="isLogin"]');
			let isPublic = checkboxWrapper.querySelector('[data-action="isPublic"]');

			switch (selectedOption.dataset.value) {
				case 'viber':
					checkPublicAccountUsage(fieldItem);

					isLogin.checked = false;
					isLogin.closest('.Checkbox-isLogin').classList.add('hidden');
					isPublic.closest('.Checkbox-isPublic').classList.remove('hidden');

					document.getElementById('LoginExplanation').classList.add('hidden');
					document.getElementById('URIExplanation').classList.add('hidden');
					break;
				case 'telegram':
					checkLoginUsage(fieldItem);

					isPublic.checked = false;
					isPublic.closest('.Checkbox-isPublic').classList.add('hidden');
					isLogin.closest('.Checkbox-isLogin').classList.remove('hidden');

					document.getElementById('URIExplanation').classList.add('hidden');
					document.getElementById('LoginExplanation').classList.add('hidden');
					break;
				case '':
				case 'whatsapp':
					formText.placeholder = 'Телефон';

					isLogin.checked = false;
					isLogin.closest('.Checkbox-isLogin').classList.add('hidden');

					isPublic.checked = false;
					isPublic.closest('.Checkbox-isPublic').classList.add('hidden');

					document.getElementById('LoginExplanation').classList.add('hidden');
					document.getElementById('URIExplanation').classList.add('hidden');
					break;
			}
		});
	}

	function checkLoginUsage (fieldItem) {
		let messengerValue = fieldItem.querySelector('[data-src="messengerValue"]');
		let isLogin = fieldItem.querySelector('[data-action="isLogin"]');
		let writeBtnField = fieldItem.closest('.CompanySettings_field-writeBtn');
		let loginExplanation = document.getElementById('LoginExplanation');

		if (isLogin && isLogin.checked) {
			messengerValue.placeholder = 'Введите логин';
			loginExplanation.classList.remove('hidden');
		} else {
			messengerValue.placeholder = 'Телефон';
			loginExplanation.classList.add('hidden');
		}
	}

	function checkPublicAccountUsage (fieldItem) {
		let messengerValue = fieldItem.querySelector('[data-src="messengerValue"]');
		let isPublic = fieldItem.querySelector('[data-action="isPublic"]');
		let writeBtnField = fieldItem.closest('.CompanySettings_field-writeBtn');
		let uriExplanation = document.getElementById('URIExplanation');

		if (isPublic && isPublic.checked) {
			messengerValue.placeholder = 'Введите URI';
			uriExplanation.classList.remove('hidden');
		} else {
			messengerValue.placeholder = 'Телефон';
			uriExplanation.classList.add('hidden');
		}
	}

	// Use public account
	document.addEventListener('change', function (e) {
		let isPublic = e.target.closest('[data-action="isPublic"]');

		if (!isPublic) return;

		let fieldItem = isPublic.closest('.CompanySettings_fieldItem');
		checkPublicAccountUsage(fieldItem);
	});

	// Use login
	document.addEventListener('change', function (e) {
		let isLogin = e.target.closest('[data-action="isLogin"]');

		if (!isLogin) return;

		let fieldItem = isLogin.closest('.CompanySettings_fieldItem');
		checkLoginUsage(fieldItem);
	});

	document.addEventListener('click', function (e) {
		let writeBtnDropdownOption = e.target.closest('.DropdownSelect-writeBtn .fs-option');

		if (!writeBtnDropdownOption) return;

		checkWriteBtnField();
	});

	// Add office field
	document.addEventListener('click', function (e) {
		let addOfficeLink = e.target.closest('.AddFieldItem-office');

		if (!addOfficeLink) return;

		let fieldItems = addOfficeLink.closest('.CompanySettings_fieldContent').querySelector('.CompanySettings_fieldItems');

		let select = fieldItems.firstElementChild.querySelector('select').cloneNode(true);
		select.classList.remove('hidden');

		let dropdownSelect = document.createElement('div');
		dropdownSelect.className = 'DropdownSelect DropdownSelect-mobile DropdownSelect DropdownSelect-companySettings CompanySettings_dropdownSelect';
		dropdownSelect.append(select);

		let formText = fieldItems.firstElementChild.querySelector('.CompanySettings_formText').cloneNode(true);

		let newFieldItem = document.createElement('div');
		newFieldItem.className = 'CompanySettings_fieldItem CompanySettings_fieldItem-additional';
		newFieldItem.append(dropdownSelect, formText);
		newFieldItem.insertAdjacentHTML('beforeend', '<a href="javascript:;" class="CompanySettings_removeFieldItem"></a>');

		fieldItems.insertAdjacentElement('beforeend', newFieldItem);
		newFieldItem.insertAdjacentHTML('afterend', '<div class="Error Error-small CompanySettings_fieldError hidden"></div>');

		clearFieldItemError(newFieldItem);
		$(select).fSelect('reload');
	});

	// Add write button field
	document.addEventListener('click', function (e) {
		let addWriteBtn = e.target.closest('.AddFieldItem-writeBtn');

		if (!addWriteBtn) return;

		let key = randomString(4);
		let fieldItems = addWriteBtn.closest('.CompanySettings_fieldContent').querySelector('.CompanySettings_fieldItems');

		let select = fieldItems.firstElementChild.querySelector('select').cloneNode(true);
		select.classList.remove('hidden');
		select.name = `write[${key}][messenger]`;
		select.value = '';

		let dropdownSelect = document.createElement('div');
		dropdownSelect.className = 'DropdownSelect DropdownSelect-mobile DropdownSelect-writeBtn DropdownSelect DropdownSelect-companySettings CompanySettings_dropdownSelect CompanySettings_dropdownSelect-contactBtn';
		dropdownSelect.append(select);

		let formText = fieldItems.firstElementChild.querySelector('.CompanySettings_formText').cloneNode(true);
		formText.classList.add('CompanySettings_formText-contactBtn');
		formText.classList.add('CompanySettings_formText-gutter');
		formText.name = `write[${key}][value]`;
		formText.value = '';

		let checkboxWrapper = fieldItems.querySelector('.CompanySettings_checkboxWrapper').cloneNode(true);

		let isLogin = checkboxWrapper.querySelector('[data-action="isLogin"]');
		isLogin.name = `write[${key}][is_login]`;
		isLogin.id = `is_login${key}`;
		isLogin.checked = false;

		let isLoginLabel = isLogin.nextElementSibling;
		isLoginLabel.htmlFor = `is_login${key}`;
		
		let isPublic = checkboxWrapper.querySelector('[data-action="isPublic"]');
		isPublic.name = `write[${key}][is_public]`;
		isPublic.id = `is_public${key}`;
		isPublic.checked = false;

		let isPublicLabel = isPublic.nextElementSibling;
		console.log(isPublicLabel);
		isPublicLabel.htmlFor = `is_public${key}`;

		let newFieldItem = document.createElement('div');
		newFieldItem.dataset.fieldItemKey = key;
		newFieldItem.className = 'CompanySettings_fieldItem CompanySettings_fieldItem-verticalCenter CompanySettings_fieldItem-additional CompanySettings_fieldItem-writeBtn';
		newFieldItem.append(dropdownSelect, formText, checkboxWrapper);
		newFieldItem.insertAdjacentHTML('beforeend', '<a href="javascript:;" class="CompanySettings_removeFieldItem CompanySettings_removeFieldItem-writeBtn"></a>');

		fieldItems.insertAdjacentElement('beforeend', newFieldItem);
		newFieldItem.insertAdjacentHTML('afterend', '<div class="Error Error-small CompanySettings_fieldError hidden"></div>');

		clearFieldItemError(newFieldItem);
		$(select).fSelect('reload');
		checkWriteBtnField();

		let fieldWriteBtn = addWriteBtn.closest('.CompanySettings_field-writeBtn');
		if (countFieldItems(fieldWriteBtn) == 7) {
			addWriteBtn.remove();
		}
	});

	// Add call button field
	document.addEventListener('click', function (e) {
		let addCallBtn = e.target.closest('.AddFieldItem-callBtn');

		if (!addCallBtn) return;

		let key = randomString(4);
		let fieldItems = addCallBtn.closest('.CompanySettings_fieldContent').querySelector('.CompanySettings_fieldItems');
		let newFieldItem = fieldItems.firstElementChild.cloneNode(true);
		newFieldItem.classList.add('CompanySettings_fieldItem-additional');
		fieldItems.append(newFieldItem);

		let formText = newFieldItem.querySelector('.CompanySettings_formText-contactBtn');
		formText.name = `call[${key}][phone]`;
		formText.value = '';

		newFieldItem.insertAdjacentHTML('beforeend', '<a href="javascript:;" class="CompanySettings_removeFieldItem CompanySettings_removeFieldItem-callBtn"></a>');
		newFieldItem.insertAdjacentHTML('afterend', '<div class="Error Error-small CompanySettings_fieldError hidden"></div>');

		clearFieldItemError(newFieldItem);

		let fieldCallBtn = addCallBtn.closest('.CompanySettings_field-callBtn');
		if (countFieldItems(fieldCallBtn) == 7) {
			addCallBtn.remove();
		}
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
		newFieldItem.insertAdjacentHTML('afterend', '<div class="Error Error-small CompanySettings_fieldError hidden"></div>');

		clearFieldItemError(newFieldItem);
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
		newFieldItem.insertAdjacentHTML('afterend', '<div class="Error Error-small CompanySettings_fieldError hidden"></div>');

		clearFieldItemError(newFieldItem);

		$(select).fSelect({
			placeholder: 'Дни недели',
			overflowText: '{n} выбрано',
			showSearch: false
		});

		changeDaysWeekDropdowns();
	});

	// Add post field
	document.addEventListener('click', function (e) {
		let addPostLink = e.target.closest('.AddFieldItem-post');

		if (!addPostLink) return;

		let key = randomString(4);
		createDesktopPostFields(key);
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
		let removeFieldItem = e.target.closest('.CompanySettings_removeFieldItem');

		if (!removeFieldItem) return;

		let parentField = removeFieldItem.closest('.CompanySettings_field');
		let fieldItem = removeFieldItem.closest('.CompanySettings_fieldItem');

		if (parentField.classList.contains('CompanySettings_field-post')) {
			let postFieldItems = document.querySelectorAll('.CompanySettings_fieldItem-post');
			let fieldItemIndex = Array.from(postFieldItems).indexOf(fieldItem);

			let posts = document.querySelectorAll('.CompanySettings_post');
			removeFieldAndError(posts[fieldItemIndex]);

			if (postFieldItems.length == 1) {
				document.querySelector('.CompanySettings_field-post').remove();
			}
		}

		if (parentField.classList.contains('CompanySettings_field-writeBtn')) {
			if (countFieldItems(parentField) == 7) {
				parentField.querySelector('.CompanySettings_fieldContent').insertAdjacentHTML('beforeend', '<a class="AddFieldItem AddFieldItem-writeBtn" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20"><path data-name="Фигура 40" d="M10 20a10 10 0 1110-10 10.014 10.014 0 01-10 10zm0-18.75A8.75 8.75 0 1018.75 10 8.756 8.756 0 0010 1.25zm4.37 9.375H5.62a.625.625 0 010-1.25h8.75a.625.625 0 110 1.25zM10 15a.626.626 0 01-.63-.625v-8.75a.625.625 0 111.25 0v8.75A.624.624 0 0110 15z" fill="#4b97f9" fill-rule="evenodd"/></svg>Добавить ещё телефон</a>');
			}
		}

		if (parentField.classList.contains('CompanySettings_field-callBtn')) {
			if (countFieldItems(parentField) == 7) {
				parentField.querySelector('.CompanySettings_fieldContent').insertAdjacentHTML('beforeend', '<a class="AddFieldItem AddFieldItem-callBtn" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20"><path data-name="Фигура 40" d="M10 20a10 10 0 1110-10 10.014 10.014 0 01-10 10zm0-18.75A8.75 8.75 0 1018.75 10 8.756 8.756 0 0010 1.25zm4.37 9.375H5.62a.625.625 0 010-1.25h8.75a.625.625 0 110 1.25zM10 15a.626.626 0 01-.63-.625v-8.75a.625.625 0 111.25 0v8.75A.624.624 0 0110 15z" fill="#4b97f9" fill-rule="evenodd"/></svg>Добавить ещё телефон</a>');
			}
		}

		removeFieldAndError(fieldItem);
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

		timeRangeDropdownLabel.parentNode.classList.toggle('TimeRangeDropdown-opened');
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

	document.addEventListener('change', function (e) {
		let timeRangeDropdownTime = e.target.closest('.TimeRangeDropdown_time');

		if (!timeRangeDropdownTime) return;

		checkTimeFieldState(timeRangeDropdownTime);
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

	// Owner addition/edit
	document.addEventListener('click', function (e) {
		let addOwnerBtn = e.target.closest('.CompanySettings_addButton-owner');

		if (!addOwnerBtn) return;

		saveMobileOwner();

		e.preventDefault();
		$.fancybox.close();
	});

	document.addEventListener('input', function (e) {
		let ownerFullNameField = e.target.closest('.CompanySettings_field-ownerAdditionDesktop .CompanySettings_formText');

		if (!ownerFullNameField) return;

		updateMobileOwner();
	});	

	$('a[href="#OwnerAddition"]').fancybox({
		...fancyboxOpts,
	  beforeLoad: function(instance, current) {
    	changePopupOptions(this.src, 'Добавить владельца', 'Добавить владельца', true);
    }
	});

	document.addEventListener('click', function (e) {
		let ownerFullNameEditLink = e.target.closest('.CompanySettings_link-ownerFullNameEdit');

		if (!ownerFullNameEditLink) return;

		$.fancybox.open({
	    src: '#OwnerAddition',
	    type: 'inline',
	    opts: {
	    	...fancyboxOpts,
	    	beforeLoad: function (instance, current) {
		      changePopupOptions(this.src, 'Редактировать владельца', 'Сохранить изменения');
		    }
		  }
		});
	});

	$('[data-src="#PostAddition"]').fancybox({
		...fancyboxOpts,
	  beforeLoad: function(instance, current) {
	  	let postAddition = document.querySelector(this.src);
	  	let key = randomString(4);

	  	changePopupOptions(this.src, 'Добавить должность', 'Добавить должность', true);
	  	postAddition.dataset.postKey = key;
	  	postAddition.dataset.actionType = 'create';

	   	let postAdditionFormText = document.querySelectorAll(`${this.src} .CompanySettings_formText`);

			postAdditionFormText[0].name = `person[${key}][post]`;
			postAdditionFormText[1].name = `person[${key}][last_name]`;
			postAdditionFormText[2].name = `person[${key}][first_name]`;
			postAdditionFormText[3].name = `person[${key}][patronymic]`;
    }
	});

	document.addEventListener('input', function (e) {
		let postFormText = e.target.closest('.CompanySettings_field-post .CompanySettings_formText');

		if (!postFormText) return;

		syncPostField();
	});

	// Post addition/edit
	document.addEventListener('click', function (e) {
		let addPostBtn = e.target.closest('.CompanySettings_addButton-post');

		if (!addPostBtn) return;

		saveMobilePost();

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
	    	...fancyboxOpts,
	    	beforeLoad: function (instance, current) {
		      let [lastName, firstName, patronymic] = fullNameEditLink.textContent.split(' ');

		      let posts = document.querySelectorAll('.CompanySettings_post');
		      let currentPost = fullNameEditLink.closest('.CompanySettings_post');
		      let currentPostKey = currentPost.dataset.postKey;
					let jobTitle = currentPost.querySelector('.CompanySettings_jobTitle').textContent;

					changePopupOptions(this.src, 'Редактировать должность', 'Сохранить изменения');

		      let postAddition = document.querySelector(this.src);
		      let postAdditionFormText = postAddition.querySelectorAll('.CompanySettings_formText');

		      postAddition.dataset.postKey = currentPostKey;
		      postAddition.dataset.actionType = 'edit';

					setAttributes(postAdditionFormText[0], {'name': `person[${currentPostKey}][post]`, 'value': jobTitle});
					setAttributes(postAdditionFormText[1], {'name': `person[${currentPostKey}][last_name]`, 'value': lastName});
					setAttributes(postAdditionFormText[2], {'name': `person[${currentPostKey}][first_name]`, 'value': firstName});
					setAttributes(postAdditionFormText[3], {'name': `person[${currentPostKey}][patronymic]`, 'value': patronymic});
		    }
		  }
		});
	});

	$('a[href="#AltAddressAddition"]').fancybox(fancyboxOpts);

	document.addEventListener('click', function (e) {
		let removePostLink = e.target.closest('.CompanySettings_removePost');

		if (!removePostLink) return;

		let currentPost = removePostLink.closest('.CompanySettings_post');
		let posts = document.querySelectorAll('.CompanySettings_post');
		let currentPostIndex = Array.from(posts).indexOf(currentPost);

		let postFieldItems = document.querySelectorAll(`.CompanySettings_fieldItem-post`);
		postFieldItems[currentPostIndex].remove();

		removeFieldAndError(currentPost);

		if (postFieldItems.length == 1) {
			document.querySelector('.CompanySettings_field-post').remove();
		}

		checkExistingPosts();
	});

	document.addEventListener('click', function (e) {
		let removeOwnerLink = e.target.closest('.CompanySettings_removeOwner');

		if (!removeOwnerLink) return;

		let owner = removeOwnerLink.closest('.CompanySettings_owner');
		removeFieldAndError(owner);
		document.querySelector('.AddFieldItem-ownerMobile').classList.remove('hidden');

		let ownerFormText = document.querySelectorAll('#OwnerAddition .CompanySettings_formText');
		ownerFormText.forEach(item => item.value = '');
	});

	document.addEventListener('click', function (e) {
		let clickedOption = e.target.closest('.DropdownSelect-daysWeek .fs-option');

		if (!clickedOption) return;

		let dropdownSelect = clickedOption.closest('.DropdownSelect-daysWeek');
		changeDaysWeekDropdown(dropdownSelect);

		let selectedValue = clickedOption.dataset.value;
		let selectedOption = dropdownSelect.querySelector(`.DropdownSelect_select option[value="${selectedValue}"]`);

		selectedOption.toggleAttribute('selected');
	});

	checkTimeFieldsState();
	syncOwnerAdditionField();
	syncPostField();
	checkExistingPosts();
	changeDaysWeekDropdowns();
	checkWriteBtnField();

	window.addEventListener('resize', function () {
		syncOwnerAdditionField();
		checkExistingPosts();
	});
	
});