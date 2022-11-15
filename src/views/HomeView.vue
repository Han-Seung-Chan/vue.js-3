<template>
  <div><h2>Home</h2></div>
  <hr class="my-4" />
  <h2>{{ $person.name }}</h2>
  <button class="btn btn-primary" @click="person.say">click person</button>
</template>

<script setup>
import { inject } from 'vue';

const person = inject('person');
</script>

<style lang="scss" scoped></style>
