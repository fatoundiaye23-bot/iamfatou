window.addEventListener("load", function () {
  if (window.innerWidth > 768) {
    // write effect
    const textElement = new SplitType("#typingEffect p", {
      charClass: "char",
      types: "words, chars",
    });

    if (textElement.chars.length) {
      // Animate each words on scroll with in-between delays.
      gsap.to(textElement.chars, {
        duration: 2,
        delay: 1,
        opacity: 1,
        ease: "none",
        // x: 0,
        stagger: 0.5,
        scrollTrigger: {
          trigger: "#typingEffect",
          start: "top 95%",
          end: "bottom 50%",
          scrub: 2,
        },
      });
    }

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
