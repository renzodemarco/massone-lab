import Swal from "sweetalert2";

export const confirmAddVeterinarian = async (veterinarian) => {
  return Swal.fire({
    title: `"${veterinarian}" no existe en este cliente. ¿Desea agregarlo a la lista?`,
    icon: 'question',
    iconColor: '#632b91',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: '#632b91',
    cancelButtonColor: '#99144d',
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then((result) => {
    return result.isConfirmed;
  });
}