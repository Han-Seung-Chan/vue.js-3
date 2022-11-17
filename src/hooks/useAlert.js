import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

export const useAlert = () => {
  const { alerts } = storeToRefs(useAlertStore());
  const { showAlert, alertSuccess } = useAlertStore();

  return { alerts, showAlert, alertSuccess };
};
