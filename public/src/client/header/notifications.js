'use strict';

define('forum/header/notifications', ['components'], components => {
	const notifications = {};

	notifications.prepareDOM = function () {
		const notifContainer = components.get('notifications');
		const notifTrigger = notifContainer.children('a');
		const notifList = components.get('notifications/list');

		notifTrigger.on('click', e => {
			e.preventDefault();
			if (notifContainer.hasClass('open')) {
				return;
			}

			requireAndCall('loadNotifications', notifList);
		});

		if (notifTrigger.parents('.dropdown').hasClass('open')) {
			requireAndCall('loadNotifications', notifList);
		}

		socket.removeListener('event:new_notification', onNewNotification);
		socket.on('event:new_notification', onNewNotification);

		socket.removeListener('event:notifications.updateCount', onUpdateCount);
		socket.on('event:notifications.updateCount', onUpdateCount);
	};

	function onNewNotification(data) {
		requireAndCall('onNewNotification', data);
	}

	function onUpdateCount(data) {
		requireAndCall('updateNotifCount', data);
	}

	function requireAndCall(method, parameter) {
		require(['notifications'], notifications => {
			notifications[method](parameter);
		});
	}

	return notifications;
});
