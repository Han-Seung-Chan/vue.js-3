import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
  method: 'get',
};
const defaultOption = {
  immediate: true,
};

export const useAxios = (url, config = {}, options = {}) => {
  const data = ref(null);
  const isLoading = ref(false);
  const isError = ref(null);
  const response = ref(null);

  const { params } = config;
  const { onSuccess, onError, immediate } = {
    ...defaultConfig,
    ...options,
  };

  const execute = (bodyData) => {
    data.value = null;
    isError.value = null;
    isLoading.value = true;

    axios(url, {
      ...defaultOption,
      ...config,
      params: unref(params),
      data: typeof bodyData === 'object' ? bodyData : {},
    })
      .then((res) => {
        response.value = res;
        data.value = res.data;
        if (onSuccess) onSuccess(res);
      })
      .catch((err) => {
        isError.value = err;
        if (onError) onError(err);
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  if (isRef(params)) watchEffect(execute);
  else {
    if (immediate) execute();
  }
  return { data, isLoading, isError, response, execute };
};
