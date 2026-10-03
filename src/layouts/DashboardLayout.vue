<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <!-- RAIL & PANE SYSTEM
       Kerangka khusus untuk kebutuhan produktivitas/pengelolaan aplikasi. -->
  <div class="dashboard-layout">

    <!-- RAIL: Navigasi samping yang posisinya terkunci (fixed) -->
    <aside class="dashboard-rail">
      <div class="rail-brand">
        <router-link to="/">Gatherly Organizer</router-link>
      </div>
      <nav class="rail-nav">
        <router-link to="/dashboard" class="rail-link active">Overview</router-link>
        <a href="#" class="rail-link">My Events</a>
        <a href="#" class="rail-link">Attendees</a>
        <a href="#" class="rail-link">QR Check-in</a>
      </nav>
      <div class="rail-footer">
        <router-link to="/" class="rail-link">&larr; Back to Public</router-link>
      </div>
    </aside>

    <!-- PANE: Area utama dinamis tempat konten berubah dan bisa digulir secara mandiri -->
    <main class="dashboard-pane">
      <header class="pane-header">
        <h1>Dashboard</h1>
        <div class="user-profile">Admin</div>
      </header>
      <div class="pane-content">
        <RouterView />
      </div>
    </main>

  </div>
</template>

<style scoped>
/*
  Full-screen app layout (khas dashboard).
  Tinggi dibatasi 100vh agar bagian rail tidak ikut terguyur ke atas saat pane di-scroll.
*/
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-gray);
}

/* RAIL STYLES */
.dashboard-rail {
  width: 260px;
  background-color: #1c1948; /* Kontras gelap membedakan area nav dan konten */
  color: white;
  display: flex;
  flex-direction: column;
}

.rail-brand {
  padding: var(--space-6);
  font-size: 1.2rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.rail-brand a { color: white; text-decoration: none; }

.rail-nav {
  flex: 1;
  padding: var(--space-6) 0;
  display: flex;
  flex-direction: column;
}

.rail-link {
  padding: var(--space-3) var(--space-6);
  color: #a0a0b0;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}

.rail-link:hover, .rail-link.active {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-left: 4px solid var(--primary);
}

.rail-footer { padding: var(--space-6); border-top: 1px solid rgba(255, 255, 255, 0.1); }

/* PANE STYLES */
.dashboard-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Scroll khusus untuk area ini saja */
}

.pane-header {
  background: white;
  padding: var(--space-4) var(--space-8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.pane-header h1 { font-size: 1.5rem; margin: 0; }

.pane-content {
  padding: var(--space-8);
}
</style>
