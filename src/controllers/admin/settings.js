

const validator = require('validator');
const meta = require('../../meta');
const emailer = require('../../emailer');
const notifications = require('../../notifications');
const groups = require('../../groups');
const languages = require('../../languages');
const navigationAdmin = require('../../navigation/admin');
const social = require('../../social');
const helpers = require('../helpers');
const translator = require('../../translator');

const settingsController = module.exports;

settingsController.get = async function (request, res) {
    const term = request.params.term || 'general';
    res.render(`admin/settings/${term}`);
};

settingsController.email = async (request, res) => {
    const emails = await emailer.getTemplates(meta.config);

    res.render('admin/settings/email', {
        emails,
        sendable: emails.filter(e => !e.path.includes('_plaintext') && !e.path.includes('partials')).map(tpl => tpl.path),
        services: emailer.listServices(),
    });
};

settingsController.user = async (request, res) => {
    const notificationTypes = await notifications.getAllNotificationTypes();
    const notificationSettings = notificationTypes.map(type => ({
        name: type,
        label: `[[notifications:${type}]]`,
    }));
    res.render('admin/settings/user', {
        notificationSettings,
    });
};

settingsController.post = async (request, res) => {
    const groupData = await groups.getNonPrivilegeGroups('groups:createtime', 0, -1);
    res.render('admin/settings/post', {
        groupsExemptFromPostQueue: groupData,
    });
};

settingsController.advanced = async (request, res) => {
    const groupData = await groups.getNonPrivilegeGroups('groups:createtime', 0, -1);
    res.render('admin/settings/advanced', {
        groupsExemptFromMaintenanceMode: groupData,
    });
};

settingsController.languages = async function (request, res) {
    const languageData = await languages.list();
    for (const language of languageData) {
        language.selected = language.code === meta.config.defaultLang;
    }

    res.render('admin/settings/languages', {
        languages: languageData,
        autoDetectLang: meta.config.autoDetectLang,
    });
};

settingsController.navigation = async function (request, res) {
    const [admin, allGroups] = await Promise.all([
        navigationAdmin.getAdmin(),
        groups.getNonPrivilegeGroups('groups:createtime', 0, -1),
    ]);

    allGroups.sort((a, b) => b.system - a.system);

    admin.groups = allGroups.map(group => ({ name: group.name, displayName: group.displayName }));
    for (const [index, enabled] of admin.enabled.entries()) {
        enabled.index = index;
        enabled.selected = index === 0;
        enabled.title = translator.escape(enabled.title);
        enabled.text = translator.escape(enabled.text);
        enabled.dropdownContent = translator.escape(validator.escape(String(enabled.dropdownContent || '')));
        enabled.groups = admin.groups.map(group => ({
            displayName: group.displayName,
            selected: enabled.groups.includes(group.name),
        }));
    }

    for (const available of admin.available) {
        available.groups = admin.groups;
    }

    admin.navigation = [...admin.enabled];

    res.render('admin/settings/navigation', admin);
};

settingsController.homepage = async function (request, res) {
    const routes = await helpers.getHomePageRoutes(request.uid);
    res.render('admin/settings/homepage', { routes });
};

settingsController.social = async function (request, res) {
    const posts = await social.getPostSharing();
    res.render('admin/settings/social', {
        posts,
    });
};
