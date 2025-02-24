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
import SubjectDetail from "./components/Trainee/pages/secondpge/subjectdetail";
import ClassPage from "./components/Mentor/ClassCard/ClassPage";
import { Toaster } from "react-hot-toast";
import { ExaminerLogin } from "./components/Login/ExaminerLogin";
import ExaminerDashboard from "./components/Examiner/Page";
import NavbarExaminer from "./components/Examiner/Navbar";
import RoutesPage from "./components/Admin/pages/Route/RoutePage";
import RbacTest from "./components/RbacTesting";
import ExaminerClassPage from "./components/Examiner/Class/ClassPage";
import ExaminerClassDetails from "./components/Examiner/Class/ClassDetail";
import ExaminerSubmissionPage from "./components/Examiner/Class/Submission";
import { SidebarExaminer } from "./components/Examiner/SidebarExaminer";

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
      case "access" :
        return <RoutesPage />;
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
          {isExaminer && (
            <SidebarExaminer
              isOpen={isSidebarOpenExaminer}
              setIsOpen={setIsSidebarOpenExaminer}
            />
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            {isAdmin ? (
              <NavbarAdmin />
            ) : isExaminer ? (
              <NavbarExaminer />
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
              <RbacTest routeName="/dashboard">
                <ProtectedRoute>
                  <Layout>
                    <MentorDb />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/dashboard/batch"
            element={
              <RbacTest routeName="/dashboard/batch">
                <ProtectedRoute>
                  <Layout>
                    <Batch />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/dashboard/trainee"
            element={
              <RbacTest routeName="/dashboard/trainee">
                <ProtectedRoute>
                  <Layout>
                    <TraineePages />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/dashboard/note"
            element={
              <RbacTest routeName="/dashboard/note">
                <ProtectedRoute>
                  <Layout>
                    <NotesPage />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/dashboard/c/:classId/s/:id"
            element={
              <RbacTest routeName="/dashboard/c/:classId/s/:id">
                <ProtectedRoute>
                  <Layout>
                    <Challange />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/dashboard/class/:batchId"
            element={
              <RbacTest routeName="/dashboard/class/:batchId">
                <ProtectedRoute>
                  <Layout>
                    <ClassPage />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/dashboard/c/:classId/:batchId"
            element={
              <RbacTest routeName="/dashboard/c/:classId/:batchId">
                <ProtectedRoute>
                  <Layout>
                    <ClassDetails />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route path="/login/mentor" element={<MentorLogin />} />
          <Route path="/login/trainee" element={<TraineeLogin />} />
          <Route path="/login/examiner" element={<ExaminerLogin />} />
          <Route
            path="/trainee/class/:classId"
            element={
              <RbacTest routeName="/trainee/class/:classId">
                <ProtectedRoute>
                  <Layout>
                    <TraineeMain />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/trainee/lesson/:id"
            element={
              <RbacTest routeName="/trainee/lesson/:id">
                <ProtectedRoute>
                  <Layout>
                    <SubjectDetail />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/trainee/challenge/:id"
            element={
              <RbacTest routeName="/trainee/challenge/:id">
                <ProtectedRoute>
                  <Layout>
                    <SubjectDetail />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/trainee/presentation/:id"
            element={
              <RbacTest routeName="/trainee/presentation/:id">
                <ProtectedRoute>
                  <Layout>
                    <SubjectDetail />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/trainee/lesson"
            element={
              <RbacTest routeName="/trainee/lesson">
                <ProtectedRoute>
                  <Layout>
                    <LessonsPage />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/trainee/challenge"
            element={
              <RbacTest routeName="/trainee/challenge">
                <ProtectedRoute>
                  <Layout>
                    <ChallengesPage />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/trainee/notification"
            element={
              <RbacTest routeName="/trainee/notification">
                <ProtectedRoute>
                  <Layout>
                    <NotificationPage />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/trainee/profile"
            element={
              <RbacTest routeName="/trainee/profile">
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/trainee/dashboard"
            element={
              <RbacTest routeName="/trainee/dashboard">
                <ProtectedRoute>
                  <Layout>
                    <ClassesPage />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route path="/verify" element={<SkillPage />} />
          <Route path="/login-trainee" element={<RegisPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <RbacTest routeName="/admin/dashboard">
                <ProtectedRoute>
                  <Layout>
                    <DashboardAdmin />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
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
              <RbacTest routeName="/examiner/dashboard">
                <ProtectedRoute>
                  <Layout>
                    <ExaminerDashboard />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/examiner/class/:batchId"
            element={
              <RbacTest routeName="/examiner/class/:batchId">
                <ProtectedRoute>
                  <Layout>
                    <ExaminerClassPage />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/examiner/c/:classId/:batchId"
            element={
              <RbacTest routeName="/examiner/c/:classId/:batchId">
                <ProtectedRoute>
                  <Layout>
                    <ExaminerClassDetails />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          <Route
            path="/examiner/c/:classId/s/:id"
            element={
              <RbacTest routeName="/examiner/c/:classId/s/:id">
                <ProtectedRoute>
                  <Layout>
                    <ExaminerSubmissionPage />
                  </Layout>
                </ProtectedRoute>
              </RbacTest>
            }
          />
          {/* <Route
            path="/abcd"
            element={
              <RbacTest routeName="/abcd">
                    <RoutesPage />
              </RbacTest>
            }
          /> */}
          <Route path="/unauthorized" element={<NotAuthorized />} />
          {/* Route without Layout */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
