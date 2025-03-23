
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Brain, BookOpen, GraduationCap } from 'lucide-react';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [favoriteSubject, setFavoriteSubject] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!name || !grade) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and grade",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Store user profile in localStorage
    const profileData = {
      name,
      grade,
      favoriteSubject,
      learningStyle,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('studentProfile', JSON.stringify(profileData));
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 glassmorphism rounded-2xl">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-assistant-blue flex items-center justify-center">
          <GraduationCap className="text-white h-8 w-8" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">Create Your Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="grade" className="block text-sm font-medium mb-1">
            Your Grade
          </label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger>
              <SelectValue placeholder="Select your grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="preschool">Preschool</SelectItem>
              <SelectItem value="kindergarten">Kindergarten</SelectItem>
              <SelectItem value="elementary1">Elementary (1-2)</SelectItem>
              <SelectItem value="elementary2">Elementary (3-5)</SelectItem>
              <SelectItem value="middle">Middle School (6-8)</SelectItem>
              <SelectItem value="highschool">High School (9-12)</SelectItem>
              <SelectItem value="college">College</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Favorite Subject
          </label>
          <div className="flex items-center">
            <BookOpen className="mr-2 text-assistant-blue h-4 w-4" />
            <Input
              id="subject"
              value={favoriteSubject}
              onChange={(e) => setFavoriteSubject(e.target.value)}
              placeholder="Math, Science, English, etc."
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="learning-style" className="block text-sm font-medium mb-1">
            How do you learn best?
          </label>
          <div className="flex items-center">
            <Brain className="mr-2 text-assistant-blue h-4 w-4" />
            <Select value={learningStyle} onValueChange={setLearningStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select learning style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visual">Visual (pictures & diagrams)</SelectItem>
                <SelectItem value="auditory">Auditory (listening & hearing)</SelectItem>
                <SelectItem value="reading">Reading & Writing</SelectItem>
                <SelectItem value="kinesthetic">Hands-on Activities</SelectItem>
                <SelectItem value="mixed">Mixed/Multiple Ways</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-assistant-blue hover:bg-assistant-accent button-transition"
          disabled={isLoading}
        >
          {isLoading ? "Creating Profile..." : "Get Started"}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
