import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Resume } from '@/components/sections/Resume';
import { Portfolio } from '@/components/sections/Portfolio';
import { Showcase } from '@/components/sections/Showcase';
import { GitHubStats } from '@/components/sections/GitHubStats';
import { FunFacts } from '@/components/sections/FunFacts';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Resume />
        <Portfolio />
        <Showcase />
        <GitHubStats />
        <FunFacts />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
