import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReportByNumber, updateReport } from "../services/reports";
import Sidebar from "../sections/Sidebar";

export default function ReportDetail() {
  const { n } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportByNumber(n)
      .then((data) => {
        setReport({
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
            neutered: data.patient.neutered || false
          },
          veterinarian: data.veterinarian || "",
          client: data.client || "",
          studyType: data.studyType || "cito",
          sampleInfo: data.sampleInfo || "",
          macroDescription: data.macroDescription || "",
          microDescription: data.microDescription || "",
          comments: data.comments || "",
          result: data.result || "",
          entryDate: data.entryDate?.split("T")[0] || "",
          dueDate: data.dueDate?.split("T")[0] || "",
          _id: data._id
        });
        setLoading(false);
      })
      .catch(console.error);
  }, [n]);

  const handleChange = (e, nested = false) => {
    if (nested) {
      const { name, value, type, checked } = e.target;
      setReport({
        ...report,
        patient: { ...report.patient, [name]: type === "checkbox" ? checked : value }
      });
    } else {
      setReport({ ...report, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReport(report._id, report);
      alert("Reporte actualizado!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar back={true} />
      <div className="p-6 min-h-screen max-w-3xl mx-auto">
        <div className=" px-10 py-6 overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
          <h1 className="text-2xl font-bold mb-4">Informe {n}</h1>
          <form className="pt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Protocolo y Estado */}
            <input
              type="text"
              name="protocolNumber"
              value={report.protocolNumber}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Número de protocolo"
            />
            <select
              name="status"
              value={report.status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="entered">Ingresado</option>
              <option value="started">Iniciado</option>
              <option value="finished">Finalizado</option>
              <option value="sent">Enviado</option>
              <option value="cancelled">Cancelado</option>
            </select>

            {/* Datos del Paciente */}
            <h2 className="font-bold">Paciente</h2>
            <input
              type="text"
              name="owner"
              value={report.patient.owner}
              onChange={(e) => handleChange(e, true)}
              placeholder="Dueño"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="name"
              value={report.patient.name}
              onChange={(e) => handleChange(e, true)}
              placeholder="Nombre"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="species"
              value={report.patient.species}
              onChange={(e) => handleChange(e, true)}
              placeholder="Especie"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="breed"
              value={report.patient.breed}
              onChange={(e) => handleChange(e, true)}
              placeholder="Raza"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="age"
              value={report.patient.age}
              onChange={(e) => handleChange(e, true)}
              placeholder="Edad"
              className="border p-2 rounded"
            />
            <select
              name="sex"
              value={report.patient.sex}
              onChange={(e) => handleChange(e, true)}
              className="border p-2 rounded"
            >
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </select>
            <input
              type="text"
              name="color"
              value={report.patient.color}
              onChange={(e) => handleChange(e, true)}
              placeholder="Color"
              className="border p-2 rounded"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="neutered"
                checked={report.patient.neutered}
                onChange={(e) => handleChange(e, true)}
              />
              Castrado
            </label>

            <input
              type="text"
              name="veterinarian"
              value={report.veterinarian}
              onChange={handleChange}
              placeholder="Veterinario"
              className="border p-2 rounded"
            />
            <select
              name="studyType"
              value={report.studyType}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="cito">Citología</option>
              <option value="hp">Histopatología</option>
              <option value="ihq">IHQ</option>
            </select>
            <textarea
              name="sampleInfo"
              value={report.sampleInfo}
              onChange={handleChange}
              placeholder="Información de la muestra"
              className="border p-2 rounded"
            />
            <textarea
              name="macroDescription"
              value={report.macroDescription}
              onChange={handleChange}
              placeholder="Descripción macroscópica"
              className="border p-2 rounded"
            />
            <textarea
              name="microDescription"
              value={report.microDescription}
              onChange={handleChange}
              placeholder="Descripción microscópica"
              className="border p-2 rounded"
            />
            <textarea
              name="comments"
              value={report.comments}
              onChange={handleChange}
              placeholder="Comentarios"
              className="border p-2 rounded"
            />
            <textarea
              name="result"
              value={report.result}
              onChange={handleChange}
              placeholder="Resultado"
              className="border p-2 rounded"
            />

            <div className="flex gap-2">
              <label>Fecha de Entrada</label>
              <input
                type="date"
                name="entryDate"
                value={report.entryDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <label>Fecha Límite</label>
              <input
                type="date"
                name="dueDate"
                value={report.dueDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="bg-[#632b91] hover:bg-[#632b91]/90 text-white p-2 rounded font-bold"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}