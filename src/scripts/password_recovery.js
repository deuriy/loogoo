document.addEventListener('DOMContentLoaded', function (e) {
	function isPhoneNumber (string) {
		for (let i = 0; i < string.length; i++) {
			if (string[i] < '0' || string[i] > '9') {
				return false;
			}
		}

		return true;
	}

	function isSpacesString (string) {
		for (let i = 0; i < string.length; i++) {
			if (string[i] != ' ') {
				return false;
			}
		}

		return true;
	}

	document.addEventListener('click', function (e) {
		let passwordRecoveryBtn = e.target.closest('.BtnOrange-passwordRecovery');

		if (!passwordRecoveryBtn) return;

		let formText = passwordRecoveryBtn.form.email_or_phone;

		if (formText.value.length && !isSpacesString(formText.value)) {
			if (isPhoneNumber(formText.value)) {
				window.location.href = '/password_recovery_phone.html';
			} else {
				window.location.href = '/password_recovery_email.html';
			}
		}

		e.preventDefault();
	});
});