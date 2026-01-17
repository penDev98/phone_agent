import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Explanation } from './components/Explanation';
import { Results } from './components/Results';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { DemoModal } from './components/DemoModal';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleOpenContact = (planName?: string) => {
    setSelectedPlan(planName);
    setIsContactOpen(true);
  };

  const handleOpenDemo = () => {
    setIsDemoOpen(true);
  };

  return (
    <main className="w-full overflow-x-hidden selection:bg-brand-red selection:text-white">
      <Navbar onOpenContact={() => handleOpenContact()} />
      <Hero 
        onOpenContact={() => handleOpenContact()} 
        onOpenDemo={handleOpenDemo}
      />
      <Explanation />
      <Results />
      <Testimonials />
      <Pricing onSelectPlan={handleOpenContact} />
      <Footer />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        initialPlan={selectedPlan}
      />

      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)}
      />
    </main>
  );
}

export default App;