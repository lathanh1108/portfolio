import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import LazySection from '@/components/ui/LazySection';
import dynamic from 'next/dynamic';

const Experience = dynamic(() => import('@/components/sections/Experience'));

export default function Home() {
  return (
    <>
      <Header />
      <main id="app-main" data-component="Main" className="min-h-screen bg-gray-900">
        <LazySection>
          <About />
        </LazySection>
        <LazySection>
          <Skills />
        </LazySection>
        <LazySection>
          <Experience />
        </LazySection>
        <LazySection>
          <Projects />
        </LazySection>
        <LazySection>
          <Contact />
        </LazySection>
      </main>
      <Footer />
    </>
  );
}
