import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Landing Page Components
import { Navbar } from './LandingPage/Navbar';
import { Hero } from './LandingPage/Hero';
import { Testimonial } from './LandingPage/Testimonial';
import LeadingComp from './LandingPage/LeadingCompanies';
import ProgramsPage from './LandingPage/Program';
import { Footer } from './LandingPage/Footer';
import Contact from './LandingPage/Contact';
import ContactSect from './LandingPage/Contact-section';
import RmFs from './LandingPage/ReadMore_Programs/ReadMoreFs';
import RmQa from './LandingPage/ReadMore_Programs/ReadMoreQa';
import ScrollTop from './LandingPage/ScrollUp';
import AboutSection from './LandingPage/About/About';

// Mentor Components
import MentorDb from './Mentor/components/Mentor/Dashboard';
import NavbarMentor from './Mentor/components/Mentor/NavbarMentor';
import FooterMentor from './Mentor/components/Mentor/FooterMentor';
import NotFound from './LandingPage/NotFound';
import Batch from './Mentor/components/Mentor/ExploreBatch';
import Trainee from './Mentor/components/Mentor/Trainee';
import { NoteRoute } from './Mentor/components/Mentor/Note/NoteRoute';
import { TraineePage } from './Mentor/components/Mentor/Note/TraineePage';

// Trainee Components
import LoginPage from './Trainee/firstpage/login';
import FormPage from './Trainee/firstpage/form';
import Dashboard from './Trainee/secondpge/Dashboard';

// Admin Components
import Dashboarda from './Admin/pages/Dashboard/dashboard';

// Layout Component
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboardm');
  const isAuthPage = location.pathname === '/loginpage' || location.pathname === '/form';

  return (
    <div className="min-h-screen bg-white">
      {!isAuthPage && (isDashboard ? <NavbarMentor /> : <Navbar />)}
      {children}
      <ScrollTop />
      {!isAuthPage && (isDashboard ? <FooterMentor /> : <Footer />)}
    </div>
  );
}

// Auth Layout for Login and Form Pages
function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}

// Main Content for Landing Page
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
        {/* Landing Page Routes */}
        <Route path="/" element={<Layout><MainContent /></Layout>} />
        <Route path="/contact" element={<Layout><ContactSect /></Layout>} />
        <Route path="/programs/fullstack" element={<Layout><RmFs /></Layout>} />
        <Route path="/programs/qualityassurance" element={<Layout><RmQa /></Layout>} />
        <Route path="/about" element={<Layout><AboutSection /></Layout>} />

        {/* Mentor Routes */}
        <Route path="/dashboardm" element={<Layout><MentorDb /></Layout>} />
        <Route path="/dashboardm/batch" element={<Layout><Batch /></Layout>} />
        <Route path="/dashboardm/trainee" element={<Layout><Trainee /></Layout>} />
        <Route path="/dashboardm/note" element={<Layout><NoteRoute /></Layout>} />
        <Route path="/dashboardm/note/:classId/batch/:batchId" element={<Layout><TraineePage /></Layout>} />

        {/* Trainee Routes */}
        <Route path="/loginpage" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/form" element={<AuthLayout><FormPage /></AuthLayout>} />
        <Route path="/dashboard" element={<AuthLayout><Dashboard /></AuthLayout>} />

        {/* Admin Routes */}
        <Route path="/dashboarda" element={<AuthLayout><Dashboarda /></AuthLayout>} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
