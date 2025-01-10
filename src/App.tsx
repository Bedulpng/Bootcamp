import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

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
import NotFound from './LandingPage/NotFound';
import { TraineePages } from './LandingPage/TraineeManagement/TraineePage';

//Login
import { MentorLogin } from './LandingPage/components/Login/MentorLogin';
import { TraineeLogin } from './LandingPage/components/Login/TraineeLogin';

//Mentor
import MentorDb from './Mentor/components/Mentor/Dashboard';
import NavbarMentor from './Mentor/components/Mentor/NavbarMentor';
import FooterMentor from './Mentor/components/Mentor/FooterMentor';
import Batch from './Mentor/components/Mentor/ExploreBatch';

//Regis
import RegisPage from './Trainee/firstpage/Regis';

//Trainee
import FormPage from './Trainee/firstpage/form';
import Dashboard from './Trainee/secondpge/Dashboard';
import Profile from './Trainee/secondpge/top/profile';

// Admin 
import DashboardA from './Admin/Pages/Dashboard';
import UserManage from './Admin/Pages/User/UserManage';

import ProtectedRoute from './LandingPage/ProtectedRoute';
import Rbac from './LandingPage/RbacRoute';
import DashboardPage from './Mentor/components/Mentor/BatchPage';
import NotesPage from './Mentor/components/Mentor/Notes/page';

// Layout Component
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboardm');
  const isAuthPage = location.pathname === '/login/trainee' || location.pathname === '/form';

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
      <Hero /><Testimonial /><LeadingComp /><div id="program"><ProgramsPage /></div><Contact />
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
        <Route path="/dashboardm" element={<Rbac allowedRoles={['ADMIN', 'MENTOR']}><ProtectedRoute><Layout><MentorDb /></Layout></ProtectedRoute></Rbac>}/>
        <Route path="/dashboardm/batch" element={<Layout><Batch /></Layout>} />
        <Route path="/dashboardm/trainee" element={<Layout><TraineePages /></Layout>} />
        <Route path="/dashboardm/note" element={<Layout><NotesPage /></Layout>} />
        <Route path="/dashboardm/batch/:batchId" element={<Layout><DashboardPage /></Layout>}/>

        {/* Login Routes */}
        <Route path="/login/mentor" element={<MentorLogin />}/>
        <Route path="/login/trainee" element={<TraineeLogin />}/>

        {/* Trainee Routes */}
        <Route path="/regispage" element={<AuthLayout><RegisPage /></AuthLayout>} />
        <Route path="/form" element={<AuthLayout><FormPage /></AuthLayout>} />
        <Route path="/dashboard" element={<AuthLayout><Dashboard /></AuthLayout>} />
        <Route path='/profile' element={<AuthLayout><Profile /></AuthLayout>} />

        {/* Admin Routes */}
        <Route path="/dashboardA" element={<AuthLayout><DashboardA /></AuthLayout>} />
        <Route path="/usermanage" element={<AuthLayout><UserManage /></AuthLayout>} />

        {/* Route without Layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
