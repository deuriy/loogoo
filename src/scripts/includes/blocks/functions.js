function setAutoHeightTextarea (textarea) {
  setTimeout(function() {
    textarea.style.cssText = 'height:auto; padding:0';
    textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
  }, 0);
}

function randomString(len, an) {
	an = an && an.toLowerCase();
	var str = "",
	i = 0,
	min = an == "a" ? 10 : 0,
	max = an == "n" ? 10 : 62;
	for (; i++ < len;) {
		var r = Math.random() * (max - min) + min << 0;
		str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
	}
	return str;
}

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

function copyInputText (targetElem) {
  targetElem.select();
  targetElem.setSelectionRange(0, 99999);

  document.execCommand("copy");
}

function hideBlockWithCookie (blockId) {
	setCookie(`${blockId}`, true, 604800);
}

function checkBlockHidden (blockId) {
  return !!getCookie(`${blockId}`);
}