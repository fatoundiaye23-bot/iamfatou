window.addEventListener("load", () => {
  if (window.innerWidth > 768) {
    for (const item of document.querySelectorAll("[data-hover-img]")) {
      // let dateElem = item.querySelector(".date");
      // if (dateElem.scrollWidth > 65) {
      //   item.style.setProperty("--x-transform", `${dateElem.scrollWidth - 50}px`);
      // }
      new HoverImage(item);
    }
  }

  //load more gallery

  let loadMoreBtn = document.querySelector(".gallery .load_more");
  let galleryWrapper = document.querySelector(".photos_grid");
  let galleryImages = imagesEncoded || [];
  let startIndex = 10;
  const increaseBy = 10;
  let chunckID = 1;

  loadMoreBtn?.addEventListener("click", () => {
    if (galleryImages.length && startIndex < galleryImages.length) {
      // Skip the first five elements and get the next five elements
      const endIndex = startIndex + increaseBy;
      console.log({ startIndex, increaseBy, endIndex });
      const subsetArray = galleryImages.slice(startIndex, endIndex);

      const fragment = document.createDocumentFragment();
      for (let i = 0; i < subsetArray.length; i++) {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("gsap_fade_up", "photo", `chunck_${chunckID}`);
        const img = document.createElement("img");
        img.src = subsetArray[i].single_image;
        imageWrapper.appendChild(img);
        fragment.appendChild(imageWrapper);
      }
      galleryWrapper.appendChild(fragment);
      this.window.animateFadeUp(document.querySelectorAll(`.chunck_${chunckID}`));
      startIndex = endIndex;
      chunckID++;
      if (endIndex >= galleryImages.length) {
        loadMoreBtn.classList.add("hide");
      }
    }
  });
});
