<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm @submit.prevent="editForm" v-model:title="form.title" v-model:content="form.content">
      <template #actions>
        <button type="button" class="btn btn-outline-danger" @click="goDetailPage">취소</button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { getPostsId, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const goDetailPage = () => router.go(-1);
const id = route.params.id;

const form = ref({
  title: '',
  content: '',
});

(async () => {
  try {
    const { data } = await getPostsId(id);
    form.value = { ...data };
  } catch (err) {
    console.error(err);
  }
})();

const editForm = async () => {
  const now = new Date();

  try {
    await updatePost(id, {
      ...form.value,
      createAt: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    });
    router.push({ name: 'PostDetail', params: { id } });
  } catch (err) {
    console.error(err);
  }
};
</script>

<style lang="scss" scoped></style>
