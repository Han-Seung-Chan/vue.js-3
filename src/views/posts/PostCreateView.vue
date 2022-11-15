<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="isError" :message="isError.message" />

    <PostForm
      @submit.prevent="saveForm"
      v-model:title="form.title"
      v-model:content="form.content"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>

        <button class="btn btn-primary" :disabled="isLoading">
          <template v-if="isLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>저장</template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/hooks/useAlert';

const router = useRouter();
const goListPage = () => router.push({ name: 'PostList' });

const form = ref({
  title: '',
  content: '',
});

const isLoading = ref(false);
const isError = ref(null);

const { showAlert, alertSuccess } = useAlert();

const saveForm = async () => {
  const now = new Date();
  try {
    isLoading.value = true;
    await createPost({
      ...form.value,
      createAt: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    });
    router.push({ name: 'PostList' });
    alertSuccess('등록이 완료되었습니다!!!');
  } catch (err) {
    showAlert(err.message);
    isError.value = err;
  } finally {
    isLoading.value = false;
  }
};
</script>
