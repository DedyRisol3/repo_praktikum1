<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import AppModal from '@/components/ui/AppModal.vue';

const route = useRoute();
const router = useRouter();
const { userRegistrations, cancelRegistration, getEventById, events } = useEvents();

const eventId = computed(() => Number(route.params.id));

// MENGAMBIL DATA TIKET JIKA EVENT MASIH ADA DI SISTEM
const activeTicket = computed(() => {
  if (!eventId.value) return null;
  const eventExists = events.value.some(e => e.id === eventId.value);
  if (!eventExists) return null;
  return userRegistrations.value.find(r => r.eventId === eventId.value);
});

// MEMERIKSA STATUS SELESAI EVENT SECARA REAKTIF
const isEventDone = (id) => {
  const ev = getEventById(id);
  return ev ? ev.done : false;
};

// STATE MODAL PEMBATALAN TIKET
const isCancelModalOpen = ref(false);

const handleOpenCancelModal = () => {
  isCancelModalOpen.value = true;
};

const handleConfirmCancel = () => {
  if (eventId.value) {
    cancelRegistration(eventId.value);
    isCancelModalOpen.value = false;
    router.push('/browse/your-events');
  }
};
</script>

<template>
  <div class="ticket-receipt-page">
    <button class="btn-back" @click="router.push('/browse/your-events')">
      &larr; Back to Your Events
    </button>

    <!-- JIKA TIKET TERDAFTAR DITEMUKAN -->
    <div v-if="activeTicket" class="ticket-receipt-card">
      <header class="receipt-header">
        <div class="header-status">
          <span :class="['status-badge', isEventDone(activeTicket.eventId) ? 'badge-concluded' : 'badge-confirmed']">
            {{ isEventDone(activeTicket.eventId) ? 'EVENT CONCLUDED' : 'CONFIRMED PASS' }}
          </span>
          <span class="ref-code">#{{ activeTicket.bookingCode }}</span>
        </div>
        <p class="receipt-meta-date">
          Registered on {{ new Date(activeTicket.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
        </p>
      </header>

      <section class="receipt-section">
        <h4 class="section-heading">Event Details</h4>
        <h2 class="event-title">{{ activeTicket.eventTitle }}</h2>
        <div class="receipt-grid">
          <div class="grid-item">
            <span class="item-label">Category</span>
            <span class="item-value">{{ activeTicket.eventCat }}</span>
          </div>
          <div class="grid-item">
            <span class="item-label">Date & Time</span>
            <span class="item-value">{{ activeTicket.eventDate }}</span>
          </div>
          <div class="grid-item">
            <span class="item-label">Location / Venue</span>
            <span class="item-value">{{ activeTicket.eventLoc }}</span>
          </div>
        </div>
      </section>

      <section class="receipt-section">
        <h4 class="section-heading">Attendee Information</h4>
        <div class="receipt-grid">
          <div class="grid-item">
            <span class="item-label">Full Name</span>
            <span class="item-value">{{ activeTicket.fullName }}</span>
          </div>
          <div class="grid-item">
            <span class="item-label">Email Address</span>
            <span class="item-value">{{ activeTicket.email }}</span>
          </div>
          <div class="grid-item">
            <span class="item-label">Phone Number</span>
            <span class="item-value">{{ activeTicket.phone }}</span>
          </div>
          <div class="grid-item">
            <span class="item-label">Date of Birth</span>
            <span class="item-value">{{ activeTicket.dob }}</span>
          </div>
        </div>
      </section>

      <section class="receipt-section">
        <h4 class="section-heading">Reason for Attending</h4>
        <p class="reason-text">{{ activeTicket.reason }}</p>
      </section>

      <footer class="receipt-footer">
        <button class="btn-primary" @click="router.push('/browse/your-events')">
          Back to Your Events
        </button>

        <button
          v-if="!isEventDone(activeTicket.eventId)"
          class="btn-cancel-reg"
          @click="handleOpenCancelModal"
        >
          Cancel Registration
        </button>
        <span v-else class="concluded-notice">
          This event has concluded. Attendance record is archived.
        </span>
      </footer>
    </div>

    <!-- JIKA TIKET TIDAK DITEMUKAN (MISAL SUDAH DIBATALKAN ATAU EVENT DIHAPUS) -->
    <div v-else class="notice-card">
      <span class="notice-badge">NOT FOUND</span>
      <h2>Ticket Not Found</h2>
      <p>You do not have an active registration for this event, or it has been cancelled.</p>
      <button class="btn-primary" @click="router.push('/browse/your-events')">
        View Your Events List
      </button>
    </div>

    <!-- MODAL KONFIRMASI PEMBATALAN REGISTRASI -->
    <AppModal
      :is-open="isCancelModalOpen"
      title="Cancel Registration?"
      message="Are you sure you want to cancel your registration for this event? Your seat will be returned to the event quota and your ticket will be removed."
      confirm-text="Yes, Cancel Registration"
      cancel-text="Keep Registration"
      variant="danger"
      @confirm="handleConfirmCancel"
      @close="isCancelModalOpen = false"
    />
  </div>
</template>

<style scoped>
.ticket-receipt-page {
  max-width: 760px;
  margin: 0 auto;
  padding-bottom: var(--space-12);
}

.btn-back {
  background: none;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  margin-bottom: var(--space-6);
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;
}

.btn-back:hover {
  color: var(--primary);
}

.ticket-receipt-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--space-4);
  padding: var(--space-8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.receipt-header {
  padding-bottom: var(--space-6);
  border-bottom: 2px dashed var(--border-color);
  margin-bottom: var(--space-6);
}

.header-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.status-badge {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 4px 10px;
  border-radius: 4px;
}

.badge-confirmed {
  background: #dcfce7;
  color: #15803d;
}

.badge-concluded {
  background: #f1f5f9;
  color: #64748b;
}

.ref-code {
  font-family: monospace;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--primary);
}

.receipt-meta-date {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}

.receipt-section {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-color);
}

.section-heading {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: var(--space-3);
  font-weight: 700;
}

.event-title {
  font-size: 1.8rem;
  color: var(--text-main);
  margin-bottom: var(--space-4);
}

.receipt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.grid-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.item-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
}

.reason-text {
  background: var(--bg-light);
  border-radius: 8px;
  padding: var(--space-4);
  color: var(--text-main);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.receipt-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-4);
  flex-wrap: wrap;
  gap: var(--space-3);
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #5032d6;
}

.btn-cancel-reg {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.btn-cancel-reg:hover {
  color: #e63946;
}

.concluded-notice {
  font-size: 0.85rem;
  color: #64748b;
  font-style: italic;
}

/* NOTICE CARD */
.notice-card {
  text-align: center;
  padding: var(--space-12) var(--space-8);
  background: white;
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  max-width: 500px;
  margin: var(--space-8) auto;
}

.notice-badge {
  display: inline-block;
  background: var(--bg-light);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 50px;
  margin-bottom: var(--space-3);
}

.notice-card h2 {
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.notice-card p {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
  font-size: 0.95rem;
}
</style>
