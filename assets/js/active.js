"use strict";

/* ---------------------
   [Table of Contents]

   1. Core Features
      1.1.0 Sticky Header (sticky-header)
      1.2.0 Mobile Dropdown Menu (mobile-menu)
      1.3.0 Anchor Prevent Default (anchor-prevent)
      1.4.0 Search Form (search-form)
   2. Swiper Sliders
      2.1.0 Hero Swiper Slide
      2.2.0 Background Swiper Slide
      2.3.0 Deals Swiper Slide
      2.4.0 Testimonial Swiper Slide
      2.5.0 Premier Destination Swiper Slide
      2.6.0 Testimonial Swiper Slide Two
      2.7.0 Testimonial Swiper Slide Three
      2.8.0 Follow Instagram Swiper Slide
      2.9.0 Top Catagory Swiper Slide
      2.10.0 Video Gallery Swiper Slide
      2.11.0 Destination Details Swiper Slide
   3. UI Enhancements
      3.1.0 Range Slider Price
      3.2.0 Range Slider Duration
      3.3.0 Venobox JS
      3.4.0 Countdown Timer
      3.5.0 Counter Up
      3.6.0 Accommodation Card
      3.7.0 Scroll to Top
      3.8.0 Video Popup
      3.9.0 Isotope
      3.10.0 Rotating Image
      3.11.0 Progress Bar
      3.12.0 Flatpickr Date Picker
      3.13.0 Nice Select Activation
      3.14.0 Copyright Year
      3.15.0 WOW
      3.16.0 Tooltip Activation
      3.17.0 Toast Activation
      3.18.0 Popover Activation
      3.19.0 Preloader
--------------------- */

// 1.1.0 Sticky Header

const navarToggler = document.querySelector(".navbar-toggler");
const header = document.querySelector(".header-area");

if (navarToggler) {
  navarToggler.addEventListener("click", () => {
    header.classList.toggle("mobile-menu-open");
  });
}

if (header) {
  function stickyNavigation() {
    if (window.pageYOffset > 10) {
      header.classList.add("sticky-on");
    } else {
      header.classList.remove("sticky-on");
    }
  }

  window.addEventListener("load", stickyNavigation);
  window.addEventListener("scroll", stickyNavigation);
}

// 1.2.0 Mobile Dropdown Menu

function mobileDropdownMenu() {
  const sbdropdown = document.querySelectorAll(".lp-dd");
  if (sbdropdown.length > 0) {
    const navUrl = document.querySelectorAll(".navbar-nav li ul");
    navUrl.forEach((url) => {
      url.insertAdjacentHTML(
        "beforebegin",
        '<div class="dropdown-toggler"><i class="bi bi-caret-down-fill"></i></div>'
      );
    });

    const ddtrogglers = document.querySelectorAll(".dropdown-toggler");
    ddtrogglers.forEach((ddtoggler) => {
      ddtoggler.addEventListener("click", () => {
        const ddNext = ddtoggler.nextElementSibling;
        slideToggle(ddNext, 300);
      });
    });
  }
}
window.addEventListener("load", mobileDropdownMenu);

// 1.3.0 Anchor Prevent Default

const anchors = document.querySelectorAll('a[href="#"]');
anchors.forEach((anchor) => {
  anchor.addEventListener("click", (e) => e.preventDefault());
});

// 1.4.0 Search Form

const searchButton = document.getElementById("searchButton");
const searchClose = document.getElementById("searchClose");
const searchFormPopup = document.querySelector(".search-form-popup");
const searchOverlay = document.getElementById("searchOverlay");

if (searchButton) {
  searchButton.addEventListener("click", () => {
    searchFormPopup.classList.add("open");
    searchOverlay.classList.add("open");
  });
  searchClose.addEventListener("click", () => {
    searchFormPopup.classList.remove("open");
    searchOverlay.classList.remove("open");
  });
}

// 2.1.0 Hero Swiper Slide

const heroSwiper = document.querySelector(".hero-swiper");

