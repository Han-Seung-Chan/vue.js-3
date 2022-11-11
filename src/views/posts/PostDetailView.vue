<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">{{ post.createAt }}</p>
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
        <button class="btn btn-outline-danger" @click="removePost">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deletePost, getPostsId } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: String || Number,
});

const post = ref({
  title: '',
  content: '',
  createAt: '',
});

(async () => {
  try {
    const { data } = await getPostsId(props.id);
    post.value = { ...data };
  } catch (err) {
    console.error(err);
  }
})();

const removePost = async () => {
  try {
    if (!confirm('삭제 하시겠습니까?')) return;

    await deletePost(props.id);
    goListPage();
  } catch (err) {
    console.error(err);
  }
};

const router = useRouter();
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () => router.push(`/posts/edit/${props.id}`);
</script>

<style lang="scss" scoped></style>
