import React from 'react';
import './index.css';
import './tailwind.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './Landing/components/Navbar';
import { Hero } from './Landing/components/Hero';
import { Testimonial } from './Landing/components/Testimonial';
import LeadingComp from './Landing/components/LeadingCompanies';
import ProgramsPage from './Landing/components/Program';
import { Footer } from './Landing/components/Footer';
import Contact from './Landing/components/Contact';
import ContactSect from './Landing/components/Contact-section';
import RmFs from './Landing/components/ReadMore_Programs/ReadMoreFs';
import RmQa from './Landing/components/ReadMore_Programs/ReadMoreQa';
import ScrollTop from './Landing/components/ScrollUp';
import AboutSection from './Landing/components/About/About';

//Mentor
import MentorDb from './Mentor/Dashboardm';
import NavbarMentor from './Mentor/NavbarMentor';
import FooterMentor from './Mentor/FooterMentor';
import NotFound from './Landing/components/NotFound';
import Batch from './Mentor/ExploreBatch';
import Trainee from './Mentor/Trainee';
import { NoteRoute } from './Mentor/Note/NoteRoute';
import { TraineePage } from './Mentor/Note/TraineePage';

//Trainee
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