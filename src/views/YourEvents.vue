<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import AppCard from '@/components/ui/AppCard.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppModal from '@/components/ui/AppModal.vue';

const router = useRouter();
const { userRegistrations, cancelRegistration, getEventById, events } = useEvents();

// HANYA MENAMPILKAN PENDAFTARAN DARI EVENT YANG MASIH ADA DI SISTEM
const activeRegistrations = computed(() => {
  return userRegistrations.value.filter(r => events.value.some(e => e.id === r.eventId));
});

// MEMERIKSA STATUS SELESAI EVENT DARI ORGANIZER DASHBOARD SECARA REAKTIF
const isEventDone = (eventId) => {
  const ev = getEventById(eventId);
  return ev ? ev.done : false;
};

// STATE MODAL PEMBATALAN
const isCancelModalOpen = ref(false);
const eventToCancel = ref(null);

const handleOpenCancelModal = (eventId) => {
  eventToCancel.value = eventId;
  isCancelModalOpen.value = true;
};

const handleConfirmCancel = () => {
  if (eventToCancel.value) {
    cancelRegistration(eventToCancel.value);
    isCancelModalOpen.value = false;
    eventToCancel.value = null;
  }
};
</script>

<template>
  <div class="your-events-container">
    <header class="page-header">
      <h2 class="page-title">Your Events</h2>
      <p class="page-desc">Review your confirmed event registrations and view official digital passes.</p>
    </header>

    <!-- EMPTY STATE: JIKA BELUM ADA EVENT YANG DIDAFTAR ATAU SUDAH DIHAPUS -->
    <div v-if="activeRegistrations.length === 0" class="empty-state">
      <div class="empty-badge">NO REGISTRATIONS</div>
      <h3>No Registered Events Yet</h3>
      <p>
        You have not signed up for any active events. Explore our catalog to find workshops,
        meetups, and conferences that match your interests.
      </p>
      <AppButton variant="primary" @click="router.push('/browse/events')">
        Explore Events Catalog &rarr;
      </AppButton>
    </div>

    <!-- LIST TIKET TERDAFTAR -->
    <div v-else class="tickets-grid">
      <AppCard v-for="item in activeRegistrations" :key="item.id" class="ticket-summary-card">
        <div class="card-top">
          <div class="top-left">
            <span class="category-tag">{{ item.eventCat }}</span>
            <span :class="['lifecycle-tag', isEventDone(item.eventId) ? 'tag-concluded' : 'tag-upcoming']">
              {{ isEventDone(item.eventId) ? 'CONCLUDED' : 'UPCOMING' }}
            </span>
          </div>
          <span class="booking-tag">#{{ item.bookingCode }}</span>
        </div>

        <h3 class="card-event-title">{{ item.eventTitle }}</h3>

        <div class="card-meta">
          <span class="meta-row"><strong>Date:</strong> {{ item.eventDate }}</span>
          <span class="meta-row"><strong>Location:</strong> {{ item.eventLoc }}</span>
          <span class="meta-row"><strong>Attendee:</strong> {{ item.fullName }}</span>
        </div>

        <div class="card-bottom">
          <button class="btn-view-ticket" @click="router.push(`/browse/your-events/${item.eventId}`)">
            View Ticket Details &rarr;
          </button>

          <button
            v-if="!isEventDone(item.eventId)"
            class="btn-subtle-cancel"
            @click="handleOpenCancelModal(item.eventId)"
          >
            Cancel
          </button>
          <span v-else class="tag-archived-label">Archived</span>
        </div>
      </AppCard>
    </div>

    <!-- MODAL KONFIRMASI PEMBATALAN REGISTRASI (RESET PENGUJIAN) -->
    <AppModal
      :is-open="isCancelModalOpen"
      title="Cancel Registration?"
      message="Are you sure you want to cancel your registration? Your reserved seat will be restored and made available for other attendees."
      badge-text="WARNING"
      variant="danger"
      cancel-text="Keep Ticket"
      confirm-text="Yes, Cancel Registration"
      @confirm="handleConfirmCancel"
      @close="isCancelModalOpen = false"
    />
  </div>
</template>

<style scoped>
.your-events-container {
  padding-bottom: var(--space-12);
}

.page-header {
  margin-bottom: var(--space-8);
}

.page-title {
  font-size: 2.2rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.page-desc {
  color: var(--text-muted);
  font-size: 1.1rem;
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: var(--space-12) var(--space-8);
  color: var(--text-muted);
  background: white;
  border-radius: var(--space-4);
  border: 1px dashed var(--border-color);
  max-width: 600px;
  margin: var(--space-8) auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
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

/* TICKETS GRID */
.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-6);
}

.ticket-summary-card {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  background: white;
  box-sizing: border-box;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
  gap: var(--space-2);
}

.top-left {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.category-tag {
  background: #ede9fe;
  color: #6d28d9;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
}

.lifecycle-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  border-radius: 4px;
}

.tag-upcoming {
  background: #dbeafe;
  color: #1d4ed8;
}

.tag-concluded {
  background: #f1f5f9;
  color: #64748b;
}

.booking-tag {
  font-family: monospace;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-light);
  padding: 3px 8px;
  border-radius: 4px;
}

.card-event-title {
  font-size: 1.3rem;
  color: var(--text-main);
  margin-bottom: var(--space-3);
  line-height: 1.3;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  flex-grow: 1;
}

.meta-row {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.meta-row strong {
  color: var(--text-main);
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-color);
}

.btn-view-ticket {
  background: none;
  border: none;
  color: var(--primary);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0;
}

.btn-view-ticket:hover {
  text-decoration: underline;
}

.btn-subtle-cancel {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
}

.btn-subtle-cancel:hover {
  text-decoration: underline;
  color: #e63946;
}

.tag-archived-label {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
