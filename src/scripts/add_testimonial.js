document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (e) {
		let fieldVisibilityCheckbox = e.target.closest('.Checkbox-fieldVisibility .Checkbox_input');

		if (!fieldVisibilityCheckbox) return;
		
		showRatingItems();
		setDropdownVisibility(fieldVisibilityCheckbox);
		setVisibilityOtherFields();
	});

	function setDropdownVisibility (fieldVisibilityCheckbox) {
		let dependentFieldRow = fieldVisibilityCheckbox.closest('.AddTestimonial_field').querySelector('.AddTestimonial_fieldRow-dependent');

		if (dependentFieldRow) {
			if (fieldVisibilityCheckbox.checked) {
				dependentFieldRow.hidden = false;
			} else {
				dependentFieldRow.hidden = true;
			}
		}
	}

	function setVisibilityOtherFields () {
		let employmentCheckbox = document.querySelector('#Checkbox-employment .Checkbox_input');
		let docsPreparationCheckbox = document.querySelector('#Checkbox-documentsPreparation .Checkbox_input');
		let countryIdSelect = document.querySelector('.DropdownSelect-countryId .DropdownSelect_select');
		let otherFields = document.querySelector('.AddTestimonial_otherFields');

		// otherFields.hidden = !(employmentCheckbox.checked && countryIdSelect.value !== 'none');
		otherFields.hidden = !employmentCheckbox.checked && !docsPreparationCheckbox.checked;
		countryIdSelect.disabled = !employmentCheckbox.checked;
	}

	document.addEventListener('click', function (e) {
		let countryIdSelect = e.target.closest('.DropdownSelect-countryId');

		if (!countryIdSelect) return;

		setVisibilityOtherFields();
	});

	function showRatingItems () {
		let checkboxes = document.querySelectorAll('.Checkbox-fieldVisibility');

		document.querySelectorAll('.RatingItem').forEach( ratingItem => {
			let checkboxIds = JSON.parse(ratingItem.dataset.checkboxIds);

			checkboxes.forEach( checkbox => {
				ratingItem.hidden = true;
				ratingItem.querySelector('.RatingItem_input').disabled = true;
			});

			checkboxes.forEach( checkbox => {
				if (checkboxIds.includes(checkbox.id) && checkbox.querySelector('.Checkbox_input').checked) {
					ratingItem.hidden = false;
					ratingItem.querySelector('.RatingItem_input').disabled = false;
				}
			});
		});
	}

	function setRatingItemValue (ratingItem) {
		let ratingItemInput = ratingItem.querySelector('.RatingItem_input');
		let ratingItemNumber = ratingItem.querySelector('.RatingItem_number');
		let ratingItemStars = ratingItem.querySelectorAll('.RatingItem_star');

		if (ratingItemInput.value) {
			ratingItemNumber.textContent = ratingItemInput.value;
			ratingItemStars[ratingItemInput.value - 1].click();
		} else {
			ratingItemNumber.textContent = ' -';
			ratingItemInput.disabled = true;
		}
	}

	document.querySelectorAll('.Checkbox-fieldVisibility .Checkbox_input').forEach( checkbox => {
		setDropdownVisibility(checkbox);
	});

	document.querySelectorAll('.RatingItem').forEach( ratingItem => {
		setRatingItemValue(ratingItem);
	});

	setVisibilityOtherFields();
	showRatingItems();
});

// document.addEventListener('click', function (e) {
// 	let addDocumentTypeLink = e.target.closest('.AddFieldItem-documentType');

// 	if (!addDocumentTypeLink) return;

// 	let documentsTypeTmpl = document.getElementById('DocumentsTypeTmpl').content.cloneNode(true);
// 	let parentField = addDocumentTypeLink.closest('.AddTestimonial_field-documentsPreparation');
// 	parentField.querySelector('.AddTestimonial_fieldItem').append(documentsTypeTmpl);

// 	$('.DropdownSelect_select').fSelect('reload');
// });

// document.addEventListener('click', function (e) {
// 	let removeFieldRowLink = e.target.closest('.AddTestimonial_removeFieldRow');

// 	if (!removeFieldRowLink) return;

// 	let fieldRow = removeFieldRowLink.closest('.AddTestimonial_fieldRow');
// 	if (fieldRow) {
// 		fieldRow.remove();
// 	}
// });