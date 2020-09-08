document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (e) {
		let fieldVisibilityCheckbox = e.target.closest('.Checkbox-fieldVisibility .Checkbox_input');

		if (!fieldVisibilityCheckbox) return;

		let dependentFieldRow = fieldVisibilityCheckbox.closest('.AddTestimonial_field').querySelector('.AddTestimonial_fieldRow-dependent');
		if (fieldVisibilityCheckbox.checked) {
			dependentFieldRow.hidden = false;
		} else {
			dependentFieldRow.hidden = true;
		}
	});
});