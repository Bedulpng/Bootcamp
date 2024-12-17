import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Testimonial } from './components/Testimonial';
import LeadingComp from './components/LeadingCompanies';
import ProgramsPage from './components/Program';
import { Footer } from './components/Footer';
import Contact from './components/Contact';
import ContactSect from './components/Contact-section';
import RmFs from './components/ReadMore_Programs/ReadMoreFs';
import RmQa from './components/ReadMore_Programs/ReadMoreQa';
import ScrollTop from './components/ScrollUp';
import AboutSection from './components/About/About';
import MentorDb from './components/Mentor/Dashboard';
import NavbarMentor from './components/Mentor/NavbarMentor';
import FooterMentor from './components/Mentor/FooterMentor';
import NotFound from './components/NotFound';
import Batch from './components/Mentor/ExploreBatch';
import Trainee from './components/Mentor/Trainee';
import { NoteRoute } from './components/Mentor/Note/NoteRoute';
import { TraineePage } from './components/Mentor/Note/TraineePage';
import { MentorLogin } from './components/Login/MentorLogin';
import { TraineeLogin } from './components/Login/TraineeLogin';
import ProtectedRoute from './components/ProtectedRoute';
import Rbac from './components/RbacRoute';

// Layout component to handle conditional rendering of Navbar and Footer
function Layout({ children }: { children: React.ReactNode }) {
  const isDashboard = window.location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-white">
      {isDashboard ? <NavbarMentor /> : <Navbar />}
      {children}
      <ScrollTop />
      {isDashboard ? <FooterMentor /> : <Footer />}
    </div>
  );
}

// Main content component to keep the code organized
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
        {/* Routes that use Layout */}
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
          path="/dashboard"
          element={
            <Rbac allowedRoles={['ADMIN', 'MENTOR']}>
              <ProtectedRoute>
                <Layout>
                  <MentorDb />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/dashboard/batch"
          element={
            <Layout>
              <Batch />
            </Layout>
          }
        />
        <Route
          path="/dashboard/trainee"
          element={
            <Layout>
              <Trainee />
            </Layout>
          }
        />
        <Route
          path="/dashboard/note"
          element={
            <Layout>
              <NoteRoute />
            </Layout>
          }
        />
        <Route
          path="/dashboard/note/:classId/batch/:batchId"
          element={
            <Layout>
              <TraineePage />
            </Layout>
          }
        />
        <Route
          path="/login/mentor"
          element={
            
              <MentorLogin />
            
          }
        />
        <Route
          path="/login/trainee"
          element={

              <TraineeLogin />
            
          }
        />
        {/* Route without Layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
