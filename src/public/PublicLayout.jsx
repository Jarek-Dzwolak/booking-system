import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VisualEffects from './components/VisualEffects';
import useSalonConfig from './hooks/useSalonConfig';
import './styles/animations.css';

const PublicLayout = () => {
  const { applyColors, seo } = useSalonConfig();

  useEffect(() => {
    // Aplikuj kolory do CSS Variables
    applyColors();

    // Ustaw tytuł strony
    document.title = seo.title;

    // Ustaw meta tagi
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = seo.description;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seo.keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = seo.keywords;
      document.head.appendChild(meta);
    }
  }, [applyColors, seo]);

  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      overflowX: 'hidden',
    }}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
      <VisualEffects />
    </div>
  );
};

export default PublicLayout;
