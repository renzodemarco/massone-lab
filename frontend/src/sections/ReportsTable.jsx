import { useEffect, useState } from "react";
import { getReports } from "../services/reports";

export default function ReportsTable() {

  const [data, setData] = useState({ docs: [] })

  useEffect(() => {
    getReports().then(setData).catch(console.error);
  }, []);

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
            <th className="px-4 py-3 text-center">Informe</th>
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
              <td className="px-4 py-2 text-sm font-bold text-[#637588] text-center">Ver</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
