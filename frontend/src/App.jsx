import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportCreate from "./pages/ReportCreate";
import ReportDetail from "./pages/ReportDetail";
import ClientDetail from "./pages/ClientDetail" ;
import ScrollToTop from "./components/ScrollToTop";

function App() {

  return (
    <Router>
      <ScrollToTop />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report/new" element={<ReportCreate />} />
          <Route path="/report/:n" element={<ReportDetail />} />
          <Route path="/client/:id" element={<ClientDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
