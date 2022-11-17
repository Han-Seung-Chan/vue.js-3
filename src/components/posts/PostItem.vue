<template>
  <AppCard>
    <h5 class="card-title text-truncate">{{ title }}</h5>
    <p class="card-text m-lg-1 text-truncate">
      {{ content }}
    </p>
    <p class="text-muted m-0">{{ createAt }}</p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-1" @click.stop="$emit('modal')">
          <i class="bi bi-card-text"></i>
        </button>
        <button class="btn p-1" @click.stop="$emit('preview')">
          <i class="bi bi-eye-fill"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createAt: {
    type: [String, Date, Number],
  },
});

defineEmits(['modal', 'preview']);
</script>
