function setActiveLink(selector, subSelector) {
    $(selector).addClass('active').find('a').first()
        .css('background-color', '#ff8c00')
        .append('<span class="triangle"></span>');

    if (subSelector) {
        $(selector).find('a').trigger('click');
        $(subSelector).addClass('active');
    }
}

function onDeleteBtnClick(btn, data, title, onSuccess) {
    data = data || {};
    data._csrf = _csrf;
    
    if (!confirm(title)) {
        return;
    }
    
    var $elem = $(btn);
    $elem.addClass('disabled');

    $.ajax({
        url: $elem.attr('href'),
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrow) {
            $elem.removeClass('disabled');
            alert(XMLHttpRequest + '\n' + textStatus + '\n' + errorThrow);
        },
        success: function (result) {
            if (onSuccess) {
                onSuccess(result);
            }

            $elem.removeClass('disabled');
        }
    });
}

$(document).ready(function () {
    $(window)
        .resize(function () {
            $('.content').css('min-height', ($(window).height() - 46.5) + 'px');
        })
        .trigger('resize');

    $('i.arrow').closest('a').on('click', function (e) {
        e.preventDefault();

        if (!$(this).closest('li').hasClass('is-active') && $('li.is-active').length) {
            $('.is-active > a').trigger('click');
        }

        $(this)
            .closest('li')
                .toggleClass('is-active')
                .find('.sub-menu').slideToggle(200)
            .end()
                .find('i.arrow')

                .toggleClass('fa-angle-left')
                .toggleClass('fa-angle-down');
    });

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": 'toast-top-right',
        "onclick": null,
        "showDuration": 1000,
        "hideDuration": 1000,
        "timeOut": 7000,
        "extendedTimeOut": 1000,
        "showEasing": 'swing',
        "hideEasing": 'linear',
        "showMethod": 'fadeIn',
        "hideMethod": 'fadeOut'
    };
});