import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "./components/ui/toaster";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Testimonial } from "./components/Testimonial";
import LeadingComp from "./components/LeadingCompanies";
import ProgramsPage from "./components/Program";
import { Footer } from "./components/Footer";
import Contact from "./components/Contact";
import ContactSect from "./components/Contact-section";
import RmFs from "./components/ReadMore_Programs/ReadMoreFs";
import RmQa from "./components/ReadMore_Programs/ReadMoreQa";
import ScrollTop from "./components/ScrollUp";
import AboutSection from "./components/About/About";
import MentorDb from "./components/Mentor/Dashboard";
import NavbarMentor from "./components/Mentor/NavbarMentor";
import FooterMentor from "./components/Mentor/FooterMentor";
import NotFound from "./components/NotFound";
import Batch from "./components/Mentor/ExploreBatch";
import { TraineePages } from "./components/TraineeManagement/TraineePage";
import { MentorLogin } from "./components/Login/MentorLogin";
import { TraineeLogin } from "./components/Login/TraineeLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Rbac from "./components/RbacRoute";
import DashboardPage from "./components/Mentor/BatchPage";
import NotesPage from "./components/Mentor/Notes/page";
import NotificationPage from "./components/Trainee/pages/secondpge/top/Notification";
import Profile from "./components/Trainee/pages/secondpge/top/profile";
import RegisPage from "./components/Trainee/pages/firstpage/skill";
import DashboardAdmin from "./components/Admin/pages/Dashboard";
import NavbarAdmin from "./components/Admin/pages/Navbar";
import SidebarAdmin from "./components/Admin/Modal/Sidebar";
import BatchAdmin from "./components/Admin/pages/Batch";
import Users from "./components/Admin/pages/Users";
import Classes from "./components/Admin/pages/Classes";
import Certificates from "./components/Admin/pages/Certificates";
import { LoginForm } from "./components/Login/LoginFormAdmin";
import NotAuthorized from "./components/Unauthorized";
import NotesManagement from "./components/Admin/pages/ManageNotes/Notes-Management";
import SkillPage from "./components/Trainee/pages/firstpage/skill";
import ClassDetails from "./components/Mentor/ClassPage";
import Challange from "./components/Mentor/Challange";
import TraineeMain from "./components/Trainee/pages/secondpge/ClassDetail";
import ClassesPage from "./components/Trainee/pages/secondpge/ClassPage";
import { SidebarTrainee } from "./components/Trainee/pages/secondpge/SideBarTrainee";
import NavbarTrainee from "./components/Trainee/pages/secondpge/layouts/navbar";
import LessonsPage from "./components/Trainee/pages/secondpge/Lesson-Challenge/LessonPage";
import ChallengesPage from "./components/Trainee/pages/secondpge/Challenge/ChallengePage";
import SubjectDetail from "./components/Trainee/pages/secondpge/subjectdetail";


function Layout({ children }: { children: React.ReactNode }) {
  const isDashboard = window.location.pathname.startsWith("/dashboard");
  const isAdmin = window.location.pathname.startsWith("/admin");
  const isTrainee = window.location.pathname.startsWith("/trainee");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOpenTrainee, setIsSidebarOpenTrainee] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderAdminPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardAdmin />;
      case "batch":
        return <BatchAdmin />;
      case "users":
        return <Users />;
      case "classes":
        return <Classes />;
      case "certificates":
        return <Certificates />;
      case "notes":
        return <NotesManagement />;
      default:
        return <DashboardAdmin />;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isAdmin || isDashboard || isTrainee
          ? "bg-white dark:bg-gray-900"
          : "bg-white"
      }`}
    >
      {isAdmin || isDashboard || isTrainee ? (
        <div className="flex h-screen overflow-x-hidden">
          {/* Sidebar */}
          {isAdmin && (
            <SidebarAdmin
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          {isTrainee && (
            <SidebarTrainee
              isOpen={isSidebarOpenTrainee}
              setIsOpen={setIsSidebarOpenTrainee}
            />
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            {isAdmin ? (
              <NavbarAdmin />
            ) : isTrainee ? (
              <NavbarTrainee />
            ) : (
              <NavbarMentor />
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
              {isAdmin ? renderAdminPage() : children}
            </main>

            {/* Footer */}
            <div className="w-full">
              {isAdmin || isDashboard || isTrainee ? (
                <FooterMentor />
              ) : (
                <Footer />
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
      <ScrollTop />
      <Toaster />
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
            //<rbac allowedRoles={["ADMIN", "MENTOR"]}>
              //<protectedroute>
                <Layout>
                  <MentorDb />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/dashboard/Challange"
          element={
            //<rbac allowedRoles={["ADMIN", "MENTOR"]}>
              //<protectedroute>
                <Layout>
                  <Challange />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/dashboard/batch"
          element={
            //<rbac allowedRoles={["ADMIN", "MENTOR"]}>
              //<protectedroute>
                <Layout>
                  <Batch />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/dashboard/trainee"
          element={
            //<rbac allowedRoles={["ADMIN", "MENTOR"]}>
              //<protectedroute>
                <Layout>
                  <TraineePages />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/dashboard/note"
          element={
            //<rbac allowedRoles={["ADMIN", "MENTOR"]}>
              //<protectedroute>
                <Layout>
                  <NotesPage />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/dashboard/batch/:batchId"
          element={
            //<rbac allowedRoles={["ADMIN", "MENTOR"]}>
              //<protectedroute>
                <Layout>
                  <DashboardPage />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/dashboard/c/:classId/b/:batchId"
          element={
            //<rbac allowedRoles={["ADMIN", "MENTOR"]}>
              //<protectedroute>
                <Layout>
                  <ClassDetails />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route path="/login/mentor" element={<MentorLogin />} />
        <Route path="/login/trainee" element={<TraineeLogin />} />
        <Route
          path="/trainee/class/:classId"
          element={
            //<rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              //<protectedroute>
                <Layout>
                  <TraineeMain />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/trainee/lesson/:id"
          element={
            //<rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              //<protectedroute>
                <Layout>
                  <SubjectDetail />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/trainee/challenge/:id"
          element={
            //<rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              //<protectedroute>
                <Layout>
                  <SubjectDetail />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/trainee/lesson"
          element={
            //<rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              //<protectedroute>
                <Layout>
                  <LessonsPage />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/trainee/challenge"
          element={
            //<rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              //<protectedroute>
                <Layout>
                  <ChallengesPage />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/trainee/notification"
          element={
            //<rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              //<protectedroute>
                <Layout>
                  <NotificationPage />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/trainee/profile"
          element={
            //<rbac allowedRoles={["TRAINEE", "ADMIN"]}>
              //<protectedroute>
                <Layout>
                  <Profile />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route
          path="/trainee/dashboard"
          element={
            //<rbac allowedRoles={["TRAINEE", "ADMIN"]}>
              //<protectedroute>
                <Layout>
                  <ClassesPage />
                </Layout>
              //<protectedroute>
            //<rbac>
          }
        />
        <Route path="/verify" element={<SkillPage />} />
        <Route path="/login-trainee" element={<RegisPage />} />
        <Route
          path="/admin/dashboard"
          element={
            //<rbac allowedRoles={["ADMIN"]}>
              //<protectedroute>
                <Layout>
                  <DashboardAdmin />
                </Layout>
              //<protectedroute>
            //<rbac>
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
        <Route path="/unauthorized" element={<NotAuthorized />} />
        {/* Route without Layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
