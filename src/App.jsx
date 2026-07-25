import React, { useEffect, useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from "./components/Education";
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import CredentialsPreview from './components/CredentialsPreview';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ScrollIndicator from './components/ScrollIndicator';
import LoadingScreen from './components/LoadingScreen';

// Lazy loaded components not needed for the initial above-the-fold render
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));
const Profile = lazy(() => import('./components/Profile'));
const ServiceUnavailable = lazy(() => import('./components/ServiceUnavailable'));
const BotWidget = lazy(() => import('./components/BotWidget'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function Home() {
  return (
    <>
      <Helmet>
        <title>Hemant Pandey | Full Stack Web & App Developer</title>
        <meta name="description" content="Portfolio of Hemant Pandey, a professional Full Stack Web & App Developer specializing in modern MERN stacks, Next.js, and optimized realtime systems." />
        <link rel="canonical" href="https://hemantpandey.in/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hemantpandey.in/" />
        <meta property="og:title" content="Hemant Pandey | Full Stack Web & App Developer" />
        <meta property="og:description" content="Portfolio of Hemant Pandey, a professional Full Stack Web & App Developer specializing in modern MERN stacks, Next.js, and optimized realtime systems." />
        <meta property="og:image" content="/project/image1.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hemantpandey.in/" />
        <meta name="twitter:title" content="Hemant Pandey | Full Stack Web & App Developer" />
        <meta name="twitter:description" content="Portfolio of Hemant Pandey, a professional Full Stack Web & App Developer specializing in modern MERN stacks, Next.js, and optimized realtime systems." />
        <meta name="twitter:image" content="/project/image1.png" />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://hemantpandey.in/#website",
                  "url": "https://hemantpandey.in/",
                  "name": "Hemant Pandey Portfolio",
                  "description": "Portfolio of Hemant Pandey, a professional Full Stack Web & App Developer"
                },
                {
                  "@type": "Person",
                  "@id": "https://hemantpandey.in/#person",
                  "name": "Hemant Pandey",
                  "url": "https://hemantpandey.in/",
                  "sameAs": [
                    "https://github.com/TheHemantPandey",
                    "https://www.linkedin.com/in/hemant-pandey-ase/"
                  ],
                  "jobTitle": "Full Stack Web Developer",
                  "alumniOf": "J.C. Bose University of Science and Technology"
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <Education />
        <Skills />
        <Services />
        <Projects />
        <Process />
        <CredentialsPreview />  
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const LOADER_DURATION_MS = 2500;
    let animationFrameId;
    let startTime;

    document.body.style.overflow = 'hidden';

    const animateProgress = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const ratio = Math.min(elapsed / LOADER_DURATION_MS, 1);
      setProgress(ratio * 100);

      if (ratio < 1) {
        animationFrameId = window.requestAnimationFrame(animateProgress);
      } else {
        setIsLoading(false);
      }
    };

    animationFrameId = window.requestAnimationFrame(animateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Router>
      <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] selection:bg-[var(--text-primary)]/10 cursor-none">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            setShowContent(true);
            document.body.style.overflow = '';
          }}
        >
          {isLoading && <LoadingScreen progress={progress} />}
        </AnimatePresence>

        {showContent && (
          <>
            <Cursor />
            <ScrollIndicator />
            <Suspense fallback={null}>
              <BotWidget />
            </Suspense>
            <ScrollToTop />
            
            <Suspense fallback={<div className="min-h-screen bg-[var(--bg-primary)]" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/unavailable" element={<ServiceUnavailable />} />
              </Routes>
            </Suspense>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
