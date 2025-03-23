
import React, { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  GraduationCap, 
  BookOpen, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface StudentProfile {
  name: string;
  grade: string;
  favoriteSubject?: string;
  learningStyle?: string;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedProfile = localStorage.getItem('studentProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      navigate('/profile');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('studentProfile');
    navigate('/');
  };
  
  const navItems = [
    { label: 'Home', icon: <Home size={20} />, path: '/dashboard' },
    { label: 'My Subjects', icon: <BookOpen size={20} />, path: '/subjects' },
    { label: 'Progress', icon: <GraduationCap size={20} />, path: '/progress' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-assistant-blue text-white w-10 h-10 rounded-full mr-3">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <div className="font-medium truncate">{profile?.name}</div>
              <div className="text-xs text-gray-500 truncate">
                Grade: {profile?.grade === 'elementary1' ? '1-2' : 
                        profile?.grade === 'elementary2' ? '3-5' : 
                        profile?.grade === 'middle' ? '6-8' : 
                        profile?.grade === 'highschool' ? '9-12' : 
                        profile?.grade === 'college' ? 'College' : 
                        profile?.grade}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start mb-1"
                onClick={() => navigate(item.path)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500 hover:text-gray-900"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Mobile Header and Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          <div className="font-medium">AI Homework Assistant</div>
          
          <div className="w-8 h-8 rounded-full bg-assistant-blue text-white flex items-center justify-center">
            {profile?.name ? profile.name.charAt(0).toUpperCase() : 'A'}
          </div>
        </header>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg z-50 absolute top-14 left-0 right-0 border-b border-gray-200 page-transition">
            <nav className="py-2">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start rounded-none"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Button>
              ))}
              
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none text-gray-500"
                onClick={handleLogout}
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </Button>
            </nav>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
