jQuery(document).ready(function ($) {
    'use strict';

    var $card = $('.card');

    //var qui gère le temps entre 2 blocs
    var timeEach = 100;
    //fonction d'underscore qui limite le nb d'appels selon le temps défini (190 ici)
    var callback = _.throttle(function () {
        var indexVisible = 0;
        var indexInvisible = 0;
        $card.each(function () {
            if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).hasClass('is-hidden')) {
                var $this = $(this);
                setTimeout(function () {
                    //pour chaque index de notre élément, il multiplie le chiffre de l'indexVisible par le temps défini
                    $this.removeClass('is-hidden');
                }, indexVisible * timeEach);
                indexVisible++;
            }
            else if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75 && !$(this).hasClass('is-hidden')) {
                var $this = $(this);
                setTimeout(function () {
                    //pour chaque index de notre élément, il multiplie le chiffre de l'indexInvisible par le temps défini
                    $this.addClass('is-hidden');
                }, indexInvisible * timeEach);
                indexInvisible++;
            }
        });
    }, 190)
    $(window).on('scroll', callback)
});