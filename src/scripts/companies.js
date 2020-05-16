document.addEventListener('DOMContentLoaded', function () {
	$('[data-src="#CompanyAdding"]').fancybox({
		touch: false,
		baseTpl:
	    '<div class="fancybox-container fancybox-container--no-padding" role="dialog" tabindex="-1">' +
	    '<div class="fancybox-bg"></div>' +
	    '<div class="fancybox-inner">' +
	    '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
	    '<div class="fancybox-toolbar">{{buttons}}</div>' +
	    '<div class="fancybox-navigation">{{arrows}}</div>' +
	    '<div class="fancybox-stage"></div>' +
	    '<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
	    '</div>' +
	    '</div>',
	});
});