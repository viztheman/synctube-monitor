const axios = require('axios');
const cheerio = require('cheerio');

class Ping {
	constructor(settings) {
		this._settings = settings;
	}

	async check() {
		let data = '';

		try {
			data = (await axios(this._settings.synctubeUrl)).data;
		}
		catch(e) {
			return false;
		}

		const $ = cheerio.load(data);
		const meta = $('meta[name="description"]');
		const content = meta.attr('content') || '';

		return content.indexOf('synchtube') >= 0;
	}
}

module.exports = Ping;
