import SearchBar from "./Searchbar";
import ClientsTable from "./ClientsTable"

function Clients() {
  return (
    <>
      <div className="px-4 py-3">
        <h1 className="text-2xl font-bold text-[#111418]">Clientes</h1>
      </div>
      <div className="px-4 py-3">
        <SearchBar placeholder="Buscar por nombre" />
      </div>
      <div className="px-4 py-3">
        <ClientsTable />
      </div>
    </>
  )
}

export default Clients