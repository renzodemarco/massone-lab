import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getReportByNumber, updateReport } from "../services/reports";
import { getClients } from "../services/clients";
import speciesOptions from "../utils/species"
import Sidebar from "../sections/Sidebar";

export default function ReportDetail() {

  const { n } = useParams();
  const [clients, setClients] = useState([]);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    getReportByNumber(n)
      .then((data) => {
        reset({
          protocolNumber: data.protocolNumber,
          status: data.status,
          patient: {
            owner: data.patient.owner || "",
            name: data.patient.name || "",
            species: data.patient.species || "",
            breed: data.patient.breed || "",
            age: data.patient.age || "",
            sex: data.patient.sex || "macho",
            color: data.patient.color || "",
            neutered: data.patient.neutered || false,
          },
          veterinarian: data.veterinarian || "",
          client: data.client._id || "",
          studyType: data.studyType || "cito",
          sampleInfo: data.sampleInfo || "",
          macroDescription: data.macroDescription || "",
          microDescription: data.microDescription || "",
          comments: data.comments || "",
          result: data.result || "",
          entryDate: data.entryDate?.split("T")[0] || "",
          dueDate: data.dueDate?.split("T")[0] || "",
          _id: data._id,
        });
        console.log(data.patient.species)
      })
      .catch(console.error);
    getClients()
      .then(data => setClients(data || []))
      .catch(err => console.error(err));
  }, [n, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateReport(formData._id, formData);
      alert("Reporte actualizado!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar back={true} />
      <div className="p-6 min-h-screen w-[1000px] mx-auto">
        <div className="px-10 py-6 overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
          <h1 className="text-2xl font-bold mb-4">Informe {n}</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="pt-8 grid grid-cols-2 gap-x-12 gap-y-4">

            <div>
              <label className="block mb-1 font-medium" htmlFor="protocolNumber">Nro. de Protocolo</label>
              <input {...register("protocolNumber")} id="protocolNumber" className="border p-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="status">Estado</label>
              <select {...register("status")} id="status" className="border p-2 rounded">
                <option value="entered">Ingresado</option>
                <option value="started">Iniciado</option>
                <option value="finished">Finalizado</option>
                <option value="sent">Enviado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="client">Cliente</label>
              <select {...register("client")} id="client" className="border p-2 rounded" >
                {clients.map(client => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="veterinarian">Veterinario/a</label>
              <input {...register("veterinarian")} id="veterinarian" className="border p-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="studyType">Tipo de Estudio</label>
              <select {...register("studyType")} className="border p-2 rounded">
                <option value="cito">Citología</option>
                <option value="hp">Histopatología</option>
                <option value="ihq">Inmunohistoquímica</option>
              </select>
            </div>

            <h2 className="text-2xl font-bold mt-4 col-span-2">Paciente</h2>

            <div>
              <label className="block mb-1 font-medium" htmlFor="owner">Propietario/a</label>
              <input {...register("patient.owner")} id="owner" className="border p-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Nombre</label>
              <input {...register("patient.name")} className="border p-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="species">Especie</label>
              <select {...register("patient.species")} id="species" className="border p-2 rounded" defaultValue="">
                <option value="">Seleccione</option>
                <option value="canine">Canino</option>
                <option value="feline">Felino</option>
                <option value="equine">Equino</option>
                <option value="bovine">Bovino</option>
                <option value="porcine">Porcino</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="breed">Raza</label>
              <input {...register("patient.breed")} id="breed" className="border p-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="age">Edad</label>
              <input {...register("patient.age")} id="age" className="border p-2 rounded" />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="sex">Sexo</label>
              <select {...register("patient.sex")} id="sex" className="border p-2 rounded">
                <option value="">Desconocido</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="neutered">Castrado</label>
              <select
                id="neutered"
                className="border p-2 rounded"
                {...register("patient.neutered")}
                onChange={e => {
                  const val = e.target.value;
                  setValue("patient.neutered", val === "" ? undefined : val === "true");
                }}
              >
                <option value="">Desconocido</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="color">Color</label>
              <input {...register("patient.color")} id="color" className="border p-2 rounded" />
            </div>

            <h2 className="text-2xl font-bold mt-4 col-span-2">Resultados</h2>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="sampleInfo">Muestra Remitida</label>
              <textarea {...register("sampleInfo")} id="sampleInfo" className="border p-2 rounded w-full" />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="macroDescription">Descripción Macroscópica</label>
              <textarea {...register("macroDescription")} id="macroDescription" className="border p-2 rounded w-full min-h-[100px]" />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="microDescription">Descripción Microscópica</label>
              <textarea {...register("microDescription")} id="microDescription" className="border p-2 rounded w-full min-h-[100px]" />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="comments">Comentarios</label>
              <textarea {...register("comments")} id="comments" className="border p-2 rounded w-full" />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="result">Diagnóstico</label>
              <textarea {...register("result")} id="result" className="border p-2 rounded w-full" />
            </div>

            <div className="flex justify-center col-span-2">
              <button type="submit" className="bg-[#632b91] text-white px-20 py-2 rounded-lg transition font-bold link-button">
                Guardar Informe
              </button>
            </div>

          </form>
        </div>
      </div>
    </div >
  );
}