import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import CitizenHome from "./pages/citizen/Home";
import ReportIssue from "./pages/citizen/ReportIssue";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/citizen/home"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <CitizenHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          }
        />

        <Route path="/citizen/report" element={<ReportIssue />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
