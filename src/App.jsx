import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PublicLayout from "./public/PublicLayout";
import DashboardLayout from "./dashboard/DashboardLayout";
import Login from "./public/components/Login";
import ProtectedRoute from "./public/components/ProtectedRoute";

function App() {
  const SKIP_AUTH = true; // ← Ustaw na false żeby włączyć autentykację z powrotem

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Strona publiczna */}
          <Route path="/" element={<PublicLayout />} />

          {/* Strona logowania */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard - chroniony */}
          <Route
            path="/dashboard"
            element={
              SKIP_AUTH ? (
                <DashboardLayout />
              ) : (
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              )
            }
          />

          {/* Przekierowanie dla nieistniejących tras */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
