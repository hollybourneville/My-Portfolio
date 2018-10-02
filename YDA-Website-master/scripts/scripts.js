$(function() {

    // Open and close nav on mobile
    $('.bars').on('click', function(e) {

        var navData = $('.navigation').data('nav');

        e.stopPropagation();

        if (navData == 'close') {
            $('.navigation').addClass('nav-open')
                .data('nav', 'open')

            $('.bars>i').first().removeClass('fas fa-bars')
                .addClass('fas fa-times');

            $('.heading,.sub-heading').addClass('text-hide');
        } else {
            $('.navigation').removeClass('nav-open')
                .data('nav', 'close');
            $('.bars>i').removeClass('fas fa-times')
                .addClass('fas fa-bars');

            $('.heading,.sub-heading').removeClass('text-hide');
        }
    });

    //Staff Gallery
    let key = 'IuFvFQ4A5CUDOm6XyKKvzFOccCApTNNZ';

    var users = ['andrewcouldwell', 'AlexSeagull', 'juliettewang']

    var projectHTML = $('#staffProfileTemplate').text();
    var projectTemplate = Template7(projectHTML).compile();

    if ($('#index').length > 0) {

        //animation of hero home

        var typed = new Typed('#finished', {
            strings: ['A Digital Design Agency','We build winning brands'],
            showCursor: false,
            startDelay: 1000,
            backDelay: 2000,
            backSpeed:60,
            typeSpeed:60,
            loop: true,
            loopCount: Infinity
        });

        var referredParams = new URLSearchParams(window.location.search);

        var isReffered = referredParams.get('referred')

        if(isReffered == 'staff'){

            let sTarget = $('.staff-profiles');
            let targetOffsetTop = $(sTarget).offset().top - 100;

            $('html,body').animate({scrollTop:targetOffsetTop}, 1000);

        }

        _(users).each(function(username){
            var profileUrl = 'https://api.behance.net/v2/users/'+ username +'/?client_id=' + key;

            $.ajax({
                url: profileUrl,
                dataType: 'jsonp',
                success: function(res){

                    console.log(res);

                    let output = projectTemplate(res);
                    $('.l_column_container').append(output);
                }
            })
        });
    }

    if ($('#staff').length > 0) {

        var staffHeroHTML = $('#staffHeroTemplate').text();
        var staffHeroTemplate = Template7(staffHeroHTML).compile();

        var urlParams = new URLSearchParams(window.location.search);

        var staffID = urlParams.get('id')

        console.log(staffID);

        var staffUrlProjects = 'https://api.behance.net/v2/users/'+ staffID +'/projects?client_id=' + key;
        var staffUrl = 'https://api.behance.net/v2/users/'+ staffID +'?client_id=' + key;

        $.ajax({
            url: staffUrl,
            dataType: 'jsonp',
            success: function(res) {

                var fields = res.user.fields;

                var fieldsOutput = _(fields).reduce(function(output,item,i,l){ 

                    return i<(l.length-1)? output+ item + ', ' : output+ item;

                },'')

                $('.fields-work').html(fieldsOutput);
                var section = res.user.sections;

                var text = section[Object.keys(section)[0]];

                $('.staff-bio-inner').html(text);

                console.log(res.user.fields);
                console.log(res);

                let output = staffHeroTemplate(res);
                $('.hero').append(output);


                $('.staff-hero-fields').html(fieldsOutput);
            }
        });

        $.ajax({
            url: staffUrlProjects,
            dataType: 'jsonp',
            success: function(res) {

                var userProjects = res;
                _(res.projects).each(function(project) {

                    $('<div class="staff-work-tile"><div class="staff-work-image" style="background-image: url('+ project.covers.original +');"> </div>' + '<div class="tile-title"> <span>' + project.name + '</span></div></div>').appendTo('.staff-work');
                });

                console.log(res);

                $('.hero').css('background-image', 'url('+ res.projects["0"].covers.original+ ')')
            }
        });
    }

    //Smooth Scrolling

    $('[data-to]').on('click',function(e){
        e.preventDefault();

        let sTarget = $(this).data('to');
        let targetOffsetTop = $(sTarget).offset().top - 100;

        $('html,body').animate({scrollTop:targetOffsetTop}, 1000);

    });





});