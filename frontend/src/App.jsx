import Sidebar from './sections/Sidebar';
import SearchBar from './sections/Searchbar';
import Table from './sections/Table';

function App() {

  const reports = [
    { protocolNumber: "00001", studyType: "cito", client: "La Granja", patient: "Beto", entryDate: "2025-08-25", dueDate: "2025-09-01", status: "entered" },
    { protocolNumber: "00002", studyType: "hp", client: "El Ceibo", patient: "Luna", entryDate: "2025-08-20", dueDate: "2025-09-03", status: "entered" },
    { protocolNumber: "00003", studyType: "cito", client: "Clínica Veterinaria Platense", patient: "Max", entryDate: "2025-08-28", dueDate: "2025-09-04", status: "entered" },
    { protocolNumber: "00004", studyType: "hp", client: "La Granja", patient: "Sasha", entryDate: "2025-08-18", dueDate: "2025-09-01", status: "entered" },
    { protocolNumber: "00005", studyType: "cito", client: "El Ceibo", patient: "Firulais", entryDate: "2025-08-30", dueDate: "2025-09-06", status: "entered" },
    { protocolNumber: "00006", studyType: "hp", client: "Clínica Veterinaria Platense", patient: "Lola", entryDate: "2025-08-22", dueDate: "2025-09-05", status: "entered" },
    { protocolNumber: "00007", studyType: "cito", client: "La Granja", patient: "Rocky", entryDate: "2025-08-27", dueDate: "2025-09-03", status: "entered" },
    { protocolNumber: "00008", studyType: "hp", client: "El Ceibo", patient: "Milo", entryDate: "2025-08-19", dueDate: "2025-09-02", status: "entered" },
    { protocolNumber: "00009", studyType: "cito", client: "Clínica Veterinaria Platense", patient: "Nina", entryDate: "2025-08-26", dueDate: "2025-09-02", status: "entered" },
    { protocolNumber: "00010", studyType: "hp", client: "La Granja", patient: "Thor", entryDate: "2025-08-21", dueDate: "2025-09-04", status: "entered" }
  ];  

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="px-4 py-3">
          <p className="text-2xl font-bold text-[#111418]">Pacientes</p>
        </div>
        <div className="px-4 py-3">
          <SearchBar placeholder="Buscar por nombre o identificador" />
        </div>
        <div className="px-4 py-3">
          <Table data={reports} />
        </div>
      </div>
    </div>
  );
}

export default App
