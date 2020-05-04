let topicsFilterButton = document.getElementById('topics_filter');
let topicsFilter = document.getElementById('TopicsFilter');

if (topicsFilterButton) {
	topicsFilterButton.onclick = function () {
		this.classList.toggle('FilterButton-active');
		topicsFilter.style.display = topicsFilter.style.display === 'none' ? 'block' : 'none';
	};
}

// Filter tags
if (topicsFilter) {
	let topicsFilterTags = topicsFilter.getElementsByClassName('FilterTag');

	for (let tag of topicsFilterTags) {
		tag.onclick = function () {
			this.closest('.FilterTag').remove();
			if (!topicsFilterTags.length) {
				topicsFilter.querySelector('.Filter_tags').remove();
			}
		};
	}

	// Clear all filter tags
	topicsFilter.querySelector('.Filter_clearLink').onclick = function () {
		this.closest('.Filter_tags').remove();
	};
}