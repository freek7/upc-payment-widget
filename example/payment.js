const upc = new window.UpcPayment({
	Version: 1,
	MerchantID: '1753545',
	TerminalID: 'E7881545',
	locale: 'ru',
	Signature: '',
	Currency: 980
});

document.getElementById('pay').addEventListener('click', () => {
	const time = new Date().getTime();

	upc.pay({
		TotalAmount: 100,
		PurchaseTime: time,
		OrderID: '2d2b' + '-' + String(time).substring(0, 4),
		PurchaseDesc: 'Подарочный набор 1'
	});
});
