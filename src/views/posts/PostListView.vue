<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input type="text" class="form-control" v-model="params.title_like" />
        </div>
        <div class="col-4">
          <select class="form-select" v-model="params._limit">
            <option value="3">3개씩 보기</option>
            <option value="6">6개씩 보기</option>
            <option value="9">9개씩 보기</option>
          </select>
        </div>
      </div>
    </form>
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
    <nav class="mt-5">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !(params._page > 1) }">
          <a class="page-link" href="#" @click.prevent="--params._page">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pageCount"
          :key="page"
          class="page-item"
          :class="{ active: params._page === page }"
        >
          <a class="page-link" href="#" @click.prevent="params._page = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !(params._page < pageCount) }">
          <a class="page-link" href="#" @click.prevent="++params._page">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <hr class="my-5" />
    <AppCard>
      <PostDetailView :id="parseInt(1)" />
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import AppCard from '@/components/AppCard.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts } from '@/api/posts';

const params = ref({
  _sort: 'createAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});
const totalCount = ref(0);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));

const posts = ref([]);
const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (err) {
    console.error(err);
  }
};
watchEffect(fetchPosts);

const router = useRouter();
const goDetailPage = (id) => router.push(`/posts/${id}`);
</script>

<style lang="scss" scoped></style>
