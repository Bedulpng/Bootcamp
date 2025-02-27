import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
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
import ClassDetails from "./components/Mentor/ClassPage";
import TraineeMain from "./components/Trainee/pages/secondpge/TraineeMain";
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
import Rbac from "./components/RbacRoute";
import ExaminerClassPage from "./components/Examiner/Class/ClassPage";
import ExaminerClassDetails from "./components/Examiner/Class/ClassDetail";
import ExaminerSubmissionPage from "./components/Examiner/Class/Submission";
import { SidebarExaminer } from "./components/Examiner/SidebarExaminer";
import { DotSpinner } from "./components/SpinnerLoading";
import ExaminerPresentations from "./components/Examiner/Presentations";

function Layout({ children }: { children: React.ReactNode }) {
  const isMentor = window.location.pathname.startsWith("/mentor");
  const isAdmin = window.location.pathname.startsWith("/admin");
  const isTrainee = window.location.pathname.startsWith("/trainee");
  const isExaminer = window.location.pathname.startsWith("/examiner");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOpenTrainee, setIsSidebarOpenTrainee] = useState(true);
  const [isSidebarOpenExaminer, setIsSidebarOpenExaminer] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const shouldHideFooter = [
    "/contact",
    "/programs/fullstack",
    "/programs/qualityassurance",
    "/about",
  ].includes(window.location.pathname);

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
      case "access":
        return <RoutesPage />;
      default:
        return <DashboardAdmin />;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isAdmin || isMentor || isTrainee || isExaminer
          ? "bg-white dark:bg-gray-900"
          : "bg-white"
      }`}
    >
      {isAdmin || isMentor || isTrainee || isExaminer ? (
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
            {!shouldHideFooter && (isAdmin || isMentor || isTrainee || isExaminer ? (
              <FooterMentor />
            ) : (
              <Footer />
            ))}
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          {children}
          {!shouldHideFooter && <Footer />}
        </>
      )}
      <ScrollTop />
      <Toaster />
    </div>
  );
}

// Main content component to keep the code organized
function MainContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch or component readiness
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <DotSpinner />
      </div>
    );
  }

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
            path="/mentor/dashboard"
            element={
              <Rbac routeName="/mentor/dashboard">
                <ProtectedRoute>
                  <Layout>
                    <MentorDb />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/mentor/batch"
            element={
              <Rbac routeName="/mentor/batch">
                <ProtectedRoute>
                  <Layout>
                    <Batch />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/mentor/trainee"
            element={
              <Rbac routeName="/mentor/trainee">
                <ProtectedRoute>
                  <Layout>
                    <TraineePages />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/mentor/note"
            element={
              <Rbac routeName="/mentor/note">
                <ProtectedRoute>
                  <Layout>
                    <NotesPage />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/mentor/c/:classId/s/:id"
            element={
              <Rbac routeName="/mentor/c/:classId/s/:id">
                <ProtectedRoute>
                  <Layout>
                    <Challange />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/mentor/class/:batchId"
            element={
              <Rbac routeName="/mentor/class/:batchId">
                <ProtectedRoute>
                  <Layout>
                    <ClassPage />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/mentor/c/:classId/:batchId"
            element={
              <Rbac routeName="/mentor/c/:classId/:batchId">
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
              <Rbac routeName="/trainee/class/:classId">
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
              <Rbac routeName="/trainee/lesson/:id">
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
              <Rbac routeName="/trainee/challenge/:id">
                <ProtectedRoute>
                  <Layout>
                    <SubjectDetail />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/trainee/presentation/:id"
            element={
              <Rbac routeName="/trainee/presentation/:id">
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
              <Rbac routeName="/trainee/lesson">
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
              <Rbac routeName="/trainee/challenge">
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
              <Rbac routeName="/trainee/notification">
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
              <Rbac routeName="/trainee/profile">
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
              <Rbac routeName="/trainee/dashboard">
                <ProtectedRoute>
                  <Layout>
                    <ClassesPage />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <Rbac routeName="/admin/dashboard">
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
              <Rbac routeName="/examiner/dashboard">
                <ProtectedRoute>
                  <Layout>
                    <ExaminerDashboard />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/examiner/class/:batchId"
            element={
              <Rbac routeName="/examiner/class/:batchId">
                <ProtectedRoute>
                  <Layout>
                    <ExaminerClassPage />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/examiner/c/:classId/:batchId"
            element={
              <Rbac routeName="/examiner/c/:classId/:batchId">
                <ProtectedRoute>
                  <Layout>
                    <ExaminerClassDetails />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/examiner/c/:classId/s/:id"
            element={
              <Rbac routeName="/examiner/c/:classId/s/:id">
                <ProtectedRoute>
                  <Layout>
                    <ExaminerSubmissionPage />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/examiner/profile"
            element={
              <Rbac routeName="/examiner/profile">
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              </Rbac>
            }
          />
          <Route
            path="/examiner/presentation"
            element={
              <Rbac routeName="/examiner/presentation">
                <ProtectedRoute>
                  <Layout>
                    <ExaminerPresentations />
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
