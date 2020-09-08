document.addEventListener('DOMContentLoaded', function () {
	function changeSalaryType () {
		let salaryType = document.querySelector('select[name="salary_type"]');
		let salaryRange = document.querySelector('.NumberField-salaryRange');
		let salaryRangeFrom = salaryRange.querySelector('.NumberField_formText-from');
		let salaryRangeTo = salaryRange.querySelector('.NumberField_formText-to');
		let salaryRangeFixed = salaryRange.querySelector('.NumberField_formText-fixedSalary');
		let salaryRangeSeparator = salaryRange.querySelector('.NumberField_rangeSeparator');

		if (salaryType.value === 'fixed') {
			salaryRangeFrom.hidden = salaryRangeTo.hidden = salaryRangeSeparator.hidden = true;
			salaryRangeFrom.disabled = salaryRangeTo.disabled = true;
			salaryRangeFixed.hidden = false;
			salaryRangeFixed.disabled = false;
		} else if (salaryType.value === 'flexible') {
			salaryRangeFrom.hidden = salaryRangeTo.hidden = salaryRangeSeparator.hidden = false;
			salaryRangeFrom.disabled = salaryRangeTo.disabled = false;
			salaryRangeFixed.hidden = true;
			salaryRangeFixed.disabled = true;
		}
	}

	document.addEventListener('click', function (e) {
		let salaryTypeDropdown = e.target.closest('.DropdownSelect-salaryType');

		if (!salaryTypeDropdown) return;

		changeSalaryType();
	});

	changeSalaryType();
	
});