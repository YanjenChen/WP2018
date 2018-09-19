$(window).bind("load", function() {
    var slider = $('.interest-collection');
    var positions = initSlider(slider),
        lenth = positions.lenth,
        first = positions.first,
        second = positions.second,
        third = positions.third,
        third_last = positions.third_last,
        second_last = positions.second_last,
        last = positions.last;

    slider.find('.collection-items').click(function() {
        var target_position = $(this).attr('item-id');
        var current_position = slider.find('.activated').attr('item-id');
        slider.find('.activated').toggleClass('activated');
        $('.interest-list .activated').toggleClass('activated');

        switch (target_position) {
            // Swap to real item position
            case 'c1':
            case 'c2':
            case 'c' + second_last.attr('item-id'):
            case 'c' + last.attr('item-id'):
                slider.css('transform', 'translateX(' + getSlideDistance(slider, slider.find("[item-id='c" + current_position + "']")).toString() + 'px)');
                $('.interest-list li:nth-child(' + target_position.replace('c', '') + ')').toggleClass('activated');
                animateSlider(slider, getSlideDistance(slider, slider.find("[item-id='" + target_position.replace('c', '') + "']")));
                slider.find("[item-id='" + target_position.replace('c', '') + "']").toggleClass('activated');
                break;
            default:
                $('.interest-list li:nth-child(' + target_position + ')').toggleClass('activated');
                animateSlider(slider, getSlideDistance(slider, $(this)));
                $(this).toggleClass('activated');
        }
    });
});

function initSlider(selector) {
    var collection = selector,
        items = collection.find('.collection-items'),
        lenth = items.length,
        first = items.filter(':first'),
        second = items.filter(':nth-child(2)'),
        third = items.filter(':nth-child(3)'),
        third_last = items.filter(':nth-child(' + (lenth - 2).toString() + ')'),
        second_last = items.filter(':nth-child(' + (lenth - 1).toString() + ')'),
        last = items.filter(':last');

    new Promise((res, rej) => {
        // Copy last 3 items to the front
        third_last.clone().attr('item-id', 'c' + third_last.attr('item-id')).insertBefore(first);
        second_last.clone().attr('item-id', 'c' + second_last.attr('item-id')).insertBefore(first);
        last.clone().attr('item-id', 'c' + last.attr('item-id')).insertBefore(first);
        // Copy first 3 items to the end
        third.clone().attr('item-id', 'c' + third.attr('item-id')).insertAfter(last);
        second.clone().attr('item-id', 'c' + second.attr('item-id')).insertAfter(last);
        first.clone().attr('item-id', 'c' + first.attr('item-id')).insertAfter(last);
        res();
    }).then(() => {
        // Center first item to middle of mask
        var distance = getSlideDistance(collection, first);
        first.toggleClass('activated');
        $('.interest-list li:first').toggleClass('activated');
        animateSlider(collection, distance);
    });

    return {
        lenth: lenth,
        first: first,
        second: second,
        third: third,
        third_last: third_last,
        second_last: second_last,
        last: last
    };
};

function getSlideDistance(slider, item) {
    return (slider.width() - 2 * item.position().left - item.outerWidth(true)) / 2;
};

function animateSlider(selector, distance) {
    var posx = getPosx(selector);

    $(selector).animate({
        'margin-left': (distance - posx).toString()
    }, function() {
        $(this).css('transform', 'translateX(' + distance.toString() + 'px)')
            .css('margin-left', '0');
    });
};

function getPosx(selector) {
    var posx = $(selector).css('transform');
    if (posx == 'none')
        posx = 0;
    else
        posx = Number(posx.split(/[()]/)[1].split(',')[4]);
    return posx;
};