import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../services/clients";

export default function ClientsTable() {

  const [data, setData] = useState([])
  const navigate = useNavigate();

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
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{c.address || "-"}</td>
              <td className="px-4 py-2 text-sm text-[#637588] text-center">{c.email}</td>
              <td className="px-4 py-2 text-sm text-center">
                <button
                  className="bg-[#632b91] text-white px-3 py-2 rounded-lg transition font-semibold link-button"
                  onClick={() => navigate(`/client/${c._id}`)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
