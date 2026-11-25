
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta name="theme-color" content="#080808">
  <meta name="description" content="ZeConnec - Modern Communication Platform">

  <title>ZeConnec</title>

  <link rel="manifest" href="./manifest.json">
  <link rel="stylesheet" href="./CSS/style.css">

  <style>
    /* SVG ICONS */

    .icon {
      width: 22px;
      height: 22px;
      display: block;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.7;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .icon-small {
      width: 19px;
      height: 19px;
    }

    .header-actions button,
    .page-heading button {
      display: grid;
      place-items: center;
    }

    .bottom-nav .nav-item .icon {
      width: 23px;
      height: 23px;
    }

    .my-status .avatar {
      display: grid;
      place-items: center;
    }
  </style>
</head>

<body>

<div class="app">

  <!-- HEADER -->

  <header class="header">

    <div class="header-left">

      <img
        src="./assets/icons/icon-512.png"
        class="brand-logo"
        alt="ZeConnec Logo"
      >

      <h1>ZeConnec</h1>

    </div>

    <div class="header-actions">

      <button id="searchBtn" aria-label="Cari">
        <svg class="icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7"/>
          <path d="m16 16 4 4"/>
        </svg>
      </button>

      <button id="themeBtn" aria-label="Ubah tema">
        <svg class="icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 3a9 9 0 0 1 0 18z"/>
        </svg>
      </button>

      <button id="menuBtn" aria-label="Menu">
        <svg class="icon" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1"/>
          <circle cx="12" cy="12" r="1"/>
          <circle cx="12" cy="19" r="1"/>
        </svg>
      </button>

    </div>

  </header>

  <!-- MAIN CONTENT -->

  <main class="main-content">

    <!-- CHAT PAGE -->

    <section class="page active" id="chatPage">

      <div class="page-heading">

        <h2>Pesan</h2>

        <button id="newChatBtn" aria-label="Pesan baru">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 5v14"/>
            <path d="M5 12h14"/>
          </svg>
        </button>

      </div>

      <div class="search-box">

        <svg class="icon icon-small" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7"/>
          <path d="m16 16 4 4"/>
        </svg>

        <input
          id="chatSearch"
          type="search"
          placeholder="Cari percakapan"
        >

      </div>

      <div class="chat-filter">

        <button class="filter active" data-filter="all">
          Semua
        </button>

        <button class="filter" data-filter="unread">
          Belum dibaca
        </button>

        <button class="filter" data-filter="groups">
          Grup
        </button>

      </div>

      <div id="chatList" class="chat-list">

        <div class="empty-state">

          <div class="empty-icon">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.9-4.5A8.5 8.5 0 1 1 21 11.5Z"/>
            </svg>
          </div>

          <h3>Belum ada percakapan</h3>
          <p>Percakapanmu akan muncul di sini.</p>

        </div>

      </div>

    </section>

    <!-- STATUS PAGE -->

    <section class="page" id="statusPage">

      <div class="page-heading">

        <h2>Status</h2>

        <button id="addStatusBtn" aria-label="Tambah status">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 5v14"/>
            <path d="M5 12h14"/>
          </svg>
        </button>

      </div>

      <div class="my-status">

        <div class="avatar">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 5v14"/>
            <path d="M5 12h14"/>
          </svg>
        </div>

        <div>
          <h3>Status saya</h3>
          <p>Bagikan sesuatu yang baru</p>
        </div>

      </div>

      <div class="section-label">
        PEMBARUAN TERBARU
      </div>

      <div id="statusList" class="status-list">

        <div class="empty-state">
          <p>Belum ada pembaruan status.</p>
        </div>

      </div>

    </section>

    <!-- CONTACTS PAGE -->

    <section class="page" id="contactsPage">

      <div class="page-heading">

        <h2>Kontak</h2>

        <button id="addContactBtn" aria-label="Tambah kontak">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 5v14"/>
            <path d="M5 12h14"/>
          </svg>
        </button>

      </div>

      <div class="search-box">

        <svg class="icon icon-small" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7"/>
          <path d="m16 16 4 4"/>
        </svg>

        <input
          id="contactSearch"
          type="search"
          placeholder="Cari kontak"
        >

      </div>

      <div id="contactList" class="contact-list">

        <div class="empty-state">
          <p>Belum ada kontak.</p>
        </div>

      </div>

    </section>

    <!-- CALLS PAGE -->

    <section class="page" id="callsPage">

      <div class="page-heading">
        <h2>Panggilan</h2>
      </div>

      <div id="callList" class="call-list">

        <div class="empty-state">

          <div class="empty-icon">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 8.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z"/>
            </svg>
          </div>

          <h3>Belum ada panggilan</h3>
          <p>Riwayat panggilan akan muncul di sini.</p>

        </div>

      </div>

    </section>

    <!-- PROFILE PAGE -->

    <section class="page" id="profilePage">

      <div class="page-heading">

        <h2>Profil</h2>

        <button id="editProfileBtn">
          Edit
        </button>

      </div>

      <div class="profile-card">

        <div class="profile-avatar" id="profileAvatar">
          Z
        </div>

        <h2 id="profileName">
          Pengguna ZeConnec
        </h2>

        <p id="profileAbout">
          Hai! Saya menggunakan ZeConnec.
        </p>

      </div>

      <div class="settings-list">

        <div class="setting-item">

          <span>
            <svg class="icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 3a9 9 0 0 1 0 18z"/>
            </svg>
          </span>

          <div>
            <h3>Tampilan</h3>
            <p>Atur tema aplikasi</p>
          </div>

          <button id="profileThemeBtn">
            Ubah
          </button>

        </div>

        <div class="setting-item">

          <span>
            <svg class="icon" viewBox="0 0 24 24">
              <rect x="4" y="10" width="16" height="11" rx="2"/>
              <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
            </svg>
          </span>

          <div>
            <h3>Privasi</h3>
            <p>Pengaturan privasi</p>
          </div>

        </div>

        <div class="setting-item">

          <span>
            <svg class="icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 11v5"/>
              <path d="M12 8h.01"/>
            </svg>
          </span>

          <div>
            <h3>Tentang</h3>
            <p>ZeConnec Communication Platform</p>
          </div>

        </div>

      </div>

    </section>

  </main>

  <!-- BOTTOM NAVIGATION -->

  <nav class="bottom-nav">

    <button class="nav-item active" data-page="chatPage">

      <svg class="icon" viewBox="0 0 24 24">
        <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.9-4.5A8.5 8.5 0 1 1 21 11.5Z"/>
      </svg>

      <small>Chat</small>

    </button>

    <button class="nav-item" data-page="statusPage">

      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="12" cy="12" r="1"/>
      </svg>

      <small>Status</small>

    </button>

    <button class="nav-item" data-page="contactsPage">

      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="9" cy="8" r="4"/>
        <path d="M2 21a7 7 0 0 1 14 0"/>
        <path d="M19 8v6"/>
        <path d="M16 11h6"/>
      </svg>

      <small>Kontak</small>

    </button>

    <button class="nav-item" data-page="callsPage">

      <svg class="icon" viewBox="0 0 24 24">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 8.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z"/>
      </svg>

      <small>Panggilan</small>

    </button>

    <button class="nav-item" data-page="profilePage">

      <svg class="icon" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 21a8 8 0 0 1 16 0"/>
      </svg>

      <small>Profil</small>

    </button>

  </nav>

</div>

<script src="./JS/app.js" defer></script>

</body>
</html>
