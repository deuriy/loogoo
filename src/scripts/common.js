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
		el.addEventListener('keydown', () => {
			setTimeout(() => {
				el.style.cssText = 'height:auto; padding:0';
				el.style.cssText = 'height:' + el.scrollHeight + 'px';
			}, 0);
		});
	});

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
	function activeMenuItem (menu) {
		if (!menu) return;

		let lang = document.querySelector('html').getAttribute('lang') == 'ru' ? 'ru' : '';
		let pageUrl = window.location.href;
		let links = menu.querySelectorAll('a');

		for (let link of links) {
			let linkHref = link.getAttribute('href') != '/' ? link.href : link.href + lang;

			if (pageUrl == linkHref) {
				link.classList.add('active');
				return link;
			}
		}
	}

	function activePopupMenuItem (popupMenu, selectionLink) {
		let activeLink = activeMenuItem(popupMenu);
		if (activeLink) {
			selectionLink.textContent = activeLink.textContent;
		}
	}

	activeMenuItem( document.querySelector('#ProfileSettingsMenu') );
	activeMenuItem( document.querySelector('#UserMenu') );
	activeMenuItem( document.querySelector('#ActionsMenu') );
	activeMenuItem( document.querySelector('#PrimaryMenu') );
	activeMenuItem( document.querySelector('#SidebarMenu') );
	activePopupMenuItem( document.querySelector('#PopupMenu'), document.querySelector('.PopupMenuLink') );

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
		}
	});

	document.addEventListener('click', function (e) {
		let popupMenu = e.target.closest('.PopupMenu');

		if (!popupMenu) return;

		let popupMenuId = popupMenu.getAttribute('id');
		let popupMenuLink = document.querySelector(`a[href="#${popupMenuId}"`);
		popupMenu.classList.toggle('PopupMenu-opened');

		if (e.target.nodeName != 'A' || e.target.closest('.PopupMenu_close')) return;

		let popupMenuWrapper = popupMenu.querySelector('.PopupMenu_wrapper');
		let activeMenuItem = popupMenuWrapper.querySelector('.PopupMenu_link.active');

		if (activeMenuItem) {
			activeMenuItem.classList.remove('active');
			e.target.classList.add('active');
		}		

		if (!popupMenu.classList.contains('PopupMenu-fixedText')) {
			popupMenuLink.textContent = e.target.textContent;
		}
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

	function getCookie(name) {
	  let matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	function setCookie(name, value, options = {}) {
	  options = {
	    path: '/',
	    ...options
	  };

	  if (options.expires instanceof Date) {
	    options.expires = options.expires.toUTCString();
	  }

	  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	  for (let optionKey in options) {
	    updatedCookie += "; " + optionKey;
	    let optionValue = options[optionKey];
	    if (optionValue !== true) {
	      updatedCookie += "=" + optionValue;
	    }
	  }

	  document.cookie = updatedCookie;
	}

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
				setCookie('activeTabIndex', tabItemIndex, {'max-age': 31536000});
			};
		});
	});

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

	let dropdownSelectMobile = document.querySelectorAll('.DropdownSelect-mobile');
	dropdownSelectMobile.forEach(item => {
		item.insertAdjacentHTML('beforeend', '<div class="Overlay Overlay-mobile"></div>');
	});

	document.addEventListener('click', function (e) {
		let dropdownSelectMobile = e.target.closest('.DropdownSelect-mobile');

		if (!dropdownSelectMobile) return;

		let dropdownOverlay = dropdownSelectMobile.querySelector('.Overlay');

		if (dropdownSelectMobile.querySelector('.fs-wrap').classList.contains('fs-open')) {
			dropdownOverlay.classList.add('Overlay-visible');
		} else {
			dropdownOverlay.classList.remove('Overlay-visible');
		}
	});

	document.addEventListener('click', function (e) {
		let dropdownOverlay = e.target.closest('.DropdownSelect-mobile .Overlay');

		if (!dropdownOverlay) return;

		dropdownOverlay.classList.remove('Overlay-visible');
	});

});