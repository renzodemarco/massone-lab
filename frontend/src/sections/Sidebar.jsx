import { useNavigate, useLocation } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";

export default function Sidebar({ view, setView }) {

  const navigate = useNavigate();
  const location = useLocation();

  const isDetail = location.pathname.startsWith("/report/") || location.pathname.startsWith("/client/");
  const backView = location.pathname.startsWith("/report/") ? "reports" :
    location.pathname.startsWith("/client/") ? "clients" : "";

  return (
    <div className="flex flex-col gap-2 bg-white p-4 min-h-screen">
      <div className="flex gap-3 mb-6 items-center">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10"
          style={{
            backgroundImage: `url("/logo.png")`,
          }}
        />
        <h2 className="text-[#111418] text-base font-medium">Laboratorio Massone</h2>
      </div>
      {
        isDetail ? <button
          className="bg-[#632b91] text-white px-6 py-2 rounded-lg transition font-bold link-button"
          onClick={() => { backView === "" ? navigate('/') : navigate(`/?view=${backView}`) }
          }
        >
          Volver
        </button> :
          <SidebarMenu view={view} setView={setView} />
      }

    </div>
  );
}
