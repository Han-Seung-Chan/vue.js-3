import { ref } from 'vue';

const alerts = ref([]);

export const useAlert = () => {
  const showAlert = (message, type = 'error') => {
    alerts.value.push({ message, type });

    setTimeout(() => {
      alerts.value.shift();
    }, 1500);
  };

  const alertSuccess = (message) => showAlert(message, 'success');

  return { alerts, showAlert, alertSuccess };
};
