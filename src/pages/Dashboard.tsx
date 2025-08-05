import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, MessageSquare, Calendar, ExternalLink, Play } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for demo - only show for existing coaches
  const hasData = user?.email === 'coach@example.com' && user?.isOnboarded;
  
  const mockStats = hasData ? {
    activeCoachees: 8,
    pendingFeedback: 3,
    upcomingSessions: 5,
    isCalendarConnected: true
  } : {
    activeCoachees: 0,
    pendingFeedback: 0,
    upcomingSessions: 0,
    isCalendarConnected: false
  };

  const upcomingSessions = hasData ? [
    { id: 1, coachee: 'Alex Chen', time: 'Today, 2:00 PM', type: 'Career Planning' },
    { id: 2, coachee: 'Sarah Davis', time: 'Tomorrow, 10:00 AM', type: '1:1 Coaching' },
    { id: 3, coachee: 'Michael Rodriguez', time: 'Friday, 3:00 PM', type: 'Goal Setting' }
  ] : [];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {user?.name?.split(' ')[0] || 'Coach'}!</h1>
          <p className="text-muted-foreground mt-1">
            {hasData 
              ? "Here's what's happening with your coaching today."
              : "Complete your setup to start connecting with coachees."
            }
          </p>
        </div>

        {/* Calendar Connection Banner */}
        {!mockStats.isCalendarConnected && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Connect your calendar</h3>
                    <p className="text-sm text-muted-foreground">
                      Link your Calendly to start receiving session bookings from coachees.
                    </p>
                  </div>
                </div>
                <Button className="ml-4">
                  Connect Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Coachees</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeCoachees}</div>
              <p className="text-xs text-muted-foreground">
                {hasData ? "+2 from last month" : "No coachees assigned yet"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Feedback</CardTitle>
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingFeedback}</div>
              <p className="text-xs text-muted-foreground">
                {hasData ? "Due within 2 days" : "No feedback pending"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.upcomingSessions}</div>
              <p className="text-xs text-muted-foreground">
                {hasData ? "This week" : "No sessions scheduled"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your next coaching appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">{session.coachee}</p>
                        <p className="text-sm text-muted-foreground">{session.time}</p>
                        <Badge variant="secondary" className="mt-1">
                          {session.type}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming sessions</p>
                  {!hasData && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Connect your calendar to see scheduled sessions
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions / Tutorial */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                {hasData ? "Quick actions for your coaching" : "Learn how to use the coach portal"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasData ? (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    View My Coachees
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Update Calendly Link
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Review Pending Feedback
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-12 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Play className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Watch our video tutorial to learn how to connect your calendar and manage coachees effectively.
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;