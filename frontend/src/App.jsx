import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import RiskAlertsPage from './pages/RiskAlertsPage';
import MapPage from './pages/MapPage';
import MLPage from './pages/MLPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AuditAssistantPage from './pages/AuditAssistantPage';
import BatchAuditPage from './pages/BatchAuditPage';
import NotFoundPage from './pages/NotFoundPage';

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
          <Route path="/alerts" element={<Layout><RiskAlertsPage /></Layout>} />
          <Route path="/map" element={<Layout><MapPage /></Layout>} />
          <Route path="/ml" element={<Layout><MLPage /></Layout>} />
          <Route path="/analytics" element={<Layout><AnalyticsPage /></Layout>} />
          <Route path="/audit" element={<Layout><AuditAssistantPage /></Layout>} />
          <Route path="/batch-audit" element={<Layout><BatchAuditPage /></Layout>} />
        </Route>

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}