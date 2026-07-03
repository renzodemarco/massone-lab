import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sections/Sidebar";
import { createClient } from "../services/clients";

export default function ClientCreate() {
  const navigate = useNavigate();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      veterinarians: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "veterinarians",
  });

  const onSubmit = async (formData) => {
    try {
      const payload = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => {
          if (key === "veterinarians") return true;
          if (typeof value === "string") return value.trim() !== "";
          return value !== undefined && value !== null;
        })
      );

      payload.veterinarians = (formData.veterinarians || []).filter(
        (value) => typeof value === "string" && value.trim()
      );

      await createClient(payload);
      reset();
      navigate("/?view=clients");
    } catch (err) {
      console.error(err);
      alert("Error al crear el cliente");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar back={true} />

      <div className="p-6 min-h-screen w-[800px] mx-auto">
        <div className="px-10 py-6 overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
          <h1 className="text-2xl font-bold mb-4">Crear Cliente</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-12 gap-y-4 pt-6">
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Nombre</label>
              <input
                {...register("name", { required: "El nombre es obligatorio" })}
                id="name"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="email">Email</label>
              <input
                {...register("email", { required: "El email es obligatorio" })}
                id="email"
                className="border p-2 rounded w-full"
              />
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
                    placeholder="Nombre del veterinario"
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
                Crear Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
