import { useState } from "react";
import Sidebar from "../sections/Sidebar";
import Welcome from "../sections/Welcome";
import Reports from "../sections/Reports";
import Clients from "../sections/Clients";


function Home() {

  const [view, setView] = useState("reports");
  
  const views = {
    welcome: <Welcome />,
    reports: <Reports />,
    clients: <Clients />,
  };

  return (
    <div className="flex min-h-screen bg-[#faf9f6]">
      <Sidebar view={view} setView={setView} />
      <div className="flex-1 flex flex-col">
        {views[view]}
      </div>
    </div>
  );
}

export default Home
