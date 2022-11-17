<template>
  <div class="app-alert">
    <TransitionGroup name="alert">
      <div
        v-for="({ message, type }, index) in alerts"
        :key="index"
        class="alert"
        :class="styleClass(type)"
        role="alert"
      >
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useAlert } from '@/hooks/useAlert';

const { alerts } = useAlert();

const styleClass = (type) =>
  type === 'error' ? 'alert-danger' : 'alert-primary';
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}
.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.alert-enter-active,
.alert-leave-active {
  transition: all 0.5s ease;
}
.alert-enter-to,
.alert-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
