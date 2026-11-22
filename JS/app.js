
/* =========================
   ZeConnec - Main Application
========================= */

document.addEventListener("DOMContentLoaded", () => {
     // LOADING SCREEN
  const loadingScreen = document.getElementById("loadingScreen");

  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("hide");
    }, 1500);
  }

  // ELEMENTS
  const themeBtn = document.getElementById("themeBtn");
  const searchBtn = document.getElementById("searchBtn");
  const searchBox = document.getElementById("searchBox");
  const searchInput = document.getElementById("searchInput");

  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");

  const navItems = document.querySelectorAll("[data-page]");
  const pages = document.querySelectorAll(".page");

  // PAGE INFORMATION
  const pageInfo = {
    chats: {
      title: "Chat",
      subtitle: "Semua percakapanmu ada di sini."
    },

    contacts: {
      title: "Kontak",
      subtitle: "Temukan dan hubungkan dengan teman."
    },

    calls: {
      title: "Panggilan",
      subtitle: "Riwayat voice call dan video call."
    },

    profile: {
      title: "Profil",
      subtitle: "Kelola informasi akunmu."
    }
  };

  // NAVIGATION
  function openPage(pageName) {

    if (!pageInfo[pageName]) return;

    pages.forEach(page => {
      page.classList.toggle(
        "active",
        page.id === pageName
      );
    });

    navItems.forEach(item => {
      item.classList.toggle(
        "active",
        item.dataset.page === pageName
      );
    });

    if (pageTitle) {
      pageTitle.textContent =
        pageInfo[pageName].title;
    }

    if (pageSubtitle) {
      pageSubtitle.textContent =
        pageInfo[pageName].subtitle;
    }

    if (searchBox) {
      searchBox.hidden = true;
    }
  }

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      openPage(item.dataset.page);
    });
  });

  // THEME
  const savedTheme =
    localStorage.getItem("zeconnec_theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {

      document.body.classList.toggle("dark");

      const currentTheme =
        document.body.classList.contains("dark")
          ? "dark"
          : "light";

      localStorage.setItem(
        "zeconnec_theme",
        currentTheme
      );

    });
  }

  // SEARCH
  if (searchBtn && searchBox) {

    searchBtn.addEventListener("click", () => {

      searchBox.hidden = !searchBox.hidden;

      if (!searchBox.hidden && searchInput) {
        searchInput.focus();
      }

    });

  }

  if (searchInput) {

    searchInput.addEventListener("input", () => {

      const keyword =
        searchInput.value.trim().toLowerCase();

      document.dispatchEvent(
        new CustomEvent("zeconnec:search", {
          detail: { keyword }
        })
      );

    });

  }

  // NEW CHAT BUTTON
  const newChatBtn =
    document.getElementById("newChatBtn");

  const startChatBtn =
    document.getElementById("startChatBtn");

  function startNewChat() {

    openPage("contacts");

    alert(
      "Fitur pencarian pengguna akan diaktifkan setelah Supabase terhubung."
    );

  }

  if (newChatBtn) {
    newChatBtn.addEventListener(
      "click",
      startNewChat
    );
  }

  if (startChatBtn) {
    startChatBtn.addEventListener(
      "click",
      startNewChat
    );
  }

  // SERVICE WORKER
  if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register(
      "./service-worker.js"
    )
      .then(registration => {
        console.log(
          "ZeConnec Service Worker aktif.",
          registration.scope
        );
      })
      .catch(error => {
        console.error(
          "Service Worker gagal:",
          error
        );
      });

  }

  // APPLICATION READY
  console.log("ZeConnec berhasil dijalankan.");

});
