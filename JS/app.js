
/* ========================================
   ZeConnec - Main Application
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ---------- HELPERS ---------- */

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const showMessage = (message) => {
    alert(message);
  };

  const addClick = (selector, callback) => {
    const element = $(selector);

    if (element) {
      element.addEventListener("click", callback);
    }
  };

  /* ---------- LOADING SCREEN ---------- */

  const loadingScreen = $("#loadingScreen");

  if (loadingScreen) {
    window.setTimeout(() => {
      loadingScreen.classList.add("hide");
    }, 1200);
  }

  /* ---------- PAGE NAVIGATION ---------- */

  const navItems = $$("[data-page]");
  const pages = $$(".page");

  const pageInfo = {
    chats: {
      title: "Chat",
      subtitle: "Percakapan kamu"
    },
    status: {
      title: "Status",
      subtitle: "Bagikan aktivitas terbaru"
    },
    contacts: {
      title: "Kontak",
      subtitle: "Daftar kontak kamu"
    },
    calls: {
      title: "Panggilan",
      subtitle: "Riwayat panggilan"
    },
    profile: {
      title: "Profil",
      subtitle: "Informasi akun kamu"
    }
  };

  function openPage(pageName) {
    if (!pageInfo[pageName]) return;

    pages.forEach((page) => {
      page.classList.toggle(
        "active",
        page.id === pageName
      );
    });

    navItems.forEach((item) => {
      item.classList.toggle(
        "active",
        item.dataset.page === pageName
      );
    });

    const title = $("#pageTitle");
    const subtitle = $("#pageSubtitle");

    if (title) {
      title.textContent = pageInfo[pageName].title;
    }

    if (subtitle) {
      subtitle.textContent = pageInfo[pageName].subtitle;
    }

    const searchBox = $("#searchBox");

    if (searchBox) {
      searchBox.hidden = true;
    }

    const moreMenu = $("#moreMenu");

    if (moreMenu) {
      moreMenu.hidden = true;
    }
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      openPage(item.dataset.page);
    });
  });

  /* ---------- THEME ---------- */

  const themeBtn = $("#themeBtn");
  const savedTheme = localStorage.getItem("zeconnec_theme");

  function applyTheme(theme) {
    document.body.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("zeconnec_theme", theme);

    if (themeBtn) {
      themeBtn.textContent =
        theme === "dark" ? "☀" : "☾";

      themeBtn.setAttribute(
        "aria-label",
        theme === "dark"
          ? "Aktifkan tema terang"
          : "Aktifkan tema gelap"
      );
    }
  }

  applyTheme(savedTheme === "dark" ? "dark" : "light");

  addClick("#themeBtn", () => {
    const isDark = document.body.classList.contains("dark");

    applyTheme(isDark ? "light" : "dark");
  });

  /* ---------- SEARCH ---------- */

  const searchBtn = $("#searchBtn");
  const searchBox = $("#searchBox");
  const searchInput = $("#searchInput");

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
      document.dispatchEvent(
        new CustomEvent("zeconnec:search", {
          detail: {
            query: searchInput.value.trim().toLowerCase()
          }
        })
      );
    });
  }

  /* ---------- NEW CHAT ---------- */

  addClick("#startChatBtn", () => {
    openPage("contacts");

    showMessage(
      "Fitur chat dengan pengguna lain akan aktif setelah backend ZeConnec terhubung."
    );
  });

  addClick("#createGroupBtn", () => {
    const menu = $("#moreMenu");

    if (menu) {
      menu.hidden = true;
    }

    showMessage(
      "Pembuatan grup akan diaktifkan setelah backend ZeConnec tersedia."
    );
  });

  /* ---------- MORE MENU ---------- */

  const moreMenuBtn = $("#moreMenuBtn");
  const moreMenu = $("#moreMenu");

  if (moreMenuBtn && moreMenu) {
    moreMenuBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      moreMenu.hidden = !moreMenu.hidden;
    });

    moreMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", () => {
      moreMenu.hidden = true;
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        moreMenu.hidden = true;
      }
    });
  }

  addClick("#markAllReadBtn", () => {
    showMessage(
      "Fitur tandai semua pesan sudah dibaca akan tersedia setelah sistem chat aktif."
    );

    if (moreMenu) {
      moreMenu.hidden = true;
    }
  });

  addClick("#appSettingsBtn", () => {
    showMessage(
      "Pengaturan lengkap ZeConnec sedang disiapkan."
    );

    if (moreMenu) {
      moreMenu.hidden = true;
    }
  });

  /* ---------- STATUS MODAL ---------- */

  const statusModal = $("#statusModal");

  function openStatusModal() {
    if (statusModal) {
      statusModal.hidden = false;
    }
  }

  function closeStatusModal() {
    if (statusModal) {
      statusModal.hidden = true;
    }
  }

  addClick("#myStatusBtn", openStatusModal);
  addClick("#closeStatusModal", closeStatusModal);

  if (statusModal) {
    statusModal.addEventListener("click", (event) => {
      if (event.target === statusModal) {
        closeStatusModal();
      }
    });
  }

  /* ---------- TEXT STATUS ---------- */

  const textStatusModal = $("#textStatusModal");
  const textStatusInput = $("#textStatusInput");
  const textStatusCounter = $("#textStatusCounter");

  addClick("#textStatusBtn", () => {
    closeStatusModal();

    if (textStatusModal) {
      textStatusModal.hidden = false;
    }
  });

  addClick("#closeTextStatus", () => {
    if (textStatusModal) {
      textStatusModal.hidden = true;
    }
  });

  if (textStatusInput && textStatusCounter) {
    textStatusInput.addEventListener("input", () => {
      textStatusCounter.textContent =
        `${textStatusInput.value.length}/500`;
    });
  }

  addClick("#publishTextStatus", () => {
    if (!textStatusInput) return;

    const text = textStatusInput.value.trim();

    if (!text) {
      showMessage("Tulis status terlebih dahulu.");
      return;
    }

    if (text.length > 500) {
      showMessage("Status maksimal 500 karakter.");
      return;
    }

    const statuses = JSON.parse(
      localStorage.getItem("zeconnec_status_drafts") || "[]"
    );

    statuses.unshift({
      type: "text",
      content: text,
      createdAt: Date.now()
    });

    localStorage.setItem(
      "zeconnec_status_drafts",
      JSON.stringify(statuses.slice(0, 20))
    );

    textStatusInput.value = "";

    if (textStatusCounter) {
      textStatusCounter.textContent = "0/500";
    }

    if (textStatusModal) {
      textStatusModal.hidden = true;
    }

    showMessage(
      "Status tersimpan di perangkat ini. Status belum dibagikan kepada pengguna lain."
    );
  });

  /* ---------- MEDIA STATUS ---------- */

  const statusImageInput = $("#statusImageInput");
  const statusVideoInput = $("#statusVideoInput");

  const statusImagePreview = $("#statusImagePreview");
  const statusVideoPreview = $("#statusVideoPreview");

  const statusMediaCaption = $("#statusMediaCaption");
  const statusPreviewModal = $("#statusPreviewModal");

  let currentMediaUrl = null;
  let currentMediaType = null;
  let currentMediaFile = null;

  function clearMediaPreview() {
    if (currentMediaUrl) {
      URL.revokeObjectURL(currentMediaUrl);
      currentMediaUrl = null;
    }

    currentMediaType = null;
    currentMediaFile = null;

    if (statusImageInput) {
      statusImageInput.value = "";
    }

    if (statusVideoInput) {
      statusVideoInput.value = "";
    }

    if (statusImagePreview) {
      statusImagePreview.removeAttribute("src");
      statusImagePreview.hidden = true;
    }

    if (statusVideoPreview) {
      statusVideoPreview.pause();
      statusVideoPreview.removeAttribute("src");
      statusVideoPreview.load();
      statusVideoPreview.hidden = true;
    }

    if (statusMediaCaption) {
      statusMediaCaption.value = "";
    }
  }

  function previewMedia(file, type) {
    if (!file) return;

    const maxSize = 50 * 1024 * 1024;

    if (file.size > maxSize) {
      showMessage("Ukuran file maksimal 50 MB.");
      return;
    }

    if (currentMediaUrl) {
      URL.revokeObjectURL(currentMediaUrl);
    }

    currentMediaUrl = URL.createObjectURL(file);
    currentMediaType = type;
    currentMediaFile = file;

    if (statusImagePreview) {
      statusImagePreview.hidden = true;
    }

    if (statusVideoPreview) {
      statusVideoPreview.pause();
      statusVideoPreview.hidden = true;
    }

    if (type === "image" && statusImagePreview) {
      statusImagePreview.src = currentMediaUrl;
      statusImagePreview.hidden = false;
    }

    if (type === "video" && statusVideoPreview) {
      statusVideoPreview.src = currentMediaUrl;
      statusVideoPreview.hidden = false;
      statusVideoPreview.load();
    }

    if (statusPreviewModal) {
      statusPreviewModal.hidden = false;
    }
  }

  if (statusImageInput) {
    statusImageInput.addEventListener("change", () => {
      const file = statusImageInput.files[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        showMessage("Pilih file gambar yang valid.");
        statusImageInput.value = "";
        return;
      }

      previewMedia(file, "image");
    });
  }

  if (statusVideoInput) {
    statusVideoInput.addEventListener("change", () => {
      const file = statusVideoInput.files[0];

      if (!file) return;

      if (!file.type.startsWith("video/")) {
        showMessage("Pilih file video yang valid.");
        statusVideoInput.value = "";
        return;
      }

      previewMedia(file, "video");
    });
  }

  addClick("#closeStatusPreview", () => {
    if (statusPreviewModal) {
      statusPreviewModal.hidden = true;
    }

    clearMediaPreview();
  });

  if (statusPreviewModal) {
    statusPreviewModal.addEventListener("click", (event) => {
      if (event.target === statusPreviewModal) {
        statusPreviewModal.hidden = true;
        clearMediaPreview();
      }
    });
  }

  addClick("#publishMediaStatus", () => {
    if (!currentMediaFile || !currentMediaType) {
      showMessage("Pilih foto atau video terlebih dahulu.");
      return;
    }

    showMessage(
      "Pratinjau media berhasil. Untuk membagikan foto atau video kepada pengguna lain, backend dan penyimpanan ZeConnec perlu diaktifkan."
    );
  });

  /* ---------- STATUS VIEWER ---------- */

  const statusViewer = $("#statusViewer");

  addClick("#closeStatusViewer", () => {
    if (statusViewer) {
      statusViewer.hidden = true;
    }
  });

  if (statusViewer) {
    statusViewer.addEventListener("click", (event) => {
      if (event.target === statusViewer) {
        statusViewer.hidden = true;
      }
    });
  }

  addClick("#viewAllStatusBtn", () => {
    const savedStatuses = JSON.parse(
      localStorage.getItem("zeconnec_status_drafts") || "[]"
    );

    if (savedStatuses.length === 0) {
      showMessage("Belum ada status tersimpan di perangkat ini.");
      return;
    }

    const latestStatus = savedStatuses[0];

    showMessage(
      `Status terakhir: ${latestStatus.content || "Status media"}`
    );
  });

  /* ---------- ESCAPE KEY ---------- */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    closeStatusModal();

    if (textStatusModal) {
      textStatusModal.hidden = true;
    }

    if (statusPreviewModal) {
      statusPreviewModal.hidden = true;
      clearMediaPreview();
    }

    if (statusViewer) {
      statusViewer.hidden = true;
    }
  });

  /* ---------- SERVICE WORKER ---------- */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .catch((error) => {
          console.error(
            "ZeConnec Service Worker Error:",
            error
          );
        });
    });
  }

});
