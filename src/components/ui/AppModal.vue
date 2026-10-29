<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Action Confirmation'
  },
  message: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: 'Yes, Proceed'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'danger' // 'danger' | 'primary' | 'success'
  },
  badgeText: {
    type: String,
    default: ''
  },
  badgeVariant: {
    type: String,
    default: ''
  }
});

defineEmits(['confirm', 'close']);
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card">
        <div class="modal-header">
          <span v-if="badgeText" :class="['modal-badge', `badge-${badgeVariant || variant}`]">
            {{ badgeText }}
          </span>
          <h3 class="modal-title">{{ title }}</h3>
        </div>

        <div class="modal-body">
          <p v-if="message" class="modal-message">{{ message }}</p>
          <slot />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button v-if="showCancel" class="btn-cancel" @click="$emit('close')">
              {{ cancelText }}
            </button>
            <button :class="['btn-confirm', `btn-${variant}`]" @click="$emit('confirm')">
              {{ confirmText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* OVERLAY & BACKDROP BLUR
   Efek buram di sekeliling kotak tengah untuk memusatkan fokus pengguna */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--space-4);
}

/* KOTAK DIALOG TENGAH */
.modal-card {
  background: white;
  width: 100%;
  max-width: 480px;
  border-radius: var(--space-4);
  padding: var(--space-6);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color);
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.modal-badge {
  align-self: flex-start;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 4px;
}

.badge-danger {
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.badge-primary {
  background: #ede9fe;
  color: #6d28d9;
  border: 1px solid #ddd6fe;
}

.badge-success {
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #86efac;
}

.modal-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.modal-body {
  margin-bottom: var(--space-4);
}

.modal-message {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 var(--space-4) 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-confirm.btn-danger {
  background: #e63946;
}

.btn-confirm.btn-danger:hover {
  background: #d62828;
}

.btn-confirm.btn-primary {
  background: var(--primary);
  box-shadow: 0 4px 14px rgba(102, 68, 255, 0.25);
}

.btn-confirm.btn-primary:hover {
  background: #5032d6;
}

.btn-confirm.btn-success {
  background: #16a34a;
  box-shadow: 0 4px 14px rgba(22, 163, 74, 0.25);
}

.btn-confirm.btn-success:hover {
  background: #15803d;
}

.btn-confirm:active {
  transform: scale(0.98);
}

/* TRANSISI FADE HALUS */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
