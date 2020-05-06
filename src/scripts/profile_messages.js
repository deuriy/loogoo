document.addEventListener('DOMContentLoaded', function () {
	document.forms['send_message'].querySelector('.FormTextarea-sendMessage').addEventListener('keydown', e => {
		setTimeout(() => {
			e.target.style.cssText = 'height:auto; padding:0';
			e.target.style.cssText = 'height:' + e.target.scrollHeight + 'px';
		}, 0);
	});

	document.addEventListener('click', function (e) {
		let shortMessage = e.target.closest('.Message-short');

		if (!shortMessage) return;

		let highlitedMessage = document.querySelector('.Message-highlighted');
		if (highlitedMessage) {
			highlitedMessage.classList.remove('Message-highlighted');
		}
		
		shortMessage.classList.add('Message-highlighted');
		document.querySelector('.Dialogue_header').classList.remove('hidden');
		document.querySelector('.ConversationChoice').classList.add('hidden');
		document.querySelector('.Dialogue_messages').classList.remove('hidden');
		document.forms['send_message'].classList.remove('hidden');
	});

	document.addEventListener('click', function (e) {
		let showUnreadLink = e.target.closest('.ProfileMessages_link-showUnread');

		if (!showUnreadLink) return;

		let unreadMessages = document.querySelectorAll('.ProfileMessages_dialogueList .Message:not([data-message-filter="unread"])');

		unreadMessages.forEach( (el, index) => {
			el.classList.toggle('hidden');
		});

		if (showUnreadLink.textContent == 'Показать непрочитанные') {
			showUnreadLink.textContent = 'Показать все';
		} else {
			showUnreadLink.textContent = 'Показать непрочитанные';
		}
	});

	document.addEventListener('click', function (e) {
		let actionIconSearch = e.target.closest('.Dialogue_actionIcon-search');

		if (!actionIconSearch) return;

		document.querySelector('.Dialogue_headerWrapper').classList.add('hidden');
		document.forms['dialogue_search'].classList.remove('hidden');
		document.querySelector('.ProfileMessages_link-showUnread').classList.add('hidden');
		document.querySelector('.ProfileMessages_messages').classList.remove('hidden');
		document.forms['dialogue_search']['dialogue_search_query'].focus();
	});

	document.addEventListener('click', function (e) {
		let searchCloseBtn = e.target.closest('.Search_closeBtn-dialogueSearch');

		if (!searchCloseBtn) return;

		document.querySelector('.Dialogue_headerWrapper').classList.remove('hidden');
		document.forms['dialogue_search'].classList.add('hidden');
		document.querySelector('.ProfileMessages_link-showUnread').classList.remove('hidden');
		document.querySelector('.ProfileMessages_messages').classList.add('hidden');
		document.forms['dialogue_search']['dialogue_search_query'].value = '';
	});

	let searchAllQuery = document.forms['search_all']['search_all_query'];
	let searchAllCloseBtn = document.forms['search_all'].querySelector('.Search_closeBtn');

	if (searchAllQuery && searchAllCloseBtn) {
		searchAllQuery.oninput = function (e) {
			if (this.value.length) {
				searchAllCloseBtn.classList.remove('hidden');
			} else {
				searchAllCloseBtn.classList.add('hidden');
			}
		};

		searchAllCloseBtn.onclick = function (e) {
			searchAllQuery.value = '';
			searchAllCloseBtn.classList.add('hidden');
		};
	}
});