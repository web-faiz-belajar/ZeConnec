
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

   
  // MORE MENU
  const moreMenuBtn = document.getElementById("moreMenuBtn");
  const moreMenu = document.getElementById("moreMenu");

  const createGroupBtn = document.getElementById("createGroupBtn");
  const markAllReadBtn = document.getElementById("markAllReadBtn");
  const appSettingsBtn = document.getElementById("appSettingsBtn");

  function closeMoreMenu() {
    if (!moreMenu || !moreMenuBtn) return;

    moreMenu.hidden = true;
    moreMenuBtn.setAttribute("aria-expanded", "false");
  }

  if (moreMenuBtn && moreMenu) {
    moreMenuBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      moreMenu.hidden = !moreMenu.hidden;

      moreMenuBtn.setAttribute(
        "aria-expanded",
        String(!moreMenu.hidden)
      );
    });

    moreMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", closeMoreMenu);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMoreMenu();
      }
    });
  }

  // CREATE GROUP
  if (createGroupBtn) {
    createGroupBtn.addEventListener("click", () => {
      closeMoreMenu();

      alert(
        "Fitur buat grup akan diaktifkan setelah sistem akun dan Supabase terhubung."
      );
    });
  }

  // MARK ALL AS READ
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", () => {
      closeMoreMenu();

      alert(
        "Belum ada percakapan yang bisa ditandai sudah dibaca."
      );
    });
  }

  // APP SETTINGS
  if (appSettingsBtn) {
    appSettingsBtn.addEventListener("click", () => {
      closeMoreMenu();

      alert(
        "Halaman pengaturan aplikasi akan segera dibuat."
      );
    });
  }

   // STATUS MODAL
const myStatusBtn = document.getElementById("myStatusBtn");
const statusModal = document.getElementById("statusModal");
const closeStatusModal = document.getElementById("closeStatusModal");

const textStatusBtn = document.getElementById("textStatusBtn");
const photoStatusBtn = document.getElementById("photoStatusBtn");
const videoStatusBtn = document.getElementById("videoStatusBtn");

const statusPhotoInput = document.getElementById("statusPhotoInput");
const statusVideoInput = document.getElementById("statusVideoInput");

if (myStatusBtn && statusModal) {
  myStatusBtn.addEventListener("click", () => {
    statusModal.hidden = false;
  });
}

if (closeStatusModal) {
  closeStatusModal.addEventListener("click", () => {
    statusModal.hidden = true;
  });
}

if (statusModal) {
  statusModal.addEventListener("click", (event) => {
    if (event.target === statusModal) {
      statusModal.hidden = true;
    }
  });
}

if (textStatusBtn) {
  textStatusBtn.addEventListener("click", () => {
    alert("Fitur status teks akan dibuat pada langkah berikutnya.");
  });
}

if (photoStatusBtn && statusPhotoInput) {
  photoStatusBtn.addEventListener("click", () => {
    statusPhotoInput.click();
  });
}

if (videoStatusBtn && statusVideoInput) {
  videoStatusBtn.addEventListener("click", () => {
    statusVideoInput.click();
  });
}
// STATUS MEDIA PREVIEW
const statusPreviewModal = document.getElementById("statusPreviewModal");
const closeStatusPreview = document.getElementById("closeStatusPreview");
const statusImagePreview = document.getElementById("statusImagePreview");
const statusVideoPreview = document.getElementById("statusVideoPreview");
const statusMediaCaption = document.getElementById("statusMediaCaption");
const publishMediaStatus = document.getElementById("publishMediaStatus");

let statusMediaURL = null;

function showStatusPreview(file, type) {
  if (!file || !statusPreviewModal) return;

  if (statusMediaURL) {
    URL.revokeObjectURL(statusMediaURL);
  }

  statusMediaURL = URL.createObjectURL(file);

  statusImagePreview.hidden = true;
  statusVideoPreview.hidden = true;
  statusVideoPreview.pause();

  if (type === "image") {
    statusImagePreview.src = statusMediaURL;
    statusImagePreview.hidden = false;
  } else {
    statusVideoPreview.src = statusMediaURL;
    statusVideoPreview.hidden = false;
  }

  statusMediaCaption.value = "";
  statusModal.hidden = true;
  statusPreviewModal.hidden = false;
}

if (statusPhotoInput) {
  statusPhotoInput.addEventListener("change", () => {
    const file = statusPhotoInput.files[0];
    if (file) showStatusPreview(file, "image");
  });
}

if (statusVideoInput) {
  statusVideoInput.addEventListener("change", () => {
    const file = statusVideoInput.files[0];
    if (file) showStatusPreview(file, "video");
  });
}

function closeMediaPreview() {
  statusPreviewModal.hidden = true;
  statusVideoPreview.pause();

  statusImagePreview.src = "";
  statusVideoPreview.src = "";

  if (statusMediaURL) {
    URL.revokeObjectURL(statusMediaURL);
    statusMediaURL = null;
  }

  statusPhotoInput.value = "";
  statusVideoInput.value = "";
}

if (closeStatusPreview) {
  closeStatusPreview.addEventListener("click", closeMediaPreview);
}

if (publishMediaStatus) {
  publishMediaStatus.addEventListener("click", () => {
    alert("Pratinjau status berhasil. Publikasi ke teman akan diaktifkan setelah Supabase terhubung.");
    closeMediaPreview();
  });
}

   // TEXT STATUS EDITOR
const textStatusModal = document.getElementById("textStatusModal");
const closeTextStatus = document.getElementById("closeTextStatus");
const textStatusContent = document.getElementById("textStatusContent");
const statusCharCount = document.getElementById("statusCharCount");
const publishTextStatus = document.getElementById("publishTextStatus");

if (textStatusBtn && textStatusModal) {
  textStatusBtn.addEventListener("click", () => {
    statusModal.hidden = true;
    textStatusModal.hidden = false;
    textStatusContent.focus();
  });
}

if (closeTextStatus) {
  closeTextStatus.addEventListener("click", () => {
    textStatusModal.hidden = true;
  });
}

if (textStatusContent && statusCharCount) {
  textStatusContent.addEventListener("input", () => {
    statusCharCount.textContent =
      `${textStatusContent.value.length}/500`;
  });
}

if (publishTextStatus) {
  publishTextStatus.addEventListener("click", () => {
    const content = textStatusContent.value.trim();

    if (!content) {
      alert("Tulis sesuatu terlebih dahulu.");
      return;
    }

    alert("Status teks berhasil dibuat sebagai konsep lokal. Publikasi ke teman memerlukan koneksi Supabase.");

    textStatusContent.value = "";
    statusCharCount.textContent = "0/500";
    textStatusModal.hidden = true;
  });
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
