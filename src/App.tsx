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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Main content */}
        <Routes>
          {/* Default route showing main page components */}
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <Testimonial />
                <LeadingComp />

                <div id="program">
                  <ProgramsPage />
                </div>

                <Contact />
              </>
            }
          />
          
          {/* Route to display ContactSect on /contact */}
          <Route path="/contact" element={<ContactSect />} />
          <Route path="/programs/fullstack" element={<RmFs />} />
          <Route path="/programs/qualityassurance" element={<RmQa />} />
          <Route path="/about" element={<AboutSection />} />
        </Routes>
        <ScrollTop />

        {/* Footer will be shown on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
