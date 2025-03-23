
import React from 'react';
import ProfileForm from '@/components/ProfileForm';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-assistant-light flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-8" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="max-w-md mx-auto">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
