import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OnboardingLayout from './OnboardingLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'newcoach@example.com';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { startInvitationFlow } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      // Start invitation flow with the email
      startInvitationFlow(email);
      navigate('/onboarding/linkedin');
    }
  };

  const isValid = password.length >= 8 && password === confirmPassword;

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={6}
      title="Create your password"
      subtitle="Choose a secure password for your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            disabled
            className="h-12 text-base bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-base">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password (min. 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 text-base pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-12 w-12"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-base">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-12 text-base pr-12"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-12 w-12"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {password && confirmPassword && password !== confirmPassword && (
          <p className="text-sm text-destructive">Passwords do not match</p>
        )}

        <Button 
          type="submit" 
          className="w-full h-12 text-base"
          disabled={!isValid}
        >
          Continue
        </Button>
      </form>
    </OnboardingLayout>
  );
};

export default SetPassword;