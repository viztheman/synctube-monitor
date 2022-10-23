const {Tray, Menu} = require('electron');
const path = require('path');

class TrayIcon {
	constructor(mainWindow) {
		this._mainWindow = mainWindow;
		this._initialize();
	}

	set icon(value) {
		this._tray.setImage(value);
	}

	set tooltip(value) {
		this._tray.setToolTip(value);
	}

	_initialize() {
		this._tray = new Tray(path.join(__dirname, 'icon.png'));
		this._tray.setToolTip('Starting up');
		this._tray.on('double-click', () => this._mainWindow.show());

		const contextMenu = Menu.buildFromTemplate([
			{label: 'NCTV Monitor', enabled: false},
			{type: 'separator'},
			{label: 'Show App', click: () => this._mainWindow.show()},
			{type: 'separator'},
			{role: 'quit'}
		]);
		this._tray.setContextMenu(contextMenu);
	}
}

module.exports = TrayIcon;
