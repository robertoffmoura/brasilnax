jQuery(function() {
  
  var $ = jQuery;
  
  $('body').addClass('postload');

  var Theme = {
    // Swiping mobile galleries wwith Hammer.js
    swipeGallery: function() {
      setTimeout(function() {
        var touchGallery = document.getElementsByClassName("fancybox-wrap")[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          Theme.swipeGallery();
        });
      }, 500);
    },
    swipeInit: function() {
      if ('ontouchstart' in window) {
        $("body").on("click", "a.w-fancybox", function() {
          Theme.swipeGallery();
        });
      }
    },
    // Hide minicart better on mobile
    hideCart: function(){
      if ('ontouchstart' in window) {
        $('#banner, #main-content, #footer-wrap').on('click touchend mouseenter', function () {
            $('#wsite-mini-cart').fadeOut("fast");
        });
      }
    },
    interval: function(condition, action, duration, limit) {
      var counter = 0;
      var looper = setInterval(function(){
        if (counter >= limit || Theme.checkElement(condition)) {
          clearInterval(looper);
        } else {
          action();
          counter++;
        }
      }, duration);
    },
    checkElement: function(selector) {
      return $(selector).length;
    },
    moveMinicart: function() {
      var move = $("#wsite-mini-cart").detach();
      $("#header").append(move);
    },
    moveFlyout: function() {
      var move = $("#wsite-menus").detach();
      $("#header").append(move);
    }
  }
  
  $(document).ready(function() {

    // Add current class to store gallery thumb
    
    var galleryLink = $("#wsite-com-product-images-strip a");
    var currentClass = "current";
    
    galleryLink.first().addClass(currentClass);
    galleryLink.click(function(){
      $("."+currentClass).removeClass(currentClass);
      $(this).addClass(currentClass);
    });
    
    // Add halfwidth class to gallery thumbs if less than 6

  	$('.imageGallery').each(function(){
  	  if ($(this).children('div').length <= 6) {
  	    $(this).children('div').addClass('halfwidth-mobile');
  	  }
  	});

    // Add search to mobile menu if present
    
    var headerSearch = $("#header .wsite-search");
    var navMobile = $("#navmobile");

    if (headerSearch.length) {
      navMobile.prepend('<div class="search">'+headerSearch.parent().html()+'</div>');
    }
    
    // Leave search input open if focused out 
    
    $("#header .wsite-search-input").focusout(function() {
      if ($(this).val()) {
        $(this).addClass("expanded");
      }
      else {
        $(this).removeClass("expanded");
      }
    });
    
    // Sticky nav bar
    
    // Settimeout for iframe editor
    setTimeout(function() {
      $('body:not(.wsite-native-mobile-editor) #header-wrap').waypoint('sticky');
      
      // Transition nav bg

      $('#main-wrap').waypoint(function() {
        $("#main-wrap").toggleClass('darken');
      }, {offset: -10});
      
    }, 500);


    var timeout;
    var width = $(window).width();

    $(window).on('resize', function(e) {

      clearTimeout(timeout);

      timeout = setTimeout(function() {
        if ($(window).width() != width){
          $('.stuck').waypoint('unsticky');
          $('#header-wrap').waypoint('sticky');
        }
        width = $(window).width();
      }, 300);

    });
    
    $(".hamburger").click(function(){
      $("body").toggleClass("menu-open");
    });

    Theme.swipeInit();
    Theme.hideCart();
    Theme.interval("#header #wsite-mini-cart", Theme.moveMinicart, 800, 5);
    Theme.interval("#header #wsite-menus", Theme.moveFlyout, 800, 5);

  });

});