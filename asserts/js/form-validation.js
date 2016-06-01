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
    var elementErrorClass = options.elementErrorClass || 'form-control-danger';
    
    form.validate({
        errorElement: 'span',
        errorClass: 'error-span',
        focusInvalid: false,

        rules: rules,

        highlight: function (element) {
            $(element)
                .addClass(elementErrorClass)
                .closest('.form-group').addClass('has-danger');
        },

        success: function (label) {
            label
                .closest('.form-group')
                .removeClass('has-danger')
                .find('input')
                .removeClass(elementErrorClass);
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

function validateModal(options, modal, rules, callback) {
    validateForm(options, modal.find('form'), rules, callback);

    modal.on('show.bs.modal', function () {
        modal.find('input[type="text"]').each(function () {this.value = ''});
        modal.find('input[type="checkbox"]').each(function () {this.checked = false});
        modal.find('textarea').each(function () {this.value = ''});

        resetValidation(modal.find('form'));
    });
}