import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OnboardingLayout from './OnboardingLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ExternalLink, ArrowLeft } from 'lucide-react';

const Availability = () => {
  const { user, updateUser } = useAuth();
  const [calendlyUrl, setCalendlyUrl] = useState(user?.calendlyUrl || '');
  const [preferredCoachees, setPreferredCoachees] = useState(user?.preferredCoachees || 10);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      calendlyUrl,
      preferredCoachees
    });
    navigate('/onboarding/complete');
  };

  const handleBack = () => {
    navigate('/onboarding/photo');
  };

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={6}
      title="Set your availability and capacity."
      subtitle="Help us understand your coaching schedule"
    >
      <Button
        type="button"
        variant="ghost"
        onClick={handleBack}
        className="mb-6 h-10 px-4 text-base"
        aria-label="Go back to previous step"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="calendlyUrl" className="text-base">Your Calendly link</Label>
            {calendlyUrl && (
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
                aria-label="Open Calendly link in new tab"
              >
                <ExternalLink className="w-3 h-3" />
                Open link
              </a>
            )}
          </div>
          <Input
            id="calendlyUrl"
            type="url"
            placeholder="https://calendly.com/your-username"
            value={calendlyUrl}
            onChange={(e) => setCalendlyUrl(e.target.value)}
            required
            className="h-12 text-base"
            aria-describedby="calendly-help"
          />
          <p id="calendly-help" className="text-sm text-muted-foreground">
            We'll use this to sync your availability and schedule sessions.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredCoachees" className="text-base">
            How many coachees can you support per month?
          </Label>
          <Input
            id="preferredCoachees"
            type="number"
            min="1"
            max="30"
            value={preferredCoachees}
            onChange={(e) => setPreferredCoachees(Math.min(30, parseInt(e.target.value) || 0))}
            required
            className="h-12 text-base"
            aria-describedby="coachees-help"
          />
          <p id="coachees-help" className="text-sm text-muted-foreground">
            This helps us match you with the right number of coachees. Maximum 30 per month.
          </p>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg" role="note">
          <p className="text-base text-muted-foreground">
            <strong>Important:</strong> Ensure your availability is always updated via Calendly/Google Calendar.
          </p>
        </div>

        <Button type="submit" className="w-full h-12 text-base">
          Continue
        </Button>
      </form>
    </OnboardingLayout>
  );
};

export default Availability;