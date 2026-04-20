import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generatePDF, getReports } from "../services/reports";

export default function ReportsTable({ searchParams }) {
  const [data, setData] = useState({ docs: [] });
  const navigate = useNavigate();

  const statusLabel = (status) => {
    const map = {
      entered: "Ingresado",
      started: "Iniciado",
      finished: "Finalizado",
      sent: "Enviado",
      cancelled: "Cancelado",
    };

    return map[status] || status;
  };

  useEffect(() => {
    getReports(searchParams).then(setData).catch(console.error);
  }, [searchParams]);

  const handlePDF = async (id) => {
    try {
      await generatePDF(id);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al generar pdf");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-[#dce0e5] bg-white">
      <table className="min-w-[980px] w-full table-fixed">
        <colgroup>
          <col className="w-[90px]" />
          <col className="w-[120px]" />
          <col className="w-[140px]" />
          <col className="w-[140px]" />
          <col className="w-[110px]" />
          <col className="w-[110px]" />
          <col className="w-[90px]" />
          <col className="w-[90px]" />
          <col className="w-[90px]" />
        </colgroup>
        <thead>
          <tr className="bg-white text-sm font-medium text-[#111418]">
            <th className="px-3 py-3 text-center">Nro. Protocolo</th>
            <th className="px-3 py-3 text-center">Tipo de Estudio</th>
            <th className="px-3 py-3 text-center">Cliente</th>
            <th className="px-3 py-3 text-center">Paciente</th>
            <th className="px-3 py-3 text-center">Fecha de Entrada</th>
            <th className="px-3 py-3 text-center">Fecha Limite</th>
            <th className="px-3 py-3 text-center">Estado</th>
            <th className="px-3 py-3 text-center">Editar</th>
            <th className="px-3 py-3 text-center">PDF</th>
          </tr>
        </thead>
        <tbody>
          {data?.docs?.map((report, index) => (
            <tr key={index} className="border-t border-[#dce0e5]">
              <td className="truncate px-3 py-2 text-center text-sm text-[#111418]">{report.protocolNumber}</td>
              <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">{report.studyType}</td>
              <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">{report.client?.name || "-"}</td>
              <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">{report.patient.name || "-"}</td>
              <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">
                {new Date(report.entryDate).toLocaleDateString("es-AR")}
              </td>
              <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">
                {report.dueDate ? new Date(report.dueDate).toLocaleDateString("es-AR") : "-"}
              </td>
              <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">{statusLabel(report.status)}</td>
              <td className="px-3 py-2 text-center text-sm">
                <button
                  className="link-button rounded-lg bg-[#632b91] px-2.5 py-2 font-semibold text-white transition"
                  onClick={() => navigate(`/report/${report.protocolNumber}`)}
                >
                  Editar
                </button>
              </td>
              <td className="px-3 py-2 text-center text-sm">
                <button
                  className="link-button rounded-lg bg-[#632b91] px-2.5 py-2 font-semibold text-white transition"
                  onClick={() => handlePDF(report._id)}
                >
                  PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
