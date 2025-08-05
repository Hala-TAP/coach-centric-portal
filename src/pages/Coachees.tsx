import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, 
  ExternalLink, 
  MessageSquare, 
  FileText, 
  Plus, 
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';

const Coachees = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoachee, setSelectedCoachee] = useState<any>(null);
  const [newNote, setNewNote] = useState('');
  const [calendarConnected, setCalendarConnected] = useState(false);

  // Determine state: invitation flow vs sign-in flow  
  const isInvitationFlow = user?.isInvitationFlow;
  const hasData = user?.email === 'coach@example.com' && user?.isOnboarded && !isInvitationFlow;

  const mockCoachees = hasData ? [
    {
      id: 1,
      name: 'Alex Chen',
      photo: '',
      linkedinUrl: 'https://linkedin.com/in/alex-chen',
      field: 'Data Analyst',
      sessionsLeft: 2,
      totalSessions: 4,
      coachingGroup: 'Tech Transition Program',
      feedbackStatus: 'pending', // pending, submitted, none
      lastSession: '2024-01-15',
      nextSession: '2024-01-22',
      notes: [
        { id: 1, date: '2024-01-15', content: 'Great progress on SQL skills. Needs to work on presentation confidence.' },
        { id: 2, date: '2024-01-08', content: 'Discussed career goals and created 3-month roadmap.' }
      ],
      resources: [
        { id: 1, type: 'CV', name: 'Alex_Chen_Resume_2024.pdf', url: '#' },
        { id: 2, type: 'Portfolio', name: 'Data Analysis Portfolio', url: 'https://github.com/alex-chen' }
      ]
    },
    {
      id: 2,
      name: 'Sarah Davis',
      photo: '',
      linkedinUrl: 'https://linkedin.com/in/sarah-davis',
      field: 'Product Manager',
      sessionsLeft: 1,
      totalSessions: 3,
      coachingGroup: 'Leadership Development',
      feedbackStatus: 'none',
      lastSession: '2024-01-10',
      nextSession: '2024-01-24',
      notes: [
        { id: 1, date: '2024-01-10', content: 'Working on stakeholder management. Very engaged and motivated.' }
      ],
      resources: [
        { id: 1, type: 'CV', name: 'Sarah_Davis_PM_Resume.pdf', url: '#' }
      ]
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      photo: '',
      linkedinUrl: 'https://linkedin.com/in/michael-rodriguez',
      field: 'UX Designer',
      sessionsLeft: 3,
      totalSessions: 4,
      coachingGroup: 'Design Career Track',
      feedbackStatus: 'submitted',
      lastSession: '2024-01-12',
      nextSession: '2024-01-26',
      notes: [],
      resources: [
        { id: 1, type: 'Portfolio', name: 'UX Design Portfolio', url: 'https://micheal-rodriguez.design' }
      ]
    }
  ] : [];

  const pastCoachees = hasData ? [
    {
      id: 4,
      name: 'Emily Johnson',
      photo: '',
      field: 'Software Engineer',
      completedSessions: 4,
      coachingGroup: 'Tech Bootcamp',
      completedDate: '2023-12-15'
    }
  ] : [];

  const filteredCoachees = mockCoachees.filter(coachee =>
    coachee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coachee.field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFeedbackIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'submitted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getFeedbackText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Feedback Due';
      case 'submitted':
        return 'Feedback Complete';
      default:
        return 'No Feedback Required';
    }
  };

  const handleConnectCalendar = () => {
    setCalendarConnected(true);
    // In a real app, this would integrate with Calendly API
  };

  if (!hasData) {
    return (
      <Layout>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">My Coachees</h1>
            <p className="text-muted-foreground mt-1">Manage your coaching relationships</p>
          </div>

          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">You currently have no assigned coachees</h3>
              <p className="text-muted-foreground mb-6">
                {calendarConnected 
                  ? "Your calendar is connected! You'll start receiving coachee assignments soon."
                  : "Connect your calendar to start receiving coachee assignments and session bookings."
                }
              </p>
              {!calendarConnected ? (
                <Button onClick={handleConnectCalendar}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Connect Calendar
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Calendar Connected</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">My Coachees</h1>
            <p className="text-muted-foreground mt-1">
              {mockCoachees.length} active coachees
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search coachees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Coachees ({mockCoachees.length})</TabsTrigger>
            <TabsTrigger value="past">Past Coachees ({pastCoachees.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {filteredCoachees.map((coachee) => (
              <Card key={coachee.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Basic Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={coachee.photo} />
                          <AvatarFallback>
                            {coachee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{coachee.name}</h3>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={coachee.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </Button>
                          </div>
                          <Badge variant="secondary" className="mb-2">
                            {coachee.field}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            {coachee.sessionsLeft} of {coachee.totalSessions} sessions left
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {coachee.coachingGroup}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sessions & Feedback */}
                    <div className="lg:col-span-3">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {getFeedbackIcon(coachee.feedbackStatus)}
                          <span className="text-sm">{getFeedbackText(coachee.feedbackStatus)}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Last: {coachee.lastSession}</p>
                          <p className="text-xs text-muted-foreground">Next: {coachee.nextSession}</p>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="lg:col-span-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Private Notes</span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Plus className="w-3 h-3 mr-1" />
                                Add
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Note for {coachee.name}</DialogTitle>
                                <DialogDescription>
                                  Private notes only visible to you
                                </DialogDescription>
                              </DialogHeader>
                              <Textarea
                                placeholder="Enter your note..."
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                              />
                              <Button>Save Note</Button>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {coachee.notes.length} notes
                        </div>
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="lg:col-span-2">
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Resources</span>
                        <div className="space-y-1">
                          {coachee.resources.map((resource) => (
                            <Button
                              key={resource.id}
                              variant="ghost"
                              size="sm"
                              className="h-auto p-1 justify-start"
                              asChild
                            >
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                <FileText className="w-3 h-3 mr-1" />
                                <span className="text-xs">{resource.type}</span>
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastCoachees.map((coachee) => (
              <Card key={coachee.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={coachee.photo} />
                        <AvatarFallback>
                          {coachee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{coachee.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{coachee.field}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {coachee.completedSessions} sessions completed
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Completed: {coachee.completedDate}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Coachees;