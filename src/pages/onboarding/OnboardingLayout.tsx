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

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;
                
                return (
                  <div key={stepNumber} className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    ) : (
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isCurrent 
                          ? 'bg-primary border-primary text-primary-foreground text-sm font-medium' 
                          : 'border-muted-foreground/30 text-muted-foreground text-sm'
                      }`}>
                        {stepNumber}
                      </div>
                    )}
                    <span className={`text-base ${
                      isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                {subtitle && (
                  <p className="text-base text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;