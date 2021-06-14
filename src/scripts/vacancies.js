document.addEventListener('DOMContentLoaded', function () {
	let swipers = [];

	document.querySelectorAll('.Swiper').forEach((item, index) => {
		swipers.push(new Swiper(`#${item.id}`, {
			slidesPerView: 'auto',
			spaceBetween: 4,
			loop: true
		}));
	});
	
	// Perfect Scrollbar
	let psCheckboxArr = [], psRadioArr = [];
	let checkboxList = document.querySelectorAll('.CheckboxList_content'),
			radioBtnsList = document.querySelectorAll('.RadioBtnsList_content');

	if (document.documentElement.clientWidth > 767) {
		for (let i = 0; i < checkboxList.length; i++) {
			if (checkboxList[i].querySelectorAll('.Checkbox').length > 6) {
				psCheckboxArr.push(new PerfectScrollbar(checkboxList[i], {
					wheelSpeed: 2,
					wheelPropagation: false
				}));
			}
		}
	
		for (let i = 0; i < radioBtnsList.length; i++) {
			if (checkboxList[i].querySelectorAll('.RadioBtn').length > 6) {
				psRadioArr.push(new PerfectScrollbar(radioBtnsList[i], {
					wheelSpeed: 2,
					wheelPropagation: false
				}));
			}
		}
	}

	document.addEventListener('input', function (e) {
		let searchText = e.target.closest('.Search-results .Search_text');

		if (!searchText) return;

		let closeBtn = document.querySelector('.Search-results .Search_closeBtn');

		if (searchText.value.length) {
			closeBtn.classList.remove('hidden');
		} else {
			closeBtn.classList.add('hidden');
		}
	});

	document.addEventListener('click', function (e) {
		let closeBtn = e.target.closest('.Search-results .Search_closeBtn');

		if (!closeBtn) return;

		let searchText = document.querySelector('.Search-results .Search_text');
		searchText.value = '';
		closeBtn.classList.add('hidden');
	});

	document.addEventListener('click', function (e) {
		let searchIcon = e.target.closest('.Search-results .Search_icon');

		if (!searchIcon) return;

		e.preventDefault();
	});

	document.addEventListener('input', function (e) {
		let liveCheckboxSearchInput = e.target;

		if (liveCheckboxSearchInput.dataset.action !== 'liveCheckboxSearch') return;

		let checkboxListSelector = liveCheckboxSearchInput.dataset.checkboxList;
		let checkboxList = document.querySelector(checkboxListSelector);

		if (!checkboxList) return;

		let checkboxListItems = checkboxList.querySelectorAll('.Checkbox');
		let checkboxListContent = checkboxList.querySelector('.CheckboxList_content');
		let noResults = checkboxList.querySelector('.CheckboxList_noResults');

		for (let item of checkboxListItems) {
			let label = item.querySelector('label');

			if (label.textContent.toLowerCase().indexOf(liveCheckboxSearchInput.value.toLowerCase()) == -1) {
				item.style.display = 'none';
			} else {
				item.style.display = 'block';
			}
		}

		let filteredCheckboxes = Array.from(checkboxListItems).filter(item => item.style.display !== 'none');

		if (filteredCheckboxes.length) {
			checkboxListContent.style.display = 'block';
			noResults.style.cssText = '';
		} else {
			checkboxListContent.style.cssText = '';
			noResults.style.display = 'block';
		}

		if (document.documentElement.clientWidth > 767) {
			for (let ps of psCheckboxArr) {
				ps.update();
			}
		}
		
	});

	function clearCheckboxList(checkboxList) {
		if (!checkboxList) return;

		let checkedCheckboxes = checkboxList.querySelectorAll('.Checkbox_input:checked');
		for (let checkboxInput of checkedCheckboxes) {
			checkboxInput.checked = false;
		}
		
		let allSelect = checkboxList.querySelectorAll('select');
		clearDropdownList(allSelect);
	}

	function clearRadioBtnsList(radioBtnsList) {
		if (!radioBtnsList) return;

		let checkedRadioInput = radioBtnsList.querySelector('.RadioBtn_input:checked');
		if (checkedRadioInput) {
			checkedRadioInput.checked = false;
		}

		let allSelect = radioBtnsList.querySelectorAll('select');
		clearDropdownList(allSelect);
	}

	function clearDropdownList (dropdownList) {
		for (const dropdown of dropdownList) {
			for (const option of dropdown.options) {
				option.selected = false;
			}
			$(dropdown).fSelect('reload');
		}
	}

	function clearRangeItem(rangeItem) {
		if (!rangeItem) return;

		let textInput = rangeItem.querySelectorAll('.FormText');

		for (let input of textInput) {
			input.value = '';
		}
	}

	function clearFilterElement (element) {
		let type = element.dataset.elementType;

		if (!type) return;

		switch (type) {
			case 'checkboxList':
				clearCheckboxList(element);
				break;
			case 'radioBtnsList':
				clearRadioBtnsList(element);
				break;
			case 'range':
				clearRangeItem(element);
				break;
			default:
				console.error("Incorrect element type!");
				break;
		}

		element.classList.remove('FilterElement-selected');

		let filterElementMobValue = element.querySelector('.FilterElement_mobValue');
		if (filterElementMobValue) {
			filterElementMobValue.remove();
		}
	}

	let state = {
		filterVisibility: false,
		filterElementVisibility: false
	};

	function toggleFilterVisibility(state, filter) {
		if (state.filterVisibility) {
			filter.classList.add('JobFilter-opened');
			document.body.style.overflow = 'hidden';
		} else {
			filter.classList.remove('JobFilter-opened');
			document.body.style.cssText = '';
		}
	}

	function toggleFilterElementVisibility(state, filterElement) {
		let jobFilter = filterElement.closest('.JobFilter');

		if (state.filterElementVisibility) {
			filterElement.classList.add('FilterElement-opened');

			// if (!filterElement.classList.contains('FilterElement-overlay')) {
			// 	jobFilter.classList.add('JobFilter-noScroll');
			// }
		} else {
			filterElement.classList.remove('FilterElement-opened');
			// jobFilter.classList.remove('JobFilter-noScroll');
		}
	}

	(function setDefaultFilterState() {
		let jobFilter = document.querySelector('.JobFilter');
		if (jobFilter) {
			window.history.replaceState(state, null, "");
			toggleFilterVisibility(state, jobFilter);
		}
	})();

	window.addEventListener('popstate', function (e) {
		if (e.state) state = e.state;

		let filter = document.querySelector('.JobFilter');
		let openFilterElement = filter.querySelector('.FilterElement-opened');

		toggleFilterVisibility(state, filter);

		if (openFilterElement) {
			toggleFilterElementVisibility(state, openFilterElement);

			if (openFilterElement.dataset.saved === undefined) {
				clearFilterElement(openFilterElement);
			}
		}
	});

	// Filter
	document.addEventListener('click', function (e) {
		let jobFilterOpenLink = e.target.closest('[data-action="openJobFilter"]');
	
		if (!jobFilterOpenLink) return;

		let jobFilterSelector = jobFilterOpenLink.getAttribute('href');
		let jobFilter = document.querySelector(jobFilterSelector);

		if (!jobFilterSelector || !jobFilter) return;
	
		state.filterVisibility = true;
		window.history.pushState(state, null, "");
		toggleFilterVisibility(state, jobFilter);

		e.preventDefault();
	});

	document.addEventListener('click', function (e) {
		let filterCloseLink = e.target.closest('[data-action="closeFilter"]');
	
		if (!filterCloseLink) return;

		window.history.back();
		e.preventDefault();
	});

	document.addEventListener('click', function (e) {
		let filterClearLink = e.target.closest('[data-action="clearFilter"]');
	
		if (!filterClearLink) return;

		let filter = filterClearLink.closest('.JobFilter');

		if (!filter) return;

		let filterElements = filter.querySelectorAll('.FilterElement');
		for (const elem of filterElements) {
			clearFilterElement(elem);
		}

		let additionalGroups = filter.querySelectorAll('.FilterElementGroup_items[data-additional-group]');
		for (const group of additionalGroups) {
			group.remove();
		}

		let dependentElements = filter.querySelectorAll('.FilterElement[data-dependent-element]');
		for (const elem of dependentElements) {
			elem.classList.add('hidden');
		}

		let addFieldItemCountry = filter.querySelector('.AddFieldItem-country');
		addFieldItemCountry.classList.add('hidden');
	});

	document.addEventListener('click', function (e) {
		let saveFilterLink = e.target.closest('[data-action="saveFilter"]');
	
		if (!saveFilterLink) return;

		let filter = saveFilterLink.closest('.JobFilter');

		if (!filter) return;

		window.history.back();
	});

	document.addEventListener('click', function (e) {
		let filterElementOpenLink = e.target.closest('[data-action="openFilterElement"]');
		let removeFilterElementGroupItems = e.target.closest('[data-action="removeFilterElementGroupItems"]');
	
		if (!filterElementOpenLink || removeFilterElementGroupItems) return;

		let filterElement = filterElementOpenLink.closest('.FilterElement');

		if (!filterElement) return;
		
		state.filterElementVisibility = true;
		window.history.pushState(state, null, "");
		toggleFilterElementVisibility(state, filterElement);
	});

	document.addEventListener('click', function (e) {
		let filterElementCloseLink = e.target.closest('[data-action="closeFilterElement"]');
	
		if (!filterElementCloseLink) return;

		let filterElement = filterElementCloseLink.closest('.FilterElement');

		if (!filterElement)	return;

		window.history.back();
	});

	document.addEventListener('click', function (e) {
		let filterElementClearLink = e.target.closest('[data-action="clearFilterElement"]');
	
		if (!filterElementClearLink) return;

		let filterElement = filterElementClearLink.closest('.FilterElement');

		if (!filterElement)	return;
		
		clearFilterElement(filterElement);
	});

	document.addEventListener('change', function(e) {
		let radioBtnInput = e.target.closest('.RadioBtn_input');

		if (!radioBtnInput) return;

		let filterElement = radioBtnInput.closest('.FilterElement');
		let saveFilterElementBtn = filterElement.querySelector('[data-action="saveFilterElement"]');
		saveFilterElementBtn.click();
	});

	document.addEventListener('click', function (e) {
		let saveFilterElement = e.target.closest('[data-action="saveFilterElement"]');
	
		if (!saveFilterElement) return;

		let filterElement = saveFilterElement.closest('.FilterElement');

		if (!filterElement)	return;
		
		let isFilled = false;
		let elementType = filterElement.dataset.elementType;

		if (!elementType) return;

		let checkedCheckboxes = [],
				checkedRadioInput = null,
				textInput = [],
				results = [];

		switch (elementType) {
			case 'checkboxList':
				checkedCheckboxes = filterElement.querySelectorAll('.Checkbox_input:checked');
				isFilled = !!checkedCheckboxes.length;
				
				results = Array.from(checkedCheckboxes).map(function (checkbox) {
					let label = checkbox.nextElementSibling;
					return label.textContent;
				});
				break;
			case 'radioBtnsList':
				checkedRadioInput = filterElement.querySelector('.RadioBtn_input:checked');
				isFilled = !!checkedRadioInput;
				
				if (isFilled) {
					let label = checkedRadioInput.nextElementSibling;
					results.push(label.textContent);
				}
				break;
			case 'range':
				textInput = filterElement.querySelectorAll('.FormText');
				isFilled = !!textInput.length;

				results = Array.fromt(textInput).map(function (input) {
					return input.value;
				});
				break;
			default:
				console.error("Incorrect element type!");
				break;
		}

		if (isFilled) {
			filterElement.classList.add('FilterElement-selected');
			filterElement.dataset.saved = "";

			let filterElementMobLink = filterElement.querySelector('.FilterElement_mobLink');
			let resultText = results.join(', ');
			
			let filterElementMobValue = filterElement.querySelector('.FilterElement_mobValue');
			if (!filterElementMobValue) {
				filterElementMobLink.insertAdjacentHTML('beforeend', `<div class="FilterElement_mobValue">${resultText}</div>`);
			} else {
				filterElementMobValue.textContent = resultText;
			}

			if (filterElement.dataset.removableElement !== undefined) {
				filterElement.classList.add('FilterElement-removable');
				let filterElementRemoveLink = filterElement.querySelector('.FilterElement_removeLink');
				if (!filterElementRemoveLink) {
					filterElementMobLink.insertAdjacentHTML('beforeend', `<a href="javascript:;" class="FilterElement_removeLink" data-action="removeFilterElementGroupItems"></a>`);
				}
			}
		}

		// let filter
		let isParentRadioBtnsList = filterElement.querySelector('[data-parent-radiobtns-list]');
		let filterElementItemsWrapper = filterElement.closest('.FilterElementGroup_items');

		if (filterElementItemsWrapper) {
			let filterElementGroup = filterElementItemsWrapper.closest('.FilterElementGroup');
			let dependentElement = filterElementItemsWrapper.querySelector('[data-dependent-element]');

			if (isParentRadioBtnsList && dependentElement) {
				let addFieldItem = filterElementGroup.querySelector('.AddFieldItem');

				if (isFilled) {
					addFieldItem.classList.remove('hidden');
					dependentElement.classList.remove('hidden');
					dependentElement.classList.add('FilterElement-selected');
					dependentElement.dataset.saved = '';

					let mobValue = dependentElement.querySelector('.FilterElement_mobValue');
					if (mobValue) {
						mobValue.textContent = 'Все города';
					} else {
						dependentElement.querySelector('.FilterElement_mobLink').insertAdjacentHTML('beforeend', '<div class="FilterElement_mobValue">Все города</div>');
					}
					
					// setTimeout(() => {
					// 	dependentElement.querySelector('.FilterElement_mobLink').click();
					// }, 0);
				} else {
					addFieldItem.classList.add('hidden');
					dependentElement.classList.add('hidden');
				}
			}
		}

		window.history.back();
	});

	// Dependent dropdowns and checkboxes
	document.addEventListener('click', function(e) {
		let fsOption = e.target.closest('[data-parent-dropdown] .fs-option');

		if (!fsOption) return;

		let filterElementGroupItems = fsOption.closest('.FilterElementGroup_items');
		let filterElementGroup = filterElementGroupItems.closest('.FilterElementGroup');
		let dependentElement = filterElementGroupItems.querySelector('[data-dependent-element]');
		let addFieldItem = filterElementGroup.querySelector('.AddFieldItem');

		if (!dependentElement) return;

		if (fsOption.dataset.value !== 'all') {
			dependentElement.classList.remove('hidden');
			addFieldItem.classList.remove('hidden');
		} else {
			dependentElement.classList.add('hidden');
			addFieldItem.classList.add('hidden');
		}
	});

	function createNewFieldsID (fields, key) {
		for (const field of fields) {
			let input = field.querySelector('input');
			let label = field.querySelector('label');

			input.id += `_${key}`;
			label.htmlFor += `_${key}`;
		}
	}

	document.addEventListener('click', function(e) {
		let addFieldItemCountry = e.target.closest('.AddFieldItem-country');

		if (!addFieldItemCountry) return;

		let filterElementGroup = addFieldItemCountry.closest('.FilterElementGroup');
		let filterElementsCountryTmpl = document.getElementById('FilterElementsCountryTmpl');

		if (!filterElementsCountryTmpl) return;

		let tmplContent = filterElementsCountryTmpl.content.cloneNode(true);
		addFieldItemCountry.before(tmplContent);

		let filterElementGroupItemWrappers = filterElementGroup.querySelectorAll('.FilterElementGroup_items');
		let itemsWrapperLength = filterElementGroupItemWrappers.length;
		let filterElementLastGroupItemsWrapper = filterElementGroupItemWrappers[itemsWrapperLength - 1];

		let checkboxes = filterElementLastGroupItemsWrapper.querySelectorAll('.Checkbox');
		let radioBtns = filterElementLastGroupItemsWrapper.querySelectorAll('.RadioBtn');

		createNewFieldsID(checkboxes, itemsWrapperLength);
		createNewFieldsID(radioBtns, itemsWrapperLength);

		$('.DropdownSelect-vacanciesFilter .DropdownSelect_select').fSelect({
			placeholder: 'Все',
			overflowText: '{n} выбрано',
			noResultsText: 'По вашему запросу ничего не найдено',
			showSearch: true,
			searchText: 'Поиск…',
		});

		addFieldItemCountry.classList.add('hidden');
	});

	document.addEventListener('click', function(e) {
		let removeFilterItemsLink = e.target.closest('.FilterElementGroup_removeLink');

		if (!removeFilterItemsLink) return;

		let filterElementGroupItems = removeFilterItemsLink.closest('.FilterElementGroup_items');
		filterElementGroupItems.remove();
	});

	document.addEventListener('click', function(e) {
		let fsOptionVacanciesFilter = e.target.closest('.DropdownSelect-vacanciesFilter .fs-option');

		if (!fsOptionVacanciesFilter) return;

		let vacanciesFilterDropdown = fsOptionVacanciesFilter.closest('.DropdownSelect-vacanciesFilter');
		let fsLabel = vacanciesFilterDropdown.querySelector('.fs-label');
		let selectedOptions = vacanciesFilterDropdown.querySelectorAll('.fs-option.selected');

		let resultsArr = Array.from(selectedOptions).map(function(fsOption) {
			let fsOptionLabel = fsOption.querySelector('.fs-option-label');
			return fsOptionLabel.textContent;
		});

		if (!resultsArr.length) {
			fsLabel.textContent = 'Все';
		} else {
			fsLabel.textContent = resultsArr.join(', ');
		}
	});

	document.addEventListener('click', function(e) {
		let removeFilterElementGroupItemsLink = e.target.closest('[data-action="removeFilterElementGroupItems"]');

		if (!removeFilterElementGroupItemsLink) return;

		let filterElementGroupItems = removeFilterElementGroupItemsLink.closest('.FilterElementGroup_items');
		filterElementGroupItems.remove();
	});
});

$( function() {
	$( "#SalaryRange" ).slider({
		range: true,
		min: 0,
		max: 6000,
		values: [ 0, 3000 ],
		classes: {
			"ui-slider": "RangeSlider_header",
			"ui-slider-handle": "RangeSlider_handle",
			"ui-slider-range": "RangeSlider_range"
		},
		slide: function( event, ui ) {
			$('#MinSalary').val(ui.values[0]);
			$('#MaxSalary').val(ui.values[1]);
		}
	});

	$('#MinSalary').on('input', function() {
		$("#SalaryRange").slider('values', 0, $(this).val());
	});

	$('#MaxSalary').on('input', function() {
		$("#SalaryRange").slider('values', 1, $(this).val());
	});	
} );