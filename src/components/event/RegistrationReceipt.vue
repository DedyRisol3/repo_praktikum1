<script setup>
defineProps({
  confirmedData: {
    type: Object,
    default: null
  },
  event: {
    type: Object,
    default: null
  }
});
</script>

<template>
  <div class="receipt-preview">
    <p class="receipt-greeting">
      Thank you, <strong>{{ confirmedData?.fullName }}</strong>! Your registration for <strong>{{ event?.title }}</strong> has been officially confirmed.
    </p>

    <div class="receipt-box">
      <div class="receipt-row">
        <span class="receipt-label">Booking Reference</span>
        <span class="receipt-value ref-code">{{ confirmedData?.bookingCode }}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-label">Attendee Email</span>
        <span class="receipt-value">{{ confirmedData?.email }}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-label">Event Schedule</span>
        <span class="receipt-value">{{ confirmedData?.eventDate }}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-label">Venue / Location</span>
        <span class="receipt-value">{{ confirmedData?.eventLoc }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.receipt-preview {
  margin-top: var(--space-2);
}

.receipt-greeting {
  font-size: 0.95rem;
  color: var(--text-main);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.receipt-box {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.receipt-label {
  color: var(--text-muted);
}

.receipt-value {
  font-weight: 600;
  color: var(--text-main);
}

.ref-code {
  font-family: monospace;
  font-size: 1.05rem;
  color: var(--primary);
  background: rgba(102, 68, 255, 0.08);
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
