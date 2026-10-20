<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';

const route = useRoute();
const router = useRouter();
const { getEventById } = useEvents();

// MENGAMBIL DATA EVENT DINAMIS DARI STATE BERDASARKAN ID DI URL
const event = computed(() => getEventById(route.params.id));

const alert = (msg) => {
  window.alert(msg);
};
</script>

<template>
  <div class="event-detail-page">
    <button @click="router.push('/browse/events')" class="btn-back">
      &larr; Back to Events
    </button>

    <!-- KONDISI JIKA EVENT DITEMUKAN -->
    <div v-if="event" class="detail-container">
      <div class="detail-header">
        <div class="header-tags">
          <span class="event-tag">{{ event.cat }}</span>
          <span v-if="event.done" class="status-tag status-ended">Event Finished</span>
          <span v-else class="status-tag status-live">Open Registration</span>
        </div>

        <h1>{{ event.title }}</h1>

        <div class="meta-info">
          <span class="meta-item">🗓️ {{ event.date }}</span>
          <span class="meta-item">📍 {{ event.loc }}</span>
          <span class="meta-item">👥 Quota: {{ event.quota }} Attendees</span>
        </div>
      </div>

      <!-- ASYMMETRICAL LAYOUT -->
      <div class="detail-content grid-asymmetric">
        <!-- F-PATTERN: Breaking text with Headings & Paragraphs -->
        <div class="main-desc">
          <h2>About This Event</h2>
          <p class="description-text">
            {{ event.desc }}
          </p>
        </div>

        <!-- FOCAL POINT & STICKY PANE -->
        <div class="sidebar">
          <AppCard class="ticket-card sticky-pane">
            <h3>Attendee Registration</h3>
            <p class="price">{{ event.price }}</p>
            <p class="ticket-desc">
              {{ event.done ? 'Registration is closed as this event has ended.' : 'Secure your ticket now before quota is filled.' }}
            </p>

            <!-- BUTTON FOCAL POINT -->
            <AppButton
              v-if="!event.done"
              variant="primary"
              class="btn-register"
              @click="alert('Ticket registered successfully! Your digital QR ticket has been sent to your email.')"
            >
              Register Now
            </AppButton>
            <AppButton
              v-else
              variant="secondary"
              class="btn-register btn-disabled"
              disabled
            >
              Registration Closed
            </AppButton>

            <p v-if="!event.done" class="spots">Only {{ event.quota }} seats available!</p>
          </AppCard>
        </div>
      </div>
    </div>

    <!-- EMPTY STATE IF ID NOT FOUND -->
    <div v-else class="not-found-card">
      <h2>404 - Event Not Found</h2>
      <p>The event you are looking for is unavailable or has been removed by the organizer.</p>
      <AppButton variant="primary" @click="router.push('/browse/events')">
        Back to Event Catalog
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
.btn-back {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: var(--space-6);
  color: var(--text-muted);
  font-weight: 500;
}

.btn-back:hover { color: var(--primary); }

.detail-header {
  background: var(--bg-light);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  padding: var(--space-12) var(--space-8);
  margin-bottom: var(--space-8);
}

.header-tags {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  margin-bottom: var(--space-4);
}

.event-tag {
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
  padding: var(--space-1) var(--space-4);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.status-tag {
  padding: var(--space-1) var(--space-3);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-live {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.status-ended {
  background: rgba(108, 117, 125, 0.15);
  color: #6c757d;
}

.detail-header h1 {
  font-size: 2.8rem;
  margin-bottom: var(--space-4);
  line-height: 1.2;
  color: var(--text-main);
}

.meta-info { display: flex; gap: var(--space-6); flex-wrap: wrap; }
.meta-item { color: var(--text-muted); font-weight: 500; font-size: 1.05rem; }

/* ASYMMETRICAL GRID */
.grid-asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-12);
}

.main-desc h2 {
  margin-bottom: var(--space-4);
  font-size: 1.8rem;
  border-left: 4px solid var(--primary);
  padding-left: var(--space-2);
}

.description-text {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: var(--space-6);
  font-size: 1.1rem;
}

/* FOCAL POINT CARD */
.ticket-card {
  padding: var(--space-8);
  text-align: center;
}

/* STICKY BEHAVIOR */
.sticky-pane {
  position: sticky;
  top: 100px;
}

.ticket-card h3 { font-size: 1.5rem; margin-bottom: var(--space-2); }
.price { font-size: 2.8rem; font-weight: 800; color: var(--primary); margin-bottom: var(--space-2); }
.ticket-desc { color: var(--text-muted); margin-bottom: var(--space-6); line-height: 1.5; }

.btn-register {
  width: 100%;
}

.btn-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.spots { margin-top: var(--space-4); color: #27ae60; font-weight: 600; font-size: 0.95rem; }

.not-found-card {
  text-align: center;
  padding: var(--space-12);
  background: white;
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
}

.not-found-card h2 { margin-bottom: var(--space-2); }
.not-found-card p { color: var(--text-muted); margin-bottom: var(--space-6); }

@media (max-width: 900px) {
  .grid-asymmetric { grid-template-columns: 1fr; }
}
</style>
