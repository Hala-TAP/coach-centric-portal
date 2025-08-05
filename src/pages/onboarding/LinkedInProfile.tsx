import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OnboardingLayout from './OnboardingLayout';
import { useAuth } from '@/contexts/AuthContext';

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
        linkedinUrl: linkedinUrl
      };

      updateUser(mockLinkedInData);
      setIsLoading(false);
      navigate('/onboarding/review');
    }, 1500);
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={6}
      title="Share your LinkedIn profile to help us create your profile with the right information."
      subtitle="Feel free to make any changes."
    >
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
          className="w-full h-12 text-base"
          disabled={!linkedinUrl || isLoading}
        >
          {isLoading ? "Fetching your profile..." : "Continue"}
        </Button>
      </form>
    </OnboardingLayout>
  );
};

export default LinkedInProfile;