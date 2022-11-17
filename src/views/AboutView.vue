<template>
  <div>
    <h2>About</h2>
    <hr class="my-4" />

    <h2>Pinia</h2>
    <p>count : {{ counter }}</p>
    <p>doubleCount : {{ doubleCount }}</p>
    <p>doubleCountPlusOne : {{ doubleCountPlusOne }}</p>
    <button @click="store.increment()">add count</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
</script>
