let windowWidth = document.documentElement.clientWidth;

document.addEventListener('DOMContentLoaded', function () {
	if (windowWidth > 767) {
		const dialogueListPs = new PerfectScrollbar('.ProfileMessages_dialogueList', {
			minScrollbarLength: 20,
			useBothWheelAxes: false,
	    suppressScrollX: true
		});
	}

	const profileMessagesAsidePs = new PerfectScrollbar('.Main-profileMessages .Main_aside', {
		wheelPropagation: false,
		minScrollbarLength: 20
	});

	document.querySelector('.FormTextarea-sendMessage').addEventListener('keydown', e => {
		setTimeout(() => {
			e.target.style.cssText = 'height:auto; padding:0';
			e.target.style.cssText = 'height:' + (e.target.scrollHeight + 2) + 'px';
		}, 0);
	});

	document.addEventListener('input', function (e) {
		let sendMessageTextarea = e.target.closest('.FormTextarea-sendMessage');

		if (!sendMessageTextarea) return;

		let dialogueMessages = document.querySelector('.Dialogue_messages');

		setTimeout(() => {
			dialogueMessages.scrollTop = dialogueMessages.scrollHeight - dialogueMessages.clientHeight;
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

		let readMessages = document.querySelectorAll('.ProfileMessages_dialogueList .Message:not([data-message-filter="unread"])');

		readMessages.forEach(el => el.classList.toggle('hidden'));

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
		document.forms['dialogue_search']['dialogue_search_query'].focus();
	});

	document.addEventListener('click', function (e) {
		let searchCloseBtn = e.target.closest('.Search_closeBtn-dialogueSearch');

		if (!searchCloseBtn) return;

		document.querySelector('.Dialogue_headerWrapper').classList.remove('hidden');
		document.forms['dialogue_search'].classList.add('hidden');
		document.querySelector('.ProfileMessages_link-showUnread').classList.remove('hidden');
		document.forms['dialogue_search']['dialogue_search_query'].value = '';
	});

	let searchAllQuery = document.forms['search_all']['search_all_query'];
	let searchAllCloseBtn = document.forms['search_all'].querySelector('.Search_closeBtn');

	if (searchAllQuery && searchAllCloseBtn) {
		searchAllQuery.oninput = function (e) {
			if (this.value.length) {
				searchAllCloseBtn.classList.remove('hidden');
				document.querySelector('.ProfileMessages_messages').classList.remove('hidden');
				document.querySelector('.ProfileMessages_link-showUnread').classList.add('hidden');
			} else {
				searchAllCloseBtn.classList.add('hidden');
				document.querySelector('.ProfileMessages_messages').classList.add('hidden');
				document.querySelector('.ProfileMessages_link-showUnread').classList.remove('hidden');
			}
		};

		searchAllCloseBtn.onclick = function (e) {
			searchAllQuery.value = '';
			searchAllCloseBtn.classList.add('hidden');
		};
	}

	document.addEventListener('click', function (e) {
		let showUnreadLink = e.target.closest('.PopupMenu_link-showUnread');

		if (!showUnreadLink) return;

		let readMessages = document.querySelectorAll('.ProfileMessages_dialogueList .Message:not([data-message-filter="unread"])');

		readMessages.forEach( (el, index) => {
			el.classList.add('hidden');
		});
	});

	document.addEventListener('click', function (e) {
		let showAllLink = e.target.closest('.PopupMenu_link-showAll');

		if (!showAllLink) return;

		let readMessages = document.querySelectorAll('.ProfileMessages_dialogueList .Message:not([data-message-filter="unread"])');

		readMessages.forEach( (el, index) => {
			el.classList.remove('hidden');
		});
	});

	document.addEventListener('click', function (e) {
		let mobileSearchLink = e.target.closest('.MobileHeader_searchLink');

		if (!mobileSearchLink) return;

		let mobileHeaderSearch = document.querySelector('.Search-mobileHeader');
		mobileHeaderSearch.classList.remove('hidden');
		mobileHeaderSearch.search_query.focus();

		e.preventDefault();
	});

	document.addEventListener('click', function (e) {
		let searchBackBtn = e.target.closest('.Search-mobileHeader .Search_btnBack');

		if (!searchBackBtn) return;

		let parentForm = searchBackBtn.closest('.Search-mobileHeader');
		parentForm.classList.add('hidden');
		e.preventDefault();
	});

	document.addEventListener('click', function (e) {
		let searchCloseBtn = e.target.closest('.Search-mobileHeader .Search_closeBtn');

		if (!searchCloseBtn) return;

		let parentForm = searchCloseBtn.closest('.Search-mobileHeader');
		parentForm.search_query.value = '';
		parentForm.search_query.focus();
		searchCloseBtn.classList.add('hidden');
		document.querySelector('.ProfileMessages_messages').classList.add('hidden');

		e.preventDefault();
	});

	document.addEventListener('input', function (e) {
		let mobileSearchText = e.target.closest('.Search-mobileHeader .Search_text');

		if (!mobileSearchText) return;

		let searchCloseBtn = mobileSearchText.closest('.Search-mobileHeader').querySelector('.Search_closeBtn');

		if (mobileSearchText.value.length) {
			searchCloseBtn.classList.remove('hidden');
			document.querySelector('.ProfileMessages_messages').classList.remove('hidden');
		} else {
			searchCloseBtn.classList.add('hidden');
			document.querySelector('.ProfileMessages_messages').classList.add('hidden');
		}
	});
});

function checkLocationHash () {
	if (windowWidth < 768) {
		if (location.hash === "#show_dialog") {
			document.querySelector('.ProfileMessages_left').classList.add('hidden');
			document.querySelector('.ProfileMessages_right').classList.remove('hidden-xs');
			document.querySelector('.MobileHeader-profileMessages').classList.add('hidden');
			document.querySelector('.Wrapper-profileMessages').classList.add('Wrapper-noMobilePadding');
			document.querySelector('.Dialogue_header').classList.remove('hidden');
			document.querySelector('.ConversationChoice').classList.add('hidden');
			document.querySelector('.Dialogue_messages').classList.remove('hidden');
			document.forms['send_message'].classList.remove('hidden');
		} else {
			document.querySelector('.ProfileMessages_left').classList.remove('hidden');
			document.querySelector('.ProfileMessages_right').classList.add('hidden-xs');
			document.querySelector('.MobileHeader-profileMessages').classList.remove('hidden');
			document.querySelector('.Wrapper-profileMessages').classList.remove('Wrapper-noMobilePadding');
		}
	}
}

checkLocationHash();

window.onhashchange = function (event) {
	checkLocationHash();
};