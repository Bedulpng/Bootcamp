import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './tailwind.css';

import LoginPage from './pages/firstpage/login';
import FormPage from './pages/firstpage/form';
import Dashboard from './pages/secondpge/Dashboard';
import SubjectDetail from './pages/secondpge/subjectdetail';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjectdetail/:id" element={<SubjectDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


