<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import AppModal from '@/components/ui/AppModal.vue';
import RegistrationSummary from '@/components/event/RegistrationSummary.vue';
import RegistrationForm from '@/components/event/RegistrationForm.vue';
import RegistrationReceipt from '@/components/event/RegistrationReceipt.vue';

const route = useRoute();
const router = useRouter();
const { getEventById, isUserRegistered } = useEvents();

const event = computed(() => getEventById(route.params.id));

const isRegistered = computed(() => {
  return event.value ? isUserRegistered(event.value.id) : false;
});

const isSuccessModalOpen = ref(false);
const confirmedData = ref(null);

const handleRegistrationSuccess = (record) => {
  confirmedData.value = record;
  isSuccessModalOpen.value = true;
};

const handleBackToDetail = () => {
  router.push(`/browse/events/${event.value?.id || ''}`);
};

const handleGotoCatalog = () => {
  isSuccessModalOpen.value = false;
  router.push('/browse/events');
};

const handleGotoYourEvents = () => {
  isSuccessModalOpen.value = false;
  router.push('/browse/your-events');
};
</script>

<template>
  <div class="registration-page">
    <!-- JIKA EVENT DITEMUKAN -->
    <div v-if="event">
      <!-- 1. KONDISI SUDAH DAFTAR -->
      <div v-if="isRegistered" class="notice-card">
        <span class="notice-badge">NOTICE</span>
        <h2>Already Registered</h2>
        <p>You have already secured a confirmed ticket for this event.</p>
        <div class="notice-actions">
          <router-link :to="'/browse/your-events/' + event.id" class="btn-primary-link">
            View Your Ticket Receipt &rarr;
          </router-link>
          <button class="btn-secondary-link" @click="handleBackToDetail">
            Back to Event Detail
          </button>
        </div>
      </div>

      <!-- 2. KONDISI EVENT SUDAH SELESAI -->
      <div v-else-if="event.done" class="notice-card">
        <span class="notice-badge">CONCLUDED</span>
        <h2>Registration Closed</h2>
        <p>This event has already concluded. Registrations are no longer accepted.</p>
        <button class="btn-secondary-link" @click="router.push('/browse/events')">
          Browse Active Events
        </button>
      </div>

      <!-- 3. KONDISI KUOTA HABIS -->
      <div v-else-if="event.quota <= 0" class="notice-card">
        <span class="notice-badge">SOLD OUT</span>
        <h2>Event Full</h2>
        <p>All available seats for this event have been filled.</p>
        <button class="btn-secondary-link" @click="handleBackToDetail">
          Back to Event Detail
        </button>
      </div>

      <!-- 4. KONDISI NORMAL: TATA LETAK DUA KOLOM -->
      <div v-else class="registration-grid">
        <!-- KOLOM KIRI: KOMPONEN RINGKASAN ACARA -->
        <aside class="event-summary-column">
          <RegistrationSummary :event="event" @back="handleBackToDetail" />
        </aside>

        <!-- KOLOM KANAN: KOMPONEN FORMULIR PENDAFTARAN -->
        <main class="form-column">
          <RegistrationForm
            :event="event"
            @success="handleRegistrationSuccess"
            @cancel="handleBackToDetail"
          />
        </main>
      </div>
    </div>

    <!-- KONDISI 404: JIKA EVENT ID TIDAK DITEMUKAN -->
    <div v-else class="notice-card">
      <span class="notice-badge">NOT FOUND</span>
      <h2>Event Not Found</h2>
      <p>The event you are trying to register for is not available or has been deleted.</p>
      <button class="btn-secondary-link" @click="router.push('/browse/events')">
        Back to Event Catalog
      </button>
    </div>

    <!-- DIALOG KONFIRMASI SUKSES PENDAFTARAN DENGAN NAMED SLOT -->
    <AppModal
      :is-open="isSuccessModalOpen"
      title="Registration Confirmed!"
      badge-text="SUCCESS"
      badge-variant="success"
      variant="primary"
      @close="handleGotoCatalog"
    >
      <!-- ISI BADAN MODAL: KOMPONEN TANDA TERIMA -->
      <RegistrationReceipt :confirmed-data="confirmedData" :event="event" />

      <!-- ISI FOOTER MODAL: TOMBOL AKSI GANDA LEWAT NAMED SLOT -->
      <template #footer>
        <button class="btn-cancel" @click="handleGotoCatalog">
          Back to Event Catalog
        </button>
        <button class="btn-confirm btn-primary" @click="handleGotoYourEvents">
          Go to Your Events
        </button>
      </template>
    </AppModal>
  </div>
</template>

<style scoped>
.registration-page {
  padding-bottom: var(--space-12);
}

.registration-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: var(--space-8);
  align-items: start;
}

/* NOTICE CARD (STATE STATUS & 404) */
.notice-card {
  text-align: center;
  padding: var(--space-12) var(--space-8);
  background: white;
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  max-width: 540px;
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
  font-size: 1.6rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.notice-card p {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
  font-size: 0.95rem;
}

.notice-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.btn-primary-link {
  display: inline-flex;
  align-items: center;
  background: var(--primary);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.btn-primary-link:hover {
  background: #5032d6;
}

.btn-secondary-link {
  background: none;
  border: 1px solid var(--border-color);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.btn-secondary-link:hover {
  background: var(--bg-light);
}

.btn-cancel {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 42px;
}

.btn-cancel:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

.btn-confirm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease, transform 0.1s;
  min-height: 42px;
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 68, 255, 0.25);
}

.btn-primary:hover {
  background: #5032d6;
  box-shadow: 0 6px 16px rgba(102, 68, 255, 0.35);
}

@media (max-width: 900px) {
  .registration-grid {
    grid-template-columns: 1fr;
  }
}
</style>