if (heroSwiper) {
  const thumbnailImages = [
    "assets/img/bg-img/3.jpg",
    "assets/img/bg-img/4.jpg",
    "assets/img/bg-img/5.jpg",
  ];

  new Swiper(".hero-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".hero-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}" style="background-image: url('${thumbnailImages[index]}');"></span>`;
      },
    },
    navigation: {
      nextEl: ".hero-button-next",
      prevEl: ".hero-button-prev",
    },
    speed: 500,
    on: {
      init: function (swiper) {
        const firstSlide = swiper.slides[swiper.activeIndex];
        firstSlide.classList.add("active-slide");
        animateSlide(firstSlide);
      },
      slideChangeTransitionStart: function (swiper) {
        swiper.slides.forEach((slide) => {
          const heroContent = slide.querySelector(".hero-animated-content");
          if (heroContent) {
            heroContent.classList.remove("hero-animate");
            heroContent.querySelectorAll("[data-fade-in-up]").forEach((el) => {
              el.style.opacity = "0";
              el.style.transform = "translateY(40px)";
            });
          }
        });
      },
      slideChangeTransitionEnd: function (swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        activeSlide.classList.add("active-slide");
        animateSlide(activeSlide);
      },
    },
  });

  function animateSlide(slide) {
    const heroContent = slide.querySelector(".hero-animated-content");
    if (!heroContent) return;

    heroContent.classList.add("hero-animate");

    heroContent.querySelectorAll("[data-fade-in-up]").forEach((el) => {
      const delay = parseInt(el.getAttribute("data-animation-delay"), 10) || 0;

      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";

      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
      }, delay);
    });
  }
}

// 2.2.0 Background Swiper Slide

const backgroundSwiper = document.querySelector(".background-swiper");

if (backgroundSwiper) {
  const swiperBs = new Swiper(".background-swiper", {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    allowTouchMove: false,
    autoplay: false,
    navigation: {
      nextEl: ".background-button-next",
      prevEl: ".background-button-prev",
    },
  });

  // Trigger shader-like effect
  swiperBs.on("slideChangeTransitionStart", () => {
    // remove previous shader
    document
      .querySelectorAll(".shader-water")
      .forEach((slide) => slide.classList.remove("shader-active"));

    // apply to active & prev
    const active = document.querySelector(".swiper-slide-active");
    const prev = document.querySelector(".swiper-slide-prev");

    if (active) active.classList.add("shader-active");
    if (prev) prev.classList.add("shader-active");
  });

  // Remove leftover shader
  swiperBs.on("slideChangeTransitionEnd", () => {
    setTimeout(() => {
      document
        .querySelectorAll(".shader-water")
        .forEach((slide) => slide.classList.remove("shader-active"));
    }, 80);
  });
}

// 2.2.1 Featured Swiper

const featuredSwiper = document.querySelector(".featured-swiper");

if (featuredSwiper) {
  const swiperFeatured = new Swiper(".featured-swiper", {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    // allowTouchMove: false,
    effect: "slide",
    // cubeEffect: {
    //   shadow: false,
    // },
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".featured-background-button-next",
      prevEl: ".featured-background-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // // Trigger shader-like effect
  // swiperFeatured.on("slideChangeTransitionStart", () => {
  //   // remove previous shader
  //   document
  //     .querySelectorAll(".shader-water")
  //     .forEach((slide) => slide.classList.remove("shader-active"));

  //   // apply to active & prev
  //   const active = document.querySelector(".swiper-slide-active");
  //   const prev = document.querySelector(".swiper-slide-prev");

  //   if (active) active.classList.add("shader-active");
  //   if (prev) prev.classList.add("shader-active");
  // });

  // // Remove leftover shader
  // swiperFeatured.on("slideChangeTransitionEnd", () => {
  //   setTimeout(() => {
  //     document
  //       .querySelectorAll(".shader-water")
  //       .forEach((slide) => slide.classList.remove("shader-active"));
  //   }, 80);
  // });
}

// 2.3.0 Deals Swiper Slide

const dealsSwiper = document.querySelector(".deals-swiper");

if (dealsSwiper) {
  new Swiper(".deals-swiper", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 16,
    navigation: {
      nextEl: ".deals-button-next",
      prevEl: ".deals-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  });
}

// 2.4.0 Testimonial Swiper Slide

const testimonialSwiper = document.querySelector(".testimonial-swiper");

if (testimonialSwiper) {
  new Swiper(".testimonial-swiper", {
    loop: true,
    effect: "slide",
    grabCursor: true,
    watchSlidesProgress: true,
    speed: 600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: ".testimonial-button-next",
      prevEl: ".testimonial-button-prev",
    },

    pagination: {
      el: ".swiper-pagination-testimonial",
      clickable: true,
    },

    // Mobile
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 16,

    // Tablet & Desktop
    breakpoints: {
      768: {
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 2.2, // 2 cards + spill
        centeredSlides: true,
        spaceBetween: 28,
      },
    },
  });
}

const partnerSwiper = document.querySelector(".partnerSwiper");

if (partnerSwiper) {
  new Swiper(".partnerSwiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,

    speed: 8000, // boleh pelan tapi tetap stabil
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },

    allowTouchMove: false,

    freeMode: false, // MATIKAN
    centeredSlides: false,

    grabCursor: false,

    loopAddBlankSlides: true,

    breakpoints: {
      576: { spaceBetween: 20 },
      768: { spaceBetween: 24 },
      992: { spaceBetween: 28 },
    },
  });
}

// 2.5.0 Premier Destination Swiper Slide

const premierDestinationSwiper = document.querySelector(
  ".premier-destination-swiper"
);

if (premierDestinationSwiper) {
  new Swiper(".premier-destination-swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    grabCursor: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".premier-destination-button-next",
      prevEl: ".premier-destination-button-prev",
    },
  });

  premierDestinationSwiper
    .querySelectorAll(".premier-destination-card")
    .forEach((slide) => {
      slide.addEventListener("click", () => {
        premierDestinationSwiper
          .querySelectorAll(".premier-destination-card")
          .forEach((s) => {
            s.classList.remove("slide-expand");
          });
        slide.classList.add("slide-expand");
      });
    });
}

