history.scrollRestoration = "manual";
window.addEventListener("load", function () {
  let homeBody = document.body;

  if (!homeBody.classList.contains("page-template-home")) {
    let homeAnchor = document.querySelector(".header_container a:first-of-type");
    homeAnchor.setAttribute("href", homeAnchor.getAttribute("href") + "/?home");
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const disableAnimation = urlParams.get("home");

  if (urlParams.size) {
    homeBody.classList.add("disable_animation");
  }

  gsap.registerPlugin(ScrollTrigger);

  // if (window.innerWidth > 768) {
  //   this.window.lenis = new Lenis({
  //     duration: 2,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //   });

  //   function raf(time) {
  //     this.window.lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }

  let bodyClassList = Array.from(document.body.classList);
  if (
    !bodyClassList.some((className) =>
      ["contact_page", "expertise_page", "privacy_page"].includes(className)
    )
  ) {
    // this.window.lenis?.stop();
    homeBody.style.overflow = "hidden";
  }

  let lastAnimatedElem = document.querySelector("header");
  if (this.document.body.classList.contains("home_page") && window.innerWidth > 768) {
    lastAnimatedElem = document.querySelector(".social_media");
  }
  lastAnimatedElem.addEventListener("animationend", () => {
    homeBody.style.overflow = "auto";
    // this.window.lenis?.start();
  });
  homeBody.classList.add("animate");

  function initXAnimation(target, triggerElem, triggerStart, triggerEnd) {
    if (document.querySelector(target)) {
      gsap.to(target, {
        duration: 0.7,
        delay: window.innerWidth > 768 ? 1 : 0,
        opacity: 1,
        ease: "none",
        y: 0,
        x: 0,
        stagger: 0.5,
        scrollTrigger: {
          id: `${triggerElem}`,
          trigger: triggerElem,
          start: triggerStart,
          end: triggerEnd,
          scrub: window.innerWidth > 768 ? true : false,
        },
      });
    }
  }
  if (window.innerWidth > 768) {
    initXAnimation(
      ".newsletter :is(.animate_x,.animate_y)",
      ".newsletter",
      "top center+=100",
      "top top+=200"
    );

    initXAnimation("footer :is(.animate_x,.animate_y)", "footer", "top bottom", "top center-=100");
  }

  this.window.animateFadeUp = function (elements) {
    let scaleUpElems = elements || gsap.utils.toArray(".gsap_fade_up");
    scaleUpElems.forEach((elem) => {
      let endTrigger = elem.getAttribute("end-trigger");
      gsap.to(elem, {
        duration: 0.7,
        delay: window.innerWidth > 768 ? 1 : 0,
        opacity: 1,
        ease: "none",
        y: 0,
        transformOrigin: "center",
        stagger: 0.5,
        scrollTrigger: {
          trigger: elem,
          start: "top center+=200",
          end: endTrigger || "top center",
          scrub: window.innerWidth > 768 ? true : false,
        },
      });
    });
  };
  this.window.animateFadeUp();

  // toggle mobile menu
  let menuBtn = this.document.querySelector(".close_icon");
  menuBtn.addEventListener("click", () => {
    if (homeBody.classList.contains("menu_opened")) {
      // window.lenis?.start();
      homeBody.style.overflow = "auto";
    } else {
      // window.lenis?.stop();
      homeBody.style.overflow = "hidden";
    }
    homeBody.classList.toggle("menu_opened");
  });

  if (homeBody.classList.contains("expertise_page")) {
    let cardsSplide = new Splide(".cardsSplide", {
      // autoWidth: true,
      // focus    : 'center',
      // gap: 10,
      type: "loop",
      // autoWidth: true,
      // destroy: true,
      pagination: false,
      arrows: false,
      perMove: 1,
      autoplay: true,
      interval: 4000,
      speed: "1000",
      // breakpoints: {
      //   1350: {
      //     destroy: false,
      //   },
      // },
    });

    cardsSplide.mount();

    let prevArrow = document.querySelector(".cards_controllers li.prev");
    let nextArrow = document.querySelector(".cards_controllers li.next");

    prevArrow.addEventListener("click", () => {
      cardsSplide.go("<");
    });
    nextArrow.addEventListener("click", () => {
      cardsSplide.go(">");
    });
  }
});
