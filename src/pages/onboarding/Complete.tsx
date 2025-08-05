import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle2, Bookmark } from 'lucide-react';

const Complete = () => {
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const handleEnterDashboard = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={6}
      title="Your coach profile is complete!"
      subtitle="You're all set to start coaching"
    >
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-primary" />
        </div>

        <div className="space-y-4">
          <p className="text-base text-muted-foreground">
            Welcome to the coach portal! Your profile has been created and you're ready to connect with coachees.
          </p>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Bookmark className="w-4 h-4 text-primary" />
              Remember to bookmark this portal
            </div>
            <p className="text-sm text-muted-foreground">
              Save this page to your bookmarks for easy access to your coaching dashboard.
            </p>
          </div>

          <Button 
            onClick={handleEnterDashboard}
            className="w-full h-12 text-base"
          >
            Enter dashboard
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Complete;