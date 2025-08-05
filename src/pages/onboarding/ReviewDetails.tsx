import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import OnboardingLayout from './OnboardingLayout';
import { useAuth } from '@/contexts/AuthContext';
import { X, Plus } from 'lucide-react';

const ReviewDetails = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [languages, setLanguages] = useState<string[]>(user?.languages || ['English']);
  const [newLanguage, setNewLanguage] = useState('');
  const navigate = useNavigate();

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (languageToRemove: string) => {
    setLanguages(languages.filter(lang => lang !== languageToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      title,
      location,
      bio,
      languages
    });
    navigate('/onboarding/photo');
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={6}
      title="We've pulled this info from your LinkedIn."
      subtitle="Feel free to make any changes."
    >
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
          <Label htmlFor="title" className="text-base">Professional title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-base">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-base">Languages</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {languages.map((language) => (
              <Badge key={language} variant="secondary" className="text-sm">
                {language}
                {languages.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => handleRemoveLanguage(language)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add language"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
              className="h-10 text-base"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddLanguage}
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-base">Bio (optional)</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about your coaching experience..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-[100px] text-base"
          />
        </div>

        <Button type="submit" className="w-full h-12 text-base">
          Continue
        </Button>
      </form>
    </OnboardingLayout>
  );
};

export default ReviewDetails;