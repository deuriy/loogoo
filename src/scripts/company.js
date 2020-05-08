let ratingLineFill = document.querySelectorAll('.ExtendedRating_lineFill');
ratingLineFill.forEach( el => el.style.width = (el.dataset.mark * 10) + '%');

document.addEventListener('click', function (e) {
	let closeRemark = e.target.closest('.Remark_close');

	if (!closeRemark) return;

	closeRemark.closest('.Remark').classList.add('hidden');
});