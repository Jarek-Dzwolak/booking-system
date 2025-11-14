import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PublicLayout from "./public/PublicLayout";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardHome from "./dashboard/DashboardHome";
import PaymentsView from "./dashboard/PaymentsView";
import Login from "./public/components/Login";
import ProtectedRoute from "./public/components/ProtectedRoute";

function App() {
  const SKIP_AUTH = true;

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />} />
          <Route path="/login" element={<Login />} />

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
          >
            <Route index element={<DashboardHome />} />
            <Route path="payments" element={<PaymentsView />} />
            {/* <Route path="reports" element={<ReportsView />} /> */}
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
