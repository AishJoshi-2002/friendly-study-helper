
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import HomeworkChat from '@/components/HomeworkChat';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="h-full p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden h-[calc(100vh-32px)] md:h-[calc(100vh-48px)]">
          <div className="p-4 bg-assistant-blue text-white">
            <h2 className="text-xl font-semibold">Homework Help</h2>
            <p className="text-white/80 text-sm">Ask me about your homework, and I'll guide you through it</p>
          </div>
          
          <div className="h-[calc(100%-72px)]">
            <HomeworkChat />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
