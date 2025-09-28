import { useForm } from "react-hook-form";
import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../services/clients";
import { postReport } from "../services/reports";
import getNextReportNumber from "../utils/getNextProtocolNumber";
import FormError from "../components/FormError";
import Sidebar from "../sections/Sidebar";
import Loading from "../components/Loading";

export default function ReportCreate() {

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    getClients()
      .then(data => setClients(data || []))
      .catch(err => console.error(err));
  }, []);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      protocolNumber: "",
      status: "entered",
      patient: {
        owner: "",
        name: "",
        species: "",
        breed: "",
        age: "",
        sex: undefined,
        color: "",
        neutered: undefined,
      },
      veterinarian: "",
      client: "",
      studyType: "cito",
      sampleInfo: "",
      macroDescription: "",
      microDescription: "",
      comments: "",
      result: "",
    },
  });

  useEffect(() => {
    getNextReportNumber().then(next => setValue("protocolNumber", next));
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await postReport(data);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar back={true} />
      <div className="p-6 min-h-screen w-[1000px] mx-auto">
        <div className=" px-10 py-6 overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
          <h1 className="text-3xl font-bold mb-4">Crear Informe</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="pt-8 grid grid-cols-2 gap-x-12 gap-y-4">

            <div>
              <label className="block mb-1 font-medium" htmlFor="protocolNumber">Nro. de Protocolo</label>
              <input
                {...register("protocolNumber", { required: "El número de protocolo es obligatorio" })}
                id="protocolNumber"
                className="border p-2 rounded"
              />
              <FormError message={errors.protocolNumber?.message} />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="status">Estado</label>
              <select
                {...register("status")}
                id="status"
                className="border p-2 rounded"
              >
                <option value="entered">Ingresado</option>
                <option value="started">Iniciado</option>
                <option value="finished">Finalizado</option>
                <option value="sent">Enviado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="client">Cliente</label>
              <select
                {...register("client", { required: "El cliente es obligatorio" })}
                id="client"
                className="border p-2 rounded"
              >
                <option value="">Seleccione</option>
                {clients.map(client => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <FormError message={errors.client?.message} />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="veterinarian">Veterinario/a</label>
              <input
                {...register("veterinarian")}
                id="veterinarian"
                className="border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="studyType">Tipo de Estudio</label>
              <select
                {...register("studyType")}
                id="studyType"
                className="border p-2 rounded"
              >
                <option value="cito">Citología</option>
                <option value="hp">Histopatología</option>
                <option value="ihq">Inmunohistoquímica</option>
              </select>
            </div>

            <h2 className="text-2xl font-bold mt-4 col-span-2">Paciente</h2>

            <div>
              <label className="block mb-1 font-medium" htmlFor="owner">Propietario/a</label>
              <input
                {...register("patient.owner")}
                id="owner"
                className="border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Nombre</label>
              <input
                {...register("patient.name")}
                id="name"
                className="border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="species">Especie</label>
              <select
                {...register("patient.species")}
                id="species"
                className="border p-2 rounded"
              >
                <option value="">Seleccione</option>
                <option value="Canino">Canino</option>
                <option value="Felino">Felino</option>
                <option value="Equino">Equino</option>
                <option value="Bovino">Bovino</option>
                <option value="Porcino">Porcino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="breed">Raza</label>
              <input
                {...register("patient.breed")}
                id="breed"
                className="border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="age">Edad</label>
              <input
                {...register("patient.age")}
                id="age"
                className="border p-2 rounded"
              />
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
                Crear informe
              </button>
            </div>
            {loading && <Loading />}
          </form>
        </div>
      </div>
    </div>
  );
}
