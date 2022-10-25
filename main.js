const path = require('path');
const ICON_PATH = path.join(__dirname, 'icon.png');
const ICON_UP_PATH = path.join(__dirname, 'icon-up.png');
const ICON_DOWN_PATH = path.join(__dirname, 'icon-down.png');

const { app } = require('electron')
if (require('electron-squirrel-startup')) return app.quit();

const Settings = require('./settings');
const Ping = require('./ping');
const MainWindow = require('./main-window');
const TrayIcon = require('./tray-icon');
const Ipc = require('./ipc');
const Timer = require('./timer');

let tray = null;
let animationToggle = false;

const settings = new Settings();
const ping = new Ping(settings);

const checkTimer = new Timer();
checkTimer.interval = 30 * 60 * 1000;
checkTimer.callback = pingSite;

const animationTimer = new Timer();
animationTimer.interval = 1000;
animationTimer.callback = () => {
	if (animationToggle) {
		tray.icon = ICON_PATH;
		animationToggle = false;
	}
	else {
		tray.icon = ICON_DOWN_PATH;
		animationToggle = true;
	}
};

async function pingSite() {
	const isUp = await ping.check();
	tray.tooltip = isUp ? 'NCTV is up' : 'NCTV is down';
	tray.icon = isUp ? ICON_UP_PATH : ICON_DOWN_PATH;

	if (!isUp) {
		checkTimer.stop();
		checkTimer.interval = 10000;
		checkTimer.start();

		animationToggle = false;
		animationTimer.start();
	}
	else if (animationTimer) {
		animationTimer.stop();

		checkTimer.stop();
		checkTimer.interval = 60 * 60 * 1000;
		checkTimer.start();
	}
}

function setupIpc() {
	const ipc = new Ipc();
	ipc.getSynctubeUrl = () => settings.synctubeUrl;

	ipc.setSynctubeUrl = async (synctubeUrl) => {
		settings.synctubeUrl = synctubeUrl;

		checkTimer.stop();
		await pingSite();
		checkTimer.start();
	};
}

app.whenReady().then(async () => {
	const win = new MainWindow();
	tray = new TrayIcon(win);

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})

	setupIpc();
	await pingSite();
	checkTimer.start();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
