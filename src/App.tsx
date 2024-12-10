import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Landing Page
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

//Mentor
import MentorDb from './Mentor/components/Mentor/Dashboard';
import NavbarMentor from './Mentor/components/Mentor/NavbarMentor';
import FooterMentor from './Mentor/components/Mentor/FooterMentor';
import NotFound from './LandingPage/NotFound';
import Batch from './Mentor/components/Mentor/ExploreBatch';
import Trainee from './Mentor/components/Mentor/Trainee';
import { NoteRoute } from './Mentor/components/Mentor/Note/NoteRoute';
import { TraineePage } from './Mentor/components/Mentor/Note/TraineePage';

//Trainee
import LoginPage from './Trainee/firstpage/login';
import FormPage from './Trainee/firstpage/form';
import Dashboard from './Trainee/secondpge/Dashboard';

//Admin
import MainLayout from './Admin/Layouts/MainLayout';
import Dashboarda from './Admin/pages/Dashboard/dashboard';
import Courses from './pages/Courses/courses';
import NotificationPage from './pages/Notification/NotificationPage';
import UserManagement from './pages/UserManagement/UserManagement';
import ClassManagement from './pages/ClassManagement/ClassManagement';
import CertificateManagement from './pages/CertificateManagement/CertificateManagement';
import ViewNotes from './pages/ViewNotes/ViewNotes';

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

        {/*Landing Page Route */}
        <Route path="/" element={ <Layout><MainContent /></Layout>}/>
        <Route path="/contact" element={ <Layout><ContactSect /></Layout>}/>
        <Route path="/programs/fullstack" element={ <Layout><RmFs /></Layout>}/>
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

        {/*Mentor Route */}
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

        {/*Trainee Route */}
        <Route path="/loginpage" element={ <Layout><LoginPage /></Layout>}/>
        <Route path="/form" element={ <Layout><FormPage /></Layout>}/>
        <Route path="/dashboard" element={ <Layout><Dashboard /></Layout>}/>

        {/* Route without Layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
