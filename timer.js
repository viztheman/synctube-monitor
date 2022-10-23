class Timer {
	constructor() {
		this._callback = () => {};
		this._interval = 60 * 1000;
		this._timer = null;
	}

	set callback(value) {
		this._callback = value;
	}

	get interval() {
		return this._interval;
	}

	set interval(value) {
		this._interval = value;
	}

	start() {
		if (!this._timer)
			this._timer = setInterval(() => this._callback(), this._interval);
	}

	stop() {
		if (this._timer) {
			clearInterval(this._timer);
			this._timer = null;
		}
	}
}

module.exports = Timer;
