import { createRouter, createWebHistory } from 'vue-router';
import AboutViewVue from '@/views/AboutView.vue';
import HomeViewVue from '@/views/HomeView.vue';
import PostListViewVue from '@/views/posts/PostListView.vue';
import PostCreateViewVue from '@/views/posts/PostCreateView.vue';
import PostDetailViewVue from '@/views/posts/PostDetailView.vue';
import PostEditViewVue from '@/views/posts/PostEditView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeViewVue },
  { path: '/about', name: 'About', component: AboutViewVue },
  { path: '/posts', name: 'PostList', component: PostListViewVue },
  { path: '/posts/create', name: 'PostCreate', component: PostCreateViewVue },
  { path: '/posts/:id', name: 'PostDetail', component: PostDetailViewVue },
  { path: '/posts/edit/:id', name: 'PostEdit', component: PostEditViewVue },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
