<script setup>
import AppCard from '@/components/ui/AppCard.vue';

defineProps({
  event: {
    type: Object,
    required: true
  }
});

defineEmits(['back']);
</script>

<template>
  <div class="registration-summary-wrapper">
    <button class="btn-back" @click="$emit('back')">
      &larr; Back to Event Detail
    </button>

    <AppCard class="summary-card">
      <span class="category-pill">{{ event.cat }}</span>
      <h3 class="event-name">{{ event.title }}</h3>

      <div class="summary-details">
        <div class="summary-item">
          <span class="item-label">Date & Time</span>
          <span class="item-value">{{ event.date }}</span>
        </div>

        <div class="summary-item">
          <span class="item-label">Location</span>
          <span class="item-value">{{ event.loc }}</span>
        </div>

        <div class="summary-item">
          <span class="item-label">Available Seats</span>
          <span class="item-value text-accent">{{ event.quota }} seats remaining</span>
        </div>
      </div>

      <p class="summary-desc">{{ event.desc }}</p>
    </AppCard>
  </div>
</template>

<style scoped>
.registration-summary-wrapper {
  position: sticky;
  top: var(--space-6);
}

.btn-back {
  background: none;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  margin-bottom: var(--space-4);
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;
}

.btn-back:hover {
  color: var(--primary);
}

.summary-card {
  padding: var(--space-6);
  border: 1px solid var(--border-color);
  background: white;
  border-radius: var(--space-4);
}

.category-pill {
  display: inline-block;
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 50px;
  margin-bottom: var(--space-3);
}

.event-name {
  font-size: 1.4rem;
  color: var(--text-main);
  margin-bottom: var(--space-4);
  line-height: 1.3;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: var(--space-4);
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.item-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
}

.text-accent {
  color: #15803d;
  font-weight: 700;
}

.summary-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}
</style>
