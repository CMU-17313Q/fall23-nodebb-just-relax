'use strict';

define('admin/modules/checkboxRowSelector', () => {
    const self = {};
    let $tableContainer;

    self.toggling = false;

    self.init = function (tableCssSelector) {
        $tableContainer = $(tableCssSelector);
        $tableContainer.on('change', 'input.checkbox-helper', handleChange);
    };

    self.updateAll = function () {
        $tableContainer.find('input.checkbox-helper').each((idx, element) => {
            self.updateState($(element));
        });
    };

    self.updateState = function ($checkboxElement) {
        if (self.toggling) {
            return;
        }

        const checkboxes = $checkboxElement.closest('tr').find('input:not([disabled]):visible').toArray();
        const $toggler = $(checkboxes.shift());
        const rowState = checkboxes.length && checkboxes.every(element => element.checked);
        $toggler.prop('checked', rowState);
    };

    function handleChange(ev) {
        const $checkboxElement = $(ev.target);
        toggleAll($checkboxElement);
    }

    function toggleAll($checkboxElement) {
        self.toggling = true;
        const state = $checkboxElement.prop('checked');
        $checkboxElement.closest('tr').find('input:not(.checkbox-helper):visible').each((idx, element) => {
            const $checkbox = $(element);
            if ($checkbox.prop('checked') === state) {
                return;
            }

            $checkbox.click();
        });
        self.toggling = false;
    }

    return self;
});
