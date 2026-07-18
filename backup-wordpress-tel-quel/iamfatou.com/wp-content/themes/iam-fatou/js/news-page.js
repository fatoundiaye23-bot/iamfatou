let sortByBtns = document.querySelectorAll(".sort_by:not(.all,.others)");
let getAllBtn = document.querySelector(".sort_by.all");
let getOthersBtn = document.querySelector(".sort_by.others");
let loading = false;
let debounce;
let newsContainer = document.querySelector(".news_grid");
let newsLoader = document.querySelector(".news_page .loader");

function filterByIDS(data) {
  clearTimeout(debounce);
  loading = true;
  newsContainer.innerHTML = "";
  newsLoader.classList.remove("hide");
  newsContainer.closest(".news_wrapper")?.classList.add("filtering");
  debounce = setTimeout(function () {
    $.ajax({
      type: "GET",
      url: "/wp-json/imfatou/v1/sort-articles?" + jQuery.param(data),
      // beforeSend: function () {},
      success: function (res) {
        if (res !== "") {
          newsContainer.innerHTML = res;
          window.animateFadeUp(document.querySelectorAll(`.news_grid .news_item`));
          window.lenis?.scrollTo(document.querySelector(`.news_wrapper`), {
            offset: -150,
          });
        } else {
          newsContainer.innerHTML = `<h3 class="news_message">No articles found!</h3>`;
        }
      },
      complete: function () {
        newsLoader.classList.add("hide");
        if (data["all"]) {
          newsContainer.closest(".news_wrapper")?.classList.remove("filtering");
        }
        loading = false;
        ScrollTrigger.getById("footer").refresh();
        ScrollTrigger.getById("footer").update();
        ScrollTrigger.update();
      },
    });
  }, 600);
}

function removeClassList(Selector) {
  let elements = document.querySelectorAll(Selector);
  elements.forEach((elem) => elem.classList.remove("active"));
}

let filterData = {
  expIds: [],
  others: false,
  all: true,
};

sortByBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!loading) {
      btn.classList.toggle("active");

      let expID = btn.getAttribute("exp-id");

      filterData["all"] = false;

      removeClassList(".sort_by.all");

      if (filterData["expIds"].includes(expID)) {
        filterData["expIds"] = filterData["expIds"].filter((id) => id !== expID);
      } else {
        filterData["expIds"].push(expID);
      }
      filterByIDS(filterData);

      if (!filterData["expIds"].length && !filterData["others"]) {
        getAllBtn.classList.add("active");
        filterData["all"] = true;
      }
    }
  });
});

getAllBtn.addEventListener("click", () => {
  if (!filterData["all"] && !loading) {
    removeClassList(".sort_by.active");
    filterData["all"] = true;
    filterData["others"] = false;
    filterData["expIds"] = [];
    getAllBtn.classList.add("active");
    filterByIDS(filterData);
  }
});

getOthersBtn.addEventListener("click", () => {
  if (!loading) {
    filterData["others"] = !filterData["others"];
    filterData["all"] = false;
    removeClassList(".sort_by.all");
    getOthersBtn.classList.toggle("active");
    if (!filterData["expIds"].length && !filterData["others"]) {
      getAllBtn.classList.add("active");
      filterData["all"] = true;
    }
    filterByIDS(filterData);
  }
});
