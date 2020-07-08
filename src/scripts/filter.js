function setSelectedNumber () {
	let topicsFilter = document.getElementById('TopicsFilter');
	let filterToggleLink = topicsFilter.querySelector('.Filter_toggleLink');
	let selectedNumber = topicsFilter.querySelectorAll('.fs-label-selected').length;

	if (selectedNumber) {
		filterToggleLink.classList.remove('FilterIcon-zero');
		filterToggleLink.querySelector('.FilterIcon_number').textContent = selectedNumber;
		topicsFilter.querySelector('.ClearBtn').hidden = false;
	} else {
		filterToggleLink.classList.add('FilterIcon-zero');
		filterToggleLink.querySelector('.FilterIcon_number').textContent = 0;
		topicsFilter.querySelector('.ClearBtn').hidden = true;
	}
}

document.addEventListener('click', function (e) {
	let fsOption = e.target.closest('.Filter_item-staticDropdownxs .fs-option');

	if (!fsOption) return;

	let fsLabel = fsOption.closest('.fs-wrap').querySelector('.fs-label');

	if (Number(fsOption.dataset.index)) {
		fsLabel.classList.add('fs-label-selected');
	} else {
		fsLabel.classList.remove('fs-label-selected');
	}

	setSelectedNumber();
});

document.addEventListener('click', function (e) {
	let filterToggleLink = e.target.closest('.Filter_toggleLink');

	if (!filterToggleLink) return;

	let filter = filterToggleLink.closest('.Filter');
	filter.querySelector('.Filter_wrapper').classList.add('Filter_wrapper-opened');
	filter.closest('.Main_topicsFilter').classList.add('Main_topicsFilter-opened');
	document.body.style.overflow = 'hidden';
});

document.addEventListener('click', function (e) {
	let closeFilter = e.target.closest('[data-action="closeFilter"]');

	if (!closeFilter) return;

	let filter = closeFilter.closest('.Filter');
	filter.querySelector('.Filter_wrapper').classList.remove('Filter_wrapper-opened');
	filter.closest('.Main_topicsFilter').classList.remove('Main_topicsFilter-opened');
	document.body.style.cssText = '';

	e.preventDefault();
});

document.addEventListener('click', function (e) {
	let clearBtn = e.target.closest('.ClearBtn');

	if (!clearBtn) return;

	let filter = clearBtn.closest('.Filter');
	let selects = filter.querySelectorAll('.Filter_item-staticDropdownxs .Select-filterBlock');

	selects.forEach( select => {
		select.selectedIndex = 0;
		let selectedLabel = select.closest('.fs-wrap').querySelector('.fs-label');
		selectedLabel.classList.remove('fs-label-selected');
	});

	setSelectedNumber();

	$('.Select-filterBlock').fSelect('reload');
});

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