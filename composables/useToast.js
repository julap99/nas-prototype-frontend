import { useNuxtApp } from "#app";

export const useToast = () => {
  const { $swal } = useNuxtApp();

  const toast = {
    success(message) {
      $swal.fire({
        icon: "success",
        title: "Success",
        text: message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    },

    error(message) {
      $swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    },

    warning(message) {
      $swal.fire({
        icon: "warning",
        title: "Warning",
        text: message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    },

    info(message) {
      $swal.fire({
        icon: "info",
        title: "Info",
        text: message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    },
  };

  return toast;
}; 