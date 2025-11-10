import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './public/PublicLayout';
import DashboardLayout from './dashboard/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
