<script setup>
import { ref, reactive, computed } from 'vue';
import { useEvents } from '@/composables/useEvents';
import AppCard from '@/components/ui/AppCard.vue';
import AppModal from '@/components/ui/AppModal.vue';

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['success', 'cancel']);
const { registerAttendee } = useEvents();

// FORM STATE
const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  reason: ''
});

// INDIVIDUAL FIELD ERROR STATE
const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  reason: ''
});

const errorMessage = ref('');
const isDiscardModalOpen = ref(false);

// MEMERIKSA APAKAH FORM SUDAH PERNAH DIKETIK
const isFormDirty = computed(() => {
  return Boolean(
    form.fullName.trim() ||
    form.email.trim() ||
    form.phone.trim() ||
    form.dob ||
    form.reason.trim()
  );
});

// VALIDASI PER KOLOM (FIELD-LEVEL VALIDATION)
const validateField = (field) => {
  switch (field) {
    case 'fullName':
      if (!form.fullName.trim()) {
        errors.fullName = 'Full name is required.';
      } else if (form.fullName.trim().length < 2) {
        errors.fullName = 'Full name must be at least 2 characters.';
      } else {
        errors.fullName = '';
      }
      break;

    case 'email':
      if (!form.email.trim()) {
        errors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = 'Please enter a valid email address (e.g. name@example.com).';
      } else {
        errors.email = '';
      }
      break;

    case 'phone':
      if (!form.phone.trim()) {
        errors.phone = 'Phone number is required.';
      } else if (!/^[0-9+\-\s]{9,16}$/.test(form.phone.trim())) {
        errors.phone = 'Please enter a valid phone number (minimum 9 digits).';
      } else {
        errors.phone = '';
      }
      break;

    case 'dob':
      if (!form.dob) {
        errors.dob = 'Date of birth is required.';
      } else if (new Date(form.dob) > new Date()) {
        errors.dob = 'Date of birth cannot be in the future.';
      } else {
        errors.dob = '';
      }
      break;

    case 'reason':
      if (!form.reason.trim()) {
        errors.reason = 'Reason for attending is required.';
      } else if (form.reason.trim().length < 10) {
        errors.reason = 'Please write at least 10 characters explaining your reason.';
      } else {
        errors.reason = '';
      }
      break;
  }
};

// VALIDASI SELURUH FORMULIR SEBELUM SUBMIT
const validateAll = () => {
  validateField('fullName');
  validateField('email');
  validateField('phone');
  validateField('dob');
  validateField('reason');

  return !errors.fullName && !errors.email && !errors.phone && !errors.dob && !errors.reason;
};

// SUBMIT HANDLER
const handleSubmit = () => {
  const isValid = validateAll();

  if (!isValid) {
    errorMessage.value = 'Please correct the highlighted fields below before submitting.';
    return;
  }

  const record = registerAttendee(props.event.id, form);
  if (record) {
    errorMessage.value = '';
    emit('success', record);
  } else {
    errorMessage.value = 'Unable to complete registration. Please check remaining seats.';
  }
};

// CANCEL / DISCARD HANDLER
const handleCancelClick = () => {
  if (isFormDirty.value) {
    isDiscardModalOpen.value = true;
  } else {
    emit('cancel');
  }
};

const handleConfirmDiscard = () => {
  isDiscardModalOpen.value = false;
  emit('cancel');
};
</script>

