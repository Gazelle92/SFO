$(document).ready(function(){

  $("#footer").load("footer.html");
  $("#header").load("header.html", function () {
    $('.gnb-inner > li').hover(function(){
      $('.gnb-inner > li').removeClass('active');
      $(this).addClass('active');
    }, function() {
      $('.gnb-inner > li').removeClass('active');
    });

    $('.mob-menu .mm-unit').click(function(){
        $('.mob-menu .mm-unit').removeClass('active');
        $(this).addClass('active');
    });
    $('.mob-menu-bottom .mob-lang > span').hover(function(){
      $('.mob-menu-bottom').addClass('active');
    }, function() {
      $('.mob-menu-bottom').removeClass('active');
    });

    $('.mob-gnb-inner .mob-gnb-btn').click(function(){
      if( $('.mob-menu').hasClass('active') ){
        $('.mob-menu').removeClass('active');  
        $('.mm-unit').removeClass('active');  
      } else {
        $('.mob-menu').addClass('active');
      }
    });
  });
  

  
  $(".swiper").each(function (index) {
    var $this = $(this);
    var i = index + 1;

    $this.addClass("step" + i);
    $this
      .parents(".slide")
      .find(".arrow")
      .addClass("step" + i);

    var swipers = new Swiper(`.swiper.step${i}`, {
      observer: true,
      observeParents: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      navigation: {
        prevEl: `.swiper-button-prev.step${i}`,
        nextEl: `.swiper-button-next.step${i}`
      },
      on: {
        init: function () {
          $(this.el).find(".swiper-pagination-number .total").text($(this.el).find(".swiper-pagination span").length);
        },
        slideChangeTransitionStart: function () {
          $(this.el)
            .find(".swiper-pagination-number .current")
            .text(this.realIndex + 1);
        }
      }
    });
  });


  //필터부분

  $('.filter-btn').click(function(){
    if($('.list-filter').hasClass('active')){
      $('.list-filter').removeClass('active');
    } else {
      $('.list-filter').addClass('active');
    }
  });

  $('.filter-tag li').click(function(){
    let nowTag = $(this).attr('data-tag');
    //Filter
    if(nowTag === 'all'){
      if($(this).hasClass('on')){
        $('.filter-tag li').removeClass('on');
      } else {
        $('.filter-tag li').removeClass('on');
      }
      $(this).addClass('on');
    } else{
      $('.filter-tag li.all').removeClass('on');
      if($(this).hasClass('on')){
        $(this).removeClass('on')
      } else {
        $(this).addClass('on');
      }
    }

    //Result
    if($(this).hasClass('on')){
      $('.results-list').append("<li data-filter='"+nowTag+"'><div class='clear'></div><span>"+nowTag+"</span></li>")
      if(nowTag === 'all'){
        $(".results-list li").remove();
      }
    } else {
      $(".results-list li[data-filter="+nowTag+"]").remove();
    }
  });

  $('.clear-filter').click(function(){
    $(".results-list li").remove();
    $('.filter-tag li').removeClass('on')
    $('.filter-tag li.all').addClass('on')
  });
  $(document).on("click", ".results-list li .clear", function(){
    let nowResult = $(this).parents('li').attr('data-filter');
    $(this).parents('li').remove();
    $(".filter-tag li[data-tag="+nowResult+"]").removeClass('on');
    if($('.results-list').children().length === 0){
      $(".filter-tag li[data-tag=all]").addClass('on');
    }
  });

  $('.copy-url').click(function(){
    var copyUrl = '';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    copyUrl = window.document.location.href;
    textarea.value = copyUrl;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  });
});