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
import MentorDb from './components/Mentor/dashboard';
import NavbarMentor from './components/Mentor/NavbarMentor';
import FooterMentor from './components/Mentor/FooterMentor';
import NotFound from './components/NotFound';

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
            <Layout>
              <MentorDb />
            </Layout>
          }
        />
        {/* Route without Layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
