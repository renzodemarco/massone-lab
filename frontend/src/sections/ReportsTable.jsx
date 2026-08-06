import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { generatePDF, getReports, sendTestMail } from "../services/reports";

export default function ReportsTable({ searchParams }) {
  const [data, setData] = useState({ docs: [] });
  const [page, setPage] = useState(1);
  const [sending, setSending] = useState({});
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
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    getReports({ ...searchParams, page, limit: 4 })
      .then(setData)
      .catch(console.error);
  }, [searchParams, page]);

  const handlePDF = async (id) => {
    try {
      await generatePDF(id);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al generar pdf");
    }
  };

  const handleSend = async (id) => {
    setSending((s) => ({ ...s, [id]: true }));
    try {
      await sendTestMail(id);
      setData((prev) => ({
        ...prev,
        docs: prev.docs.map((r) =>
          r._id === id ? { ...r, status: "sent" } : r,
        ),
      }));
      alert("Correo enviado");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || err.message || "Error al enviar correo",
      );
    } finally {
      setSending((s) => ({ ...s, [id]: false }));
    }
  };

  return (
    <>
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
              <th className="px-3 py-3 text-center"></th>
              <th className="px-3 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data?.docs?.map((report, index) => (
              <tr
                key={index}
                onClick={() => navigate(`/report/${report.protocolNumber}`)}
                className={`border-t border-[#dce0e5] ${report.status === "cancelled" ? "opacity-75" : ""} hover:bg-[#f8fafb] cursor-pointer transition`}
              >
                <td className="truncate px-3 py-2 text-center text-sm text-[#111418]">
                  {report.protocolNumber}
                </td>
                <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">
                  {report.studyType}
                </td>
                <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">
                  {report.client?.name || "-"}
                </td>
                <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">
                  {report.patient.name || "-"}
                </td>
                <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">
                  {new Date(report.entryDate).toLocaleDateString("es-AR")}
                </td>
                <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">
                  {report.dueDate
                    ? new Date(report.dueDate).toLocaleDateString("es-AR")
                    : "-"}
                </td>
                <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">
                  {statusLabel(report.status)}
                </td>

                <td className="px-3 py-2 text-center text-sm">
                  {(() => {
                    const isSending = !!sending[report._id];
                    const canSend = report.status === "finished" && !isSending;
                    return (
                      <button
                        disabled={!canSend}
                        className={`link-button rounded-lg bg-[#632b91] px-2.5 py-2 font-semibold text-white transition ${
                          canSend
                            ? "bg-[#0b8457]"
                            : "bg-[#9ca9a3] opacity-60 cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSend(report._id);
                        }}
                      >
                        {isSending ? "Enviando..." : "Enviar"}
                      </button>
                    );
                  })()}
                </td>
                <td className="px-3 py-2 text-center text-sm">
                  <button
                    type="button"
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-lg transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePDF(report._id);
                    }}
                    aria-label="Ver PDF"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-[#632b91] transition group-hover:fill-[#99144d]"
                    >
                      <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.414a2 2 0 0 0-.586-1.414l-4.414-4.414A2 2 0 0 0 13.586 2H6Zm7 1.5L18.5 9H13a1 1 0 0 1-1-1V3.5ZM6 4h6v4a2 2 0 0 0 2 2h4v10H6V4Zm5.5 9.5h-2v-2h2v2Zm0 3h-2v-2h2v2Zm3-3h-2v-2h2v2Z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={data?.totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
