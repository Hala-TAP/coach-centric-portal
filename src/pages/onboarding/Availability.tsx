import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OnboardingLayout from './OnboardingLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, ExternalLink } from 'lucide-react';

const Availability = () => {
  const { user, updateUser } = useAuth();
  const [preferredCoachees, setPreferredCoachees] = useState(user?.preferredCoachees || 30);
  const [calendlyUrl, setCalendlyUrl] = useState(user?.calendlyUrl || '');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      preferredCoachees,
      calendlyUrl
    });
    navigate('/onboarding/complete');
  };

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={6}
      title="Help your coachees get to know you."
      subtitle="How many coachees can you support per month?"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="coachees" className="text-base">How many coachees can you support per month?</Label>
          <Input
            id="coachees"
            type="number"
            min="1"
            max="100"
            value={preferredCoachees}
            onChange={(e) => setPreferredCoachees(parseInt(e.target.value) || 30)}
            required
            className="h-12 text-base"
          />
          <p className="text-sm text-muted-foreground">
            Each coachee requires 30 mins of 1:1 coaching and 1 hour prep.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calendly" className="text-base">Your Calendly link</Label>
          <Input
            id="calendly"
            type="url"
            placeholder="https://calendly.com/your-name"
            value={calendlyUrl}
            onChange={(e) => setCalendlyUrl(e.target.value)}
            required
            className="h-12 text-base"
          />
          <p className="text-sm text-muted-foreground">
            This helps coachees book sessions with you directly.
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="w-4 h-4 text-primary" />
            Reminder
          </div>
          <p className="text-sm text-muted-foreground">
            Keep your availability updated in Google Calendar via Calendly to ensure coachees can book appropriate times.
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            <ExternalLink className="w-3 h-3 mr-1" />
            Open Calendly
          </Button>
        </div>

        <Button type="submit" className="w-full h-12 text-base">
          Continue
        </Button>
      </form>
    </OnboardingLayout>
  );
};

export default Availability;