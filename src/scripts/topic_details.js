document.addEventListener("DOMContentLoaded", function () {
	let entityId, entityType;

	// Post complaint
	document.addEventListener('click', function (e) {
		let postComplaintLink = e.target.closest('.PostComplaintLink');

		if (!postComplaintLink) return;

		entityId = postComplaintLink.closest('.QuestionBlock').dataset.entityId;
		entityType = 'post';
	});

	// Comment complaint
	document.addEventListener('click', function (e) {
		let commentComplaintLink = e.target.closest('.CommentComplaintLink');

		if (!commentComplaintLink) return;

		entityId = commentComplaintLink.closest('.Comment').dataset.entityId;
		entityType = 'comment';
	});

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

	$('[data-src="#SubmitComplaint"]').fancybox({
		touch: false,
		afterLoad: function () {
			document.querySelector('input[name="entity_type"]').value = entityType;
			document.querySelector('input[name="entity_id"]').value = entityId;
		}
	});

	document.addEventListener('click', function (e) {
		let commentTextLink = e.target.closest('.Comment_text a');

		if (!commentTextLink) return;

		commentTextLink.target = '_blank';
	});	
});