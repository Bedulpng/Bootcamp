import React from 'react';
import './index.css';
import './tailwind.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './Mentor/components/Navbar';
import { Hero } from './Mentor/components/Hero';
import { Testimonial } from './Mentor/components/Testimonial';
import LeadingComp from './Mentor/components/LeadingCompanies';
import ProgramsPage from './Mentor/components/Program';
import { Footer } from './Mentor/components/Footer';
import Contact from './Mentor/components/Contact';
import ContactSect from './Mentor/components/Contact-section';
import RmFs from './Mentor/components/ReadMore_Programs/ReadMoreFs';
import RmQa from './Mentor/components/ReadMore_Programs/ReadMoreQa';
import ScrollTop from './Mentor/components/ScrollUp';
import AboutSection from './Mentor/components/About/About';
import MentorDb from './Mentor/components/Mentor/Dashboardm';
import NavbarMentor from './Mentor/components/Mentor/NavbarMentor';
import FooterMentor from './Mentor/components/Mentor/FooterMentor';
import NotFound from './Mentor/components/NotFound';
import Batch from './Mentor/components/Mentor/ExploreBatch';
import Trainee from './Mentor/components/Mentor/Trainee';
import { NoteRoute } from './Mentor/components/Mentor/Note/NoteRoute';
import { TraineePage } from './Mentor/components/Mentor/Note/TraineePage';

import LoginPage from './Trainee/pages/firstpage/login';
import FormPage from './Trainee/pages/firstpage/form';
import Dashboard from './Trainee/pages/secondpge/Dashboard';
import SubjectDetail from './Trainee/pages/secondpge/subjectdetail';
import NotificationPage from './Trainee/pages/secondpge/top/Notification';
import Profile from './Trainee/pages/secondpge/top/profile';

function Layout({ children }: { children: React.ReactNode }) {
  const isDashboard = window.location.pathname.startsWith('/dashboardm');

  return (
    <div className="min-h-screen bg-white">
      {isDashboard ? <NavbarMentor /> : <Navbar />}
      {children}
      <ScrollTop />
      {isDashboard ? <FooterMentor /> : <Footer />}
    </div>
  );
}
function MainContent() {
  return (
    <>
      <Hero />
      <Testimonial />
      <LeadingComp />
      <div id="program">
        <ProgramsPage />
      </div>
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MainContent />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactSect />
            </Layout>
          }
        />
        <Route
          path="/programs/fullstack"
          element={
            <Layout>
              <RmFs />
            </Layout>
          }
        />
        <Route
          path="/programs/qualityassurance"
          element={
            <Layout>
              <RmQa />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutSection />
            </Layout>
          }
        />
        <Route
          path="/dashboardm"
          element={
            <Layout>
              <MentorDb />
            </Layout>
          }
        />
        <Route
          path="/dashboardm/batch"
          element={
            <Layout>
              <Batch />
            </Layout>
          }
        />
        <Route
          path="/dashboardm/trainee"
          element={
            <Layout>
              <Trainee />
            </Layout>
          }
        />
        <Route
          path="/dashboardm/note"
          element={
            <Layout>
              <NoteRoute />
            </Layout>
          }
        />
        <Route
          path="/dashboardm/note/:classId/batch/:batchId"
          element={
            <Layout>
              <TraineePage />
            </Layout>
          }
        />

        <Route path="/login/Trainee" element={<LoginPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjectdetail/:id" element={<SubjectDetail />} />
        <Route path="/Notification" element={<NotificationPage />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;