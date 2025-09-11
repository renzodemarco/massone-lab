import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportCreate from "./pages/ReportCreate";
import ReportDetail from "./pages/ReportDetail";

function App() {

  return (
    <Router>
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<ReportCreate />} />
            <Route path="/report/:n" element={<ReportDetail />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App
