'use strict';

(function() {
	function ViewModel() {
		this.synctubeUrl = ko.observable(null);

		this.saveSettings = async function() {
			const synctubeUrl = this.synctubeUrl();
			await window.settings.setSynctubeUrl(synctubeUrl);
		};
	}

	document.addEventListener('DOMContentLoaded', async () => {
		const synctubeUrl = await window.settings.getSynctubeUrl();

		const viewModel = new ViewModel();
		viewModel.synctubeUrl(synctubeUrl);
		ko.applyBindings(viewModel);
	});
})();
