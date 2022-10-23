const {contextBridge, ipcRenderer: ipc} = require('electron');

contextBridge.exposeInMainWorld('settings', {
	getSynctubeUrl: () => ipc.invoke('settings:get:synctubeUrl'),
	setSynctubeUrl: (synctubeUrl) => ipc.send('settings:set:synctubeUrl', synctubeUrl)
});
