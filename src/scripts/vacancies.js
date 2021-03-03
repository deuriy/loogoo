document.addEventListener('DOMContentLoaded', function () {
	let swipers = [];

	document.querySelectorAll('.Swiper').forEach((item, index) => {
		swipers.push(new Swiper(`#${item.id}`, {
			slidesPerView: 'auto',
			spaceBetween: 4,
			loop: true
		}));
	});
});