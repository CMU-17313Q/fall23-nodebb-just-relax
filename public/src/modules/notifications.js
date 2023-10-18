'use strict';

define('notifications', [
    'translator',
    'components',
    'navigator',
    'tinycon',
    'hooks',
    'alerts',
], (translator, components, navigator, Tinycon, hooks, alerts) => {
    const Notifications = {};

    let unreadNotifs = {};

    const _addShortTimeagoString = ({ notifications: notifs }) => new Promise((resolve) => {
        translator.toggleTimeagoShorthand(() => {
            for (const notif of notifs) {
                notif.timeago = $.timeago(new Date(Number.parseInt(notif.datetime, 10)));
            }

            translator.toggleTimeagoShorthand();
            resolve({ notifications: notifs });
        });
    });
    hooks.on('filter:notifications.load', _addShortTimeagoString);

    Notifications.loadNotifications = function (notifList, callback) {
        callback = callback || function () {};
        socket.emit('notifications.get', null, (error, data) => {
            if (error) {
                return alerts.error(error);
            }

            const notifs = data.unread.concat(data.read).sort((a, b) => (Number.parseInt(a.datetime, 10) > Number.parseInt(b.datetime, 10) ? -1 : 1));

            hooks.fire('filter:notifications.load', { notifications: notifs }).then(({ notifications }) => {
                app.parseAndTranslate('partials/notifications_list', { notifications }, (html) => {
                    notifList.html(html);
                    notifList.off('click').on('click', '[data-nid]', function (ev) {
                        const notifElement = $(this);
                        if (scrollToPostIndexIfOnPage(notifElement)) {
                            ev.stopPropagation();
                            ev.preventDefault();
                            components.get('notifications/list').dropdown('toggle');
                        }

                        const unread = notifElement.hasClass('unread');
                        if (!unread) {
                            return;
                        }

                        const nid = notifElement.attr('data-nid');
                        markNotification(nid, true);
                    });
                    components.get('notifications').on('click', '.mark-all-read', Notifications.markAllRead);

                    notifList.on('click', '.mark-read', function () {
                        const liElement = $(this).parents('li');
                        const unread = liElement.hasClass('unread');
                        const nid = liElement.attr('data-nid');
                        markNotification(nid, unread, () => {
                            liElement.toggleClass('unread');
                        });
                        return false;
                    });

                    hooks.fire('action:notifications.loaded', {
                        notifications: notifs,
                        list: notifList,
                    });
                    callback();
                });
            });
        });
    };

    Notifications.onNewNotification = function (notifData) {
        if (ajaxify.currentPage === 'notifications') {
            ajaxify.refresh();
        }

        socket.emit('notifications.getCount', (error, count) => {
            if (error) {
                return alerts.error(error);
            }

            Notifications.updateNotifCount(count);
        });

        if (!unreadNotifs[notifData.nid]) {
            unreadNotifs[notifData.nid] = true;
        }
    };

    function markNotification(nid, read, callback) {
        socket.emit('notifications.mark' + (read ? 'Read' : 'Unread'), nid, (error) => {
            if (error) {
                return alerts.error(error);
            }

            if (read && unreadNotifs[nid]) {
                delete unreadNotifs[nid];
            }

            if (callback) {
                callback();
            }
        });
    }

    function scrollToPostIndexIfOnPage(notifElement) {
        // Scroll to index if already in topic (gh#5873)
        const pid = notifElement.attr('data-pid');
        const path = notifElement.attr('data-path');
        const postElement = components.get('post', 'pid', pid);
        if (path.startsWith(config.relative_path + '/post/') && pid && postElement.length > 0 && ajaxify.data.template.topic) {
            navigator.scrollToIndex(postElement.attr('data-index'), true);
            return true;
        }

        return false;
    }

    Notifications.updateNotifCount = function (count) {
        const notifIcon = components.get('notifications/icon');
        count = Math.max(0, count);
        if (count > 0) {
            notifIcon.removeClass('fa-bell-o').addClass('fa-bell');
        } else {
            notifIcon.removeClass('fa-bell').addClass('fa-bell-o');
        }

        notifIcon.toggleClass('unread-count', count > 0);
        notifIcon.attr('data-content', count > 99 ? '99+' : count);

        const payload = {
            count,
            updateFavicon: true,
        };
        hooks.fire('action:notification.updateCount', payload);

        if (payload.updateFavicon) {
            Tinycon.setBubble(count > 99 ? '99+' : count);
        }

        if (navigator.setAppBadge) { // Feature detection
            navigator.setAppBadge(count);
        }
    };

    Notifications.markAllRead = function () {
        socket.emit('notifications.markAllRead', (error) => {
            if (error) {
                alerts.error(error);
            }

            unreadNotifs = {};
        });
    };

    return Notifications;
});
