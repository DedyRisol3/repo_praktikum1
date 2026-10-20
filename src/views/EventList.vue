<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import EventCard from '@/components/event/EventCard.vue';
import SearchBar from '@/components/event/SearchBar.vue';
import CategoryFilter from '@/components/event/CategoryFilter.vue';
import AppButton from '@/components/ui/AppButton.vue';

const router = useRouter();

// MENGONSUMSI SINGLE SOURCE OF TRUTH (Hanya mengambil event yang berstatus aktif)
const { activeEvents } = useEvents();

const searchQuery = ref('');
const selectedCategory = ref('All');
const categories = ['All', 'Workshop', 'Meetup', 'Competition', 'Seminar', 'Conference'];

// FILTERING REAKTIF TERHADAP DATA STATE AKTIF
const filteredEvents = computed(() => {
  return activeEvents.value.filter(event => {
    const matchSearch = event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        event.loc.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCat = selectedCategory.value === 'All' || event.cat === selectedCategory.value;
    return matchSearch && matchCat;
  });
});

const handleViewDetail = (id) => {
  router.push(`/browse/events/${id}`);
};
</script>

<template>
  <div class="event-list-page">
    <div class="header-section">
      <h2 class="section-title">Upcoming Events</h2>
      <p class="section-desc">Discover workshops, seminars, tech meetups, and competitions near you.</p>
    </div>

    <div class="filters-section">
      <SearchBar v-model="searchQuery" />
      <CategoryFilter :categories="categories" v-model="selectedCategory" />
    </div>

    <!-- GRID EVENT AKTIF -->
    <div v-if="filteredEvents.length > 0" class="event-grid">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @view-detail="handleViewDetail"
      />
    </div>

    <!-- FRIENDLY EMPTY STATE -->
    <div v-else class="empty-state">
      <div class="empty-icon">🗓️</div>
      <h3 class="empty-title">No Events Available Yet</h3>
      <p class="empty-desc">
        There are currently no active events scheduled. Are you an organizer?
        Publish and manage your first event today through the Dashboard!
      </p>
      <div class="empty-action">
        <AppButton variant="primary" @click="router.push('/dashboard/events')">
          Go to Organizer Dashboard &rarr;
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-section { margin-bottom: var(--space-8); }
.section-title { font-size: 2.2rem; margin-bottom: var(--space-2); }
.section-desc { color: var(--text-muted); font-size: 1.1rem; }

.filters-section {
  margin-bottom: var(--space-6);
}

/* ADAPTIVE GRID */
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

/* FRIENDLY EMPTY STATE */
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

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: var(--space-3);
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
