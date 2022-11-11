<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />
    <hr class="my-4" />
    <AppGrid :items="posts">
      <template v-slot="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :create-at="item.createAt"
          @click="goDetailPage(item.id)"
          @showModal="openModal(item)"
        />
      </template>
    </AppGrid>

    <AppPagiNation
      :curPage="params._page"
      :pageCount="pageCount"
      @page="(page) => (params._page = page)"
    />

    <Teleport to="#modal">
      <PostModal
        v-model="showModal"
        :title="modalTitle"
        :content="modalContent"
        :createAt="modalCreateAt"
      />
    </Teleport>

    <template v-if="posts && posts.length">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="`${posts[0].id}`" />
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import AppPagiNation from '@/components/AppPagiNation.vue';
import AppGrid from '@/components/AppGrid.vue';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts } from '@/api/posts';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';

const params = ref({
  _sort: 'createAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});
const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

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

const showModal = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreateAt = ref('');

const openModal = ({ title, content, createAt }) => {
  showModal.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreateAt.value = createAt;
};
</script>

<style lang="scss" scoped></style>
