import Table from './ReportsTable';
import SearchBar from './Searchbar';
import { useNavigate } from "react-router-dom";

function Reports() {

  const navigate = useNavigate();

  return (
    <>
      <div className="px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#111418]">Informes</h1>
        <button 
          className="bg-[#632b91] text-white px-6 py-2 rounded-lg transition font-bold link-button"
          onClick={() => navigate("/new")}
        >
          Informe Nuevo
        </button>
      </div>
      <div className="px-4 py-3">
        <SearchBar placeholder="Buscar por nombre o identificador" />
      </div>
      <div className="px-4 py-3">
        <Table />
      </div>
    </>
  )
}

export default Reports