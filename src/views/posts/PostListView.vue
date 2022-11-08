<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :create-at="post.createAt"
          @click="goDetailPage(post.id)"
        ></PostItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { ref } from 'vue';
import { getPosts } from '@/data/posts';
import { useRouter } from 'vue-router';

const posts = ref([]);
(() => {
  posts.value = getPosts();
})();

const router = useRouter();
const goDetailPage = (id) => router.push(`/posts/${id}`);
</script>

<style lang="scss" scoped></style>
