import '../styles/index.scss';

import { UpcModal } from './modal';

const PAYMENT_URL = 'https://ecg.test.upc.ua/go/enter';

class UpcPayment {
	constructor(config = {}) {
		this.config = config;
		this.iframe = null;
		this.modal = null;
	}

	pay(paymentInfo) {
		const modal = new UpcModal();
		this.modal = modal;

		const iframe = this.renderIrame();
		this.iframe = iframe;
		const formConfig = {
			...this.config,
			...paymentInfo
		};
		const form = this.renderForm(formConfig, PAYMENT_URL);

		// iframe.body.appendChild(form);

		modal.add(iframe);
		modal.show();
		iframe.contentWindow.document.body.appendChild(form);
		form.submit();
		modal.loading();
		iframe.addEventListener('load', function(e) {
			modal.loading(false);
		});
	}

	renderIrame() {
		const iframe = document.createElement('iframe');
		iframe.setAttribute('id', 'upc-iframe');
		iframe.setAttribute('name', 'upc-iframe');
		iframe.setAttribute('frameborder', '0');
		return iframe;
	}

	renderForm(config, url) {
		const form = document.createElement('form');
		form.setAttribute('action', url);
		form.setAttribute('method', 'POST');
		form.setAttribute('id', 'upc-payment-form');

		let formInnerHtml = `<meta http-equiv="Content-Type"content="text/html; charset=utf-8">`;

		for (const key in config) {
			if (config.hasOwnProperty(key)) {
				const element = config[key];
				formInnerHtml += `<input name="${key}"type="hidden"value="${element}"/>`;
			}
		}

		formInnerHtml += '<input type="submit"/>';
		form.innerHTML = formInnerHtml;
		return form;
	}
}
// set as global object
window.UpcPayment || (window.UpcPayment = UpcPayment);
