const elementID = 'upc-modal-payment';

export class UpcModal {
	constructor(content = '') {
		this.content = content;
	}

	show() {
		const el = document.createElement('div');
		el.setAttribute('id', elementID);
		el.innerHTML = ` <div class="upc-modal-wraper"><div class="upc-modal"><div class="close">×</div><div class="upc-inner"></div><div class="proccess"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div><div class="close-overlay"></div></div>`;
		const close = el.querySelector('.close');
		close.addEventListener('click', () => {
			this.close();
		});

		el.querySelector('.close-overlay').addEventListener('click', () => {
			this.close();
		});

		if (typeof this.content === 'string') {
			el.querySelector('.upc-inner').innerHTML = this.content;
		} else {
			el.querySelector('.upc-inner').appendChild(this.content);
		}

		document.body.appendChild(el);
	}

	add(html) {
		this.content = html;
	}

	loading(loading = true) {
		const el = document.getElementById(elementID);
		if (!el) return false;
		if (loading) {
			el.classList.add('upc-loading');
		} else {
			el.classList.remove('upc-loading');
		}
	}

	close() {
		const el = document.getElementById(elementID);
		if (el) el.parentNode.removeChild(el);
	}
}
