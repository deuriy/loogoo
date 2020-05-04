let topicsFilter = document.getElementById('TopicsFilter');
let topicsFilterWrapper = topicsFilter.querySelector('.Filter_wrapper');
let filterToggleLink = topicsFilter.querySelector('.Filter_toggleLink');
let closeLink = topicsFilter.querySelector('.Filter_closeLink');
let selects = topicsFilter.querySelectorAll('.Filter_item-staticDropdownxs .Select-filterBlock');
let clearBtn = topicsFilter.querySelector('.ClearBtn');
let applyBtn = topicsFilter.querySelector('.Filter_applyBtn');

let searchResults = document.querySelector('.Search-results');
let searchText = searchResults.querySelector('.Search-results .Search_text');
let closeBtn = searchResults.querySelector('.Search_closeBtn');
let searchIcon = searchResults.querySelector('.Search_icon');

let selectedNumber = 0;

function setSelectedNumber () {
	let selectedNumber = topicsFilter.querySelectorAll('.fs-label-selected').length;

	if (selectedNumber) {
		filterToggleLink.classList.remove('FilterIcon-zero');
		filterToggleLink.querySelector('.FilterIcon_number').textContent = selectedNumber;
		clearBtn.hidden = false;
	} else {
		filterToggleLink.classList.add('FilterIcon-zero');
		filterToggleLink.querySelector('.FilterIcon_number').textContent = 0;
		clearBtn.hidden = true;
	}
}

for (let select of selects) {
	select.onchange = function () {
		let selectedOption = this.closest('.fs-wrap').querySelector('.fs-option.selected');
		let selectedLabel = this.closest('.fs-wrap').querySelector('.fs-label');

		if (selectedOption.dataset.value != 'all') {
			selectedLabel.classList.add('fs-label-selected');
		} else {
			selectedLabel.classList.remove('fs-label-selected');
		}

		setSelectedNumber();
	}
}

if (filterToggleLink) {
	filterToggleLink.onclick = function () {
		topicsFilterWrapper.classList.add('Filter_wrapper-opened');
		topicsFilterWrapper.closest('.Main_topicsFilter').classList.add('Main_topicsFilter-opened');
	};
}

if (closeLink) {
	closeLink.onclick = function () {
		topicsFilterWrapper.classList.remove('Filter_wrapper-opened');
		topicsFilterWrapper.closest('.Main_topicsFilter').classList.remove('Main_topicsFilter-opened');
	};
}

if (clearBtn) {
	clearBtn.onclick = function () {
		for (let select of selects) {
			select.selectedIndex = 0;
			let selectedLabel = select.closest('.fs-wrap').querySelector('.fs-label');
			selectedLabel.classList.remove('fs-label-selected');
		}

		setSelectedNumber();

		$('.Select-filterBlock').fSelect('reload');
	};
}

if (searchText) {
	searchText.oninput = function (e) {
		if (this.value.length) {
			closeBtn.classList.remove('hidden');
		} else {
			closeBtn.classList.add('hidden');
		}
	};
}

if (closeBtn) {
	closeBtn.onclick = function (e) {
		searchText.value = '';
		closeBtn.classList.add('hidden');
	};
}

if (applyBtn) {
	applyBtn.onclick = function (e) {
		e.preventDefault();

		topicsFilterWrapper.classList.remove('Filter_wrapper-opened');
		topicsFilterWrapper.closest('.Main_topicsFilter').classList.remove('Main_topicsFilter-opened');
	};
}

if (searchIcon) {
	searchIcon.onclick = function (e) {
		e.preventDefault();
	};
}