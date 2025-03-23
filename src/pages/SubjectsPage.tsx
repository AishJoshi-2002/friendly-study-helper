
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calculator, Beaker, Languages, Palette, Globe, Music, Dumbbell } from 'lucide-react';

const SubjectsPage = () => {
  const subjects = [
    { name: 'Mathematics', icon: <Calculator className="h-6 w-6" />, color: 'bg-blue-500' },
    { name: 'Science', icon: <Beaker className="h-6 w-6" />, color: 'bg-green-500' },
    { name: 'Language Arts', icon: <Languages className="h-6 w-6" />, color: 'bg-purple-500' },
    { name: 'Social Studies', icon: <Globe className="h-6 w-6" />, color: 'bg-amber-500' },
    { name: 'Art', icon: <Palette className="h-6 w-6" />, color: 'bg-pink-500' },
    { name: 'Music', icon: <Music className="h-6 w-6" />, color: 'bg-indigo-500' },
    { name: 'Physical Education', icon: <Dumbbell className="h-6 w-6" />, color: 'bg-red-500' },
    { name: 'Reading', icon: <BookOpen className="h-6 w-6" />, color: 'bg-cyan-500' },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Subjects</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((subject, index) => (
              <Card 
                key={index} 
                className="hover:shadow-md transition-all duration-300 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <div className={`${subject.color} text-white p-2 rounded-full`}>
                      {subject.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Get personalized help with your {subject.name.toLowerCase()} homework.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubjectsPage;
