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

import { initAnalytics, trackPageView } from './utils/analytics';

// Lazy loaded components not needed for the initial above-the-fold render
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));
const Profile = lazy(() => import('./components/Profile'));
const ServiceUnavailable = lazy(() => import('./components/ServiceUnavailable'));
const BotWidget = lazy(() => import('./components/BotWidget'));
const NotFound = lazy(() => import('./components/NotFound'));

const RouteAnalyticsTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Allow react-helmet-async time to update document.title on route change
    const timer = setTimeout(() => {
      trackPageView(pathname + search, document.title);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, search]);

  return null;
};

function Home() {
  return (
    <>
      <Helmet>
        <title>Hemant Pandey — Full Stack Developer</title>
        <meta name="description" content="Official portfolio of Hemant Pandey, a Full Stack Developer building modern web applications, mobile apps, and production-ready digital products with React, Next.js, and Node.js." />
        <link rel="canonical" href="https://hemantpandey.in/" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hemantpandey.in/" />
        <meta property="og:site_name" content="Hemant Pandey" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content="Hemant Pandey — Full Stack Developer" />
        <meta property="og:description" content="Official portfolio of Hemant Pandey, a Full Stack Developer building modern web applications, mobile apps, and production-ready digital products with React, Next.js, and Node.js." />
        <meta property="og:image" content="https://hemantpandey.in/project/portfolio-hemantpandey.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Hemant Pandey — Full Stack Developer portfolio" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hemantpandey.in/" />
        <meta name="twitter:title" content="Hemant Pandey — Full Stack Developer" />
        <meta name="twitter:description" content="Official portfolio of Hemant Pandey, a Full Stack Developer building modern web applications, mobile apps, and production-ready digital products with React, Next.js, and Node.js." />
        <meta name="twitter:image" content="https://hemantpandey.in/project/portfolio-hemantpandey.png" />
        <meta name="twitter:image:alt" content="Hemant Pandey — Full Stack Developer portfolio" />

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
                  "name": "Hemant Pandey",
                  "description": "Official portfolio and professional website of Hemant Pandey, Full Stack Developer.",
                  "publisher": {
                    "@id": "https://hemantpandey.in/#person"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://hemantpandey.in/#person",
                  "name": "Hemant Pandey",
                  "url": "https://hemantpandey.in/",
                  "image": "https://hemantpandey.in/project/portfolio-hemantpandey.png",
                  "jobTitle": "Full Stack Developer",
                  "description": "Hemant Pandey is a Full Stack Developer specializing in React, Next.js, Node.js, and the MERN stack. He builds modern web applications, mobile apps, and production-ready digital products.",
                  "knowsAbout": [
                    "Full Stack Development",
                    "React.js",
                    "Next.js",
                    "Node.js",
                    "JavaScript",
                    "MongoDB",
                    "Web Development",
                    "Software Development",
                    "Mobile Application Development",
                    "MERN Stack"
                  ],
                  "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "J.C. Bose University of Science and Technology, YMCA"
                  },
                  "sameAs": [
                    "https://github.com/TheHemantPandey",
                    "https://www.linkedin.com/in/hemant-pandey-ase/"
                  ]
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
    initAnalytics();
  }, []);

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
      <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] selection:bg-[var(--text-primary)]/10 cursor-none relative max-w-[100rem] mx-auto border-x border-[var(--border)] shadow-[0_0_50px_rgba(0,0,0,0.03)]">
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
            <RouteAnalyticsTracker />
            
            <Suspense fallback={<div className="min-h-screen bg-[var(--bg-primary)]" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/unavailable" element={<ServiceUnavailable />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
