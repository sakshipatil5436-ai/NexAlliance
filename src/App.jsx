import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutSPAView from './components/AboutSPAView';
import Services from './components/Services';
import ServiceDetailSPAView from './components/ServiceDetailSPAView';
import Portfolio from './components/Portfolio';
import ClientsSection from './components/ClientsSection';
import CareersSection from './components/CareersSection';
import ContactSection from './components/ContactSection';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import RobotVoiceAssistant from './components/RobotVoiceAssistant';
import { PhoneCall } from 'lucide-react';

// ScrollToTop Helper Component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Wrapper for Dynamic Service Detail Page Route (/services/:serviceId)
function ServiceDetailRouteWrapper({ onOpenBooking }) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  return (
    <ServiceDetailSPAView
      serviceId={serviceId}
      onBack={() => navigate('/services')}
      onOpenBooking={onOpenBooking}
      theme="light"
    />
  );
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // 1. Direct Phone Call Handler (+91 63511 78511) for BOOK A CALL
  const handleMakeCall = () => {
    window.location.href = 'tel:+916351178511';
  };

  // 2. Open Form Modal Handler for START CONSULTATION
  const handleOpenBookingModal = () => {
    setBookingOpen(true);
  };

  const handleCloseBooking = () => setBookingOpen(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col transition-colors duration-500 relative selection:bg-[#0088FF] selection:text-white bg-white text-slate-900">
        {/* Persistent Header Navbar across all routes (BOOK A CALL makes direct call) */}
        <Navbar
          onOpenBooking={handleMakeCall}
        />

        {/* Main SPA Canvas Body */}
        <main className="flex-grow">
          <Routes>
            {/* Route 1: Home Landing Page */}
            <Route
              path="/"
              element={
                <Home
                  onOpenBooking={handleOpenBookingModal}
                  theme="light"
                />
              }
            />

            {/* Route 2: Dedicated About Page */}
            <Route
              path="/about"
              element={
                <AboutSPAView
                  onOpenBooking={handleOpenBookingModal}
                  theme="light"
                />
              }
            />

            {/* Route 3: Dedicated Services Page */}
            <Route
              path="/services"
              element={
                <Services
                  onOpenBooking={handleOpenBookingModal}
                  theme="light"
                  isHomePage={false}
                />
              }
            />

            {/* Route 3b: Dedicated Service Detail Sub-Page */}
            <Route
              path="/services/:serviceId"
              element={<ServiceDetailRouteWrapper onOpenBooking={handleOpenBookingModal} />}
            />

            {/* Route 4: Dedicated Portfolio Page */}
            <Route
              path="/portfolio"
              element={
                <Portfolio onOpenBooking={handleOpenBookingModal} theme="light" isHomePage={false} />
              }
            />

            {/* Route 4b: Dedicated Clients Page */}
            <Route
              path="/clients"
              element={
                <ClientsSection onOpenBooking={handleOpenBookingModal} />
              }
            />

            {/* Route 5: Dedicated Careers Page */}
            <Route
              path="/careers"
              element={
                <CareersSection onOpenBooking={handleOpenBookingModal} theme="light" isHomePage={false} />
              }
            />

            {/* Route 6: Dedicated Contact Page */}
            <Route
              path="/contact"
              element={
                <ContactSection onOpenBooking={handleOpenBookingModal} theme="light" />
              }
            />
          </Routes>
        </main>

        <Footer
          onOpenBooking={handleOpenBookingModal}
          theme="light"
        />

        {/* Floating Quick Action Buttons */}
        {!isChatbotOpen && (
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3 items-center select-none transition-opacity duration-300">
            {/* 1. Phone Call Icon Only Button (Triggers Direct Phone Call) */}
            <a
              href="tel:+916351178511"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#0088FF] to-[#2563EB] hover:from-[#0077E6] hover:to-[#1D4ED8] text-white flex items-center justify-center shadow-xl shadow-blue-500/30 border border-white/40 hover:scale-110 transition-all cursor-pointer"
              aria-label="Book a Call"
              title="Book a Call"
            >
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </a>

            {/* 2. Official WhatsApp Brand Icon Only Button */}
            <a
              href="https://wa.me/916351178511?text=Hello%20NexAlliance!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/40 border border-white/40 hover:scale-110 transition-all cursor-pointer"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
              </svg>
            </a>
          </div>
        )}

        {/* Floating AI Robot Voice Assistant Widget */}
        <RobotVoiceAssistant theme="light" />

        {/* Start Consultation Email Form Modal */}
        <BookingModal isOpen={bookingOpen} onClose={handleCloseBooking} theme="light" />
      </div>
    </Router>
  );
}
