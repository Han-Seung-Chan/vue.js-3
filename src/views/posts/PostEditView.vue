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
    <AppAlert :show="isShowAlert" :message="alertMessage" :type="alertType" />
  </div>
</template>

<script setup>
import { getPostsId, updatePost } from '@/api/posts';
import AppAlert from '@/components/AppAlert.vue';
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
  try {
    await updatePost(id, {
      ...form.value,
    });
    showAlert('수정이 완료되었습니다!!!', 'success');
    // router.push({ name: 'PostDetail', params: { id } });
  } catch (err) {
    showAlert('네트워크 오류');
  }
};

const isShowAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');
const showAlert = (message, type = 'error') => {
  alertMessage.value = message;
  alertType.value = type;
  isShowAlert.value = true;
  setTimeout(() => {
    isShowAlert.value = false;
  }, 1500);
};
</script>

<style lang="scss" scoped></style>
