const fs = require('fs');
const Path = require('path');

const contentsStyle = fs.readFileSync(Path.resolve(__dirname, '../build/bundle.css')).toString();
const contentsJs = fs.readFileSync(Path.resolve(__dirname, '../build/js/upc-payment.js')).toString();

console.log({ contentsStyle });

const script = `
    (function() {
        const contentsStyle = '${contentsStyle
			.replace('/*# sourceMappingURL=bundle.css.map*/', '')
			.replace(/\r?\n|\r/g, '')}';

		const id = 'upc-payment-widgetn-css';
		const head = document.head || document.getElementsByTagName('head')[0];
		const style = document.createElement('style');
		style.setAttribute('id', id);
		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet) {
			// This is required for IE8 and below.
			style.styleSheet.cssText = contentsStyle;
		} else {
			style.appendChild(document.createTextNode(contentsStyle));
		}
	})();
`;

fs.writeFileSync(Path.resolve(__dirname, '../build/upc-payment-widget.js'), script + contentsJs);
