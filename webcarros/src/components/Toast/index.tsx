import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

interface ToastfyProps {
  success?: boolean;
  error?: boolean;
  info?: boolean;
  warning?: boolean;
  message: string;
}

export default function Toastfy({
  success = false,
  error = false,
  info = false,
  warning = false,
  message,
}: ToastfyProps) {
  const toast = useRef<Toast>(null);

  const showSuccess = (message: string) => {
    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: message, life: 2000 });
  };

  const showInfo = (message: string) => {
    toast.current?.show({ severity: 'info', summary: 'Info', detail: message, life: 2000 });
  };

  const showWarn = (message: string) => {
    toast.current?.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 2000 });
  };

  const showError = (message: string) => {
    toast.current?.show({ severity: 'error', summary: 'Erro', detail: message, life: 2000 });
  };

  useEffect(() => {
    if (success) {
      showSuccess(message);
    }
    if (info) {
      showInfo(message);
    }
    if (warning) {
      showWarn(message);
    }
    if (error) {
      showError(message);
    }
  }, [error, info, success, warning, message]);

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
    </div>
  );
}
