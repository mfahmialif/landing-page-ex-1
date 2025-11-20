$(document).ready(function () {
  fetchUndangan();
  initActiveNavbar();
});

const initActiveNavbar = () => {
  // Ambil semua link nav yang menuju id (#...)
  const nav = document.querySelector(".navbar-nav");
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));

  // Ambil section berdasarkan href masing-masing link
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean); // buang yang tidak ada di DOM

  const setActive = (id) => {
    links.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
    });
  };

  // Observer: anggap aktif jika bagian tengah layar menyilang section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    {
      root: null,
      rootMargin: "-30% 0px -60% 0px", // trigger saat ~tengah layar
      threshold: 0,
    }
  );

  sections.forEach((sec) => observer.observe(sec));

  // Saat klik menu, aktifkan segera (biar responsif)
  nav.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    setActive(a.getAttribute("href").slice(1));
  });

  // State awal (hash di URL atau default section pertama)
  window.addEventListener("DOMContentLoaded", () => {
    const hash = location.hash && document.querySelector(location.hash);
    setActive((hash || sections[0]).id);
  });
};

const fetchUndangan = () => {
  $("#undangan-section").loading("start");
  $.ajax({
    type: "GET",
    url: "https://undangan.jadimudah.id/apiEtalase/list",
    dataType: "json",
    success: function (response) {
      const data = response.data;

      if (!data || data.length === 0) {
        $("#listUndangan").html(`
      <div class="swiper-slide text-center py-5">
        <p class="text-danger fw-bold mb-0">
          Tidak ada undangan.
        </p>
      </div>
    `);
        return;
      }

      let content = data
        .map((item) => {
          const image = `https://undangan.jadimudah.id/${item.image}`;
          const link = `https://pengantin.jadimudah.id/preview/${item.id_tema}`;
          const title = item.name;
          const desc = item.description;
          const type = item.type;

          return `
        <div class="swiper-slide">
          <h5 class="insta-title text-center mb-3">
              <a href="${link}" class="text-success">${title}</a>
            </h5>
          <div class="follow-instagram-card">

            <!-- TYPE BADGE -->
            <span class="insta-type">${type}</span>

            <img src="${image}" alt="" />

            <!-- Instagram Button -->
            <a href="${link}" class="instagram-btn">
              <i class="ti ti-world"></i>
            </a>

            <!-- Title & Description -->
            <div class="insta-content">
              <p class="insta-desc">${desc}</p>
            </div>
          </div>
        </div>
      `;
        })
        .join("");

      $("#listUndangan").html(content);

      // INIT SWIPER (dibuat ulang setiap load)
      new Swiper(".myUndanganSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false,
        },
        loop: true,

        // Breakpoints
        breakpoints: {
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        },

        pagination: {
          el: ".undangan-swiper-pagination",
          clickable: true,
        },

        navigation: {
          nextEl: ".undangan-button-next",
          prevEl: ".undangan-button-prev",
        },
      });
    },

    error: function (xhr) {
      const status = xhr.status;

      $("#listUndangan").html(`
        <div class="col-12 text-center py-5">
          <p class="text-danger fw-bold mb-1">
            Tidak ada undangan.
          </p>
          <p class="text-muted">Kode error: ${status}</p>
        </div>
      `);
    },
    complete: function () {
      $("#undangan").loading("stop");
    },
  });
};

$("#waForm").submit(function (e) {
  e.preventDefault(); // cegah reload halaman

  const name = $("#name").val().trim();
  const message = $("#message").val().trim();

  if (name === "" || message === "") {
    alert("Harap isi nama dan pesan terlebih dahulu.");
    return;
  }

  const phone = "6282345646468"; // nomor WA
  const text = encodeURIComponent(`Halo, saya *${name}*.\n\n${message}`);

  const url = `https://wa.me/${phone}?text=${text}`;

  window.open(url, "_blank");
});
