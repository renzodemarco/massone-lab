import { useEffect, useState } from "react";
import { getClients } from "../services/clients";

export default function ReportsTable() {

  const [data, setData] = useState([])

  useEffect(() => {
    getClients().then(setData).catch(console.error);
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-[#dce0e5] bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-white text-[#111418] text-sm font-medium">
            <th className="px-16 py-3 text-center">Nombre</th>
            <th className="px-12 py-3 text-center">Dirección</th>
            <th className="px-20 py-3 text-center">Correo electrónico</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c, i) => (
            <tr key={i} className="border-t border-[#dce0e5]">
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{c.name}</td>
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{c.adress || "-"}</td>
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
