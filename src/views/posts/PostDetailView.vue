<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">{{ form.createAt }}</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPostsId } from '@/data/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: String,
});

const form = ref({});
(() => {
  const data = getPostsId(props.id);
  form.value = { ...data };
})();

const router = useRouter();
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () => router.push(`/posts/edit/${props.id}`);
</script>

<style lang="scss" scoped></style>
