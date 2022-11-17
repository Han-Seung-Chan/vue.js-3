import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [],
  }),
  actions: {
    showAlert(message, type = 'error') {
      this.alerts.push({ message, type });

      setTimeout(() => {
        this.alerts.shift();
      }, 1500);
    },

    alertSuccess(message) {
      this.showAlert(message, 'success');
    },
  },
});
