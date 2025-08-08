import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OnboardingLayout from './OnboardingLayout';
import { useAuth } from '@/contexts/AuthContext';
import { X, ArrowLeft } from 'lucide-react';

const ReviewDetails = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [languages, setLanguages] = useState<string[]>(user?.languages || ['English']);
  const [showBioError, setShowBioError] = useState(false);
  const navigate = useNavigate();

  const locationOptions = [
    'New York, NY', 'London, UK', 'San Francisco, CA', 'Toronto, Canada', 
    'Berlin, Germany', 'Paris, France', 'Tokyo, Japan', 'Sydney, Australia',
    'Dubai, UAE', 'Singapore', 'Amsterdam, Netherlands', 'Remote'
  ];

  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian',
    'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic'
  ];

  const handleAddLanguage = (language: string) => {
    if (language && !languages.includes(language)) {
      setLanguages([...languages, language]);
    }
  };

  const handleRemoveLanguage = (languageToRemove: string) => {
    setLanguages(languages.filter(lang => lang !== languageToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bio.trim()) {
      setShowBioError(true);
      return;
    }
    if (bio.length > bioCharacterLimit) {
      setShowBioError(true);
      document.getElementById('bio')?.focus();
      return;
    }
    setShowBioError(false);
    updateUser({
      name,
      location,
      bio,
      languages
    });
    navigate('/onboarding/photo');
  };

  const handleBack = () => {
    navigate('/onboarding/linkedin');
  };

  const bioCharacterLimit = 600;
  const isOverLimit = bio.length > bioCharacterLimit;
  const validText = isOverLimit ? bio.slice(0, bioCharacterLimit) : bio;
  const overLimitText = isOverLimit ? bio.slice(bioCharacterLimit) : '';

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={6}
      title="We've pulled this info from your LinkedIn."
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
          <Label htmlFor="name" className="text-base">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-base">Location</Label>
          <Select value={location} onValueChange={setLocation} required>
            <SelectTrigger className="h-12 text-base" id="location" aria-label="Select your location">
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((loc) => (
                <SelectItem key={loc} value={loc} className="text-base">
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-base">Languages</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {languages.map((language) => (
              <Badge key={language} variant="secondary" className="text-base px-3 py-1">
                {language}
                {languages.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-5 w-5 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                    onClick={() => handleRemoveLanguage(language)}
                    aria-label={`Remove ${language}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Badge>
            ))}
          </div>
          <Select onValueChange={handleAddLanguage}>
            <SelectTrigger className="h-12 text-base" aria-label="Add a language">
              <SelectValue placeholder="Add a language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions
                .filter(lang => !languages.includes(lang))
                .map((lang) => (
                  <SelectItem key={lang} value={lang} className="text-base">
                    {lang}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-base">
            Bio <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell us about your coaching experience..."
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              if (showBioError) setShowBioError(false);
            }}
            className="min-h-[120px] text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            required
            aria-describedby="bio-count bio-error"
          />
          <div className="space-y-1">
            <div id="bio-count" className="text-base text-muted-foreground">
              {bio.length}/{bioCharacterLimit} characters
            </div>
            {showBioError && !bio.trim() && (
              <div id="bio-error" className="text-destructive text-base" role="alert">
                Bio is required
              </div>
            )}
            {showBioError && bio.trim() && bio.length > bioCharacterLimit && (
              <div id="bio-error" className="text-destructive text-base" role="alert">
                Please reduce your bio to 600 characters or fewer.
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base min-h-[40px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          disabled={false}
        >
          Continue
        </Button>
      </form>
    </OnboardingLayout>
  );
};

export default ReviewDetails;