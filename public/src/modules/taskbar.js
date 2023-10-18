'use strict';

define('taskbar', ['benchpress', 'translator', 'hooks'], (Benchpress, translator, hooks) => {
    const taskbar = {};

    taskbar.init = function () {
        const self = this;

        Benchpress.render('modules/taskbar', {}).then((html) => {
            self.taskbar = $(html);
            self.tasklist = self.taskbar.find('ul');
            $(document.body).append(self.taskbar);

            self.taskbar.on('click', 'li', async function () {
                const $btn = $(this);
                const moduleName = $btn.attr('data-module');
                const uuid = $btn.attr('data-uuid');

                const module = await app.require(moduleName);
                if ($btn.hasClass('active')) {
                    module.minimize(uuid);
                } else {
                    minimizeAll();
                    module.load(uuid);
                    taskbar.toggleNew(uuid, false);

                    taskbar.tasklist.removeClass('active');
                    $btn.addClass('active');
                }

                return false;
            });
        });

        $(window).on('action:app.loggedOut', () => {
            taskbar.closeAll();
        });
    };

    taskbar.close = async function (moduleName, uuid) {
        // Sends signal to the appropriate module's .close() fn (if present)
        const btnElement = taskbar.tasklist.find('[data-module="' + module + '"][data-uuid="' + uuid + '"]');
        let fnName = 'close';

        // TODO: Refactor chat module to not take uuid in close instead of by jQuery element
        if (moduleName === 'chat') {
            fnName = 'closeByUUID';
        }

        if (btnElement.length > 0) {
            const module = await app.require(moduleName);
            if (module && typeof module[fnName] === 'function') {
                module[fnName](uuid);
            }
        }
    };

    taskbar.closeAll = function (module) {
        // Module is optional
        let selector = '[data-uuid]';

        if (module) {
            selector = '[data-module="' + module + '"]' + selector;
        }

        taskbar.tasklist.find(selector).each((idx, element) => {
            taskbar.close(module || element.dataset.module, element.dataset.uuid);
        });
    };

    taskbar.discard = function (module, uuid) {
        const btnElement = taskbar.tasklist.find('[data-module="' + module + '"][data-uuid="' + uuid + '"]');
        btnElement.remove();

        update();
    };

    taskbar.push = function (module, uuid, options, callback) {
        callback = callback || function () {};
        const element = taskbar.tasklist.find('li[data-uuid="' + uuid + '"]');

        const data = {
            module,
            uuid,
            options,
            element,
        };

        hooks.fire('filter:taskbar.push', data);

        if (element.length === 0 && data.module) {
            createTaskbarItem(data, callback);
        } else {
            callback(element);
        }
    };

    taskbar.get = function (module) {
        const items = $('[data-module="' + module + '"]').map((idx, element) => $(element).data());

        return items;
    };

    taskbar.minimize = function (module, uuid) {
        const btnElement = taskbar.tasklist.find('[data-module="' + module + '"][data-uuid="' + uuid + '"]');
        btnElement.toggleClass('active', false);
    };

    taskbar.toggleNew = function (uuid, state, silent) {
        const btnElement = taskbar.tasklist.find('[data-uuid="' + uuid + '"]');
        btnElement.toggleClass('new', state);

        if (!silent) {
            hooks.fire('action:taskbar.toggleNew', uuid);
        }
    };

    taskbar.updateActive = function (uuid) {
        const tasks = taskbar.tasklist.find('li');
        tasks.removeClass('active');
        tasks.filter('[data-uuid="' + uuid + '"]').addClass('active');

        $('[data-uuid]:not([data-module])').toggleClass('modal-unfocused', true);
        $('[data-uuid="' + uuid + '"]:not([data-module])').toggleClass('modal-unfocused', false);
    };

    taskbar.isActive = function (uuid) {
        const taskBtn = taskbar.tasklist.find('li[data-uuid="' + uuid + '"]');
        return taskBtn.hasClass('active');
    };

    function update() {
        const tasks = taskbar.tasklist.find('li');

        if (tasks.length > 0) {
            taskbar.taskbar.attr('data-active', '1');
        } else {
            taskbar.taskbar.removeAttr('data-active');
        }
    }

    function minimizeAll() {
        taskbar.tasklist.find('.active').removeClass('active');
    }

    function createTaskbarItem(data, callback) {
        translator.translate(data.options.title, (taskTitle) => {
            const title = $('<div></div>').text(taskTitle || 'NodeBB Task').html();

            const taskbarElement = $('<li></li>')
                .addClass(data.options.className)
                .html('<a href="#"' + (data.options.image ? ' style="background-image: url(\'' + data.options.image.replaceAll('&#x2F;', '/') + '\'); background-size: cover;"' : '') + '>' +
                    (data.options.icon ? '<i class="fa ' + data.options.icon + '"></i> ' : '') +
                    '<span aria-label="' + title + '" component="taskbar/title">' + title + '</span>' +
                    '</a>')
                .attr({
                    title,
                    'data-module': data.module,
                    'data-uuid': data.uuid,
                })
                .addClass(data.options.state === undefined ? 'active' : data.options.state);

            if (!data.options.state || data.options.state === 'active') {
                minimizeAll();
            }

            taskbar.tasklist.append(taskbarElement);
            update();

            data.element = taskbarElement;

            taskbarElement.data(data);
            hooks.fire('action:taskbar.pushed', data);
            callback(taskbarElement);
        });
    }

    const processUpdate = function (element, key, value) {
        switch (key) {
        case 'title': {
            element.find('[component="taskbar/title"]').text(value);
            break;
        }

        case 'icon': {
            element.find('i').attr('class', 'fa fa-' + value);
            break;
        }

        case 'image': {
            element.find('a').css('background-image', value ? 'url("' + value.replaceAll('&#x2F;', '/') + '")' : '');
            break;
        }

        case 'background-color': {
            element.find('a').css('background-color', value);
            break;
        }
        }
    };

    taskbar.update = function (module, uuid, options) {
        const element = taskbar.tasklist.find('[data-module="' + module + '"][data-uuid="' + uuid + '"]');
        if (element.length === 0) {
            return;
        }

        const data = element.data();

        for (const key of Object.keys(options)) {
            data[key] = options[key];
            processUpdate(element, key, options[key]);
        }

        element.data(data);
    };

    return taskbar;
});
