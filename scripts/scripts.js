
$(function() {

 // console.log('hi');

// menu highlight 



    // var offset1 = $('.portfolio').offset().top - 100;
    // var offset2 = $('.about').offset().top -100;
    // var offset3 = $('.contact').offset().top -100;
    // // var offset4 = $('.upcoming-events').offset().top -100;

    // $(document).on('scroll',function(){
    //     var iScrollTop = $(document).scrollTop();

    //     var activeLi;

    //     if(iScrollTop>=offset1 && iScrollTop<offset2){
    //         activeLi = $('.desktop-nav>li:nth-child(1)>a');
    //     }
    //     if(iScrollTop>=offset2 && iScrollTop<offset3){
    //         activeLi = $('.desktop-nav>li:nth-child(2)>a');
    //     }
    //     if(iScrollTop>=offset3 && iScrollTop<offset4){
    //         activeLi = $('.desktop-nav>li:nth-child(3)>a');
    //     }
    //     // if(iScrollTop>=offset4){
    //     //     activeLi = $('.desktop-nav>li:nth-child(4)>a');
    //     // }
    //     activeLi.addClass('active');
    //     $('.desktop-nav>li>a').not(activeLi)
    //                                 .removeClass('active');


    // });

    //sticky menu

    var menuOffset = $('.navigation').offset();
    $(document).on('scroll',function(){

        var iScrollTop = $(document).scrollTop();
        if(iScrollTop > menuOffset.top){
            console.log()
            //fix it
            $('.navigation').addClass('fixed');
            
        }else{
            //unfix it
            $('.navigation').removeClass('fixed');
        }

    });


        //smooth scrolling
    $('[data-to]').on('click',function(e){
        e.preventDefault();

        var sTarget = $(this).data('to');
        var targetOffsetTop = $(sTarget).offset().top;

        $('html,body').animate({scrollTop:targetOffsetTop - 70},1000);

    });


});

 












