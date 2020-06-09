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

	// document.addEventListener('click', function () {
	// 	let toggleAnswersLink = e.target.closest('.Comment_actionLink-toggleAnswers');

	// 	if (!toggleAnswersLink) return;

	// 	let parentComment = toggleAnswersLink.closest('.Comment');
		
	// });

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

	// Share
	document.addEventListener('click', function (e) {
		let shareIcon = e.target.closest('.Share_icon');

		if (!shareIcon) return;

		let shareWrapper = shareIcon.parentNode.querySelector('.Share_wrapper');

		shareWrapper.classList.toggle('Share_wrapper-opened');
	});

	document.addEventListener('click', function (e) {
		let shareWrapper = document.querySelector('.Share_wrapper');

		if (!shareWrapper) return;

		let shareIcon = shareWrapper.parentNode.querySelector('.Share_icon');

		if (shareWrapper.classList.contains('Share_wrapper-opened') && !shareWrapper.contains(e.target) && !shareIcon.contains(e.target)) {
			shareWrapper.classList.remove('Share_wrapper-opened');
		}
	});

	function copyInputText (targetElem) {
	  targetElem.select();
	  targetElem.setSelectionRange(0, 99999);

	  document.execCommand("copy");
	}

	document.addEventListener('click', function (e) {
		let copyBtn = e.target.closest('.CopyLink_btnCopy');

		if (!copyBtn) return;

		let copyLink = copyBtn.closest('.CopyLink');
		let copyLinkInput = copyLink.querySelector('.CopyLink_input');
		copyInputText(copyLinkInput);
		copyLink.classList.add('CopyLink-copied');
		copyBtn.textContent = 'Скопировано!';

		setTimeout(() => {
			copyLink.classList.remove('CopyLink-copied');
			copyBtn.textContent = 'Копировать';
		}, 3000);
	});

	document.addEventListener('click', function (e) {
		let bookmarkIcon = e.target.closest('.Bookmark_icon');

		if (!bookmarkIcon) return;

		let bookmark = bookmarkIcon.closest('.Bookmark');
		bookmark.classList.toggle('Bookmark-active');
	});

	let commentLinks = document.querySelectorAll('.Comment_text a');
	commentLinks.forEach( commentLink => {
		if (!commentLink.hasAttribute('target') || commentLink.getAttribute('target') != '_blank') {
			commentLink.setAttribute('target', '_blank');
		}
	});
});