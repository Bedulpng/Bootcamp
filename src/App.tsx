import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Testimonial } from './components/Testimonial';
import LeadingComp from './components/LeadingCompanies';
import ProgramsPage from './components/Program';
import { Footer } from './components/Footer';
import  Contact  from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Testimonial />
      <LeadingComp />
      <ProgramsPage />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;