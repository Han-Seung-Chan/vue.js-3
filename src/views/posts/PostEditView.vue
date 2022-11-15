<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      @submit.prevent="editForm"
      v-model:title="form.title"
      v-model:content="form.content"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostsId, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/hooks/useAlert';

const router = useRouter();
const route = useRoute();
const goDetailPage = () => router.go(-1);
const id = route.params.id;

const { showAlert, alertSuccess } = useAlert();

const form = ref({
  title: '',
  content: '',
});

(async () => {
  try {
    const { data } = await getPostsId(id);
    form.value = { ...data };
  } catch (err) {
    showAlert(err.message);
  }
})();

const editForm = async () => {
  try {
    await updatePost(id, {
      ...form.value,
    });
    alertSuccess('수정이 완료되었습니다!!!');
    router.push({ name: 'PostDetail', params: { id } });
  } catch (err) {
    showAlert(err.message);
  }
};
</script>

<style lang="scss" scoped></style>
