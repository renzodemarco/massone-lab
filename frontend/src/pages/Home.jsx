import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../sections/Sidebar";
import Welcome from "../sections/Welcome";
import Reports from "../sections/Reports";
import Clients from "../sections/Clients";


function Home() {

  const [searchParams] = useSearchParams();

  const viewParam = searchParams.get("view");
  const initialView = viewParam === "reports" || viewParam === "clients" ? viewParam : "welcome";
  const [currentView, setCurrentView] = useState(initialView);

  const views = {
    welcome: <Welcome />,
    reports: <Reports />,
    clients: <Clients />,
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar view={currentView} setView={setCurrentView} />
      <div className="flex-1 flex flex-col">
        {views[currentView]}
      </div>
    </div>
  );
}

export default Home
