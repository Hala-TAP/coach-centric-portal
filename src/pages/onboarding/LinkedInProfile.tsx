import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OnboardingLayout from './OnboardingLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';

const LinkedInProfile = () => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate fetching LinkedIn data
    setTimeout(() => {
      const mockLinkedInData = {
        name: 'Sarah Johnson',
        title: 'Senior Career Coach',
        location: 'New York, NY',
        linkedinUrl: linkedinUrl,
        profilePhoto: '/lovable-uploads/cd3003cb-ec58-4b74-b69c-4761cb7ec706.png'
      };

      updateUser(mockLinkedInData);
      setIsLoading(false);
      navigate('/onboarding/review');
    }, 1500);
  };

  const handleBack = () => {
    navigate('/onboarding/password');
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={6}
      title="Share your LinkedIn profile to help us create your profile with the right information."
      subtitle="Feel free to make any changes."
    >
      <Button
        type="button"
        variant="ghost"
        onClick={handleBack}
        className="mb-6 h-12 px-4 text-base min-h-[40px] min-w-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="Back"
      >
        <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
        Back
      </Button>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-base">LinkedIn URL</Label>
          <Input
            id="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/your-profile"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            required
            className="h-12 text-base"
          />
          <p className="text-sm text-muted-foreground">
            We'll extract your name, title, and location from your LinkedIn profile.
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          disabled={!linkedinUrl || isLoading}
        >
          {isLoading ? "Fetching your profile..." : "Continue"}
        </Button>
      </form>
    </OnboardingLayout>
  );
};

export default LinkedInProfile;