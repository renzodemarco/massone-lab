import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportCreate from "./pages/ReportCreate";
import ReportDetail from "./pages/ReportDetail";
import ClientDetail from "./pages/ClientDetail";
import ClientCreate from "./pages/ClientCreate";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const syncAuth = () => setToken(localStorage.getItem("token"));

    syncAuth();
    window.addEventListener("auth:changed", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("auth:changed", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  if (!token) return <Login />;

  return (
    <Router>
      <ScrollToTop />
      <div className="flex-1 h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report/new" element={<ReportCreate />} />
          <Route path="/report/:n" element={<ReportDetail />} />
          <Route path="/client/new" element={<ClientCreate />} />
          <Route path="/client/:id" element={<ClientDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
