import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById, updateClient } from "../services/clients";
import Sidebar from "../sections/Sidebar";

export default function ClientDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, control } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "veterinarians"
  });

  useEffect(() => {
    getClientById(id)
      .then(data => {
        console.log(data);
        reset({
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
          phone: data.phone || "",
          veterinarians: data.veterinarians || []
        });
      })
      .catch(console.error);
  }, [id, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateClient(id, formData);
      alert("Cliente actualizado");
      navigate("/?view=clients");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar back={true} />

      <div className="p-6 min-h-screen w-[800px] mx-auto">
        <div className="px-10 py-6 overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
          
          <h1 className="text-2xl font-bold mb-4">Cliente</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-12 gap-y-4 pt-6">

            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Nombre</label>
              <input {...register("name")} id="name" className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="email">Email</label>
              <input {...register("email")} id="email" className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="address">Dirección</label>
              <input {...register("address")} id="address" className="border p-2 rounded w-full" />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="phone">Teléfono</label>
              <input {...register("phone")} id="phone" className="border p-2 rounded w-full" />
            </div>

            <div className="col-span-2 mt-4">
              <h2 className="text-xl font-bold mb-2">Veterinarios</h2>

              {fields.map((field, idx) => (
                <div key={field.id} className="flex gap-3 mb-2">
                  <input
                    {...register(`veterinarians.${idx}`)}
                    className="border p-2 rounded w-full"
                  />
                  <button
                    type="button"
                    className="bg-[#99144d] text-white px-4 transition font-bold rounded delete-button"
                    onClick={() => remove(idx)}
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="bg-[#632b91] text-white px-6 py-2 mt-2 transition rounded link-button"
                onClick={() => append("")}
              >
                Agregar Veterinario
              </button>
            </div>

            <div className="flex justify-center col-span-2 mt-6">
              <button
                type="submit"
                className="bg-[#632b91] text-white px-20 py-2 rounded-lg transition font-bold link-button"
              >
                Guardar Cliente
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}