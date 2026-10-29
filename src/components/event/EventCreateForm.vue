<script setup>
import { reactive, ref } from 'vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppButton from '@/components/ui/AppButton.vue';

const emit = defineEmits(['submit', 'cancel']);

// STATE FORMULIR CREATE EVENT
const form = reactive({
  title: '',
  cat: 'Workshop',
  date: '',
  loc: '',
  quota: 100,
  price: 'Free',
  desc: ''
});

const errorMessage = ref('');
const successMessage = ref('');

// Format helper to convert YYYY-MM-DDTHH:mm into "Nov 25, 2026 • 10:00 AM"
const formatEventDate = (dt) => {
  if (!dt) return '';
  const dateObj = new Date(dt);
  if (isNaN(dateObj.getTime())) return dt;
  const datePart = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const timePart = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${datePart} • ${timePart}`;
};

// HANDLER SUBMIT FORM CREATE EVENT
const handleSubmitEvent = () => {
  // Validate Empty Input
  if (!form.title.trim() || !form.date || !form.loc.trim() || !form.desc.trim()) {
    errorMessage.value = 'Please fill in all required fields before publishing the event!';
    successMessage.value = '';
    return;
  }

  emit('submit', {
    title: form.title,
    cat: form.cat,
    date: formatEventDate(form.date),
    loc: form.loc,
    quota: form.quota,
    price: form.price,
    desc: form.desc
  });

  // Reset Form
  form.title = '';
  form.date = '';
  form.loc = '';
  form.quota = 100;
  form.price = 'Free';
  form.desc = '';
  errorMessage.value = '';
  successMessage.value = 'Event published successfully and is now live!';

  // Clear success notification after 1 second
  setTimeout(() => {
    successMessage.value = '';
  }, 1000);
};
</script>

<template>
  <AppCard class="form-card">
    <h3>Create New Event Form</h3>
    <p class="form-subtitle">Information entered here will be instantly published to the Gatherly public catalog</p>

    <div v-if="errorMessage" class="alert-box alert-error">
      ⚠️ {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="alert-box alert-success">
      ✨ {{ successMessage }}
    </div>

    <form @submit.prevent="handleSubmitEvent" class="event-form">
      <div class="form-group">
        <label>Event Title *</label>
        <input v-model="form.title" type="text" placeholder="e.g. Modern UI/UX Masterclass" class="form-input" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Event Category *</label>
          <select v-model="form.cat" class="form-input">
            <option value="Workshop">Workshop</option>
            <option value="Meetup">Meetup</option>
            <option value="Competition">Competition</option>
            <option value="Seminar">Seminar</option>
            <option value="Conference">Conference</option>
          </select>
        </div>

        <div class="form-group">
          <label>Date & Time *</label>
          <input v-model="form.date" type="datetime-local" class="form-input" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Event Location *</label>
          <input v-model="form.loc" type="text" placeholder="e.g. Innovation Center, Jakarta" class="form-input" />
        </div>

        <div class="form-group">
          <label>Attendee Quota</label>
          <input v-model.number="form.quota" type="number" min="10" placeholder="100" class="form-input" />
        </div>
      </div>

      <div class="form-group">
        <label>Event Description *</label>
        <textarea v-model="form.desc" rows="4" placeholder="Describe the agenda, speakers, and key takeaways..." class="form-input"></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary-action" @click="emit('cancel')">
          Cancel
        </button>
        <AppButton variant="primary" type="submit">
          ✨ Publish Event Now
        </AppButton>
      </div>
    </form>
  </AppCard>
</template>

<style scoped>
.form-card {
  padding: var(--space-8);
  max-width: 800px;
  margin: 0 auto var(--space-12) auto;
}

.form-card h3 {
  font-size: 1.5rem;
  margin-bottom: var(--space-1);
}

.form-subtitle {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.alert-box {
  padding: var(--space-3) var(--space-4);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: var(--space-6);
}

.alert-error {
  background: #ffe3e3;
  color: #c92a2a;
  border: 1px solid #ffa8a8;
}

.alert-success {
  background: #d3f9d8;
  color: #2b8a3e;
  border: 1px solid #b2f2bb;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
}

.form-input {
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: white;
  box-sizing: border-box;
  width: 100%;
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(102, 68, 255, 0.15);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);
  margin-top: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.btn-secondary-action {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  padding: var(--space-3) var(--space-6);
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-muted);
}

.btn-secondary-action:hover {
  background: #e9ecef;
  color: var(--text-main);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
