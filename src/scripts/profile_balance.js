document.addEventListener('click', function (e) {
	let companiesBalancesLink = e.target.closest('.ArrowLink-companiesBalances');

	if (!companiesBalancesLink) return;

	let additionalCompaniesBalances = companiesBalancesLink.closest('.CompaniesBalances').querySelector('.CompaniesBalances_additional');
	additionalCompaniesBalances.classList.toggle('hidden');

	e.preventDefault();
});