<template>
  <div class="registration-form-wrapper">
    <AppCard class="form-card">
      <header class="form-header">
        <h2>Registration Form</h2>
        <p>Fill out the attendee information below to confirm your participation.</p>
      </header>

      <!-- KOTAK PERINGATAN KESALAHAN VALIDASI -->
      <div v-if="errorMessage" class="error-banner">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit" class="attendee-form">
        <!-- 1. FULL NAME -->
        <div class="form-group">
          <label for="fullName">Full Name <span class="required">*</span></label>
          <input
            id="fullName"
            v-model="form.fullName"
            type="text"
            :class="['form-input', { 'input-error': errors.fullName }]"
            placeholder="e.g. John Doe"
            autocomplete="name"
            @input="errors.fullName && validateField('fullName')"
          />
          <span v-if="errors.fullName" class="field-error">{{ errors.fullName }}</span>
        </div>

        <!-- 2. EMAIL ADDRESS -->
        <div class="form-group">
          <label for="email">Email Address <span class="required">*</span></label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            :class="['form-input', { 'input-error': errors.email }]"
            placeholder="e.g. name@example.com"
            autocomplete="email"
            @input="errors.email && validateField('email')"
          />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <!-- 3. PHONE NUMBER -->
        <div class="form-group">
          <label for="phone">Phone Number <span class="required">*</span></label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            :class="['form-input', { 'input-error': errors.phone }]"
            placeholder="e.g. 081234567890"
            autocomplete="tel"
            @input="errors.phone && validateField('phone')"
          />
          <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
        </div>

        <!-- 4. DATE OF BIRTH -->
        <div class="form-group">
          <label for="dob">Date of Birth <span class="required">*</span></label>
          <input
            id="dob"
            v-model="form.dob"
            type="date"
            :class="['form-input', { 'input-error': errors.dob }]"
            @change="errors.dob && validateField('dob')"
          />
          <span v-if="errors.dob" class="field-error">{{ errors.dob }}</span>
        </div>

        <!-- 5. REASON FOR ATTENDING -->
        <div class="form-group">
          <label for="reason">Reason for Attending <span class="required">*</span></label>
          <textarea
            id="reason"
            v-model="form.reason"
            rows="4"
            :class="['form-textarea', { 'input-error': errors.reason }]"
            placeholder="Please describe your background, interests, or what you hope to achieve by joining this event..."
            @input="errors.reason && validateField('reason')"
          ></textarea>
          <span v-if="errors.reason" class="field-error">{{ errors.reason }}</span>
        </div>

        <!-- FORM ACTIONS -->
        <div class="form-actions">
          <button type="button" class="btn-cancel-form" @click="handleCancelClick">
            Cancel
          </button>
          <button type="submit" class="btn-submit-form">
            Submit Registration
          </button>
        </div>
      </form>
    </AppCard>

    <!-- MODAL PROTEKSI UNSAVED CHANGES -->
    <AppModal
      :is-open="isDiscardModalOpen"
      title="Discard Registration?"
      message="You have unsaved changes in this form. Are you sure you want to cancel and leave this page?"
      badge-text="WARNING"
      variant="danger"
      cancel-text="Keep Editing"
      confirm-text="Yes, Discard"
      @confirm="handleConfirmDiscard"
      @close="isDiscardModalOpen = false"
    />
  </div>
</template>

<style scoped>
.form-card {
  padding: var(--space-8);
  border: 1px solid var(--border-color);
  background: white;
  border-radius: var(--space-4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.form-header {
  margin-bottom: var(--space-6);
}

.form-header h2 {
  font-size: 1.6rem;
  color: var(--text-main);
  margin-bottom: var(--space-1);
}

.form-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.error-banner {
  background: #fee2e2;
  color: #b91c1c;
  padding: var(--space-3) var(--space-4);
  border-radius: 8px;
  border: 1px solid #fecaca;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: var(--space-6);
}

.attendee-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 8px;
}

.required {
  color: #e63946;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--text-main);
  background: #fafafa;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
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
  margin-top: 6px;
  line-height: 1.4;
}

.form-textarea {
  resize: vertical;
  line-height: 1.5;
  font-family: inherit;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.btn-cancel-form {
  background: var(--bg-light);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel-form:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

.btn-submit-form {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn-submit-form:hover {
  background: #5032d6;
}

.btn-submit-form:active {
  transform: scale(0.98);
}
</style>
