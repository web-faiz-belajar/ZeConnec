
/* =====================================
   ZeConnec - Main Application
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);
   /* SUPABASE AUTH */

const authScreen = $("#authScreen");
const authForm = $("#authForm");
const authName = $("#authName");
const authEmail = $("#authEmail");
const authPassword = $("#authPassword");
const authSubmit = $("#authSubmit");
const authMessage = $("#authMessage");
const loginTab = $("#loginTab");
const registerTab = $("#registerTab");
const appElement = $(".app");

let isRegisterMode = false;

if (authScreen && appElement && authForm) {
  appElement.style.display = "none";

  function showAuth(session) {
    if (session) {
      authScreen.style.display = "none";
      appElement.style.display = "";
    } else {
      authScreen.style.display = "flex";
      appElement.style.display = "none";
    }
  }

  function setAuthMode(register) {
    isRegisterMode = register;

    authName.hidden = !register;
    authName.required = register;

    loginTab.classList.toggle("active", !register);
    registerTab.classList.toggle("active", register);

    authSubmit.textContent = register ? "Daftar" : "Masuk";
    authMessage.textContent = "";
  }

  loginTab.addEventListener("click", () => {
    setAuthMode(false);
  });

  registerTab.addEventListener("click", () => {
    setAuthMode(true);
  });

  authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = authEmail.value.trim();
    const password = authPassword.value;
    const name = authName.value.trim();

    if (isRegisterMode && !name) {
      authMessage.textContent = "Masukkan nama pengguna.";
      return;
    }

    authSubmit.disabled = true;
    authSubmit.textContent = "Memproses...";

    try {
      let result;

      if (isRegisterMode) {
        result = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: name
            }
          }
        });
      } else {
        result = await supabaseClient.auth.signInWithPassword({
          email,
          password
        });
      }

      if (result.error) throw result.error;

      if (isRegisterMode && !result.data.session) {
        authMessage.textContent =
          "Pendaftaran berhasil. Silakan periksa email untuk konfirmasi.";
      } else {
        authMessage.textContent = "Berhasil masuk!";
      }

      if (result.data.session) {
        showAuth(result.data.session);
      }

    } catch (error) {
      authMessage.textContent = error.message;
    } finally {
      authSubmit.disabled = false;
      authSubmit.textContent = isRegisterMode ? "Daftar" : "Masuk";
    }
  });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
    showAuth(session);

    if (session?.user) {
      setTimeout(() => {
        (async () => {
  await syncUserProfile(session.user);
  await loadUserProfile(session.user);
})();
      }, 0);
    }
  });

  supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) {
      authMessage.textContent = error.message;
      return;
    }

    showAuth(data.session);

    if (data.session?.user) {
      (async () => {
  await syncUserProfile(data.session.user);
  await loadUserProfile(data.session.user);
})();
    }
  });
}

  const STORAGE = {
    theme: "zeconnec_theme",
    profile: "zeconnec_profile",
    chats: "zeconnec_chats",
    contacts: "zeconnec_contacts",
    statuses: "zeconnec_statuses"
  };

  function loadData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
   /* SUPABASE PROFILE SYNC */

let profileSyncChecked = false;

