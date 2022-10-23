const {BrowserWindow} = require('electron');
const path = require('path');

module.exports = function() {
	const win = new BrowserWindow({
		show: false,
		icon: path.join(__dirname, 'icon.png'),
		width: 450,
		height: 150,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	win.on('minimize', () => win.hide());
	win.loadFile('index.html');
	return win;
};
