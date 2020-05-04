document.addEventListener('DOMContentLoaded', function () {
	let actionIconSearch = document.querySelector('.Dialogue_actionIcon-search');
	let dialogueHeaderWrapper = document.querySelector('.Dialogue_headerWrapper');
	let dialogueMessages = document.querySelector('.Dialogue_messages');
	let shortMessages = document.querySelector('.Dialogue_messages');
	let profileMessagesContainer = document.querySelector('.ProfileMessages_messages');
	let showUnreadLink = document.querySelector('.ProfileMessages_link-showUnread');
	let dialogueSearchForm = document.forms['dialogue_search'];
	let dialogueSearchFormClose = dialogueSearchForm.querySelector('.Search_closeBtn');
	let conversationChoice = document.querySelector('.ConversationChoice');
	let sendMessageForm = document.forms['send_message'];
	let sendMessageTextarea = sendMessageForm.querySelector('.FormTextarea-sendMessage');

	sendMessageTextarea.addEventListener('keydown', () => {
		setTimeout(() => {
			sendMessageTextarea.style.cssText = 'height:auto; padding:0';
			sendMessageTextarea.style.cssText = 'height:' + sendMessageTextarea.scrollHeight + 'px';
		}, 0);
	});

	document.addEventListener('click', function (e) {
		let shortMessage = e.target.closest('.Message-short');

		if (!shortMessage) return;

		shor
	});

	actionIconSearch.onclick = function () {
		dialogueHeaderWrapper.classList.add('hidden');
		dialogueSearchForm.classList.remove('hidden');
		dialogueMessages.classList.add('hidden');
		conversationChoice.classList.remove('hidden');
		showUnreadLink.classList.add('hidden');
		profileMessagesContainer.classList.remove('hidden');
		dialogueSearchForm['dialogue_search_query'].focus();
	};

	dialogueSearchFormClose.onclick = function () {
		dialogueHeaderWrapper.classList.remove('hidden');
		dialogueSearchForm.classList.add('hidden');
		dialogueMessages.classList.remove('hidden');
		conversationChoice.classList.add('hidden');
		showUnreadLink.classList.remove('hidden');
		profileMessagesContainer.classList.add('hidden');
		dialogueSearchForm['dialogue_search_query'].value = '';
	}
});