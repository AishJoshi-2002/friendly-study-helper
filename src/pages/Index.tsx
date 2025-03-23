
import React from 'react';
import WelcomeHero from '@/components/WelcomeHero';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-assistant-light">
      <div className="container mx-auto px-4 py-8">
        <WelcomeHero />
      </div>
    </div>
  );
};

export default Index;
