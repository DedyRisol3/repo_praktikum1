<script setup>
import { reactive, ref } from 'vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppButton from '@/components/ui/AppButton.vue';

const props = defineProps({
  submitting: {
    type: Boolean,
    default: false
  }
});

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

// STATE ERROR SETIAP KOLOM (FIELD-LEVEL ERROR STATE)
const errors = reactive({
  title: '',
  date: '',
  loc: '',
  quota: '',
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

// VALIDASI PER KOLOM MASUKAN
const validateField = (field) => {
  switch (field) {
    case 'title':
      if (!form.title.trim()) {
        errors.title = 'Event title is required.';
      } else if (form.title.trim().length < 3) {
        errors.title = 'Event title must be at least 3 characters.';
      } else {
        errors.title = '';
      }
      break;
    case 'date':
      if (!form.date) {
        errors.date = 'Event date and time is required.';
      } else {
        errors.date = '';
      }
      break;
    case 'loc':
      if (!form.loc.trim()) {
        errors.loc = 'Event location is required.';
      } else {
        errors.loc = '';
      }
      break;
    case 'quota':
      if (!form.quota || Number(form.quota) < 1) {
        errors.quota = 'Quota must be at least 1 attendee.';
      } else {
        errors.quota = '';
      }
      break;
    case 'desc':
      if (!form.desc.trim()) {
        errors.desc = 'Event description is required.';
      } else if (form.desc.trim().length < 10) {
        errors.desc = 'Please write at least 10 characters for the description.';
      } else {
        errors.desc = '';
      }
      break;
  }
};

// VALIDASI SELURUH FORMULIR SEBELUM SUBMIT
const validateAll = () => {
  validateField('title');
  validateField('date');
  validateField('loc');
  validateField('quota');
  validateField('desc');

  return !errors.title && !errors.date && !errors.loc && !errors.quota && !errors.desc;
};

// HANDLER SUBMIT FORM CREATE EVENT KE REST API
const handleSubmitEvent = () => {
  const isValid = validateAll();

  if (!isValid) {
    errorMessage.value = 'Please correct the highlighted fields below before publishing the event.';
    return;
  }

  errorMessage.value = '';

  emit('submit', {
    title: form.title,
    cat: form.cat,
    date: formatEventDate(form.date),
    loc: form.loc,
    quota: form.quota,
    price: form.price,
    desc: form.desc
  });
};

const resetForm = () => {
  form.title = '';
  form.date = '';
  form.loc = '';
  form.quota = 100;
  form.price = 'Free';
  form.desc = '';
  errors.title = '';
  errors.date = '';
  errors.loc = '';
  errors.quota = '';
  errors.desc = '';
  errorMessage.value = '';
  successMessage.value = '';
};

defineExpose({ resetForm });
</script>

<template>
  <AppCard class="form-card">
    <h3>Create New Event Form</h3>
    <p class="form-subtitle">Information entered here will be instantly published to the Gatherly public catalog.</p>

    <div v-if="errorMessage" class="alert-box alert-error">
      ⚠️ {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="alert-box alert-success">
      ✨ {{ successMessage }}
    </div>

    <form @submit.prevent="handleSubmitEvent" class="event-form" novalidate>
      <!-- 1. EVENT TITLE -->
      <div class="form-group">
        <label>Event Title <span class="required">*</span></label>
        <input
          v-model="form.title"
          type="text"
          placeholder="e.g. Modern UI/UX Masterclass"
          :class="['form-input', { 'input-error': errors.title }]"
          @input="validateField('title')"
        />
        <span v-if="errors.title" class="field-error">{{ errors.title }}</span>
      </div>

      <div class="form-row">
        <!-- 2. EVENT CATEGORY -->
        <div class="form-group">
          <label>Event Category <span class="required">*</span></label>
          <select v-model="form.cat" class="form-input">
            <option value="Workshop">Workshop</option>
            <option value="Meetup">Meetup</option>
            <option value="Competition">Competition</option>
            <option value="Seminar">Seminar</option>
            <option value="Conference">Conference</option>
          </select>
        </div>

        <!-- 3. DATE & TIME -->
        <div class="form-group">
          <label>Date & Time <span class="required">*</span></label>
          <input
            v-model="form.date"
            type="datetime-local"
            :class="['form-input', { 'input-error': errors.date }]"
            @change="validateField('date')"
          />
          <span v-if="errors.date" class="field-error">{{ errors.date }}</span>
        </div>
      </div>

      <div class="form-row">
        <!-- 4. LOCATION -->
        <div class="form-group">
          <label>Event Location <span class="required">*</span></label>
          <input
            v-model="form.loc"
            type="text"
            placeholder="e.g. Innovation Center, Jakarta"
            :class="['form-input', { 'input-error': errors.loc }]"
            @input="validateField('loc')"
          />
          <span v-if="errors.loc" class="field-error">{{ errors.loc }}</span>
        </div>

        <!-- 5. ATTENDEE QUOTA -->
        <div class="form-group">
          <label>Attendee Quota</label>
          <input
            v-model.number="form.quota"
            type="number"
            min="1"
            placeholder="100"
            :class="['form-input', { 'input-error': errors.quota }]"
            @input="validateField('quota')"
          />
          <span v-if="errors.quota" class="field-error">{{ errors.quota }}</span>
        </div>
      </div>

      <!-- 6. DESCRIPTION -->
      <div class="form-group">
        <label>Event Description <span class="required">*</span></label>
        <textarea
          v-model="form.desc"
          rows="4"
          placeholder="Describe the agenda, speakers, and key takeaways..."
          :class="['form-input', 'form-textarea', { 'input-error': errors.desc }]"
          @input="validateField('desc')"
        ></textarea>
        <span v-if="errors.desc" class="field-error">{{ errors.desc }}</span>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary-action" :disabled="submitting" @click="emit('cancel')">
          Cancel
        </button>
        <AppButton variant="primary" type="submit" :loading="submitting">
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

.required {
  color: #ef4444;
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
  gap: 6px;
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
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
  background: white;
  box-sizing: border-box;
  width: 100%;
}

.form-textarea {
  resize: vertical;
  line-height: 1.5;
  font-family: inherit;
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(102, 68, 255, 0.15);
}

/* ERROR STATE FOR INPUTS */
.input-error {
  border-color: #ef4444 !important;
  background-color: #fef2f2 !important;
}

.input-error:focus {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
}

.field-error {
  font-size: 0.82rem;
  color: #dc2626;
  font-weight: 500;
  margin-top: 2px;
  line-height: 1.3;
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
