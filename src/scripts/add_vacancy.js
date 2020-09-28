let Vacancy = {
	init() {
		document.addEventListener('click', function (e) {
			let salaryTypeDropdown = e.target.closest('.DropdownSelect-salaryType');

			if (!salaryTypeDropdown) return;

			Vacancy.changeSalaryType();
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

		if (salaryField.hidden) {
			salaryType.disabled = salaryRangeFrom.disabled = salaryRangeTo.disabled = salaryRangeFixed.disabled = true;
			return;
		}

		salaryType.disabled = false;

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
		let priceField = document.querySelector('.CompanySettings_field-price');
		let priceFieldInput = priceField.querySelector('input[name="is_paid"]');
		let currencySelect = priceField.querySelector('.NumberField_currencySelect select');

		switch (vacancyType.value) {
			case 'free':
				priceField.hidden = priceFieldInput.disabled = currencySelect.disabled = true;
				break;
			case 'paid':
				priceField.hidden = priceFieldInput.disabled = currencySelect.disabled = false;
				break;
		}
	}
};

document.addEventListener('DOMContentLoaded', function () {
	Vacancy.init();
});