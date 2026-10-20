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
    default: 'Are you sure you want to proceed with this action?'
  },
  confirmText: {
    type: String,
    default: 'Yes, Proceed'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
});

defineEmits(['confirm', 'close']);
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-icon">⚠️</div>
          <h3 class="modal-title">{{ title }}</h3>
        </div>

        <div class="modal-body">
          <p class="modal-message">{{ message }}</p>
          <slot />
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="$emit('close')">
            {{ cancelText }}
          </button>
          <button class="btn-confirm" @click="$emit('confirm')">
            {{ confirmText }}
          </button>
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
  max-width: 460px;
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
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.modal-icon {
  font-size: 1.8rem;
  line-height: 1;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.modal-body {
  margin-bottom: var(--space-6);
}

.modal-message {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

.btn-cancel {
  background: var(--bg-light);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  padding: var(--space-2) var(--space-4);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

.btn-confirm {
  background: #e63946;
  color: white;
  border: none;
  padding: var(--space-2) var(--space-5);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-confirm:hover {
  background: #d62828;
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
