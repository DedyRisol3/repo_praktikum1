<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useEvents } from '@/composables/useEvents';
import AppModal from '@/components/ui/AppModal.vue';
import AppButton from '@/components/ui/AppButton.vue';
import OrganizerEventCard from '@/components/event/OrganizerEventCard.vue';
import EventCreateForm from '@/components/event/EventCreateForm.vue';

const router = useRouter();
const {
  activeEvents,
  completedEvents,
  createEvent,
  completeEvent,
  deleteEvent
} = useEvents();

// KONDISI TAB AKTIF: 'active' | 'create' | 'completed'
const currentTab = ref('active');

// MODAL STATE FOR ACTIONS (Complete & Delete)
const isModalOpen = ref(false);
const modalAction = ref('complete'); // 'complete' | 'delete'
const selectedEvent = ref(null);

const handleOpenCompleteModal = (event) => {
  selectedEvent.value = event;
  modalAction.value = 'complete';
  isModalOpen.value = true;
};

const handleOpenDeleteModal = (event) => {
  selectedEvent.value = event;
  modalAction.value = 'delete';
  isModalOpen.value = true;
};

const handleConfirmModal = () => {
  if (selectedEvent.value) {
    if (modalAction.value === 'complete') {
      completeEvent(selectedEvent.value.id);
    } else if (modalAction.value === 'delete') {
      deleteEvent(selectedEvent.value.id);
    }
  }
  isModalOpen.value = false;
  selectedEvent.value = null;
};

const handleCancelModal = () => {
  isModalOpen.value = false;
  selectedEvent.value = null;
};

// HANDLER EVENT DIBUAT DARI EventCreateForm
const handleCreateEvent = (eventData) => {
  createEvent(eventData);
  setTimeout(() => {
    currentTab.value = 'active';
  }, 1000);
};
</script>

<template>
  <div class="event-management-page">
    <div class="page-header">
      <div>
        <h2>Event Management Control</h2>
        <p class="subtitle">Manage event lifecycle, publish new events, and archive completed ones.</p>
      </div>
      <AppButton variant="primary" @click="currentTab = 'create'">
        + Create New Event
      </AppButton>
    </div>

    <!-- TAB NAVIGATION SYSTEM -->
    <div class="tabs-container">
      <button
        :class="['tab-btn', { active: currentTab === 'active' }]"
        @click="currentTab = 'active'"
      >
        ⚡ Active Events ({{ activeEvents.length }})
      </button>
      <button
        :class="['tab-btn', { active: currentTab === 'create' }]"
        @click="currentTab = 'create'"
      >
        + Create Event
      </button>
      <button
        :class="['tab-btn', { active: currentTab === 'completed' }]"
        @click="currentTab = 'completed'"
      >
        ☑ Completed Events ({{ completedEvents.length }})
      </button>
    </div>

    <!-- TAB 1: ACTIVE EVENTS LIST -->
    <section v-if="currentTab === 'active'" class="tab-pane">
      <div v-if="activeEvents.length > 0" class="events-grid">
        <OrganizerEventCard
          v-for="item in activeEvents"
          :key="item.id"
          :event="item"
          @view-detail="(id) => router.push(`/browse/events/${id}`)"
          @complete="handleOpenCompleteModal"
          @delete="handleOpenDeleteModal"
        />
      </div>

      <!-- EMPTY STATE ACTIVE -->
      <div v-else class="empty-state">
        <div class="empty-icon">📁</div>
        <h3>No Active Events</h3>
        <p>All events have ended or none have been created yet. Please create a new event.</p>
        <AppButton variant="primary" @click="currentTab = 'create'">Create Event Now</AppButton>
      </div>
    </section>

    <!-- TAB 2: CREATE EVENT FORM -->
    <section v-if="currentTab === 'create'" class="tab-pane">
      <EventCreateForm
        @submit="handleCreateEvent"
        @cancel="currentTab = 'active'"
      />
    </section>

    <!-- TAB 3: COMPLETED EVENTS (ARCHIVE) -->
    <section v-if="currentTab === 'completed'" class="tab-pane">
      <div v-if="completedEvents.length > 0" class="events-grid">
        <OrganizerEventCard
          v-for="item in completedEvents"
          :key="item.id"
          :event="item"
          :is-completed="true"
          @delete="handleOpenDeleteModal"
        />
      </div>

      <!-- EMPTY STATE COMPLETED -->
      <div v-else class="empty-state">
        <div class="empty-icon">📁</div>
        <h3>No Completed Events</h3>
        <p>Events marked as completed will be archived here permanently.</p>
      </div>
    </section>

    <!-- MODAL KONFIRMASI DENGAN BACKDROP BLUR (Reused for Complete & Delete) -->
    <AppModal
      :is-open="isModalOpen"
      :title="modalAction === 'complete' ? 'Complete Event?' : 'Delete Event Permanently?'"
      :message="modalAction === 'complete'
        ? `Are you sure you want to mark '${selectedEvent?.title}' as completed? Once completed, the status is final and the event will be automatically removed from public listings.`
        : `Are you sure you want to permanently delete '${selectedEvent?.title}'? This action cannot be undone and will permanently remove this event from all records.`"
      :confirm-text="modalAction === 'complete' ? 'Yes, Complete' : 'Yes, Delete Permanently'"
      cancel-text="Cancel"
      @confirm="handleConfirmModal"
      @close="handleCancelModal"
    />
  </div>
</template>

<style scoped>
.event-management-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
  gap: var(--space-4);
}

.page-header h2 {
  font-size: 2rem;
  color: var(--text-main);
  margin-bottom: var(--space-1);
}

.subtitle {
  color: var(--text-muted);
  font-size: 1rem;
}

/* TAB SYSTEM */
.tabs-container {
  display: flex;
  gap: var(--space-3);
  border-bottom: 2px solid var(--border-color);
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-2);
}

.tab-btn {
  background: none;
  border: none;
  padding: var(--space-3) var(--space-6);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.tab-btn:hover {
  background-color: rgba(102, 68, 255, 0.05);
  color: var(--primary);
}

.tab-btn.active {
  background-color: var(--primary);
  color: white;
}

/* ORGANIZER EVENT CARDS GRID */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: var(--space-12);
  background: white;
  border: 1px dashed var(--border-color);
  border-radius: var(--space-4);
  margin-bottom: var(--space-12);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--space-3);
}

.empty-state h3 {
  font-size: 1.4rem;
  margin-bottom: var(--space-2);
}

.empty-state p {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
