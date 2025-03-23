
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface StudentProfile {
  name: string;
  grade: string;
  favoriteSubject?: string;
  learningStyle?: string;
}

const SettingsPage = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('studentProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('studentProfile', JSON.stringify(profile));
      
      setIsLoading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }, 800);
  };
  
  const handlePreferencesUpdate = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Preferences saved",
        description: "Your preferences have been successfully updated.",
      });
    }, 600);
  };
  
  if (!profile) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Loading...</h1>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-6">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select 
                        value={profile.grade} 
                        onValueChange={(value) => setProfile({...profile, grade: value})}
                      >
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select grade" />
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Favorite Subject</Label>
                      <Input 
                        id="subject" 
                        value={profile.favoriteSubject || ''} 
                        onChange={(e) => setProfile({...profile, favoriteSubject: e.target.value})} 
                        placeholder="E.g., Math, Science, English"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="learning-style">Learning Style</Label>
                      <Select 
                        value={profile.learningStyle || ''} 
                        onValueChange={(value) => setProfile({...profile, learningStyle: value})}
                      >
                        <SelectTrigger id="learning-style">
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
                    className="bg-assistant-blue hover:bg-assistant-accent button-transition"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your learning experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications" className="font-medium">Notifications</Label>
                      <p className="text-sm text-gray-500">Receive reminders and updates</p>
                    </div>
                    <Switch 
                      id="notifications" 
                      checked={notifications} 
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sound-effects" className="font-medium">Sound Effects</Label>
                      <p className="text-sm text-gray-500">Play sounds for achievements and feedback</p>
                    </div>
                    <Switch 
                      id="sound-effects" 
                      checked={soundEffects} 
                      onCheckedChange={setSoundEffects} 
                    />
                  </div>
                  
                  <Button 
                    onClick={handlePreferencesUpdate} 
                    className="bg-assistant-blue hover:bg-assistant-accent button-transition"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
