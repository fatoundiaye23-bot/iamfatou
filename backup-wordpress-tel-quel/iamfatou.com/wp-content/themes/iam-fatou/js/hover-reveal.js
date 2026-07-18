class HoverImage {
  constructor(element) {
    this.el = element;
    this.imgUrl = element.dataset.hoverImg;
    this.img = this.createHoverImage();
    this.listeners();

    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.velDelta = 0.005;
    this.vel = { x: 0, y: 0 };
  }
  listeners() {
    this.el.parentElement.addEventListener("mousemove", (e) => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.move();
      this.lastX = this.x;
      this.lastY = this.y;
    });
    this.el.addEventListener("mouseenter", () => this.toggleVisibility(this.img, true));
    this.el.addEventListener("mouseleave", () => this.toggleVisibility(this.img, false));
  }
  createHoverImage() {
    let imageElm = new Image(900);
    imageElm.addEventListener("load", () => {
      if (imageElm.style.opacity === "0") {
        imageElm.style.opacity = "0.001";
        setTimeout(() => (imageElm.style.opacity = "0"), 100);
      }
    });
    imageElm.src = this.imgUrl;
    imageElm.classList.add("hover-image");
    this.toggleVisibility(imageElm, false, 0);
    this.el.appendChild(imageElm);
    return imageElm;
  }
  move() {
    const elRect = this.el.getBoundingClientRect();
    const top = this.y - elRect.top;
    const left = this.x - elRect.left;

    this.vel = { x: this.x - this.lastX, y: this.y - this.lastY };
    // const angle = (this.vel.x * this.velDelta * 50) / Math.PI;

    const slowFactor = 0.5;
    let duration = 0.6;
    duration = duration / slowFactor;

    gsap.to(this.img, {
      top: top,
      left: left,
      rotate: -10,
      duration: duration,
      ease: "power3",
    });
  }
  toggleVisibility(el, show, duration = null) {
    let time = {};
    if (duration !== null) {
      time = {
        duration: 0,
      };
    }
    gsap.to(el, 0, {
      opacity: show ? 1 : 0,
      ...time,
    });
  }
}
