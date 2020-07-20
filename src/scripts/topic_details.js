document.addEventListener("DOMContentLoaded", function () {
	let entityId, entityType;

	// Post complaint
	let postComplaintLink = document.querySelector('.PostComplaintLink');
	if (postComplaintLink) {
		postComplaintLink.onclick = function () {
			entityId = this.closest('.QuestionBlock').dataset.entityId;
			entityType = 'post';
		}
	}

	// Comment complaint
	let commentComplaintLinks = document.querySelectorAll('.CommentComplaintLink');
	for (let link of commentComplaintLinks) {
		link.onclick = function () {
			entityId = this.closest('.Comment').dataset.entityId;
			entityType = 'comment';
		}
	}

	function isSpacesString (string) {
		for (let i = 0; i < string.length; i++) {
			if (string[i] != ' ') {
				return false;
			}
		}

		return true;
	}

	function changeTextareaField (commentForm) {
		let commentFormTextarea = commentForm.querySelector('.CommentForm_textArea');
		let resetBtn = commentFormTextarea.closest('.CommentForm').querySelector('.CommentForm_resetBtn');
		let submitBtn = commentFormTextarea.closest('.CommentForm').querySelector('button[type="submit"]');

		if (commentFormTextarea.value.length && !isSpacesString(commentFormTextarea.value)) {
			submitBtn.removeAttribute('disabled');
		} else {
			submitBtn.setAttribute('disabled', 'disabled');
		}

		commentFormTextarea.addEventListener('focus', function () {
			this.parentNode.classList.add('CommentForm-expanded');
		});

		commentFormTextarea.addEventListener('blur', function (e) {
			setTimeout(() => {
				let clickedElement = document.activeElement;

				if (clickedElement != resetBtn && clickedElement != submitBtn) {
					this.parentNode.classList.remove('CommentForm-expanded');
				}
			}, 0);
		});

		commentFormTextarea.addEventListener('input', function () {
			if (this.value.length && !isSpacesString(this.value)) {
				submitBtn.removeAttribute('disabled');
			} else {
				submitBtn.setAttribute('disabled', 'disabled');
			}
		});
	}

	document.addEventListener('click', function (e) {
		let copyURL = e.target.closest('.DotsMenu_link-copyURL');

		if (!copyURL) return;

		let popupNotification = document.querySelector(copyURL.getAttribute('href'));

		if (popupNotification) {
			popupNotification.classList.add('PopupNotification-visible');

			let timer = setTimeout(function () {
				popupNotification.classList.remove('PopupNotification-visible');
			}, 2500);
		}

		e.preventDefault();
	});

	document.addEventListener('click', function (e) {
		let editLink = e.target.closest('.DotsMenu_link-edit');

		if (!editLink) return;

		let comment = editLink.closest('.Comment');
		let commentText = comment.querySelector('.Comment_text');

		let form = document.querySelector('.CommentForm').cloneNode(true);
		form.classList.add('CommentForm-expanded');

		let textArea = form.querySelector('.CommentForm_textArea');

		let resetBtn = form.querySelector('.CommentForm_resetBtn');
		let submitBtn = form.querySelector('button[type="submit"]');
		submitBtn.removeAttribute('disabled');

		commentText.replaceWith(form);
		textArea.value = commentText.innerHTML.trim();

		setTimeout(() => {
	    textArea.style.cssText = 'height:auto; padding:0';
	    textArea.style.cssText = 'height:' + textArea.scrollHeight + 'px';
	  }, 0);

		textArea.addEventListener('keydown', () => {
		  setTimeout(() => {
		    textArea.style.cssText = 'height:auto; padding:0';
		    textArea.style.cssText = 'height:' + textArea.scrollHeight + 'px';
		  }, 0);
		});

		changeTextareaField(form);

		resetBtn.onclick = function () {
			form.replaceWith(commentText);
		};

	});

	$('[data-src="#SubmitComplaint"]').fancybox({
		touch: false,
		afterLoad: function () {
			document.querySelector('input[name="entity_type"]').value = entityType;
			document.querySelector('input[name="entity_id"]').value = entityId;
		}
	});

	$('[data-src="#ComplaintFormPopup"]').fancybox({
		touch: false
	});

	// Show all images
	let linkOther = document.querySelector('.Images_link-other');
	if (linkOther) {
		linkOther.onclick = function (e) {
			let imageItems = this.closest('.Images');
			imageItems.classList.add('opened');
			e.preventDefault();
		};
	}

	let hideImagesLink = document.querySelector('.Images_hideLink');
	if (hideImagesLink) {
		hideImagesLink.onclick = function (e) {
			let imageItems = this.closest('.Images');
			imageItems.classList.remove('opened');
			e.preventDefault();
		};
	}

	document.addEventListener('click', function (e) {
		let commentTextLink = e.target.closest('.Comment_text a');

		if (!commentTextLink) return;

		commentTextLink.target = '_blank';
	});	
});