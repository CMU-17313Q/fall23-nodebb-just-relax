'use strict';

define('forum/topic/delete-posts', [
	'postSelect', 'alerts', 'api',
], (postSelect, alerts, api) => {
	const DeletePosts = {};
	let modal;
	let deleteBtn;
	let purgeBtn;
	let tid;

	DeletePosts.init = function () {
		tid = ajaxify.data.tid;

		$(window).off('action:ajaxify.end', onAjaxifyEnd).on('action:ajaxify.end', onAjaxifyEnd);

		if (modal) {
			return;
		}

		app.parseAndTranslate('partials/delete_posts_modal', {}, html => {
			modal = html;

			$('body').append(modal);

			deleteBtn = modal.find('#delete_posts_confirm');
			purgeBtn = modal.find('#purge_posts_confirm');

			modal.find('.close,#delete_posts_cancel').on('click', closeModal);

			postSelect.init(() => {
				checkButtonEnable();
				showPostsSelected();
			});
			showPostsSelected();

			deleteBtn.on('click', () => {
				deletePosts(deleteBtn, pid => `/posts/${pid}/state`);
			});
			purgeBtn.on('click', () => {
				deletePosts(purgeBtn, pid => `/posts/${pid}`);
			});
		});
	};

	function onAjaxifyEnd() {
		if (ajaxify.data.template.name !== 'topic' || ajaxify.data.tid !== tid) {
			closeModal();
			$(window).off('action:ajaxify.end', onAjaxifyEnd);
		}
	}

	function deletePosts(btn, route) {
		btn.attr('disabled', true);
		Promise.all(postSelect.pids.map(pid => api.delete(route(pid), {})))
			.then(closeModal)
			.catch(alerts.error)
			.finally(() => {
				btn.removeAttr('disabled');
			});
	}

	function showPostsSelected() {
		if (postSelect.pids.length > 0) {
			modal.find('#pids').translateHtml('[[topic:fork_pid_count, ' + postSelect.pids.length + ']]');
		} else {
			modal.find('#pids').translateHtml('[[topic:fork_no_pids]]');
		}
	}

	function checkButtonEnable() {
		if (postSelect.pids.length > 0) {
			deleteBtn.removeAttr('disabled');
			purgeBtn.removeAttr('disabled');
		} else {
			deleteBtn.attr('disabled', true);
			purgeBtn.attr('disabled', true);
		}
	}

	function closeModal() {
		if (modal) {
			modal.remove();
			modal = null;
			postSelect.disable();
		}
	}

	return DeletePosts;
});
