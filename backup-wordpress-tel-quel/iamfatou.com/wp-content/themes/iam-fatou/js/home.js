window.addEventListener("load", () => {
  // 	let HelloBtn = document.querySelector(".home_page .header_container a:first-of-type");
  // HelloBtn?.classList.add('disabled')
  // HelloBtn?.removeAttribute("href");

  /* fatou in action section */
  let imagesWrapper = document.querySelector(".sec_2");
  let fatou_in_action = document.querySelector(".fatou_in_action span");
  let images = document.querySelectorAll(".sec_2 .img_wrapper");
  gsap.fromTo(
    fatou_in_action,
    { scale: 0.95 },
    {
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: fatou_in_action,
        start: "top center+=200",
        end: "bottom center",
        scrub: window.innerWidth > 768 ? true : false,
      },
    }
  );
  ScrollTrigger.saveStyles(".img_wrapper");
  images.forEach((itemImg, i) => {
    let computedStyle = getComputedStyle(itemImg);
    let fromX = +computedStyle.getPropertyValue("--from_x") * 1.8;
    let fromY = +computedStyle.getPropertyValue("--from_y");
    ScrollTrigger.saveStyles(itemImg);
    ScrollTrigger.matchMedia({
      "(min-width: 800px)": function () {
        gsap.fromTo(
          itemImg,
          { x: fromX, y: fromY },
          {
            x: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: imagesWrapper,
              start: "top 150%",
              end: "top -30%",
              scrub: true,
            },
          }
        );
      },
    });
  });

  // if (window.innerWidth > 768) {
  //animate insights
  let insights = gsap.utils.toArray(".single_insight,.pinnedInsight,.pinnedInsight .star");

  insights.forEach((insight) => {
    gsap.to(insight, {
      duration: 0.6,
      delay: window.innerWidth > 768 ? 1 : 0,
      opacity: 1,
      ease: "none",
      x: 0,
      y: 0,
      stagger: 0.5,
      scrollTrigger: {
        trigger: insight,
        start: "center bottom",
        end: "top center-=50",
        scrub: window.innerWidth > 768 ? true : false,
      },
    });
  });
  // }

  // window.addEventListener("load", function () {
  //   let homeSlideImg = document.querySelector(".hero_section .social_media");
  //   homeSlideImg.addEventListener("animationend", () => {
  //     // homeBody.style.overflow = "auto"
  //     lenis.start();
  //   });
  //   homeBody.classList.add("animate");
  // });

  let activeAudio = null;
  let activeVideo = null;
  // audios
  let insightsAudios = document.querySelectorAll(".single_insight.audio");

  insightsAudios.forEach((audio, idx) => {
    let audioWrapper = audio.querySelector(".audio_wrapper");
    let audioContainer = audioWrapper.querySelector("#audio_waves");
    let audioPlayBtn = audioWrapper.querySelector(".play_btn");

    let surferAudio = WaveSurfer.create({
      container: audioContainer,
      waveColor: "#55BA6E",
      cursorColor: "#55BA6E",
      progressColor: "#F7D45A",
      cursorWidth: 2.5,
      barWidth: 2,
      barGap: 5,
      height: window.innerWidth < 500 ? 50 : 86,
      // barRadius: 0,
      responsive: true,
    });

    surferAudio.load(audio.getAttribute("audio-url"));

    audioPlayBtn.addEventListener("click", () => {
      if (
        activeAudio &&
        activeAudio.options.container !== audioContainer &&
        activeAudio.isPlaying()
      ) {
        activeAudio.pause();
      }
      activeAudio = surferAudio;
      surferAudio.playPause();
    });

    surferAudio.on("play", () => {
      if (activeVideo && !activeVideo?.paused) {
        activeVideo.pause();
      }
      audioWrapper.setAttribute("audio-state", "playing");
    });
    surferAudio.on("pause", () => {
      audioWrapper.setAttribute("audio-state", "paused");
    });
  });

  // videos
  let insightsVideo = document.querySelectorAll(".single_insight.video");

  insightsVideo.forEach((video) => {
    let videoWrapper = video.querySelector(".video_wrapper");
    let videoPlayer = videoWrapper.querySelector("video");

    videoWrapper.addEventListener("click", () => {
      activeVideo = videoPlayer;
      if (!videoPlayer.paused) {
        videoPlayer.pause();
      } else {
        videoPlayer.play();
      }
    });

    // Add event listener for play/pause toggle
    videoPlayer.addEventListener("play", function () {
      videoWrapper.setAttribute("video-state", "playing");
      if (activeAudio?.isPlaying()) {
        activeAudio.pause();
      }
    });

    videoPlayer.addEventListener("pause", function () {
      videoWrapper.setAttribute("video-state", "paused");
    });
  });

  new Splide(".fatou_in_action_slider", {
    // autoWidth: true,
    // focus    : 'center',
    gap: 20,
    type: "loop",
    destroy: true,
    pagination: false,
    arrows: false,
    autoplay: true,
    interval: 5000,
    speed: "1000",
    breakpoints: {
      1350: {
        destroy: false,
      },
    },
  }).mount();
});
