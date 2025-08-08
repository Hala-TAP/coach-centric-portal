import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import OnboardingLayout from './OnboardingLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, User, ArrowLeft } from 'lucide-react';

const UploadPhoto = () => {
  const { user, updateUser } = useAuth();
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.profilePhoto || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      profilePhoto: photoPreview || ''
    });
    navigate('/onboarding/availability');
  };

  const handleBack = () => {
    navigate('/onboarding/review');
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={6}
      title="Your photo will help coachees get to know you."
      subtitle="Upload a professional headshot"
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
        <div className="flex flex-col items-center space-y-4">
          {/* Photo Preview */}
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted">
            {photoPreview ? (
              <img 
                src={photoPreview} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-muted-foreground" />
            )}
          </div>

          {/* Upload Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="h-12 text-base"
          >
            <Upload className="w-4 h-4 mr-2" />
            {photoPreview ? 'Change photo' : 'Upload photo'}
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <p className="text-sm text-muted-foreground text-center">
            Recommended: Square image, at least 300x300 pixels
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base"
        >
          Continue
        </Button>
      </form>
    </OnboardingLayout>
  );
};

export default UploadPhoto;