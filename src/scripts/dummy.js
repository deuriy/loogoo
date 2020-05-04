// jQuery Tabs
$('.Tabs_list').each(function() {
  $(this).find('.Tabs_item').each(function(i) {
    $(this).click(function() {
      $(this).addClass('Tabs_item-active').siblings().removeClass('Tabs_item-active');
      var p = $(this).parents('.Tabs');
      p.find('.Tabs_content').hide();
      p.find('.Tabs_content:eq(' + i + ')').show();
    });
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