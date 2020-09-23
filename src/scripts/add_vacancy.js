let Vacancy = {
	init() {
		document.addEventListener('click', function (e) {
			let salaryTypeDropdown = e.target.closest('.DropdownSelect-salaryType');

			if (!salaryTypeDropdown) return;

			changeSalaryType();
		});

		document.addEventListener('click', function (e) {
			let vacancyTypeDropdown = e.target.closest('.DropdownSelect-vacancyType');

			if (!vacancyTypeDropdown) return;

			Vacancy.changeVacancyType();
			Vacancy.changeSalaryType();
		});

		Vacancy.changeVacancyType();
		Vacancy.changeSalaryType();
	},

	changeSalaryType() {
		let salaryType = document.querySelector('select[name="salary_type"]');
		let salaryField = document.querySelector('.CompanySettings_field-salary');
		let salaryRange = document.querySelector('.NumberField-salaryRange');
		let salaryRangeFrom = salaryRange.querySelector('.NumberField_formText-from');
		let salaryRangeTo = salaryRange.querySelector('.NumberField_formText-to');
		let salaryRangeFixed = salaryRange.querySelector('.NumberField_formText-fixedSalary');
		let salaryRangeSeparator = salaryRange.querySelector('.NumberField_rangeSeparator');
		let currencySelect = salaryRange.querySelector('.NumberField_currencySelect select');

		if (salaryField.hidden) {
			salaryType.disabled = salaryRangeFrom.disabled = salaryRangeTo.disabled = salaryRangeFixed.disabled = currencySelect.disabled = true;
			return;
		}

		salaryType.disabled = currencySelect.disabled = false;

		switch (salaryType.value) {
			case 'fixed':
				salaryRangeFrom.hidden = salaryRangeTo.hidden = salaryRangeSeparator.hidden = true;
				salaryRangeFrom.disabled = salaryRangeTo.disabled = true;
				salaryRangeFixed.hidden = false;
				salaryRangeFixed.disabled = false;
				break;
			case 'flexible':
				salaryRangeFrom.hidden = salaryRangeTo.hidden = salaryRangeSeparator.hidden = false;
				salaryRangeFrom.disabled = salaryRangeTo.disabled = false;
				salaryRangeFixed.hidden = true;
				salaryRangeFixed.disabled = true;
				break;
		}
	},

	changeVacancyType() {
		let vacancyType = document.querySelector('select[name="vacancy_type"]');
		let salaryField = document.querySelector('.CompanySettings_field-salary');

		switch (vacancyType.value) {
			case 'free':
				salaryField.hidden = true;
				break;
			case 'paid':
				salaryField.hidden = false;
				break;
		}
	}
};

document.addEventListener('DOMContentLoaded', function () {
	Vacancy.init();
});