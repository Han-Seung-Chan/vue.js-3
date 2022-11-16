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
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const goListPage = () => router.push({ name: 'PostList' });

const form = ref({
  title: '',
  content: '',
});

const { showAlert, alertSuccess } = useAlert();

const { isLoading, isError, execute } = useAxios(
  '/posts',
  {
    method: 'post',
  },
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: 'PostList' });
      alertSuccess('등록이 완료되었습니다!!!');
    },
    onError: (err) => {
      showAlert(err.message);
      isError.value = err;
    },
  },
);

const saveForm = async () => {
  const now = new Date();
  execute({
    ...form.value,
    createAt: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
  });
};
</script>
