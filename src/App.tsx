import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from './components/ui/toaster';
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
import { TraineePages } from './components/TraineeManagement/TraineePage';
import { MentorLogin } from './components/Login/MentorLogin';
import { TraineeLogin } from './components/Login/TraineeLogin';
import ProtectedRoute from './components/ProtectedRoute';
import Rbac from './components/RbacRoute';
import DashboardPage from './components/Mentor/BatchPage';
import NotesPage from './components/Mentor/Notes/page';
import Dashboard from './components/Trainee/pages/secondpge/Dashboard';
import SubjectDetail from './components/Trainee/pages/secondpge/subjectdetail';
import NotificationPage from './components/Trainee/pages/secondpge/top/Notification';
import Profile from './components/Trainee/pages/secondpge/top/profile';
import FormPage from './components/Trainee/pages/firstpage/form';
import RegisPage from './components/Trainee/pages/firstpage/login';
import DashboardAdmin from './components/Admin/pages/Dashboard';
import NavbarAdmin from './components/Admin/pages/Navbar';
import SidebarAdmin from './components/Admin/Modal/Sidebar';
import BatchAdmin from './components/Admin/pages/Batch';
import Users from './components/Admin/pages/Users';
import Classes from './components/Admin/pages/Classes';
import Certificates from './components/Admin/pages/Certificates';
import Notes from './components/Admin/pages/Notes';
import { LoginForm } from './components/Login/LoginFormAdmin';
import NotAuthorized from './components/Unauthorized';

function Layout({ children }: { children: React.ReactNode }) {
  const isDashboard = window.location.pathname.startsWith('/dashboard');
  const isAdmin = window.location.pathname.startsWith('/admin');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderAdminPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardAdmin />;
      case 'batch':
        return <BatchAdmin />;
      case 'users':
        return <Users />;
      case 'classes':
        return <Classes />;
      case 'certificates':
        return <Certificates/>;
      case 'notes':
        return <Notes />;
      default:
        return <DashboardAdmin />;
    }
  };

  return (
    <div className={`min-h-screen ${isAdmin || isDashboard ? 'bg-white dark:bg-gray-900' : 'bg-white'}`}>
      {isAdmin || isDashboard ? (
        <div className="flex h-screen overflow-x-hidden">
          {isAdmin && (
            <SidebarAdmin
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <div className="flex-1 flex flex-col">
            {isAdmin ? <NavbarAdmin /> : <NavbarMentor />}
            <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
              {isAdmin ? renderAdminPage() : children}
            </main>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
      <ScrollTop />
      <Toaster />
      {isAdmin || isDashboard ? <FooterMentor /> : <Footer />}
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
              <TraineePages />
            </Layout>
          }
        />
        <Route
          path="/dashboard/note"
          element={
            <Layout>
              <NotesPage />
            </Layout>
          }
        />
        <Route
          path="/dashboard/batch/:batchId"
          element={
            <Layout>
              <DashboardPage />
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
         <Route
          path="/trainee"
          element={
              <Dashboard />     
          }
        />
         <Route
          path="/subjectdetail:id"
          element={
              <SubjectDetail />     
          }
        />
        <Route
          path="/notification"
          element={
              <NotificationPage />     
          }
        />
        <Route
          path="/profile-trainee"
          element={
              <Profile />     
          }
        />
        <Route
          path="/verify"
          element={
              <FormPage />     
          }
        />
        <Route
          path="/login-trainee"
          element={
              <RegisPage />     
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <Rbac allowedRoles={['ADMIN']}>
              <ProtectedRoute>
                <Layout>
                  <DashboardAdmin />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/admin/login"
          element={
            <div className="min-h-screen w-full bg-[#111111] flex items-center justify-center">
              <LoginForm />
              </div>
          }
        />
         <Route
          path="/unauthorized"
          element={
           <NotAuthorized />
          }
        />
        {/* Route without Layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
