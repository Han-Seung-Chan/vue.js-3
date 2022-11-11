<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <PostForm @submit.prevent="saveForm" v-model:title="form.title" v-model:content="form.content">
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">목록</button>
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goListPage = () => router.push({ name: 'PostList' });

const form = ref({
  title: '',
  content: '',
});

const saveForm = async () => {
  const now = new Date();
  try {
    await createPost({
      ...form.value,
      createAt: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    });
    router.push({ name: 'PostList' });
  } catch (err) {
    console.error(err);
  }
};
</script>

<style lang="scss" scoped></style>
