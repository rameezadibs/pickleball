import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WaysToSparkSection } from './components/WaysToSparkSection';
import { PackagesSection } from './components/PackagesSection';
import { WhySparkSection } from './components/WhySparkSection';
import { CommunitySection } from './components/CommunitySection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export function App() {
  const scrollToPackages = () => {
    const el = document.getElementById('packages');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#08090B] text-white flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#ED1725] focus:text-white focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest"
        >
          Skip to main content
        </a>

        <Navbar onNavigateService={() => {}} />

        <main id="main-content" className="flex-1">
          <HeroSection
            onBookCourtClick={() => scrollToPackages()}
            onExploreCoachingClick={() => scrollToPackages()}
          />
          <AboutSection />
          <WaysToSparkSection onSelectService={() => {}} />
          <PackagesSection onSelectPackage={() => {}} />
          <WhySparkSection />
          <CommunitySection />
          <FaqSection />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
