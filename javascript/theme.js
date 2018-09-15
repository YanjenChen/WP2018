$(function() {
    var supportedFlag = $.keyframe.isSupported();

    initSlider();
});

function initSlider() {
    var collection = $('.interest-collection'),
        items = collection.find('img'),
        lenth = items.length,
        first = items.filter(':first'),
        second = items.filter(':nth-child(2)'),
        second_last = items.filter(':nth-child(' + (lenth - 1).toString() + ')'),
        last = items.filter(':last');

    // Copy last 2 items to the front
    second_last.clone().attr('item-id', 'c_second_last').insertBefore(first);
    last.clone().attr('item-id', 'c_last').insertBefore(first);
    // Copy first 2 items to the end
    second.clone().attr('item-id', 'c_second').insertAfter(last);
    first.clone().attr('item-id', 'c_first').insertAfter(last);
    // Center first item to middle of mask
    console.log(first.position().left);
    console.log(first.outerWidth(true));
    console.log(collection.width());
    animateSlider(collection, 0);
};

function animateSlider(selector, distance) {
    var posx = $(selector).css('transform');
    if (posx == 'none')
        posx = 0;
    else
        posx = Number(posx.split(/[()]/)[1].split(',')[4]);
    console.log(posx);
    $.keyframe.define([{
        name: 'scroll-collection',
        '0%': {
            'transform': 'translateX(' + posx.toString() + 'px)'
        },
        '100%': {
            'transform': 'translateX(' + distance.toString() + 'px)'
        }
    }]);
    $(selector).playKeyframe({
        name: 'scroll-collection', // name of the keyframe you want to bind to the selected element
        duration: '1s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
        fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
        complete: function() {} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
    });
};