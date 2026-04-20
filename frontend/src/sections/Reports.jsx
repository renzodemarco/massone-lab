import { useState } from "react";
import Table from './ReportsTable';
import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";

function Reports() {
  const navigate = useNavigate();
  const [queryInput, setQueryInput] = useState("");
  const [fieldInput, setFieldInput] = useState("protocolNumber");
  const [statusInput, setStatusInput] = useState("");
  const [searchParams, setSearchParams] = useState({
    q: "",
    field: "protocolNumber",
    status: ""
  });

  const handleSearch = () => {
    setSearchParams({
      q: queryInput.trim(),
      field: fieldInput,
      status: statusInput
    });
  };

  const handleClear = () => {
    setQueryInput("");
    setFieldInput("protocolNumber");
    setStatusInput("");
    setSearchParams({
      q: "",
      field: "protocolNumber",
      status: ""
    });
  };

  return (
    <>
      <div className="px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#111418]">Informes</h1>
        <button 
          className="bg-[#632b91] text-white px-6 py-2 rounded-lg transition font-bold link-button"
          onClick={() => navigate("/report/new")}
        >
          Informe Nuevo
        </button>
      </div>
      <div className="px-4 py-3">
        <SearchBar
          placeholder="Buscar informes"
          value={queryInput}
          onChange={(event) => setQueryInput(event.target.value)}
          onSubmit={handleSearch}
          onClear={handleClear}
          canClear={Boolean(queryInput || searchParams.q || statusInput || searchParams.status || fieldInput !== "protocolNumber")}
        >
          <select
            value={fieldInput}
            onChange={(event) => setFieldInput(event.target.value)}
            className="rounded-lg border-none bg-[#f0f2f4] px-4 text-[#111418] focus:outline-none"
          >
            <option value="protocolNumber">Nro. Protocolo</option>
            <option value="clientName">Cliente</option>
            <option value="ownerName">Propietario/a</option>
          </select>
          <select
            value={statusInput}
            onChange={(event) => setStatusInput(event.target.value)}
            className="rounded-lg border-none bg-[#f0f2f4] px-4 text-[#111418] focus:outline-none"
          >
            <option value="">Todos los estados</option>
            <option value="entered">Ingresado</option>
            <option value="started">Iniciado</option>
            <option value="finished">Finalizado</option>
            <option value="sent">Enviado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </SearchBar>
      </div>
      <div className="px-4 py-3">
        <Table searchParams={searchParams} />
      </div>
    </>
  )
}

export default Reports
