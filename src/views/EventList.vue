<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import EventCard from '@/components/event/EventCard.vue';
import SearchBar from '@/components/event/SearchBar.vue';
import CategoryFilter from '@/components/event/CategoryFilter.vue';
import AppButton from '@/components/ui/AppButton.vue';

const router = useRouter();

// MENGONSUMSI SINGLE SOURCE OF TRUTH (REST API & State Reaktif)
const { activeEvents, isUserRegistered, loading, error, fetchEvents } = useEvents();

const searchQuery = ref('');
const selectedCategory = ref('All');
const categories = ['All', 'Workshop', 'Meetup', 'Competition', 'Seminar', 'Conference'];

// FILTERING REAKTIF TERHADAP DATA STATE AKTIF
const filteredEvents = computed(() => {
  return activeEvents.value.filter(event => {
    const titleMatch = (event.title || '').toLowerCase().includes(searchQuery.value.toLowerCase());
    const locMatch = (event.loc || '').toLowerCase().includes(searchQuery.value.toLowerCase());
    const searchMatch = titleMatch || locMatch;
    const matchCat = selectedCategory.value === 'All' || event.cat === selectedCategory.value;
    return searchMatch && matchCat;
  });
});

const handleViewDetail = (id) => {
  router.push(`/browse/events/${id}`);
};

// PANGGIL REST API SAAT HALAMAN PERTAMA KALI DIBUKA (LIFECYCLE ONMOUNTED)
onMounted(() => {
  fetchEvents();
});
</script>

<template>
  <div class="event-list-page">
    <div class="header-section">
      <div class="header-top">
        <h2 class="section-title">Upcoming Events</h2>
        <button
          v-if="!loading"
          class="btn-refresh"
          title="Muat Ulang Data dari Server"
          @click="fetchEvents"
        >
          🔄 Muat Ulang
        </button>
      </div>
      <p class="section-desc">Discover workshops, seminars, tech meetups, and competitions near you.</p>
    </div>

    <div class="filters-section">
      <SearchBar v-model="searchQuery" />
      <CategoryFilter :categories="categories" v-model="selectedCategory" />
    </div>

    <!-- 1. LOADING STATE (SKELETON CARDS SHIMMER) -->
    <div v-if="loading" class="event-grid">
      <div v-for="n in 6" :key="n" class="skeleton-card">
        <div class="skeleton-meta">
          <div class="skeleton-line skeleton-date"></div>
          <div class="skeleton-pill"></div>
        </div>
        <div class="skeleton-line skeleton-title"></div>
        <div class="skeleton-line skeleton-loc"></div>
        <div class="skeleton-line skeleton-desc"></div>
        <div class="skeleton-line skeleton-desc short"></div>
      </div>
    </div>

    <!-- 2. ERROR STATE (DISERTAI TOMBOL MUAT ULANG / RETRY) -->
    <div v-else-if="error" class="error-state">
      <div class="error-badge">NETWORK ERROR</div>
      <h3>Gagal Memuat Data Acara</h3>
      <p>{{ error }}</p>
      <div class="error-action">
        <AppButton variant="primary" @click="fetchEvents">
          🔄 Muat Ulang Produk & Acara
        </AppButton>
      </div>
    </div>

    <!-- 3. EMPTY STATE (KATALOG KOSONG) -->
    <div v-else-if="filteredEvents.length === 0" class="empty-state">
      <div class="empty-badge">CATALOG EMPTY</div>
      <h3>No Events Available Yet</h3>
      <p>
        There are currently no active events scheduled. Are you an organizer?
        Publish and manage your first event today through the Dashboard!
      </p>
      <div class="empty-action">
        <AppButton variant="primary" @click="router.push('/dashboard')">
          Go to Organizer Dashboard &rarr;
        </AppButton>
      </div>
    </div>

    <!-- 4. DATA / SUCCESS STATE (GRID EVENT RESMI DARI REST API) -->
    <div v-else class="event-grid">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        :is-registered="isUserRegistered(event.id)"
        @view-detail="handleViewDetail"
      />
    </div>
  </div>
</template>

<style scoped>
.header-section { margin-bottom: var(--space-8); }
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-title { font-size: 2.2rem; margin-bottom: var(--space-2); }
.section-desc { color: var(--text-muted); font-size: 1.1rem; }

.btn-refresh {
  background: transparent;
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: var(--text-muted);
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-refresh:hover {
  background: var(--bg-gray);
  color: var(--primary);
  border-color: var(--primary);
}

.filters-section {
  margin-bottom: var(--space-6);
}

/* ADAPTIVE GRID */
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.empty-state {
  text-align: center;
  padding: var(--space-12) var(--space-8);
  color: var(--text-muted);
  background: white;
  border-radius: var(--space-4);
  border: 1px dashed var(--border-color);
  max-width: 600px;
  margin: var(--space-8) auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.empty-badge {
  display: inline-block;
  background: var(--bg-light);
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 12px;
  border-radius: 50px;
  border: 1px solid var(--border-color);
  margin-bottom: var(--space-4);
}

.empty-state h3 {
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.empty-state p {
  line-height: 1.6;
  margin-bottom: var(--space-6);
  font-size: 1rem;
}

.empty-action {
  display: flex;
  justify-content: center;
}
</style>
