<template>
  <AppLoading v-if="isLoading" />

  <AppError v-else-if="isError" :message="isError.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ post.createAt }}</p>
    <hr class="my-4" />
    <AppError v-if="isRemoveError" :message="isRemoveError.message" />

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
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          @click="removePostHandler"
          :disabled="isRemoveLoading"
        >
          <template v-if="isRemoveLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> 삭제 </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';

const props = defineProps({
  id: String,
});

const { showAlert, alertSuccess } = useAlert();

const url = computed(() => `/posts/${props.id}`);
const { isError, isLoading, data: post } = useAxios(url.value);

const {
  error: isRemoveError,
  loading: isRemoveLoading,
  execute,
} = useAxios(
  url.value,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      alertSuccess('삭제가 완료되었습니다.');
      router.push({ name: 'PostList' });
    },
    onError: (err) => {
      showAlert(err.message);
    },
  },
);

const removePostHandler = async () => {
  if (confirm('삭제 하시겠습니까?') === false) {
    return;
  }
  execute();
};

const router = useRouter();
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () => router.push(`/posts/edit/${props.id}`);
</script>
