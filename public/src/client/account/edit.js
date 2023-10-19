'use strict';

define('forum/account/edit', [
    'forum/account/header',
    'accounts/picture',
    'translator',
    'api',
    'hooks',
    'bootbox',
    'alerts',
], (header, picture, translator, api, hooks, bootbox, alerts) => {
    const AccountEdit = {};

    AccountEdit.init = function () {
        header.init();

        $('#submitBtn').on('click', updateProfile);

        if (ajaxify.data.groupTitleArray.length === 1 && ajaxify.data.groupTitleArray[0] === '') {
            $('#groupTitle option[value=""]').attr('selected', true);
        }

        handleImageChange();
        handleAccountDelete();
        handleEmailConfirm();
        updateSignature();
        updateAboutMe();
        handleGroupSort();
    };

    function updateProfile() {
        const userData = $('form[component="profile/edit/form"]').serializeObject();
        userData.uid = ajaxify.data.uid;
        userData.groupTitle = userData.groupTitle || '';
        userData.groupTitle = JSON.stringify(
            Array.isArray(userData.groupTitle) ? userData.groupTitle : [userData.groupTitle]
        );

        hooks.fire('action:profile.update', userData);

        api.put('/users/' + userData.uid, userData).then((result) => {
            alerts.success('[[user:profile_update_success]]');

            if (result.picture) {
                $('#user-current-picture').attr('src', result.picture);
            }

            picture.updateHeader(result.picture);
        }).catch(alerts.error);

        return false;
    }

    function handleImageChange() {
        $('#changePictureBtn').on('click', () => {
            picture.openChangeModal();
            return false;
        });
    }

    function handleAccountDelete() {
        $('#deleteAccountBtn').on('click', () => {
            translator.translate('[[user:delete_account_confirm]]', (translated) => {
                const modal = bootbox.confirm(translated + '<p><input type="password" class="form-control" id="confirm-password" /></p>', (confirm) => {
                    if (!confirm) {
                        return;
                    }

                    const confirmBtn = modal.find('.btn-primary');
                    confirmBtn.html('<i class="fa fa-spinner fa-spin"></i>');
                    confirmBtn.prop('disabled', true);
                    api.del(`/users/${ajaxify.data.uid}/account`, {
                        password: $('#confirm-password').val(),
                    }, (error) => {
                        function restoreButton() {
                            translator.translate('[[modules:bootbox.confirm]]', (confirmText) => {
                                confirmBtn.text(confirmText);
                                confirmBtn.prop('disabled', false);
                            });
                        }

                        if (error) {
                            restoreButton();
                            return alerts.error(error);
                        }

                        confirmBtn.html('<i class="fa fa-check"></i>');
                        window.location.href = `${config.relative_path}/`;
                    });

                    return false;
                });

                modal.on('shown.bs.modal', () => {
                    modal.find('input').focus();
                });
            });
            return false;
        });
    }

    function handleEmailConfirm() {
        $('#confirm-email').on('click', function () {
            const btn = $(this).attr('disabled', true);
            socket.emit('user.emailConfirm', {}, (error) => {
                btn.removeAttr('disabled');
                if (error) {
                    return alerts.error(error);
                }

                alerts.success('[[notifications:email-confirm-sent]]');
            });
        });
    }

    function getCharsLeft(element, max) {
        return element.length > 0 ? '(' + element.val().length + '/' + max + ')' : '';
    }

    function updateSignature() {
        const element = $('#signature');
        $('#signatureCharCountLeft').html(getCharsLeft(element, ajaxify.data.maximumSignatureLength));

        element.on('keyup change', () => {
            $('#signatureCharCountLeft').html(getCharsLeft(element, ajaxify.data.maximumSignatureLength));
        });
    }

    function updateAboutMe() {
        const element = $('#aboutme');
        $('#aboutMeCharCountLeft').html(getCharsLeft(element, ajaxify.data.maximumAboutMeLength));

        element.on('keyup change', () => {
            $('#aboutMeCharCountLeft').html(getCharsLeft(element, ajaxify.data.maximumAboutMeLength));
        });
    }

    function handleGroupSort() {
        function move(direction) {
            const selected = $('#groupTitle').val();
            if (!ajaxify.data.allowMultipleBadges || (Array.isArray(selected) && selected.length > 1)) {
                return;
            }

            const element = $('#groupTitle').find(':selected');
            if (element.length > 0 && element.val()) {
                if (direction > 0) {
                    element.insertAfter(element.next());
                } else if (element.prev().val()) {
                    element.insertBefore(element.prev());
                }
            }
        }

        $('[component="group/order/up"]').on('click', () => {
            move(-1);
        });
        $('[component="group/order/down"]').on('click', () => {
            move(1);
        });
    }

    return AccountEdit;
});
