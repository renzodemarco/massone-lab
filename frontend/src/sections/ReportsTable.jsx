import { useEffect, useState } from "react";
import { getReports } from "../services/reports";
import { useNavigate } from "react-router-dom";
import { destroyReport } from "../services/reports";

export default function ReportsTable() {

  const [data, setData] = useState({ docs: [] })
  const navigate = useNavigate();

  useEffect(() => {
    getReports().then(setData).catch(console.error);
  }, []);

  const handleDelete = async (id, protocolNumber) => {
    const ok = window.confirm(`¿Seguro que querés eliminar el informe ${protocolNumber}?`);
    if (!ok) return;

    try {
      await destroyReport(id);
      setData(prev => ({
        ...prev,
        docs: prev.docs.filter(d => d._id !== id)
      }));
      alert("Reporte eliminado correctamente");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al eliminar el reporte");
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-white text-[#111418] text-sm font-medium">
            <th className="px-4 py-3 text-center">Nro. Protocolo</th>
            <th className="px-4 py-3 text-center">Tipo de Estudio</th>
            <th className="px-4 py-3 text-center">Cliente</th>
            <th className="px-4 py-3 text-center">Paciente</th>
            <th className="px-4 py-3 text-center">Fecha de Entrada</th>
            <th className="px-4 py-3 text-center">Fecha Límite</th>
            <th className="px-4 py-3 text-center">Estado</th>
            <th className="px-4 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {data?.docs?.map((r, i) => (
            <tr key={i} className="border-t border-[#dce0e5]">
              <td className="px-4 py-2 text-sm text-[#111418] text-center">{r.protocolNumber}</td>
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{r.studyType}</td>
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{r.client.name}</td>
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{r.patient.name || "-"}</td>
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{new Date(r.entryDate).toLocaleDateString("es-AR")}</td>
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{new Date(r.dueDate).toLocaleDateString("es-AR")}</td>
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{r.status}</td>
              <td className="px-4 py-2 text-sm text-center">
                <button
                  className="bg-[#632b91] text-white px-3 py-2 rounded-lg transition font-semibold link-button"
                  onClick={() => navigate(`/report/${r.protocolNumber}`)}
                >
                  Ver Informe
                </button>
              </td>
              <td className="px-4 py-2 text-sm text-center">
                <button
                  className="bg-[#99144d] text-white px-3 py-2 rounded-lg transition font-semibold delete-button"
                  onClick={() => handleDelete(r._id, r.protocolNumber)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