// 2.6.0 Testimonial Swiper Slide Two

const testimonialSwiperTwo = document.querySelector(".testimonial-swiper-two");

if (testimonialSwiperTwo) {
  new Swiper(".testimonial-swiper-two", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".testimonial-button-next-two",
      prevEl: ".testimonial-button-prev-two",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}

// 2.7.0 Testimonial Swiper Slide Three

const testimonialSwiperThree = document.querySelector(
  ".testimonial-swiper-three"
);

if (testimonialSwiperThree) {
  new Swiper(".testimonial-swiper-three", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".testimonial-button-next-three",
      prevEl: ".testimonial-button-prev-three",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}

// 2.8.0 Follow Instagram Swiper Slide

const followInstagramSwiper = document.querySelector(
  ".follow-instagram-swiper"
);

if (followInstagramSwiper) {
  new Swiper(".follow-instagram-swiper", {
    loop: true,
    slidesPerView: 8,
    spaceBetween: 10,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 8,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 8,
        spaceBetween: 30,
      },
    },
  });
}

// 2.9.0 Top Catagory Swiper Slide

const topCatagorySwiper = document.querySelector(".top-catagory-swiper");

if (topCatagorySwiper) {
  new Swiper(".top-catagory-swiper", {
    loop: true,
    spaceBetween: 24,
    slidesPerView: 6,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".top-catagory-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 24,
      },
    },
  });
}

// 2.10.0 Video Gallery Swiper Slide

const videoGallerySwiper = document.querySelector(".video-gallery-swiper");

