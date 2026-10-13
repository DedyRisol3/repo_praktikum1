<template>
  <button :class="['app-button', `btn-${variant}`]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
});
defineEmits(['click']);
</script>

<style scoped>
.app-button {
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  padding: var(--space-3) var(--space-8);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  transition: transform 0.2s, background-color 0.2s;
}

.app-button:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 68, 255, 0.3);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-secondary {
  background-color: #f0f0f0;
  color: var(--text-main);
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-outline {
  background-color: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outline:hover {
  background-color: rgba(102, 68, 255, 0.1);
}
</style>
