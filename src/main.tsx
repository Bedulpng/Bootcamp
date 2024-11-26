// index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// App.tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Dashboard from './pages/Dashboard/dashboard';
import Courses from './pages/Courses/courses';
import Notification from './pages/Notification/NotificationPage';
import UserManagement from './pages/UserManagement/UserManagement';
import ClassManagement from './pages/ClassManagement/ClassManagement';
import CertificateManagement from './pages/CertificateManagement/CertificateManagement';
import ViewNotes from './pages/ViewNotes/ViewNotes';


function App() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/courses"
        element={
          <MainLayout>
            <Courses />
          </MainLayout>
        }
      />
      <Route
        path="/usermanagement"
        element={
          <MainLayout>
            <UserManagement />
          </MainLayout>
        }
      />
      <Route
        path="/classmanagement"
        element={
          <MainLayout>
            <ClassManagement />
          </MainLayout>
        }
      />
      <Route
        path="/certificatemanagement"
        element={
          <MainLayout>
            <CertificateManagement />
          </MainLayout>
        }
      />
      <Route
        path="/viewnotes"
        element={
          <MainLayout>
            <ViewNotes />
          </MainLayout>
        }
      />
      <Route
        path="/notification"
        element={
          <MainLayout>
            <Notification />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