async function syncUserProfile(user) {
  if (!user || profileSyncChecked) return;

  profileSyncChecked = true;

  const username =
    user.user_metadata?.display_name ||
    user.email?.split("@")[0] ||
    "Pengguna";

  const { error } = await supabaseClient
    .from("profiles")
    .upsert({
      id: user.id,
      username: username,
      full_name: username,
      status_text: "Hai! Saya menggunakan ZeConnec."
    }, {
      onConflict: "id"
    });

  if (error) {
    profileSyncChecked = false;
    alert("Gagal menyimpan profil: " + error.message);
  } else {
    alert("Profil berhasil disimpan ke Supabase!");
  }
}
  /* THEME */

  function setTheme(theme) {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem(STORAGE.theme, theme);
  }

  const savedTheme = localStorage.getItem(STORAGE.theme) || "dark";
  setTheme(savedTheme);

  function toggleTheme() {
    const nextTheme = document.body.classList.contains("light")
      ? "dark"
      : "light";

    setTheme(nextTheme);
  }

  $("#themeBtn")?.addEventListener("click", toggleTheme);
  $("#profileThemeBtn")?.addEventListener("click", toggleTheme);

  /* NAVIGATION */

  $$(".nav-item").forEach(button => {
    button.addEventListener("click", () => {
      const pageId = button.dataset.page;
      const target = document.getElementById(pageId);

      if (!target) return;

      $$(".nav-item").forEach(item =>
        item.classList.remove("active")
      );

      $$(".page").forEach(page =>
        page.classList.remove("active")
      );

      button.classList.add("active");
      target.classList.add("active");
    });
  });

  /* HTML SECURITY */

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  /* CHAT RENDER */

  function renderChats() {
    const list = $("#chatList");
    if (!list) return;

    let filtered = chats.filter(chat => {
      if (currentFilter === "unread") return chat.unread > 0;
      if (currentFilter === "groups") return chat.type === "group";
      return true;
    });

    const search = ($("#chatSearch")?.value || "").toLowerCase();

    filtered = filtered.filter(chat =>
      String(chat.name || "").toLowerCase().includes(search)
    );

    if (!filtered.length) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">☏</div>
          <h3>Belum ada percakapan</h3>
          <p>Tambahkan kontak untuk memulai.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(chat => `
      <div class="chat-item" data-id="${escapeHTML(chat.id)}">
        <div class="avatar">${escapeHTML((chat.name || "?").charAt(0).toUpperCase())}</div>

        <div class="chat-info">
          <div class="chat-top">
            <h3>${escapeHTML(chat.name || "Kontak")}</h3>
            <span class="chat-time">${escapeHTML(chat.time || "")}</span>
          </div>

          <div class="chat-bottom">
            <span class="chat-preview">${escapeHTML(chat.lastMessage || "Mulai percakapan")}</span>
            ${chat.unread > 0
              ? `<span class="unread-badge">${chat.unread}</span>`
              : ""}
          </div>
        </div>
      </div>
    `).join("");

    $$(".chat-item").forEach(item => {
      item.addEventListener("click", () => {
        openChat(item.dataset.id);
      });
    });
  }

  /* CHAT WINDOW */

  function openChat(id) {
    const chat = chats.find(item => String(item.id) === String(id));
    if (!chat) return;

    chat.unread = 0;
    saveData(STORAGE.chats, chats);
    renderChats();

    $("#chatWindow")?.remove();

    const windowElement = document.createElement("div");
    windowElement.id = "chatWindow";
    windowElement.className = "chat-window";

    windowElement.innerHTML = `
      <div class="chat-window-header">
        <button id="backChat" type="button">‹</button>

        <div class="avatar">
          ${escapeHTML((chat.name || "?").charAt(0).toUpperCase())}
        </div>

        <div class="chat-window-user">
          <strong>${escapeHTML(chat.name || "Kontak")}</strong>
          <small>Chat lokal</small>
        </div>
      </div>

      <div class="chat-messages" id="chatMessages">
        <div class="empty-state">
          <p>Mulai percakapan dengan ${escapeHTML(chat.name || "kontak")}.</p>
        </div>
      </div>

      <form class="chat-composer" id="messageForm">
        <input id="messageInput" placeholder="Ketik pesan..." autocomplete="off">
        <button type="submit">➤</button>
      </form>
    `;

    $(".app").appendChild(windowElement);

    $("#backChat").addEventListener("click", () => {
      windowElement.remove();
    });

    const form = $("#messageForm");
    const input = $("#messageInput");
    const messages = $("#chatMessages");

    form.addEventListener("submit", event => {
      event.preventDefault();

      const message = input.value.trim();
      if (!message) return;

      messages.querySelector(".empty-state")?.remove();

      const bubble = document.createElement("div");
      bubble.className = "message-bubble";
      bubble.textContent = message;

      messages.appendChild(bubble);
      input.value = "";

      chat.lastMessage = message;
      chat.time = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      });

      saveData(STORAGE.chats, chats);
      renderChats();

      messages.scrollTop = messages.scrollHeight;
    });
  }

  /* FILTER */

  $$(".filter").forEach(button => {
    button.addEventListener("click", () => {
      $$(".filter").forEach(item =>
        item.classList.remove("active")
      );

      button.classList.add("active");
      currentFilter = button.dataset.filter;
      renderChats();
    });
  });

  $("#chatSearch")?.addEventListener("input", renderChats);

  /* CONTACTS */

  function renderContacts() {
    const list = $("#contactList");
    if (!list) return;

    const search = ($("#contactSearch")?.value || "").toLowerCase();

    const filtered = contacts.filter(contact =>
      String(contact.name || "").toLowerCase().includes(search)
    );

    if (!filtered.length) {
      list.innerHTML = `
        <div class="empty-state">
          <p>Belum ada kontak.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(contact => `
      <div class="contact-item">
        <div class="avatar">${escapeHTML((contact.name || "?").charAt(0).toUpperCase())}</div>

        <div class="contact-info">
          <h3>${escapeHTML(contact.name)}</h3>
          <p>Kontak ZeConnec</p>
        </div>

        <button class="contact-chat" data-id="${escapeHTML(contact.id)}">Chat</button>
      </div>
    `).join("");

    $$(".contact-chat").forEach(button => {
      button.addEventListener("click", () => {
        let chat = chats.find(item =>
          String(item.contactId) === String(button.dataset.id)
        );

        if (!chat) {
          const contact = contacts.find(item =>
            String(item.id) === String(button.dataset.id)
          );

          if (!contact) return;

          chat = {
            id: Date.now(),
            contactId: contact.id,
            name: contact.name,
            lastMessage: "",
            time: "",
            unread: 0,
            type: "personal"
          };

          chats.unshift(chat);
          saveData(STORAGE.chats, chats);
        }

        renderChats();
        $(".nav-item[data-page='chatPage']")?.click();
        openChat(chat.id);
      });
    });
  }

  $("#contactSearch")?.addEventListener("input", renderContacts);

  $("#addContactBtn")?.addEventListener("click", () => {
    const name = prompt("Masukkan nama kontak:");

    if (!name || !name.trim()) return;

    contacts.push({
      id: Date.now(),
      name: name.trim()
    });

    saveData(STORAGE.contacts, contacts);
    renderContacts();
  });

  $("#newChatBtn")?.addEventListener("click", () => {
    $(".nav-item[data-page='contactsPage']")?.click();
  });

  /* STATUS */

  function renderStatuses() {
    const list = $("#statusList");
    if (!list) return;

    if (!statuses.length) {
      list.innerHTML = `
        <div class="empty-state">
          <p>Belum ada pembaruan status.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = statuses.map(status => `
      <div class="contact-item">
        <div class="avatar">${escapeHTML(profile.name.charAt(0).toUpperCase())}</div>

        <div class="contact-info">
          <h3>${escapeHTML(status.text)}</h3>
          <p>${escapeHTML(status.time)}</p>
        </div>
      </div>
    `).join("");
  }

  $("#addStatusBtn")?.addEventListener("click", () => {
    const text = prompt("Tulis status:");

    if (!text || !text.trim()) return;

    statuses.unshift({
      id: Date.now(),
      text: text.trim(),
      time: new Date().toLocaleString("id-ID")
    });

    saveData(STORAGE.statuses, statuses);
    renderStatuses();
  });

  /* PROFILE */

  function renderProfile() {
    $("#profileName").textContent = profile.name;
    $("#profileAbout").textContent = profile.about;
    $("#profileAvatar").textContent =
      profile.name.charAt(0).toUpperCase();
  }

  $("#editProfileBtn")?.addEventListener("click", () => {
    const name = prompt("Nama profil:", profile.name);
    if (!name || !name.trim()) return;

    const about = prompt("Tentang saya:", profile.about);
    if (about === null) return;

    profile = {
      name: name.trim(),
      about: about.trim()
    };

    saveData(STORAGE.profile, profile);
    renderProfile();
  });

  /* HEADER BUTTONS */

  $("#searchBtn")?.addEventListener("click", () => {
    $(".nav-item[data-page='chatPage']")?.click();
    $("#chatSearch")?.focus();
  });

  $("#menuBtn")?.addEventListener("click", () => {
    alert("ZeConnec\n\nPlatform komunikasi modern.");
  });

  /* INITIALIZE */

  renderChats();
  renderContacts();
  renderStatuses();
  renderProfile();

  /* SERVICE WORKER */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js")
        .then(() => console.log("ZeConnec PWA aktif"))
        .catch(error => console.error("PWA error:", error));
    });
  }

});
