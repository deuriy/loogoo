// Tabs
let tabsList = document.querySelectorAll('.Tabs_list');

tabsList.forEach(function (tabList) {
	let tabItems = tabList.querySelectorAll('.Tabs_item');

	tabItems.forEach(function (tabItem, tabItemIndex) {
		tabItem.onclick = function () {
			let activeTabItem = document.querySelector('.Tabs_item-active');

			if (activeTabItem) {
				activeTabItem.classList.remove('Tabs_item-active');
			}

			tabItem.classList.add('Tabs_item-active');

			let parent = tabItem.closest('.Tabs');
			let tabsContent = parent.querySelectorAll('.Tabs_content');

			tabsContent.forEach(function (tabContent, tabContentIndex) {
				tabContent.style.display = 'none';
			});

			tabsContent[tabItemIndex].style.display = 'block';
		};
	});
});

// Change tab
function changeTab (tabsId, tabIndex) {
	let $elem = $('#' + tabsId);
	let destination = $elem.offset().top;

	$('html, body').animate( { scrollTop: destination }, 100 );

	$elem.find('.Tabs_item:eq(' + tabIndex + ')').addClass('Tabs_item-active').siblings().removeClass('Tabs_item-active');
	$elem.find('.Tabs_content').hide();
	$elem.find('.Tabs_content:eq(' + tabIndex + ')').show();
}

// Countdown Timer
var dateTime = $('.Timer').data('datetime');

$('.Timer').countdown(dateTime, function (event) {
	var days = parseInt(event.strftime('%-D')),
			hours = parseInt(event.strftime('%-H')),
			minutes = parseInt(event.strftime('%-M')),
			seconds = parseInt(event.strftime('%-S'));

	$('.Timer_item-days .Timer_digit-tens').text(parseInt(days / 10));
	$('.Timer_item-days .Timer_digit-units').text(days % 10);

	$('.Timer_item-hours .Timer_digit-tens').text(parseInt(hours / 10));
	$('.Timer_item-hours .Timer_digit-units').text(hours % 10);

	$('.Timer_item-minutes .Timer_digit-tens').text(parseInt(minutes / 10));
	$('.Timer_item-minutes .Timer_digit-units').text(minutes % 10);

	$('.Timer_item-seconds .Timer_digit-tens').text(parseInt(seconds / 10));
	$('.Timer_item-seconds .Timer_digit-units').text(seconds % 10);
});