window.addEventListener("load", function () {
  if (window.innerWidth > 768) {
    const newsletterHeader = new SplitType(".newsletter_header h3", {
      charClass: "char",
      types: "words, chars",
    });

    if (newsletterHeader.chars.length) {
      gsap.to([".newsletter_header .icon", newsletterHeader.chars], {
        // duration: 2,
        opacity: 1,
        ease: "none",
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "section.newsletter",
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
      });
    }
  }
});
