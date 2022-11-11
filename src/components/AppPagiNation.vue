<template>
  <nav class="mt-5">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="isPrevPage">
        <a
          class="page-link"
          href="#"
          @click.prevent="$emit('page', curPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pageCount"
        :key="page"
        class="page-item"
        :class="{ active: curPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="$emit('page', page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="isNextPage">
        <a
          class="page-link"
          href="#"
          @click.prevent="$emit('page', curPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  curPage: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
});
defineEmits(['page']);

const isPrevPage = computed(() => ({ disabled: !(props.curPage > 1) }));
const isNextPage = computed(() => ({
  disabled: !(props.curPage < props.pageCount),
}));
</script>

<style lang="scss" scoped></style>
