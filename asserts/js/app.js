function setActiveLink(selector, subSelector) {
    $(selector).addClass('active').find('a').first()
        .css('background-color', '#ff8c00')
        .append('<span class="triangle"></span>');

    if (subSelector) {
        $(selector).find('a').trigger('click');
        $(subSelector).addClass('active');
    }
}

$(document).ready(function () {
    $(window)
        .resize(function () {
            $('.content').css('min-height', ($(window).height() - 46.5) + 'px');
        })
        .trigger('resize');

    $('i.arrow').closest('a').on('click', function (e) {
        e.preventDefault();
        $(this)
            .closest('li')
                .find('.sub-menu').slideToggle(200)
            .end()
                .find('i.arrow')
                .toggleClass('fa-angle-left')
                .toggleClass('fa-angle-down');
    });
});