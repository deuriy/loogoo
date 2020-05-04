document.addEventListener("DOMContentLoaded", function () {
	// Email field
	let emailFieldgroup = document.querySelector('.ProfileSettings_fieldGroup-email');
	let changeEmailLink = document.getElementById('change_email_link');

	changeEmailLink.onclick = function () {
		let changeEmailField = document.querySelector('.ProfileSettings_field-changeEmail');
		let changeEmailBtnsList = emailFieldgroup.querySelector('.ProfileSettings_btnsList-changeEmail');

		if (!changeEmailField) {
			emailFieldgroup.insertAdjacentHTML("beforeend", `<div class="ProfileSettings_field ProfileSettings_field-changeEmail"><label class="ProfileSettings_label" for="change_email">Новый E-mail</label><div class="ProfileSettings_fieldContent"><input class="FormText FormText-profileSettings" type="email" name="change_email" id="change_email" placeholder="Изменить E-mail"></div></div><div class="ProfileSettings_btnsList ProfileSettings_btnsList-changeEmail"><a class="BtnOrange" href="javascript:;" id="save_email_change">Изменить E-mail</a></div>`);
			this.textContent = "Отмена";

			// Confirmation changing email
			let saveEmailBtn = document.getElementById('save_email_change');

			saveEmailBtn.onclick = function () {
				let confirmCodeField = document.querySelector('.ProfileSettings_field-confirmCode');
				let changeEmailBtnsList = emailFieldgroup.querySelector('.ProfileSettings_btnsList-changeEmail');
				let confirmEmailBtnsList = emailFieldgroup.querySelector('.ProfileSettings_btnsList-confirmEmail');

				if (!confirmCodeField) {
					emailFieldgroup.insertAdjacentHTML("beforeend", `<div class="ProfileSettings_field ProfileSettings_field-confirmCode"><label class="ProfileSettings_label" for="confirm_code">Код подтверждения</label><div class="ProfileSettings_fieldContent"><input class="FormText FormText-profileSettings" type="email" name="confirm_code" id="confirm_code" placeholder="Код подтверждения"></div></div><div class="ProfileSettings_btnsList ProfileSettings_btnsList-confirmEmail"><a class="BtnOrange" href="javascript:;" id="confirm_email">Подтвердить E-mail</a></div>`);
					this.textContent = "Отмена";
					changeEmailBtnsList.remove();
					changeEmailLink.remove();
				}
			}
		} else {
			changeEmailField.remove();
			changeEmailBtnsList.remove();
			this.textContent = "Изменить";
		}
	}

	// Password field
	let passwordFieldgroup = document.querySelector('.ProfileSettings_fieldGroup-password');
	let passwordFields = passwordFieldgroup.querySelectorAll('input[type="password"]');

	for (let pass of passwordFields) {
		pass.onclick = function () {
			let passwordBtnsList = passwordFieldgroup.querySelector('.ProfileSettings_btnsList');

			if (!passwordBtnsList) {
				passwordFieldgroup.insertAdjacentHTML('beforeend', `<div class="ProfileSettings_btnsList"><a class="BtnOrange ProfileSettings_savePassBtn" href="javascript:;" id="save_password_change">Изменить пароль</a><a class="ProfileSettings_link" href="javascript:;" id="cancel_password_change">Отмена</a></div>`);
			}
		}
	}
});