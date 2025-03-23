
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Brain, ArrowRight } from 'lucide-react';

const WelcomeHero = () => {
  const [name, setName] = useState<string | null>(null);
  const [profileExists, setProfileExists] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('studentProfile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setName(parsedProfile.name);
      setProfileExists(true);
    }
  }, []);
  
  const features = [
    {
      title: "Personalized Learning",
      description: "Get help tailored to your grade level and learning style",
      icon: <Brain className="h-6 w-6 text-assistant-blue" />
    },
    {
      title: "Hint-Based Guidance",
      description: "Receive helpful hints rather than just answers",
      icon: <BookOpen className="h-6 w-6 text-assistant-blue" />
    },
    {
      title: "Progress Tracking",
      description: "Keep track of your learning journey and improvements",
      icon: <GraduationCap className="h-6 w-6 text-assistant-blue" />
    }
  ];
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12 page-transition">
        {name ? (
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome, <span className="text-assistant-blue">{name}</span>!
          </h1>
        ) : (
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Homework Assistant
          </h1>
        )}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your intelligent companion for homework help that guides rather than just gives answers.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="glassmorphism p-6 rounded-xl animate-fade-in-up" 
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-assistant-light mr-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center page-transition">
        {profileExists ? (
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="bg-assistant-blue hover:bg-assistant-accent button-transition"
            size="lg"
          >
            <span>Continue Learning</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button 
            onClick={() => navigate('/profile')} 
            className="bg-assistant-blue hover:bg-assistant-accent button-transition"
            size="lg"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default WelcomeHero;
