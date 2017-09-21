window.sr = ScrollReveal({
    reset: true
});

sr.reveal('.page', {
    duration: 1500,
    reset: true,
    viewFactor: 0.3
});

$(document).ready(function(){
    // gives elements in mobile nav to desktop nav
    $('#nav-desktop').html($('#nav-mobile').html());
    // nav button is clicked
    $('#nav-button').click(function(){
        // check if list has "expanded" class
        if ($('#nav-mobile ul').hasClass('expanded')) {
            // remove "expanded" class and close menu
            $('#nav-mobile ul.expanded').removeClass('expanded').slideUp(250);
            // remove "open" class from nav button
            $(this).removeClass('open');
        } else {
            // add "expanded" class and open menu
            $('#nav-mobile ul').addClass('expanded').slideDown(250);
            // add "open" class to nav button
            $(this).addClass('open');
        }
    });
}); 
