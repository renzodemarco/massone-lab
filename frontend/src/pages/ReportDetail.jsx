import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getReportByNumber, getReportDueDate, updateReport, finishReport } from "../services/reports";
import { addVeterinarianToClient, getClientById, getClients } from "../services/clients";
import Sidebar from "../sections/Sidebar";
import FormError from "../components/FormError";
import ClientPicker from "../components/ClientPicker";
import VeterinarianPicker from "../components/VeterinarianPicker";
import ReportImages from "../components/ReportImages";
import { confirmAddVeterinarian } from "../utils/sweetAlerts";
import { cleanPayload } from "../utils/cleanPayload";

export default function ReportDetail() {

  const { n } = useParams();
  const [reportId, setReportId] = useState(null);
  const [reportImages, setReportImages] = useState([]);
  const [reportStatus, setReportStatus] = useState("entered");
  const [clients, setClients] = useState([]);
  const [clientVeterinarians, setClientVeterinarians] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    getReportByNumber(n)
      .then((data) => {
        setReportId(data._id);
        setReportImages(data.images || []);
        setReportStatus(data.status || "entered");
        reset({
          protocolNumber: data.protocolNumber,
          status: data.status,
          patient: {
            owner: data.patient.owner || "",
            name: data.patient.name || "",
            species: data.patient.species || "",
            breed: data.patient.breed || "",
            age: data.patient.age || "",
            sex: data.patient.sex || "unknown",
            color: data.patient.color || "",
            neutered: data.patient.neutered || "unknown",
          },
          veterinarian: data.veterinarian || "",
          client: data.client?._id || "",
          studyType: data.studyType || "cito",
          sampleInfo: data.sampleInfo || "",
          macroDescription: data.macroDescription || "",
          microDescription: data.microDescription || "",
          comments: data.comments || "",
          result: data.result || "",
          entryDate: data.entryDate?.split("T")[0] || ""
        });
      })
      .catch(console.error);
    getClients()
      .then(data => setClients(data || []))
      .catch(err => console.error(err));
  }, [n, reset]);

  const entryDate = watch("entryDate");
  const studyType = watch("studyType");
  const selectedClient = watch("client");
  const selectedVeterinarian = watch("veterinarian");

  useEffect(() => {
    if (!entryDate || !studyType) {
      setDueDate(null);
      return;
    }

    getReportDueDate(entryDate, studyType)
      .then((value) => setDueDate(value ? new Date(value) : null))
      .catch((err) => {
        console.error(err);
        setDueDate(null);
      });
  }, [entryDate, studyType]);

  useEffect(() => {
    if (!selectedClient) {
      setClientVeterinarians([]);
      return;
    }

    getClientById(selectedClient)
      .then((client) => {
        const veterinarians = (client?.veterinarians || []).filter((veterinarian) => typeof veterinarian === "string" && veterinarian.trim());
        setClientVeterinarians(veterinarians);
      })
      .catch((err) => {
        console.error(err);
        setClientVeterinarians([]);
      });
  }, [selectedClient]);

  const isFinished = reportStatus === "finished";

  const maybeAddVeterinarianToClient = async (data) => {
    const veterinarian = data.veterinarian?.trim();
    if (!data.client || !veterinarian) return;

    const alreadyExists = clientVeterinarians.some(
      (item) => item.trim().toLowerCase() === veterinarian.toLowerCase()
    );

    if (alreadyExists) return;

    const shouldAdd = await confirmAddVeterinarian(veterinarian);

    if (!shouldAdd) return;

    const updatedClient = await addVeterinarianToClient(data.client, clientVeterinarians, veterinarian);
    if (updatedClient?.veterinarians) {
      setClientVeterinarians(updatedClient.veterinarians);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const payload = cleanPayload(formData);
      const updated = await updateReport(reportId, payload);
      setReportStatus(updated?.status || (reportStatus === "entered" ? "started" : reportStatus));
      setValue("status", updated?.status || (reportStatus === "entered" ? "started" : reportStatus), { shouldDirty: true });
      alert("Informe actualizado!");
      navigate("/?view=reports");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  const onCancelReport = async () => {
    if (window.confirm("¿Estás seguro de que quieres cancelar este informe?")) {
      try {
        const updated = await updateReport(reportId, { status: "cancelled" });
        setReportStatus(updated?.status || "cancelled");
        setValue("status", updated?.status || "cancelled", { shouldDirty: true });
        alert("Informe cancelado");
        navigate("/?view=reports");
      } catch (err) {
        console.error(err);
        alert("Error al cancelar");
      }
    }
  };

  const onFinishReport = async () => {
    try {
      const formValues = watch();
      const missing = [];

      if (!formValues.protocolNumber?.trim()) missing.push("Nro. de Protocolo");
      if (!formValues.entryDate) missing.push("Fecha de Entrada");
      if (!formValues.client) missing.push("Cliente");
      if (!formValues.studyType) missing.push("Tipo de Estudio");
      if (!formValues.sampleInfo?.trim()) missing.push("Muestra Remitida");
      if (!formValues.microDescription?.trim()) missing.push("Descripción Microscópica");
      if (!formValues.result?.trim()) missing.push("Diagnóstico");

      if (missing.length) {
        alert(`No se puede finalizar el informe. Faltan: ${missing.join(", ")}`);
        return;
      }

      if (reportStatus === "finished") {
        const updated = await updateReport(reportId, { status: "started" });
        setReportStatus(updated?.status || "started");
        setValue("status", updated?.status || "started", { shouldDirty: true });
        alert("Informe reabierto correctamente");
      } else {
        const updated = await finishReport(reportId);
        setReportStatus(updated?.status || "finished");
        setValue("status", updated?.status || "finished", { shouldDirty: true });
        alert("Informe finalizado correctamente");
      }
      navigate("/?view=reports");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al finalizar el informe");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar back={true} />
      <div className="p-6 min-h-screen w-[1000px] mx-auto">
        <div className="px-10 py-6 overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
          <h1 className="text-2xl font-bold mb-4">Informe {n}</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-8 grid grid-cols-2 gap-x-12 gap-y-4"
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}>

            <div>
              <label className="block mb-1 font-medium" htmlFor="protocolNumber">Nro. de Protocolo</label>
              <input {...register("protocolNumber")} id="protocolNumber" className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`} disabled={isFinished} />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="status">Estado</label>
              <div id="status" className="rounded border border-[#dce0e5] bg-[#f8fafb] px-3 py-2 text-sm text-[#4b5563]">
                {reportStatus === "finished" ? "Finalizado" : reportStatus === "cancelled" ? "Cancelado" : reportStatus === "sent" ? "Enviado" : reportStatus === "started" ? "En curso" : "Ingresado"}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="entryDate">Fecha de Entrada</label>
              <input
                type="date"
                {...register("entryDate", { required: "La fecha de entrada es obligatoria" })}
                id="entryDate"
                className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`}
                disabled={isFinished}
              />
              {dueDate && (
                <p className="text-sm text-gray-400 mt-1">
                  Entrega estimada: {dueDate.toLocaleDateString("es-AR")}
                </p>
              )}
              <FormError message={errors.entryDate?.message} />
            </div>

            <div>
              <input type="hidden" {...register("client")} />
              <ClientPicker
                clients={clients}
                value={selectedClient}
                onChange={(clientId) => {
                  if (clientId !== selectedClient) {
                    setValue("veterinarian", "", { shouldDirty: true });
                  }
                  setValue("client", clientId, { shouldDirty: true });
                }}
                error={errors.client?.message}
                disabled={isFinished}
              />
            </div>

            <div>
              <input type="hidden" {...register("veterinarian")} />
              <VeterinarianPicker
                veterinarians={clientVeterinarians}
                value={selectedVeterinarian}
                onChange={(veterinarian) => setValue("veterinarian", veterinarian, { shouldDirty: true })}
                onAdd={(inputValue) => maybeAddVeterinarianToClient({ client: selectedClient, veterinarian: inputValue })}
                error={errors.veterinarian?.message}
                disabled={!selectedClient || isFinished}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="studyType">Tipo de Estudio</label>
              <select {...register("studyType")} className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`} disabled={isFinished}>
                <option value="cito">Citología</option>
                <option value="hp">Histopatología</option>
                <option value="ihq">Inmunohistoquímica</option>
              </select>
            </div>

            <h2 className="text-2xl font-bold mt-4 col-span-2">Paciente</h2>

            <div>
              <label className="block mb-1 font-medium" htmlFor="owner">Propietario/a</label>
              <input {...register("patient.owner")} id="owner" className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`} disabled={isFinished} />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Nombre</label>
              <input {...register("patient.name")} className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`} disabled={isFinished} />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="species">Especie</label>
              <select {...register("patient.species")} id="species" className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`} defaultValue="" disabled={isFinished}>
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
              <input {...register("patient.breed")} id="breed" className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`} disabled={isFinished} />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="age">Edad</label>
              <input {...register("patient.age")} id="age" className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`} disabled={isFinished} />
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="sex">Sexo</label>
              <select {...register("patient.sex")} id="sex" className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`} disabled={isFinished}>
                <option value="unknown">Desconocido</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="neutered">Castrado</label>
              <select
                id="neutered"
                className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`}
                {...register("patient.neutered")}
                disabled={isFinished}
              >
                <option value="unknown">Desconocido</option>
                <option value="neutered">Sí</option>
                <option value="entire">No</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium" htmlFor="color">Color</label>
              <input {...register("patient.color")} id="color" className={`border p-2 rounded ${isFinished ? "report-finished-field" : ""}`} disabled={isFinished} />
            </div>

            <h2 className="text-2xl font-bold mt-4 col-span-2">Resultados</h2>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="sampleInfo">Muestra Remitida</label>
              <textarea
                onKeyDown={(e) => e.stopPropagation()}
                {...register("sampleInfo")}
                id="sampleInfo"
                className={`border p-2 rounded w-full ${isFinished ? "report-finished-field" : ""}`}
                disabled={isFinished}
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="macroDescription">Descripción Macroscópica</label>
              <textarea
                onKeyDown={(e) => e.stopPropagation()}
                {...register("macroDescription")}
                id="macroDescription"
                className={`border p-2 rounded w-full min-h-[100px] ${isFinished ? "report-finished-field" : ""}`}
                disabled={isFinished}
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="microDescription">Descripción Microscópica</label>
              <textarea
                onKeyDown={(e) => e.stopPropagation()}
                {...register("microDescription")}
                id="microDescription"
                className={`border p-2 rounded w-full min-h-[100px] ${isFinished ? "report-finished-field" : ""}`}
                disabled={isFinished}
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="comments">Comentarios</label>
              <textarea 
                onKeyDown={(e) => e.stopPropagation()}
                {...register("comments")}
                id="comments" 
                className={`border p-2 rounded w-full ${isFinished ? "report-finished-field" : ""}`} 
                disabled={isFinished}
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-medium" htmlFor="result">Diagnóstico</label>
              <textarea 
                onKeyDown={(e) => e.stopPropagation()}
                {...register("result")} 
                id="result" 
                className={`border p-2 rounded w-full ${isFinished ? "report-finished-field" : ""}`} 
                disabled={isFinished}
              />
            </div>

            {reportId ? (
              <ReportImages
                reportId={reportId}
                images={reportImages}
                onImagesChange={setReportImages}
                disabled={isFinished}
              />
            ) : null}

            <div className="flex flex-wrap justify-around gap-3 col-span-2">
              {!isFinished ? (
                <button type="submit" className="bg-[#632b91] text-white px-16 py-2 rounded-lg transition font-bold link-button">
                  Guardar Informe
                </button>
              ) : null}
              <button
                type="button"
                className="rounded-lg border border-[#0b8457] bg-transparent px-4 py-2 font-semibold text-[#0b8457] transition-colors hover:bg-[#0b8457] hover:text-white"
                onClick={onFinishReport}
              >
                {reportStatus === "finished" ? "Reabrir Informe" : "Finalizar Informe"}
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#99144d] bg-transparent px-4 py-2 font-semibold text-[#99144d] transition-colors hover:bg-[#99144d] hover:text-white opacity-60 hover:opacity-90 transition-opacity"
                onClick={onCancelReport}
                disabled={reportStatus === "cancelled"}
              >
                {reportStatus === "cancelled" ? "Informe cancelado" : "Cancelar Informe"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div >
  );
}



