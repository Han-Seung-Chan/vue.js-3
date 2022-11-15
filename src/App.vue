<template>
  <TheHeader></TheHeader>
  <TheView></TheView>
  <AppAlert :items="alerts" />
</template>

<script setup>
import TheHeader from '@/layout/TheHeader.vue';
import TheView from '@/layout/TheView.vue';
import AppAlert from '@/components/app/AppAlert.vue';
import { useAlert } from '@/hooks/useAlert';

const { alerts } = useAlert();
</script>
