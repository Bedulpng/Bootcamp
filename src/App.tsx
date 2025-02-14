import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
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
import Batch from "./components/Mentor/Batch/ExploreBatch";
import { TraineePages } from "./components/TraineeManagement/TraineePage";
import { MentorLogin } from "./components/Login/MentorLogin";
import { TraineeLogin } from "./components/Login/TraineeLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Rbac from "./components/RbacRoute";
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
import TraineeMain from "./components/Trainee/pages/secondpge/ClassDetail";
import ClassesPage from "./components/Trainee/pages/secondpge/ClassPage";
import { SidebarTrainee } from "./components/Trainee/pages/secondpge/SideBarTrainee";
import NavbarTrainee from "./components/Trainee/pages/secondpge/layouts/navbar";
import LessonsPage from "./components/Trainee/pages/secondpge/LessonChallenge/LessonPage";
import ChallengesPage from "./components/Trainee/pages/secondpge/LessonChallenge/ChallengePage";
import Challange from "./components/Mentor/Submission";
import SubjectDetail from "./components/Trainee/pages/secondpge/SubjectDetail";
import ClassPage from "./components/Mentor/ClassCard/ClassPage";
import { Toaster } from "react-hot-toast";
import { ExaminerLogin } from "./components/Login/ExaminerLogin";
import { SidebarExaminer } from "./components/Examiner/Sidebar/Sidebar";
import ExploreBatchExaminer from "./components/Examiner/Batch/ExploreBatch";
import ExaminerDashboard from "./components/Examiner/Dashboard";

function Layout({ children }: { children: React.ReactNode }) {
  const isDashboard = window.location.pathname.startsWith("/dashboard");
  const isAdmin = window.location.pathname.startsWith("/admin");
  const isTrainee = window.location.pathname.startsWith("/trainee");
  const isExaminer = window.location.pathname.startsWith("/examiner");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOpenTrainee, setIsSidebarOpenTrainee] = useState(true);
  const [isSidebarOpenExaminer, setIsSidebarOpenExaminer] = useState(true);
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
        isAdmin || isDashboard || isTrainee || isExaminer
          ? "bg-white dark:bg-gray-900"
          : "bg-white"
      }`}
    >
      {isAdmin || isDashboard || isTrainee || isExaminer ? (
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
          {/* {isExaminer && (
            <SidebarExaminer
              isOpen={isSidebarOpenExaminer}
              setIsOpen={setIsSidebarOpenExaminer}
            />
          )} */}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            {isAdmin ? (
              <NavbarAdmin />
            ) : isTrainee || isExaminer ? (
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
              {isAdmin || isDashboard || isTrainee || isExaminer ? (
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
    <>
    <Toaster />
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
            <Rbac allowedRoles={["ADMIN", "MENTOR"]}>
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
            <Rbac allowedRoles={["ADMIN", "MENTOR"]}>
              <ProtectedRoute>
                <Layout>
                  <Batch />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/dashboard/trainee"
          element={
            <Rbac allowedRoles={["ADMIN", "MENTOR"]}>
              <ProtectedRoute>
                <Layout>
                  <TraineePages />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/dashboard/note"
          element={
            <Rbac allowedRoles={["ADMIN", "MENTOR"]}>
              <ProtectedRoute>
                <Layout>
                  <NotesPage />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/dashboard/c/:classId/s/:id"
          element={
            <Rbac allowedRoles={["ADMIN", "MENTOR"]}>
              <ProtectedRoute>
                <Layout>
                  <Challange />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/dashboard/class/:batchId"
          element={
            <Rbac allowedRoles={["ADMIN", "MENTOR"]}>
              <ProtectedRoute>
                <Layout>
                  <ClassPage />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/dashboard/c/:classId/"
          element={
            <Rbac allowedRoles={["ADMIN", "MENTOR"]}>
              <ProtectedRoute>
                <Layout>
                  <ClassDetails />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route path="/login/mentor" element={<MentorLogin />} />
        <Route path="/login/trainee" element={<TraineeLogin />} />
        <Route path="/login/examiner" element={<ExaminerLogin />} />
        <Route
          path="/trainee/class/:classId"
          element={
            <Rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              <ProtectedRoute>
                <Layout>
                  <TraineeMain />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/trainee/lesson/:id"
          element={
            <Rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              <ProtectedRoute>
                <Layout>
                  <SubjectDetail />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/trainee/challenge/:id"
          element={
            <Rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              <ProtectedRoute>
                <Layout>
                  <SubjectDetail />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/trainee/lesson"
          element={
            <Rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              <ProtectedRoute>
                <Layout>
                  <LessonsPage />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/trainee/challenge"
          element={
            <Rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              <ProtectedRoute>
                <Layout>
                  <ChallengesPage />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/trainee/notification"
          element={
            <Rbac allowedRoles={["ADMIN", "TRAINEE"]}>
              <ProtectedRoute>
                <Layout>
                  <NotificationPage />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/trainee/profile"
          element={
            <Rbac allowedRoles={["TRAINEE", "ADMIN"]}>
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route
          path="/trainee/dashboard"
          element={
            <Rbac allowedRoles={["TRAINEE", "ADMIN"]}>
              <ProtectedRoute>
                <Layout>
                  <ClassesPage />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route path="/verify" element={<SkillPage />} />
        <Route path="/login-trainee" element={<RegisPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <Rbac allowedRoles={["ADMIN"]}>
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
          path="/examiner/dashboard"
          element={
            <Rbac allowedRoles={["EXAMINER", "ADMIN"]}>
              <ProtectedRoute>
                <Layout>
                  <ExaminerDashboard />
                </Layout>
              </ProtectedRoute>
            </Rbac>
          }
        />
        <Route path="/unauthorized" element={<NotAuthorized />} />
        {/* Route without Layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
