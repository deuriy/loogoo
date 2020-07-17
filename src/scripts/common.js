/*=require ./includes/blocks/*.js*/

document.addEventListener("DOMContentLoaded", function () {
	// Fancybox
	$('.OpenPopupLink').fancybox({
		touch: false,
		closeExisting: true
	});

	// FSelect
	$('.Select-filterBlock').fSelect({
		showSearch: false
	});

	$('.DropdownSelect-daysWeek .DropdownSelect_select').fSelect({
		placeholder: 'Дни недели',
		overflowText: '{n} выбрано',
		showSearch: false
	});

	$('.DropdownSelect_select').fSelect({
		showSearch: false
	});

	// Check if input is empty
	function isEmpty(selector) {
		if (selector.value) {
			selector.classList.add('FormControl_text-notEmpty');
		} else {
			selector.classList.remove('FormControl_text-notEmpty');
		}
	}

	// Form controls
	let formControls = document.querySelectorAll('.FormControl_text');
	for (let control of formControls) {
		isEmpty(control);
		control.onchange = () => isEmpty(control);
	}

	// Textarea auto height
	let textarea = document.querySelectorAll('.FormTextarea-commentForm, .FormTextarea-commentFormCompany, .FormTextarea-companySettings');

	textarea.forEach(el => {
		let prevHeight = el.clientHeight;

		el.addEventListener('keydown', () => {
			setTimeout(() => {
				el.style.cssText = 'height:auto; padding:0';
				el.style.cssText = 'height:' + (el.scrollHeight + 2) + 'px';

				if (prevHeight < el.clientHeight) {
					document.documentElement.scrollTop += el.clientHeight - prevHeight;
					prevHeight = el.clientHeight;
				}
			}, 0);
		});
	});

	// let prevHeight;

	// document.addEventListener('keydown', function (e) {
	// 	let textarea = e.target.closest('[data-input-type="autoHeight"]');

	// 	if (!textarea) return;

	// 	// let prevHeight;
	// 	console.log(prevHeight);

	// 	setAutoHeightTextarea(textarea);

	// 	setTimeout(function () {
	// 		prevHeight = textarea.offsetHeight;
	// 		if (prevHeight < textarea.offsetHeight) {
	// 			console.log(`difference: ${textarea.offsetHeight - prevHeight}`);
	// 			document.documentElement.scrollTop += textarea.offsetHeight - prevHeight;
	// 			prevHeight = textarea.offsetHeight;
	// 		}
	// 	}, 0);

	// 	// setTimeout(function() {
	// 	// 	textarea.style.cssText = 'height:auto; padding:0';
	// 	// 	textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';

	// 	// 	if (prevHeight < textarea.offsetHeight) {
	// 	// 		console.log(`difference: ${textarea.offsetHeight - prevHeight}`);
	// 	// 		document.documentElement.scrollTop += textarea.offsetHeight - prevHeight;
	// 	// 		prevHeight = textarea.offsetHeight;
	// 	// 	}
	// 	// }, 0);

	// 	// e.preventDefault();
	// });

	function isSpacesString (string) {
		for (let i = 0; i < string.length; i++) {
			if (string[i] != ' ') {
				return false;
			}
		}

		return true;
	}

	// Comments
	let comments = document.querySelectorAll('.Comment');

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

	// Comment form textarea
	let commentForm = document.querySelectorAll('.CommentForm');

	commentForm.forEach(el => {
		changeTextareaField(el);
	});

	// Upload image with thumbnail
	function uploadImgWithThumbnail () {
		let imageUpload = document.querySelectorAll('.ImageUpload');

		imageUpload.forEach(el => {
			let input = el.querySelector('.ImageUpload_input');

			input.addEventListener('change', function () {
				if (this.files && this.files[0]) {
					let reader = new FileReader();

					reader.onload = function (e) {
						el.parentNode.classList.add('Attached');
						let attachedImgs = document.querySelector('.AttachedImages');

						if (!(typeof(attachedImgs) != 'undefined' && attachedImgs != null)) {
							attachedImgs = document.createElement('div');
							attachedImgs.classList.add('AttachedImages');
						}

						let attachedImage = document.createElement('div');
						attachedImage.classList.add('AttachedImage', 'AttachedImages_item');

						let removeImageLink = document.createElement('a');
						removeImageLink.setAttribute('href', 'javascript:;');
						removeImageLink.setAttribute('onclick', 'javascript: attachedImageRemove(this);');
						removeImageLink.classList.add('AttachedImage_remove');

						let img = document.createElement('img');
						img.setAttribute('src', e.target.result);
						img.classList.add('AttachedImage_img');

						attachedImage.append(img);
						attachedImage.append(removeImageLink);
						attachedImgs.append(attachedImage);
						el.after(attachedImgs);
					};

					reader.readAsDataURL(this.files[0]);
				}
			});
		});
	}

	uploadImgWithThumbnail();

	// Remove uploaded image
	function attachedImageRemove (elem) {
		elem.parentNode.parentNode.classList.remove('Attached');
		elem.parentNode.parentNode.parentNode.querySelector('.ImageUpload_input').value = "";
		elem.parentNode.remove();
	}

	// Dots menu
	document.addEventListener("click", event => {
		let dotsMenus = document.querySelectorAll('.DotsMenu');

		dotsMenus.forEach(el => {
			let targetElement = event.target;
			let dotsMenuWrapper = el.querySelector('.DotsMenu_wrapper');
			let dotsMenuIcon = el.querySelector('.DotsMenu_icon');

			do {
				if (targetElement == dotsMenuWrapper || targetElement == dotsMenuIcon) {
					dotsMenuWrapper.style.display = dotsMenuWrapper.style.display === 'block' ? 'none' : 'block';
					return;
				}

				targetElement = targetElement.parentNode;
			} while (targetElement);

			dotsMenuWrapper.style.display = 'none';
		});
	});

	// Active menu item
	function setActiveMenuItem (menu) {
		if (!menu) return;

		let lang = document.querySelector('html').getAttribute('lang') == 'ru' ? 'ru' : '';
		let pageUrl = window.location.href;
		let links = menu.querySelectorAll('a');
		let activeLink = null;

		for (let link of links) {
			let linkHref = link.getAttribute('href') != '/' ? link.href : link.href + lang;

			if (pageUrl == linkHref) {
				link.classList.add('active');
				activeLink = link;
			}
		}

		return activeLink;
	}

	function setActivePopupMenuItem (popupMenu, selectionLink) {
		let activeLink = setActiveMenuItem(popupMenu);
		if (activeLink) {
			selectionLink.textContent = activeLink.textContent;
		}
	}

	setActiveMenuItem( document.querySelector('#ProfileSettingsMenu') );
	setActiveMenuItem( document.querySelector('#UserMenu') );
	setActiveMenuItem( document.querySelector('#ActionsMenu') );
	setActiveMenuItem( document.querySelector('#PrimaryMenu') );
	setActiveMenuItem( document.querySelector('#SidebarMenu') );
	setActiveMenuItem( document.querySelector('.MenuSection-company') );
	setActiveMenuItem( document.querySelector('.SettingsMenu') );
	setActiveMenuItem( document.querySelector('.SidebarMenu-profileMenu') );
	setActiveMenuItem( document.querySelector('.CategoryMenu-companySettings') );
	setActiveMenuItem( document.querySelector('.CategoryMenu-save') );
	setActivePopupMenuItem( document.querySelector('#PopupMenu'), document.querySelector('.PopupMenuLink') );

	// Sidebar Menu
	let sidebarMenuParentLinks = document.querySelectorAll('.SidebarMenu_item-hasSubMenu > a');

	sidebarMenuParentLinks.forEach(el => {
		el.onclick = () => {
			el.parentNode.classList.toggle('SidebarMenu_item-collapsed');
			return false;
		};
	});

	// Mobile Navigation
	let menuHamburger = document.getElementById('MenuHamburger');
	let mobileNavigation = document.getElementById('MobileNavigation');

	if (menuHamburger && mobileNavigation) {
		menuHamburger.onclick = e => {
			e.preventDefault();
			mobileNavigation.classList.add('MobileNavigation-opened');
		};

		document.addEventListener('click', e => {
			let mobileNavigationWrapper = mobileNavigation.querySelector('.MobileNavigation_wrapper');

			if (!mobileNavigationWrapper.contains(e.target) && !menuHamburger.contains(e.target)) {
				mobileNavigation.classList.remove('MobileNavigation-opened');
			}
		});
	}

	function showElementOnPages (elem, pathNames = []) {
		let currentPathName = window.location.pathname.slice(1).split('/');

		pathNames.forEach(pathName => {
			if (currentPathName.includes(pathName)) {
				elem.classList.remove('hidden');
			}
		});

		if (elem && elem.classList.contains('hidden')) {
			elem.remove();
		}
	}

	showElementOnPages(document.querySelector('.Icons_item-search'), ['', 'posts']);
	showElementOnPages(document.querySelector('.MenuSection-save .MenuSection_saveFilter'), ['my_save.html']);
	
	// Mobile search
	let searchLink = document.querySelector('.Icons_link-search');
	let searchForm = document.querySelector('.Search-header');

	if (searchLink && searchForm) {
		let closeSearchBtn = searchForm.querySelector('.Search_closeBtn');
		let header = searchForm.closest('.Header');

		searchLink.onclick = e => {
			e.preventDefault();
			searchForm.classList.toggle('Search-visibleFlex');
			searchForm.querySelector('.Search_text').focus();
			header.classList.toggle('Header-searchOpen');
		};

		closeSearchBtn.onclick = e => {
			e.preventDefault();
			searchForm.classList.remove('Search-visibleFlex');
			header.classList.remove('Header-searchOpen');
		};
	}

	// Popular
	let popularLink = document.querySelector('.CategoryMenu_link-popular');
	let dateSortTags = document.querySelector('.DateSortTags');

	if (popularLink && dateSortTags) {
		popularLink.onclick = function (e) {
			e.preventDefault();
			dateSortTags.classList.toggle('DateSortTags-visible');
		};
	}

	// Fixed mobile header
	const breakpointMd = window.matchMedia( '(min-width: 768px)' );

	let $header = $('.Header');
	let $menuSectionMobile = $('.MenuSection-mobile');

	const breakpointCheckerMd = function() {
		if ( breakpointMd.matches === true ) {
			$header.removeClass('Header-fixed');
			$menuSectionMobile.removeClass('MenuSection-fixed');
		} else if ( breakpointMd.matches === false ) {
			$header.addClass('Header-fixed');
			$menuSectionMobile.addClass('MenuSection-fixed');
		}
	};

	// keep an eye on viewport size changes
	breakpointMd.addListener(breakpointCheckerMd);

	// kickstart
	breakpointCheckerMd();

	let oldScrollY = 0;
	let $fixedHeader = $('.Header-fixed');
	let $fixedMenuSection = $('.MenuSection-fixed');

	$(window).scroll(function(event) {

		let scrolled = $(window).scrollTop();
		let dY = scrolled - oldScrollY;

		if (scrolled > 20) {
			if ( dY > 0 ){
				$fixedHeader.addClass('Header-fixedTop');
				$fixedMenuSection.addClass('MenuSection-fixedTop');
			} else {
				$fixedHeader.removeClass('Header-fixedTop');
				$fixedMenuSection.removeClass('MenuSection-fixedTop');
			}
		} else {
			$fixedHeader.removeClass('Header-fixedTop');
			$fixedMenuSection.removeClass('MenuSection-fixedTop');
		}
		
		oldScrollY = scrolled;
	});

	// Popup menu
	document.addEventListener('click', function (e) {
		let popupMenuLink = e.target.closest('.PopupMenuLink');

		if (!popupMenuLink) return;
		
		e.preventDefault();

		let popupMenuId = popupMenuLink.getAttribute('href');
		let popupMenu = document.querySelector(`${popupMenuId}`);

		if (!popupMenu) return;

		let popupMenuWrapper = popupMenu.querySelector('.PopupMenu_wrapper');
		popupMenu.classList.toggle('PopupMenu-opened');

		let coords;

		if (popupMenu.classList.contains('PopupMenu-center')) {
			coords = {
				top: document.documentElement.clientHeight / 2 - popupMenuWrapper.offsetHeight / 2,
				left: document.documentElement.clientWidth / 2 - popupMenuWrapper.offsetWidth / 2
			};

			popupMenuWrapper.style.top = coords.top + "px";
			popupMenuWrapper.style.left = coords.left + "px";
		} else if (!popupMenu.classList.contains('PopupMenu-topRight')) {
			coords = popupMenuLink.getBoundingClientRect();

			if (popupMenu.classList.contains('PopupMenu-paddingLeft')) {
				popupMenuWrapper.style.left = coords.left - 14 + "px";
			} else {
				popupMenuWrapper.style.left = coords.left - 20 + "px";
			}

			if (popupMenu.classList.contains('PopupMenu-paddingTop')) {
				popupMenuWrapper.style.top = coords.top - 11 + "px";
			} else {
				popupMenuWrapper.style.top = coords.top - 27 + "px";
			}
		}
	});

	document.addEventListener('click', function (e) {
		let popupMenuWrapper = e.target.closest('.PopupMenu_wrapper');

		if (!popupMenuWrapper) return;

		let popupMenu = popupMenuWrapper.closest('.PopupMenu');
		let popupMenuId = popupMenu.getAttribute('id');
		let popupMenuLink = document.querySelector(`a[href="#${popupMenuId}"`);
		popupMenu.classList.toggle('PopupMenu-opened');

		if (e.target.nodeName != 'A' || e.target.closest('.PopupMenu_close')) return;

		let activeMenuItem = popupMenuWrapper.querySelector('.PopupMenu_link.active');

		if (activeMenuItem) {
			activeMenuItem.classList.remove('active');
			e.target.classList.add('active');
		}

		if (!popupMenu.classList.contains('PopupMenu-fixedText')) {
			popupMenuLink.textContent = e.target.textContent;
		}
	});

	document.addEventListener('click', function (e) {
		let popupMenuOverlay = e.target.closest('.PopupMenu_overlay');

		if (!popupMenuOverlay) return;

		popupMenuOverlay.closest('.PopupMenu').classList.remove('PopupMenu-opened');
	});

	// Mobile languages
	document.addEventListener('click', function (e) {
		let languagesArrowBtn = e.target.closest('.Languages_arrowBtn');

		if (!languagesArrowBtn) return;

		let languages = languagesArrowBtn.closest('.Languages-mobileNavigation');
		languages.classList.toggle('Languages-expanded');
		languagesArrowBtn.classList.toggle('Languages_arrowBtn-turned');
	});

	// Go back button
	document.addEventListener('click', function (e) {
		let btnBack = e.target.closest('.BtnBack:not(.BtnBack-noBack)');

		if (!btnBack) return;

		window.history.back();
	});

	document.addEventListener('click', function (e) {
		let selectWrap = e.target.closest('.fs-wrap');

		if (!selectWrap) return;

		if (!selectWrap.contains(selectWrap.querySelector('.Select-filterBlock'))) {
			let dropdownSelector = selectWrap.querySelector('.fs-dropdown .fs-options');

			const dropdownPs = new PerfectScrollbar(dropdownSelector, {
			  wheelPropagation: false,
				minScrollbarLength: 20
			});
		}
	});

	if (document.querySelector('.Notifications_body')) {
		const notificationsPs = new PerfectScrollbar('.Notifications_body', {
			wheelPropagation: false,
			minScrollbarLength: 20
		});

		let clientHeight = document.querySelector('.Notifications_body').clientHeight;
		let scrollHeight = document.querySelector('.Notifications_body').scrollHeight;

		if (clientHeight == scrollHeight) {
			let notificationsLink = document.querySelector('.Notifications_footer .Notifications_link');

			if (notificationsLink) {
				notificationsLink.style.display = 'none';
			}
		}

		let notifications = document.querySelectorAll('.Notifications_body .Notification');

		if (notifications.length) {
			document.querySelector('.Notifications_body .NoResults').style.display = 'none';
		}
	}

	document.addEventListener('click', function (e) {
		let notificationsIcon = e.target.closest('.Notifications_icon');

		if (!notificationsIcon) return;

		let notificationsWrapper = notificationsIcon.parentNode.querySelector('.Notifications_wrapper');

		notificationsWrapper.classList.toggle('Notifications_wrapper-opened');
	});

	document.addEventListener('click', function (e) {
		let notificationsWrapper = document.querySelector('.Notifications_wrapper');

		if (!notificationsWrapper) return;

		let notificationsIcon = notificationsWrapper.parentNode.querySelector('.Notifications_icon');

		if (notificationsWrapper.classList.contains('Notifications_wrapper-opened') && !notificationsWrapper.contains(e.target) && !notificationsIcon.contains(e.target)) {
			notificationsWrapper.classList.remove('Notifications_wrapper-opened');
		}
	});

	document.addEventListener('mouseover', function (e) {
		let userPhotoLink = e.target.closest('.UserPhoto_link');
		let dropdownWrapper = e.target.closest('.Dropdown_wrapper');

		if (!userPhotoLink && !dropdownWrapper) return;

		document.querySelector('.Dropdown').classList.add('Dropdown-visible');
	});

	document.addEventListener('mouseout', function (e) {
		let dropdownWrapper = e.target.closest('.Dropdown-visible .Dropdown_wrapper');

		if (!dropdownWrapper) return;

		dropdownWrapper.parentNode.classList.remove('Dropdown-visible');
	});

	document.addEventListener('mousedown', function (e) {
		let windowWidth = document.documentElement.clientWidth;

		if (windowWidth > 767 ) return;

		let dropdownOverlay = e.target.closest('.Dropdown-visible .Dropdown_overlay');

		if (!dropdownOverlay) return;

		dropdownOverlay.parentNode.classList.remove('Dropdown-visible');
	});	

	let profileMenuTabs = document.querySelector('.Tabs-profileMenu');

	if (profileMenuTabs) {
		let activeTabIndex = getCookie('activeTabIndex');

		if (activeTabIndex === undefined) {
			activeTabIndex = 0;
			setCookie('activeTabIndex', activeTabIndex, {'max-age': 31536000});
		}

		profileMenuTabs.querySelectorAll('.Tabs_item')[activeTabIndex].classList.add('Tabs_item-active');
		profileMenuTabs.querySelectorAll('.Tabs_content')[activeTabIndex].style.display = 'block';
	}

	// Tabs
	let tabsList = document.querySelectorAll('.Tabs_list');

	tabsList.forEach(function (tabList) {
		let tabItems = tabList.querySelectorAll('.Tabs_item');

		tabItems.forEach(function (tabItem, tabItemIndex) {
			tabItem.onclick = function () {
				let activeTabItem = tabList.querySelector('.Tabs_item-active');

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
				setCookie('activeTabIndex', tabItemIndex, {'max-age': 31536000});
			};
		});
	});	

	// Tooltip
	document.addEventListener('click', function (e) {
		let target = e.target.closest('[data-tooltip]');
		let existingTooltip = document.querySelector('.Tooltip');

		if (!target || existingTooltip) return;

		let tooltipText = target.dataset.tooltip;

		let targetCoords = target.getBoundingClientRect();

		let tooltip = document.createElement('div');
		tooltip.className = 'Tooltip';

		tooltip.style.top = targetCoords.top - 15 + 'px';
		tooltip.style.left = targetCoords.left + 'px';

		tooltip.textContent = tooltipText;

		target.insertAdjacentElement('afterend', tooltip);

		let start = Date.now();

		let timer = setInterval(() => {
			let timePassed = Date.now() - start;

			if (timePassed >= 700) {
				clearInterval(timer);
				tooltip.remove();
			} else {
				let computedStyle = getComputedStyle(tooltip);

				tooltip.style.top = (parseInt(computedStyle.top) - 1) + 'px';
				tooltip.style.opacity = computedStyle.opacity - 0.06;
			}
		}, 20);
	});

	function addMobileOverlay (selectors) {
		selectors.forEach(item => {
			let overlay = item.querySelector('.Overlay');

			if (!overlay) {
				item.insertAdjacentHTML('beforeend', '<div class="Overlay Overlay-mobile"></div>');
			}
		});
	}

	function removeMobileOverlay (selectors) {
		selectors.forEach(item => {
			let overlay = item.querySelector('.Overlay');

			if (overlay) {
				overlay.remove();
			}
		});
	}

	function toggleMobileOverlay (selectors) {
		let windowWidth = document.documentElement.clientWidth;

		if (windowWidth < 768) {
			addMobileOverlay(selectors);
		} else {
			removeMobileOverlay(selectors);
		}
	}

	toggleMobileOverlay(document.querySelectorAll('.DropdownSelect-mobile, .TimeRangeDropdown, .Filter_item-mobile'));

	window.addEventListener('resize', function (e) {
		toggleMobileOverlay(document.querySelectorAll('.DropdownSelect-mobile, .TimeRangeDropdown, .Filter_item-mobile'));
	});

	document.addEventListener('click', function (e) {
		let filterItemMobile = e.target.closest('.Filter_item-mobile');

		if (!filterItemMobile) return;

		let filterItemOverlay = filterItemMobile.querySelector('.Overlay');

		if (!filterItemOverlay) return;

		if (filterItemMobile.querySelector('.fs-wrap').classList.contains('fs-open')) {
			filterItemOverlay.classList.add('Overlay-visible');
		}
	});

	document.addEventListener('click', function (e) {
		let filterItemOverlay = e.target.closest('.Filter_item-mobile .Overlay');

		if (!filterItemOverlay) return;

		filterItemOverlay.classList.remove('Overlay-visible');
	});

	document.addEventListener('click', function (e) {
		let fsOption = e.target.closest('.Filter_item-mobile .fs-option');

		if (!fsOption) return;

		let filterItemOverlay = fsOption.closest('.Filter_item-mobile').querySelector('.Overlay');

		if (!filterItemOverlay) return;

		filterItemOverlay.classList.remove('Overlay-visible');
	});

	document.addEventListener('click', function (e) {
		let dropdownSelectMobile = e.target.closest('.DropdownSelect-mobile');

		if (!dropdownSelectMobile) return;

		let dropdownOverlay = dropdownSelectMobile.querySelector('.Overlay');

		if (!dropdownOverlay) return;

		if (dropdownSelectMobile.querySelector('.fs-wrap').classList.contains('fs-open')) {
			dropdownOverlay.classList.add('Overlay-visible');
		}
	});

	document.addEventListener('click', function (e) {
		let dropdownOverlay = e.target.closest('.DropdownSelect-mobile .Overlay');

		if (!dropdownOverlay) return;

		dropdownOverlay.classList.remove('Overlay-visible');
	});

	document.addEventListener('click', function (e) {
		let fsOption = e.target.closest('.DropdownSelect-mobile .fs-option');

		if (!fsOption) return;

		let dropdownOverlay = fsOption.closest('.DropdownSelect-mobile').querySelector('.Overlay');

		if (!dropdownOverlay) return;

		dropdownOverlay.classList.remove('Overlay-visible');
	});

	document.addEventListener('click', function (e) {
		let timeRangeDropdown = e.target.closest('.TimeRangeDropdown');

		if (!timeRangeDropdown) return;

		let timeRangeOverlay = timeRangeDropdown.querySelector('.Overlay');
		if (!timeRangeDropdown.classList.contains('TimeRangeDropdown-opened')) {
			timeRangeOverlay.classList.add('Overlay-visible');
		}
	});

	document.addEventListener('click', function (e) {
		let timeRangeOverlay = e.target.closest('.TimeRangeDropdown .Overlay');

		if (!timeRangeOverlay) return;

		timeRangeOverlay.closest('.TimeRangeDropdown').classList.remove('TimeRangeDropdown-opened');
		timeRangeOverlay.classList.remove('Overlay-visible');
	});

	// Save filter
	document.addEventListener('click', function (e) {
		let saveFilterIcon = e.target.closest('.SaveFilter_icon');

		if (!saveFilterIcon) return;

		let saveFilterMenu = saveFilterIcon.parentNode.querySelector('.SaveFilter_menu');
		saveFilterMenu.classList.toggle('SaveFilter_menu-opened');
	});

	document.addEventListener('click', function (e) {
		let saveFilterMenu = document.querySelector('.SaveFilter_menu');

		if (!saveFilterMenu) return;

		let saveFilterIcon = saveFilterMenu.parentNode.querySelector('.SaveFilter_icon');

		if (saveFilterMenu.classList.contains('SaveFilter_menu-opened') && !saveFilterMenu.contains(e.target) && !saveFilterIcon.contains(e.target)) {
			saveFilterMenu.classList.remove('SaveFilter_menu-opened');
		}
	});

	document.addEventListener('click', function (e) {
		let saveFilterLink = e.target.closest('.SaveFilter_link');

		if (!saveFilterLink) return;

		let saveFilter = saveFilterLink.closest('.SaveFilter');
		let saveFilterIcon = saveFilter.querySelector('.SaveFilter_icon');
		let activeFilterLink = saveFilter.querySelector('.SaveFilter_link-active');
		let activeSvgIcon = saveFilterLink.querySelector('svg').cloneNode(true);

		activeFilterLink.classList.remove('SaveFilter_link-active');
		saveFilterLink.classList.add('SaveFilter_link-active');

		saveFilterIcon.innerHTML = '';
		saveFilterIcon.append(activeSvgIcon);
		saveFilter.querySelector('.SaveFilter_menu').classList.remove('SaveFilter_menu-opened');

		e.preventDefault();
	});

	// Rating dropdown
	document.addEventListener('click', function (e) {
		let windowWidth = document.documentElement.clientWidth;

		if (windowWidth > 767) return;

		let ratingWrapperLink = e.target.closest('.Rating-dropdown .Rating_wrapperLink');

		if (!ratingWrapperLink) return;

		let rating = ratingWrapperLink.closest('.Rating-dropdown');
		rating.querySelector('.Rating_dropdown').classList.add('Rating_dropdown-visible');
		rating.querySelector('.Overlay').classList.add('Overlay-visible');
	});

	document.addEventListener('click', function (e) {
		let ratingOverlay = e.target.closest('.Rating-dropdown .Overlay');

		if (!ratingOverlay) return;

		ratingOverlay.classList.remove('Overlay-visible');
		ratingOverlay.parentNode.querySelector('.Rating_dropdown').classList.remove('Rating_dropdown-visible');
	});

	document.addEventListener('click', function (e) {
		let closeDropdown = e.target.closest('.Rating_closeDropdown');

		if (!closeDropdown) return;

		let rating = closeDropdown.closest('.Rating-dropdown');
		rating.querySelector('.Overlay').classList.remove('Overlay-visible');
		rating.querySelector('.Rating_dropdown').classList.remove('Rating_dropdown-visible');
	});

	// Rating line fill
	let ratingLineFill = document.querySelectorAll('.ExtendedRating_lineFill');
	ratingLineFill.forEach( el => el.style.width = (el.dataset.mark * 10) + '%');

	let remark = document.querySelector('.Remark');
	if (remark) {
		if (!checkBlockHidden(remark.id)) {
			remark.classList.remove('hidden');
		} else {
			remark.remove();
		}
	}

	document.addEventListener('click', function (e) {
		let closeRemark = e.target.closest('.Remark_close');

		if (!closeRemark) return;

		let remark = closeRemark.closest('.Remark');
		hideBlockWithCookie(remark.id);
		remark.remove();
	});

	// Open/close control dropdown
	document.addEventListener('click', function (e) {
		let controlBtn = e.target.closest('.Control_btn');

		if (!controlBtn) return;

		let controlMenu = controlBtn.parentNode.querySelector('.Control_menu');
		controlMenu.classList.toggle('Control_menu-opened');
	});

	document.addEventListener('click', function (e) {
		let controlMenu = document.querySelector('.Control_menu');

		if (!controlMenu) return;

		let controlBtn = controlMenu.parentNode.querySelector('.Control_btn');

		if (controlMenu.classList.contains('Control_menu-opened') && !controlMenu.contains(e.target) && !controlBtn.contains(e.target)) {
			controlMenu.classList.remove('Control_menu-opened');
		}
	});

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

	let copyLinkInput = document.querySelector('.CopyLink_input');
	if (copyLinkInput) {
		copyLinkInput.value = location.href;
	}

	document.addEventListener('click', function (e) {
		let copyLink = e.target.closest('.ActionMenu_link-copy');

		if (!copyLink) return;

		let mobilePopupPageUrl = document.querySelector('.MobilePopup_pageUrl');
		if (mobilePopupPageUrl) {
			mobilePopupPageUrl.value = location.href;
		}

		mobilePopupPageUrl.classList.remove('hidden');
		copyInputText(mobilePopupPageUrl);
		mobilePopupPageUrl.classList.add('hidden');

		let copyLinkInner = copyLink.querySelector('.ActionMenu_linkInner');
		copyLink.classList.add('ActionMenu_link-copied');
		copyLinkInner.textContent = 'Скопировано!';

		setTimeout(() => {
			copyLink.classList.remove('ActionMenu_link-copied');
			copyLinkInner.textContent = 'Скопировать ссылку';

			let popupShare = document.getElementById('PopupShare');
			popupShare.classList.remove('MobilePopup-opened');
			popupShare.querySelector('.Overlay').classList.remove('Overlay-visible');
		}, 800);
	});

	// Share for Android/IOS
	document.addEventListener('click', function (e) {
		let shareLink = e.target.closest('[data-action="share"]');

		if (!shareLink) return;

		let titleElem = document.querySelector('.QuestionBlock_title');
		let url = location.href;
		let title = '';
		let text = '';

		if (titleElem) {
			title = titleElem.textContent;
		} else {
			title = document.querySelector('title').textContent;
		}
		text = title;

		navigator.share({title, text, url});
	});

	// Mobile popup
	document.addEventListener('click', function (e) {
		let mobilePopupLink = e.target.closest('[data-action="openMobilePopup"]');

		if (!mobilePopupLink) return;

		let openedMobilePopup = document.querySelector('.MobilePopup-opened');

		if (openedMobilePopup) {
			openedMobilePopup.classList.remove('MobilePopup-opened');
			openedMobilePopup.querySelector('.Overlay').classList.remove('Overlay-visible');
		}

		let mobilePopupId = mobilePopupLink.getAttribute('href');
		let mobilePopup = document.querySelector(`${mobilePopupId}`);

		if (!mobilePopup) return;

		mobilePopup.classList.add('MobilePopup-opened');
		mobilePopup.querySelector('.Overlay').classList.add('Overlay-visible');

		e.preventDefault();
	});

	document.addEventListener('click', function (e) {
		let closeMobilePopup = e.target.closest('[data-action="closeMobilePopup"]');

		if (!closeMobilePopup) return;

		let mobilePopup = closeMobilePopup.closest('.MobilePopup');

		mobilePopup.classList.remove('MobilePopup-opened');
		mobilePopup.querySelector('.Overlay').classList.remove('Overlay-visible');
	});

	document.addEventListener('click', function (e) {
		let mobilePopupOverlay = e.target.closest('.MobilePopup .Overlay');

		if (!mobilePopupOverlay) return;

		mobilePopupOverlay.classList.remove('Overlay-visible');
		mobilePopupOverlay.closest('.MobilePopup').classList.remove('MobilePopup-opened');
	});

	// Hide/show activities
	document.addEventListener('click', function (e) {
		let toggleLink = e.target.closest('.Activities_toggleLink');

		if (!toggleLink) return;

		let moreText = toggleLink.closest('.Activities').querySelector('.Activities_list-additional');
		if (!moreText.hidden) {
			toggleLink.textContent = 'показать все';
		} else {
			toggleLink.textContent = 'скрыть';
		}

		moreText.hidden = !moreText.hidden;
		e.preventDefault();
	});

	// Bookmark icon
	document.addEventListener('click', function (e) {
		let bookmarkIcon = e.target.closest('.Bookmark_icon');

		if (!bookmarkIcon) return;
		
		e.preventDefault();

		let bookmark = bookmarkIcon.closest('.Bookmark');

		if (bookmark.classList.contains('Bookmark-company') && !bookmark.classList.contains('Bookmark-active')) {
			bookmark.classList.add('Bookmark-active');
			let popupNotification = document.querySelector(`${bookmarkIcon.getAttribute('href')}`);

			if (popupNotification) {
				if (bookmark.classList.contains('Bookmark-active')) {
					popupNotification.classList.add('PopupNotification-visible');

					let timer = setTimeout(function () {
						popupNotification.classList.remove('PopupNotification-visible');
						bookmarkIcon.setAttribute('href', '#BookmarkSettingsPopup');
						bookmarkIcon.dataset.action = 'openMobilePopup';
					}, 2500);

					document.addEventListener('click', function (e) {
						let bookmarkNotificationSwitch = e.target.closest('[data-action="bookmarkNotificationSwitch"]');

						if (!bookmarkNotificationSwitch) return;

						let bookmarkNotificationSwitches = document.querySelectorAll('[data-action="bookmarkNotificationSwitch"]');

						if (bookmarkNotificationSwitch.checked) {
							bookmarkIcon.innerHTML = '<svg class="SvgIco SvgIco-bellCheck" viewBox="0 0 17.812 17" width="18" data-name="Группа 1" xmlns="http://www.w3.org/2000/svg"><path class="SvgIco_path" data-name="Фигура 31 копия 2" d="M14.162 13h-.8l-.02-2.025a6.606 6.606 0 01-.98-.17V13h-10c0-.28-.036-6.362-.036-6.362a4.582 4.582 0 014.061-3.956 1.046 1.046 0 01-.07-.353 1.083 1.083 0 011-1.148.949.949 0 01.79.481 6.4 6.4 0 01.6-1A1.847 1.847 0 007.312 0a2.134 2.134 0 00-1.99 2 5.263 5.263 0 00-3.935 4.633L1.357 13H.496a.5.5 0 100 1h13.666a.5.5 0 000-1zm-6.83 4a2.033 2.033 0 001.95-2h-3.91a2.056 2.056 0 001.96 2z" fill-rule="evenodd" fill="#8396ac"/><path class="SvgIco_path SvgIco_path-check" data-name="Фигура 32 копия" d="M13.312.5a4.5 4.5 0 104.5 4.5 4.506 4.506 0 00-4.5-4.5zm2.28 3.546l-2.44 2.438a.368.368 0 01-.26.11.391.391 0 01-.27-.11l-1.36-1.366a.427.427 0 01.55-.618l1 1 2-2a.463.463 0 01.65-.017.432.432 0 01.13.563z" fill="#f89333" fill-rule="evenodd"/></svg>';
							bookmark.classList.add('Bookmark-companyBellCheck');
							bookmarkNotificationSwitches.forEach(notificationSwitch => notificationSwitch.checked = true);
						} else {
							bookmarkIcon.innerHTML = '<svg class="SvgIco" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 17"><path class="SvgIco_stroke" d="M11.87.5H2.12A1.614 1.614 0 00.5 2.1v14.4L7 12.842l6.5 3.658V2.1A1.616 1.616 0 0011.87.5z" fill="none" stroke="#8396ac"/></svg>';
							bookmark.classList.remove('Bookmark-companyBellCheck');
							bookmarkNotificationSwitches.forEach(notificationSwitch => notificationSwitch.checked = false);
						}

						clearTimeout(timer);

						timer = setTimeout(function () {
							popupNotification.classList.remove('PopupNotification-visible');
							bookmarkIcon.setAttribute('href', '#BookmarkSettingsPopup');
							bookmarkIcon.dataset.action = 'openMobilePopup';
						}, 1500);
					});
				} else {
					bookmarkIcon.setAttribute('href', '#CompanyPopupNotification');
					delete bookmarkIcon.dataset.action;
				}
			}
		}

		if (!bookmark.classList.contains('Bookmark-company')) {
			bookmark.classList.toggle('Bookmark-active');
		}

		let bookmarkNotification = document.querySelector('.StatIcon-bookmarkNotification');
		
		if (!bookmarkNotification) return;

		bookmarkNotification.hidden = !bookmarkNotification.hidden;

		if (bookmarkNotification.hidden) {
			let activeNotificationLink = bookmarkNotification.querySelector('.NotificationMenu_link-active');
			activeNotificationLink.classList.remove('NotificationMenu_link-active');

			let firstNotificationLink = bookmarkNotification.querySelector('.NotificationMenu_link:first-child');
			firstNotificationLink.classList.add('NotificationMenu_link-active');

			let notificationMenuIcon = bookmarkNotification.querySelector('.NotificationMenu_icon');
			let svgIcon = firstNotificationLink.querySelector('svg').cloneNode(true);

			notificationMenuIcon.innerHTML = '';
			notificationMenuIcon.append(svgIcon);
		}
	});

	document.addEventListener('click', function (e) {
		let removeBookmark = e.target.closest('[data-action="removeBookmark"]');

		if (!removeBookmark) return;

		let bookmarkCompany = document.querySelector('.Bookmark-company');
		bookmarkCompany.classList.remove('Bookmark-active');
		bookmarkCompany.classList.remove('Bookmark-companyBellCheck');

		let bookmarkCompanyIcon = bookmarkCompany.querySelector('.Bookmark_icon');
		bookmarkCompanyIcon.innerHTML = '<svg class="SvgIco" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 17"><path class="SvgIco_stroke" d="M11.87.5H2.12A1.614 1.614 0 00.5 2.1v14.4L7 12.842l6.5 3.658V2.1A1.616 1.616 0 0011.87.5z" fill="none" stroke="#8396ac"/></svg>';
		bookmarkCompanyIcon.setAttribute('href', '#CompanyPopupNotification');
		delete bookmarkCompanyIcon.dataset.action;

		let bookmarkNotificationSwitches = document.querySelectorAll('[data-action="bookmarkNotificationSwitch"]');
		bookmarkNotificationSwitches.forEach(notificationSwitch => notificationSwitch.checked = false);

		let mobilePopup = removeBookmark.closest('.MobilePopup');
		if (!mobilePopup) return;

		mobilePopup.classList.remove('MobilePopup-opened');
		mobilePopup.querySelector('.Overlay').classList.remove('Overlay-visible');
	});

	// Notification menu
	document.addEventListener('click', function (e) {
		let notificationMenuIcon = e.target.closest('.NotificationMenu_icon');

		if (!notificationMenuIcon) return;

		let notificationMenuWrapper = notificationMenuIcon.parentNode.querySelector('.NotificationMenu_wrapper');
		notificationMenuWrapper.classList.toggle('NotificationMenu_wrapper-opened');
	});

	document.addEventListener('click', function (e) {
		let notificationMenuWrapper = document.querySelector('.NotificationMenu_wrapper');

		if (!notificationMenuWrapper) return;

		let notificationMenuIcon = notificationMenuWrapper.parentNode.querySelector('.NotificationMenu_icon');

		if (notificationMenuWrapper.classList.contains('NotificationMenu_wrapper-opened') && !notificationMenuWrapper.contains(e.target) && !notificationMenuIcon.contains(e.target)) {
			notificationMenuWrapper.classList.remove('NotificationMenu_wrapper-opened');
		}
	});

	document.addEventListener('click', function (e) {
		let notificationMenuLink = e.target.closest('.NotificationMenu_link');

		if (!notificationMenuLink) return;

		let notificationMenu = notificationMenuLink.closest('.NotificationMenu');
		let notificationMenuIcon = notificationMenu.querySelector('.NotificationMenu_icon');
		let activeNotificationLink = notificationMenu.querySelector('.NotificationMenu_link-active');
		let activeSvgIcon = notificationMenuLink.querySelector('svg').cloneNode(true);

		activeNotificationLink.classList.remove('NotificationMenu_link-active');
		notificationMenuLink.classList.add('NotificationMenu_link-active');

		notificationMenuIcon.innerHTML = '';
		notificationMenuIcon.append(activeSvgIcon);

		notificationMenu.querySelector('.NotificationMenu_wrapper').classList.remove('NotificationMenu_wrapper-opened');

		e.preventDefault();
	});

});