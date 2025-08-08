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
    if (!bio.trim()) return;
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

  const bioCharacterLimit = 6000;
  const isOverLimit = bio.length > bioCharacterLimit;
  const overLimitText = isOverLimit ? bio.slice(bioCharacterLimit) : '';
  const validText = isOverLimit ? bio.slice(0, bioCharacterLimit) : bio;

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
        className="mb-6 h-10 px-4 text-base"
        aria-label="Go back to previous step"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
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
          <div className="relative">
            <Textarea
              id="bio"
              placeholder="Tell us about your coaching experience..."
              value={validText}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-[120px] text-base"
              required
              aria-describedby="bio-error bio-count"
            />
            {isOverLimit && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="min-h-[120px] p-3 text-base whitespace-pre-wrap break-words opacity-0">
                  {validText}
                </div>
                <span className="text-destructive bg-destructive/10">
                  {overLimitText}
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center text-sm">
            <div id="bio-count" className={`${bio.length > bioCharacterLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
              {bio.length.toLocaleString()}/{bioCharacterLimit.toLocaleString()} characters
            </div>
            {!bio.trim() && (
              <div id="bio-error" className="text-destructive" role="alert">
                Bio is required
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base"
          disabled={!bio.trim()}
        >
          Continue
        </Button>
      </form>
    </OnboardingLayout>
  );
};

export default ReviewDetails;