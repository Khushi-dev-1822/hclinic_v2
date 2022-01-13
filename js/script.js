"use strict";
// Counter To Count Number Visit
var a = 0;
$(window).scroll(function () {
  const oTop = $("#counter").offset().top - window.innerHeight;

  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter").each(function () {
     const $this = $(this);
      jQuery({ Counter: 0 }).animate(
        { Counter: $this.text() },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.ceil(this.Counter));
          },
        }
      );
    });
    a = 1;
  }
});

// testimonial
var	testim = document.getElementById("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;
window.onload = function() {
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
				touchPosDiff = touchStartPos - touchEndPos;
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
		})
}

document.ge


var changeId = '1';

setInterval(() => {
  (changeId < '9') ? changeId++ : changeId = '1';
  let clickable = document.getElementById(`click_${changeId}`);
  clickable.click();
}, 2000);


// benefit section
var link = $(".com__nav-link");
var linkParent = link.parent("li");
var section = $(".com__section");
var sectionContent = section.find("*");

var switchTab = function () {
  var p = $(this).parent("li");
  var i = p.index();
  var s = section.eq(i);
  var c = s.find("*");

  section.removeClass("active");
  sectionContent.removeAttr("style");
  s.addClass("active");

  c.css({
    transform: "none",
    opacity: 1,
  });

  linkParent.removeClass("active");
  p.addClass("active");

  return false;
};



// setTimeout(function(){
//   document.querySelector(".one").click();
// }, 1000);

link.on("click", switchTab);

function activeFirst() {
  section.first().addClass("active");
  section.first().find("*").css({
    transform: "none",
    opacity: 1,
  });
  linkParent.first().addClass("active");
}
activeFirst();


  // gallery
  const swiper = new Swiper('.swiper-container', {
    speed: 500,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    centeredSlides: true,
    paginationClickable: true,
    watchSlidesProgress: true,
     loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  
  // scrollup
// var mybutton = document.getElementById("myBtn");
// window.onscroll = function() {scrollFunction()};
// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }
// function topFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }

//date/time
var dateControl = document.querySelector('input[type="date"]');
dateControl.value = '2021-12-10';
var dateControl = document.querySelector('input[type="time"]');
dateControl.value = '00:00';

 // chatbot
 document.querySelector('.bot').addEventListener('click', function(){
   document.querySelector('.chatbot').classList.toggle('hidden');
   document.querySelector('.js-responseCard').style.opacity = '1';
   document.querySelector('.js-responseCard').classList.add('js-response');
 })

// login/signup form
const loginNow = document.getElementById('loginNow');
const signupNow = document.getElementById('signupNow');
const signup = document.querySelector('.signup');
const login = document.querySelector('.login');
// SIGNUP
signupNow.addEventListener('click', ()=>{
  signup.classList.remove('hidden');
  login.classList.add('hidden');
})
// LOGIN
loginNow.addEventListener('click', ()=>{
  signup.classList.add('hidden');
  login.classList.remove('hidden');
})


// donate overlay

$(document).ready(function () {

  setTimeout(function () {
      $(".myModal").modal('show')
  }, 1000);
  $("#myModal").modal("show");
  $("#myModal").css("z-index", "1500");

});



let navItem = document.querySelectorAll(".navbar-item");

navItem.forEach(navItem =>{
    navItem.addEventListener("click", ()=>{
     resetItem();
     navItem.classList.add('active_line');
    })
})

function resetItem(){
    navItem.forEach(navItem =>{
        navItem.classList.remove('active_line');
        })
}
