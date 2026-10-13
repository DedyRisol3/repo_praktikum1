<template>
  <div class="category-filter">
    <button
      v-for="cat in categories"
      :key="cat"
      :class="['filter-btn', { active: modelValue === cat }]"
      @click="$emit('update:modelValue', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: 'All'
  }
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.category-filter {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-6);
}

.filter-btn {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  padding: var(--space-2) var(--space-4);
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
</style>
