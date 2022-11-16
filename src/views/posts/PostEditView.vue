<template>
  <AppLoading v-if="isLoading" />

  <AppError v-else-if="isError" :message="isError.message" />

  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="isEditError" :message="isEditError.message" />

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

        <button class="btn btn-primary" :disabled="isEditLoading">
          <template v-if="isEditLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 수정 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const route = useRoute();
const goDetailPage = () => router.go(-1);
const id = route.params.id;

const { showAlert, alertSuccess } = useAlert();

const url = computed(() => `/posts/${id}`);
const { data: form, isLoading, isError } = useAxios(url.value);

const { isLoading: isEditLoading, isError: isEditError } = useAxios(
  url.value,
  { method: 'patch' },
  {
    immediate: false,
    onSuccess: () => {
      alertSuccess('수정이 완료되었습니다!!!');
      router.push({ name: 'PostDetail', params: { id } });
    },
    onError: (err) => {
      showAlert(err.message);
    },
  },
);
</script>
