import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ClientsTable from "./ClientsTable"

function Clients() {
  const navigate = useNavigate();
  const [queryInput, setQueryInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearch = () => {
    setSubmittedQuery(queryInput.trim());
  };

  const handleClear = () => {
    setQueryInput("");
    setSubmittedQuery("");
  };

  return (
    <>
      <div className="px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111418]">Clientes</h1>
        <button
          type="button"
          onClick={() => navigate("/client/new")}
          className="bg-[#632b91] text-white px-4 py-2 rounded-lg transition font-bold link-button"
        >
          Crear Cliente
        </button>
      </div>
      <div className="px-4 py-3">
        <SearchBar
          placeholder="Buscar por nombre"
          value={queryInput}
          onChange={(event) => setQueryInput(event.target.value)}
          onSubmit={handleSearch}
          onClear={handleClear}
          canClear={Boolean(queryInput || submittedQuery)}
        />
      </div>
      <div className="px-4 py-3">
        <ClientsTable query={submittedQuery} />
      </div>
    </>
  )
}

export default Clients
