'use strict';

define('admin/advanced/logs', ['alerts'], alerts => {
	const Logs = {};

	Logs.init = function () {
		const logsElement = $('.logs pre');
		logsElement.scrollTop(logsElement.prop('scrollHeight'));
		// Affix menu
		$('.affix').affix();

		$('.logs').find('button[data-action]').on('click', function () {
			const btnElement = $(this);
			const action = btnElement.attr('data-action');

			switch (action) {
				case 'reload': {
					socket.emit('admin.logs.get', (error, logs) => {
						if (error) {
							alerts.error(error);
						} else {
							logsElement.text(logs);
							logsElement.scrollTop(logsElement.prop('scrollHeight'));
						}
					});
					break;
				}

				case 'clear': {
					socket.emit('admin.logs.clear', error => {
						if (error) {
							alerts.error(error);
						} else {
							alerts.success('[[admin/advanced/logs:clear-success]]');
							btnElement.prev().click();
						}
					});
					break;
				}
			}
		});
	};

	return Logs;
});
