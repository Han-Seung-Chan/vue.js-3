import { computed, unref } from 'vue';

export const useSniffling = (num) => {
  const isOdd = computed(() => unref(num) % 2 === 1);

  return {
    isOdd,
  };
};
