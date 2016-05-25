function resetValidation(form) {
    $(form).validate().resetForm();
    $(form)
        .find('.has-danger').removeClass('has-danger')
        .end()
        .find('.form-control-danger').removeClass('form-control-danger');
}

function validateForm(options, form, rules, callback) {
    options = options || {};
    var place = options.errorPlace || 'div';
    
    form.validate({
        errorElement: 'span',
        errorClass: 'error-span',
        focusInvalid: false,

        rules: rules,

        highlight: function (element) {
            $(element)
                .addClass('form-control-danger')
                .closest('.form-group').addClass('has-danger');
        },

        success: function (label) {
            label
                .closest('.form-group')
                .removeClass('has-danger')
                .find('input')
                .removeClass('form-control-danger');
            label.remove();
        },

        errorPlacement: function (error, element) {
            element.closest(place).append(error);
        },

        submitHandler: function (form) {
            callback();
        }
    });

    form.find('input').keypress(function (e) {
        if (e.which == 13) {
            if (form.validate().form()) {
                callback();
            }

            return false;
        }
    });
}

function validateModal(options, modal, rules, messages, callback) {
    validateForm(options, modal.find('form'), rules, messages, callback);

    modal.on('.show.bs.modal', function () {
        resetValidation('#edit-setting-form');
    });
}