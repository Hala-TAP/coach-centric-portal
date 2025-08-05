import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}

const steps = [
  'Set password',
  'LinkedIn profile', 
  'Review details',
  'Upload photo',
  'Availability',
  'Complete'
];

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children, 
  currentStep, 
  totalSteps,
  title,
  subtitle 
}) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg font-semibold">Coach onboarding</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-base text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;