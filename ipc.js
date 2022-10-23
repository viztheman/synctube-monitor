const {ipcMain: ipc} = require('electron');

class Ipc {
	constructor() {
		this._getSynctubeUrl = () => {};
		this._setSynctubeUrl = () => {};
		this._initialize();
	}

	set getSynctubeUrl(value) {
		this._getSynctubeUrl = value;
	}

	set setSynctubeUrl(value) {
		this._setSynctubeUrl = value;
	}

	_initialize() {
		ipc.handle('settings:get:synctubeUrl', () => this._getSynctubeUrl());
		ipc.on('settings:set:synctubeUrl', (_e, value) => this._setSynctubeUrl(value));
	}
}

module.exports = Ipc;
