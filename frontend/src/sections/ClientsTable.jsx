import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getClients } from "../services/clients";

export default function ClientsTable({ query }) {
  const [data, setData] = useState({ docs: [], totalPages: 1, page: 1 });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    getClients({ query, page, limit: 4, paginated: true }).then(setData).catch(console.error);
  }, [query, page]);

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-[#dce0e5] bg-white">
        <table className="min-w-[760px] w-full table-fixed">
          <colgroup>
            <col className="w-[180px]" />
            <col className="w-[240px]" />
            <col className="w-[220px]" />
            <col className="w-[120px]" />
          </colgroup>
          <thead>
            <tr className="bg-white text-sm font-medium text-[#111418]">
              <th className="px-3 py-3 text-center">Nombre</th>
              <th className="px-3 py-3 text-center">Dirección</th>
              <th className="px-3 py-3 text-center">Correo electrónico</th>
              <th className="px-3 py-3 text-center">Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.docs.map((client, index) => (
              <tr key={index} className="border-t border-[#dce0e5]">
                <td className="truncate px-3 py-2 text-center text-sm text-[#111418]">{client.name}</td>
                <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">{client.address || "-"}</td>
                <td className="truncate px-3 py-2 text-center text-sm text-[#637588]">{client.email}</td>
                <td className="px-3 py-2 text-center text-sm">
                  <button
                    className="link-button rounded-lg bg-[#632b91] px-2.5 py-2 font-semibold text-white transition"
                    onClick={() => navigate(`/client/${client._id}`)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
    </>
  );
}
