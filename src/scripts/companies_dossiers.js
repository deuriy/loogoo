/*=require ./includes/blocks/*.js*/

document.addEventListener('DOMContentLoaded', function () {
	function checkTextBoxFilling (textBox) {
		let closeSearchBtn = textBox.closest('.Search-companiesDossiers').querySelector('.Search_closeBtn');

		if (textBox.value.length) {
			closeSearchBtn.classList.remove('hidden');
		} else {
			closeSearchBtn.classList.add('hidden');
		}
	}

	let applicationBlock = document.querySelector('.Application');
	if (applicationBlock) {
		if (!checkBlockHidden(applicationBlock.id)) {
			applicationBlock.classList.remove('hidden');
		} else {
			applicationBlock.remove();
		}
	}

	document.addEventListener('click', function (e) {
		let applicationCloseBtn = e.target.closest('.Application_close');

		if (!applicationCloseBtn) return;

		let application = applicationCloseBtn.closest('.Application');
		application.remove();
		hideBlockWithCookie(application.id);
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

	// Profile Types
	document.addEventListener('click', function (e) {
		let profileType = e.target.closest('.ProfileType');

		if (!profileType) return;

		let activeProfileType = document.querySelector('.ProfileType-active');
		if (activeProfileType) {
			activeProfileType.classList.remove('ProfileType-active');
		}
		profileType.classList.add('ProfileType-active');

		let addingCompany = document.querySelector('.CompanySettings-addingCompany');
		let agencyNameField = addingCompany.querySelector('.CompanySettings_field-agencyName');
		let fioField = addingCompany.querySelector('.CompanySettings_field-fio');

		switch (profileType.dataset.value) {
			case 'agency':
				agencyNameField.hidden = false;
				addingCompany.company_name.disabled = false;
				fioField.hidden = true;
				addingCompany.fio.disabled = true;
				break;
			case 'flp':
				agencyNameField.hidden = true;
				addingCompany.company_name.disabled = true;
				fioField.hidden = false;
				addingCompany.fio.disabled = false;
				break;
		}

		let profileTypeInput = addingCompany.profile_type;
		if (profileTypeInput) {
			profileTypeInput.value = profileType.dataset.value;
		}

		addingCompany.classList.remove('CompanySettings-addingCompanyDefault');
		addingCompany.querySelector('.CompanySettings_fields').hidden = false;
		addingCompany.querySelector('.CompanySettings_addButton').hidden = false;

		e.preventDefault();
	});

	document.addEventListener('click', function (e) {
		let removeFieldItem = e.target.closest('.CompanySettings_removeFieldItem');

		if (!removeFieldItem) return;

		let parentField = removeFieldItem.closest('.CompanySettings_field');

		if (!parentField) return;

		parentField.remove();
	});

});