if (videoGallerySwiper) {
  const thumbnailImages = [
    "assets/img/bg-img/61.jpg",
    "assets/img/bg-img/62.jpg",
    "assets/img/bg-img/63.jpg",
  ];

  new Swiper(".video-gallery-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    effect: "fade",
    speed: 500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".video-gallery-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}" style="background-image: url('${thumbnailImages[index]}');"></span>`;
      },
    },
  });
}

// 2.11.0 Destination Details Swiper Slide

const destinationDetailsSwiper = document.querySelector(
  ".destination-details-wrapper"
);

if (destinationDetailsSwiper) {
  new Swiper(".destination-details-wrapper", {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".destination-details-button-next",
      prevEl: ".destination-details-button-prev",
    },
  });
}

// 3.1.0 Range Slider Price

var rangeSliderPrice = document.getElementById("range-slider-price");

if (rangeSliderPrice) {
  noUiSlider.create(rangeSliderPrice, {
    start: [20, 800],
    connect: true,
    tooltips: [
      {
        to: function (value) {
          return value <= 0 ? "" : parseInt(value, 10);
        },
        from: Number,
      },
      {
        to: function (value) {
          return value <= 0 ? "" : parseInt(value, 10);
        },
        from: Number,
      },
    ],
    range: {
      min: 0,
      max: 1000,
    },
  });
}

// 3.2.0 Range Slider Duration

var rangeSliderDuration = document.getElementById("range-slider-duration");

if (rangeSliderDuration) {
  noUiSlider.create(rangeSliderDuration, {
    start: [1, 7],
    connect: true,
    tooltips: [
      {
        to: function (value) {
          return value <= 0 ? "" : parseInt(value, 10);
        },
        from: Number,
      },
      {
        to: function (value) {
          return value <= 0 ? "" : parseInt(value, 10);
        },
        from: Number,
      },
    ],
    range: {
      min: 0,
      max: 16,
    },
  });
}

// 3.3.0 Venobox JS

const venoBox = document.querySelectorAll(".venobox");

if (venoBox.length > 0) {
  new VenoBox({
    overlayColor: "rgba(22,25,32,0.8)",
    spinner: "flow",
  });
}

// 3.4.0 Countdown Timer

const countdownClock = document.getElementById("countdownClock");

if (countdownClock) {
  function updateCountdown() {
    const date = countdownClock.getAttribute("data-target-date");
    const time = countdownClock.getAttribute("data-target-time");
    const targetTime = new Date(`${date}T${time}`);
    const now = new Date();
    const distance = targetTime - now;

    if (distance < 0) {
      countdownClock.innerHTML = "<li>Countdown Ended</li>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownClock.querySelector("#days").textContent = String(days).padStart(
      2,
      "0"
    );
    countdownClock.querySelector("#hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    countdownClock.querySelector("#minutes").textContent = String(
      minutes
    ).padStart(2, "0");
    countdownClock.querySelector("#seconds").textContent = String(
      seconds
    ).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// 3.5.0 Counter Up

const counterElements = document.querySelectorAll(".counter");

if (counterElements.length > 0) {
  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const counterElement = entry.target;
      if (
        entry.isIntersecting &&
        !counterElement.classList.contains("is-visible")
      ) {
        counterUp(counterElement, {
          duration: 2000,
          delay: 20,
        });
        counterElement.classList.add("is-visible");
      }
    });
  };

  const IO = new IntersectionObserver(callback, {
    threshold: 1,
  });
  counterElements.forEach((element) => IO.observe(element));
}

// 3.6.0 Accommodation Card

const accommodationCards = document.querySelectorAll(".accommodation-card");

if (accommodationCards.length > 0) {
  accommodationCards.forEach((card) => {
    const hiddenContent = card.querySelector(".accommodation-hidden-content");
    if (card.classList.contains("open")) {
      hiddenContent.style.maxHeight = hiddenContent.scrollHeight + "px";
    }
  });

  accommodationCards.forEach((card) => {
    card.addEventListener("click", () => {
      const isAlreadyOpen = card.classList.contains("open");

      accommodationCards.forEach((c) => {
        c.classList.remove("open");
        const content = c.querySelector(".accommodation-hidden-content");
        content.style.maxHeight = "0px";
      });

      if (!isAlreadyOpen) {
        card.classList.add("open");
        const hiddenContent = card.querySelector(
          ".accommodation-hidden-content"
        );
        hiddenContent.style.maxHeight = hiddenContent.scrollHeight + "px";
      }
    });
  });
}

// 3.7.0 Scroll to Top

const scrollButton = document.getElementById("scrollTopButton");
const topDistance = 600;

if (scrollButton) {
  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop > topDistance ||
      document.documentElement.scrollTop > topDistance
    ) {
      scrollButton.classList.add("scrolltop-show");
      scrollButton.classList.remove("scrolltop-hide");
    } else {
      scrollButton.classList.add("scrolltop-hide");
      scrollButton.classList.remove("scrolltop-show");
    }
  });

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  function updateScrollProgress() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
    scrollButton.style.setProperty("--scroll-progress", `${scrollPercent}%`);
  }

  window.addEventListener("scroll", updateScrollProgress);
}

// 3.8.0 Video Popup

const videoPopup = document.getElementById("videoPopup");
const videoFrame = document.getElementById("videoFrame");
const closeBtn = document.getElementById("videoCloseButton");
const videoBtns = document.querySelectorAll(".video-btn");

if (closeBtn && videoBtns.length > 0) {
  videoBtns.forEach((button) => {
    button.addEventListener("click", function () {
      let videoUrl = this.getAttribute("data-video");

      if (videoUrl) {
        let separator = videoUrl.includes("?") ? "&" : "?";

        if (videoUrl.includes("youtu.be")) {
          let videoId = videoUrl.split("/").pop();
          videoUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        if (videoUrl.includes("youtube.com/watch")) {
          let videoId = new URL(videoUrl).searchParams.get("v");
          videoUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        if (
          videoUrl.includes("youtube.com") ||
          videoUrl.includes("vimeo.com")
        ) {
          videoUrl += `${separator}autoplay=1`;
        }

        videoFrame.src = videoUrl;
        videoFrame.setAttribute("allow", "autoplay; encrypted-media");
        videoPopup.style.display = "flex";
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    videoPopup.style.display = "none";
    videoFrame.src = "";
  });

  window.addEventListener("click", (event) => {
    if (event.target === videoPopup) {
      videoPopup.style.display = "none";
      videoFrame.src = "";
    }
  });
}

// 3.9.0 Isotope

const grids = document.querySelectorAll(".lp-filter");

if (grids.length > 0) {
  grids.forEach((grid) => {
    imagesLoaded(grid, () => {
      const iso = new Isotope(grid, {
        itemSelector: ".filter-item",
        percentPosition: true,
        layoutMode: "masonry",
        masonry: {
          columnWidth: ".filter-item",
        },
      });

      const filtersElem = grid
        .closest(".lp-container")
        .querySelector(".lp-filter-nav");

      if (filtersElem) {
        filtersElem.addEventListener("click", (event) => {
          if (!event.target.matches("button")) return;
          const filterValue = event.target.getAttribute("data-filter");
          iso.arrange({
            filter: filterValue,
          });
        });

        const radioButtonGroup = (buttonGroup) => {
          buttonGroup.addEventListener("click", (event) => {
            if (!event.target.matches("button")) return;
            buttonGroup.querySelector(".active").classList.remove("active");
            event.target.classList.add("active");
          });
        };

        radioButtonGroup(filtersElem);
      }
    });
  });
}

// 3.10.0 Rotating Image

const rotatingImages = document.querySelectorAll(".rotatingImage");

if (rotatingImages.length > 0) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const rotateValue = scrollTop % 360;
    rotatingImages.forEach((image) => {
      image.style.transform = `rotate(${rotateValue}deg)`;
    });
  });
}

// 3.11.0 Progress Bar

const progressBars = document.querySelectorAll(".guider-progress-bar");

if (progressBars.length > 0) {
  progressBars.forEach(function (progressBar) {
    const value = parseInt(progressBar.getAttribute("data-value"), 10);
    progressBar.style.width = value + "%";
    const spanElements = progressBar
      .closest(".progress-item")
      .querySelectorAll(".progress-info span");
    if (spanElements.length > 1) {
      const percentSpan = spanElements[1];
      percentSpan.textContent = value + "%";
      percentSpan.style.marginRight = 100 - value + "%";
    }
  });
}

// 3.12.0 Flatpickr Date Picker

const timeRangeInput = document.getElementById("time-range-picker");

if (timeRangeInput) {
  function getCurrentWeekRange() {
    const today = new Date();
    const day = today.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return [monday, sunday];
  }

  const [start, end] = getCurrentWeekRange();

  timeRangeInput.placeholder = `${start.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
  })} - ${end.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
  })}`;

  flatpickr(timeRangeInput, {
    mode: "range",
    dateFormat: "M d",
    defaultDate: [start, end],
  });
}

// 3.13.0 Nice Select Activation

let lpSelect = document.querySelectorAll(".lp-select");
let lpSelectLen = lpSelect.length;

if (lpSelectLen > 0) {
  for (let i = 0; i < lpSelectLen; i++) {
    NiceSelect.bind(lpSelect[i], {
      searchable: true,
    });
  }
}

let lpSelect2 = document.querySelectorAll(".lp-select2");
let lpSelect2Len = lpSelect2.length;

if (lpSelect2Len > 0) {
  for (let i = 0; i < lpSelect2Len; i++) {
    NiceSelect.bind(lpSelect2[i], {
      searchable: false,
    });
  }
}

// 3.14.0 Copyright Year

const year = document.getElementById("year");
if (year) {
  const currentYear = new Date().getFullYear();
  year.textContent = currentYear;
}

// 3.15.0 WOW

const wowjs = document.querySelectorAll(".wow").length;

if (wowjs > 0) {
  new WOW().init();
}

// 3.16.0 Tooltip Activation

let lpTooltip = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
let tooltipList = lpTooltip.map(function (sbTooltip) {
  return new bootstrap.Tooltip(sbTooltip);
});

// 3.17.0 Toast Activation

let lpToast = [].slice.call(document.querySelectorAll(".toast"));
let toastList = lpToast.map(function (sbToast) {
  return new bootstrap.Toast(sbToast);
});
toastList.forEach((toast) => toast.show());

// 3.18.0 Popover Activation

let lpPopover = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
let popoverList = lpPopover.map(function (sbPopover) {
  return new bootstrap.Popover(sbPopover);
});

// 3.19.0 Preloader

const preloader = document.getElementById("preloader");

if (preloader) {
  window.addEventListener("load", function () {
    let fadeOut = setInterval(function () {
      if (!preloader.style.opacity) {
        preloader.style.opacity = 1;
      }
      if (preloader.style.opacity > 0) {
        preloader.style.opacity -= 0.1;
      } else {
        clearInterval(fadeOut);
        preloader.remove();
      }
    }, 100);
  });
}
