<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <form @submit.prevent="editForm">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input type="text" class="form-control" id="title" v-model="form.title" />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea class="form-control" id="content" rows="3" v-model="form.content"></textarea>
      </div>
      <div class="pt-4">
        <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { getPostsId, updatePost } from '@/api/posts';
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
