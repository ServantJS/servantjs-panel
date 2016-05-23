function resetValidation(form) {
    $(form).validate().resetForm();
    $(form)
        .find('.has-danger').removeClass('has-danger')
        .end()
        .find('.form-control-danger').removeClass('form-control-danger');
}

function validateForm(form, rules, messages, callback) {
    form.validate({
        errorElement: 'span',
        errorClass: 'error-span',
        focusInvalid: false,

        rules: rules,
        messages: messages,

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
            element.closest('div').append(error);
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

function validateModal(modal, rules, messages, callback) {
    validateForm(modal.find('form'), rules, messages, callback);

    modal.on('.show.bs.modal', function () {
        resetValidation('#edit-setting-form');
    });
}