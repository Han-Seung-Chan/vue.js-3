<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Khan</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/nested">Nested</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/posts">Posts</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/my">MyPage</RouterLink>
          </li>
        </ul>
        <div class="d-flex">
          <button
            class="btn btn-outline-light"
            type="button"
            @click="goWritePage"
          >
            글쓰기
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goWritePage = () =>
  router.push({
    name: 'PostCreate',
  });
</script>
