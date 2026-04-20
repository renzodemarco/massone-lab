import { useState } from "react";
import SearchBar from "./SearchBar";
import ClientsTable from "./ClientsTable"

function Clients() {
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
      <div className="px-4 py-3">
        <h1 className="text-2xl font-bold text-[#111418]">Clientes</h1>
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
