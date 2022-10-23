const {app} = require('electron');
const jsonStorage = require('electron-json-storage');

class Settings {
	constructor() {
		this._dataPath = app.getPath('userData');
		this._initialize();
	}

	get synctubeUrl() {
		return this._data.synctubeUrl;
	}

	set synctubeUrl(value) {
		this._data.synctubeUrl = value;
		this._save();
	}

	_initialize() {
		this._load();

		if (Object.keys(this._data).length === 0) {
			this._data = {synctubeUrl: ''};
			this._save();
		}
	}

	_load() {
		this._data = jsonStorage.getSync('settings', {dataPath: this._dataPath});
	}

	_save() {
		jsonStorage.set('settings', this._data, {dataPath: this._dataPath});
	}
}

module.exports = Settings;
