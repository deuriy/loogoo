document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (e) {
		let removeUploadedImg = e.target.closest('.UploadedImages_removeItem');

		if (!removeUploadedImg) return;

		removeUploadedImg.parentNode.remove();
	});

	document.addEventListener('click', function (e) {
		let addFileLink = e.target.closest('.AddFieldItem-fileLink');

		if (!addFileLink) return;

		let uploadFiles = addFileLink.closest('.UploadFiles');
		let uploadFilesItems = uploadFiles.querySelector('.UploadFiles_items');
		let uploadFilesItem = uploadFiles.querySelectorAll('.UploadFiles_item');

		if (uploadFilesItem.length > 6) return;

		let newItem = uploadFiles.querySelector('.UploadFiles_item').cloneNode(true);
		newItem.insertAdjacentHTML('beforeend', '<a href="javascript:;" class="UploadFiles_removeItem"></a>');
		uploadFilesItems.append(newItem);
	});

	document.addEventListener('click', function (e) {
		let removeFileInput = e.target.closest('.UploadFiles_removeItem');

		if (!removeFileInput) return;

		removeFileInput.parentNode.remove();
	});

	document.addEventListener('click', function (e) {
		let uploadLinkEnterpriseFiles = e.target.closest('.UploadLink-enterpriseFiles');

		if (!uploadLinkEnterpriseFiles) return;

		let enterpriseFilesField = uploadLinkEnterpriseFiles.closest('.CompanySettings_field-enterpriseFiles');
		enterpriseFilesField.querySelector('.CompanySettings_uploadFiles').classList.remove('hidden');
		uploadLinkEnterpriseFiles.classList.add('hidden');
	});
});