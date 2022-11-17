<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />

    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />

    <hr class="my-4" />

    <AppLoading v-if="isLoading" />

    <AppError v-else-if="isError" :message="isError.message" />

    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :createAt="item.createAt"
            @click="goDetailPage(item.id)"
            @modal="openModal(item)"
            @preview="changePreviewId(item.id)"
          ></PostItem>
        </template>
      </AppGrid>

      <AppPagiNation
        :curPage="params._page"
        :pageCount="pageCount"
        @page="(page) => (params._page = page)"
      />
    </template>
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createAt="modalCreateAt"
      />
    </Teleport>

    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="`${previewId}`"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostItem from '@/components/posts/PostItem.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';

const router = useRouter();
const params = ref({
  _sort: 'createAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});
const {
  response,
  data: posts,
  isError,
  isLoading,
} = useAxios('/posts', { params });

const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

const goDetailPage = (id) => router.push(`/posts/${id}`);

const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreateAt = ref('');
const openModal = ({ title, content, createAt }) => {
  console.log(createAt);
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreateAt.value = createAt;
};

const previewId = ref(null);
const changePreviewId = (id) => (previewId.value = id);
</script>
