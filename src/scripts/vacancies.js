document.addEventListener('DOMContentLoaded', function () {
	let swipers;

	document.querySelectorAll('.Swiper').forEach((item, index) => {
		swipers[index] = new Swiper(`#${item.id}`, {
			slidesPerView: 'auto',
			spaceBetween: 1,
			loop: true
		});
	});
});