import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, BookOpen, FolderOpen, Search, FileText, BarChart2, Settings, ShieldCheck, Zap, Trophy, ClipboardList } from 'lucide-react';

// Mock data for admin dashboard entities
const mockCourses = [
  { id: 1, title: 'Web Development Bootcamp', description: 'Learn HTML, CSS, JS, and React.' },
  { id: 2, title: 'Data Science 101', description: 'Intro to data analysis and machine learning.' },
  { id: 3, title: 'Mobile App Development', description: 'Build iOS and Android apps.' },
];
const mockCatalogs = [
  { id: 1, name: 'Web Development', description: 'Frontend and backend web development courses' },
  { id: 2, name: 'Data Science', description: 'Data analysis, machine learning, and AI courses' },
  { id: 3, name: 'Mobile Development', description: 'iOS and Android app development' },
];
const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
];
const mockSurveys = [
  { id: 1, title: 'Customer Service Excellence Survey', description: 'Assessment of customer service skills', assignedTo: 'Customer Service Team' },
  { id: 2, title: 'IT Security Awareness Survey', description: 'Understanding of cybersecurity best practices', assignedTo: 'All Employees' },
];
const mockGames = [
  { id: 1, name: 'Site-wide game', description: '14 Players' },
];
const mockPlans = [
  { id: 1, name: 'Pro Plan', description: 'Full access to all features' },
  { id: 2, name: 'Basic Plan', description: 'Limited access for small teams' },
];
const mockPolicies = [
  { id: 1, name: 'General Policy', description: 'System-wide general policy' },
  { id: 2, name: 'Admin Policy', description: 'Policy for administrators' },
];
const mockAccounts = [
  { id: 1, name: 'Edtech Support', type: 'Administrator' },
  { id: 2, name: 'Farah Javed', type: 'Administrator' },
];
const mockGradingScales = [
  { id: 1, name: 'Standard regular grading scale', description: 'A+, A, B, C, D, F' },
  { id: 2, name: 'Pass/Fail grading scale', description: 'P, F' },
];
const mockCopilotTasks = [
  { id: 1, title: 'AI Task: Generate Quiz', description: 'Copilot generated a quiz for Data Science 101' },
];
const mockAutomationActions = [
  { id: 1, title: 'Enroll in course Lesson 1', description: 'Automatically enroll user in this course' },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const highlight = (text, term) => {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
  );
};

const SearchResults = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const initialTerm = query.get('q')?.trim() || '';
  const [searchTerm, setSearchTerm] = useState(initialTerm);

  // Keep URL in sync with search term
  useEffect(() => {
    if (searchTerm !== initialTerm) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`, { replace: true });
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  // Filter all admin dashboard entities
  const courseResults = mockCourses.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const catalogResults = mockCatalogs.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const userResults = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const surveyResults = mockSurveys.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const gameResults = mockGames.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const planResults = mockPlans.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const policyResults = mockPolicies.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const accountResults = mockAccounts.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const gradingScaleResults = mockGradingScales.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const copilotTaskResults = mockCopilotTasks.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const automationActionResults = mockAutomationActions.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          className="w-full max-w-xl"
          placeholder="Search for anything..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>
      <h1 className="text-2xl font-bold mb-6">Search Results for "{searchTerm}"</h1>
      <div className="space-y-8">
        <Section title="Courses" icon={<BookOpen className="h-5 w-5" />} results={courseResults} render={course => (
          <Card key={course.id}><CardHeader><CardTitle>{highlight(course.title, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(course.description, searchTerm)}</p></CardContent></Card>
        )} />
        <Section title="Catalogs" icon={<FolderOpen className="h-5 w-5" />} results={catalogResults} render={catalog => (
          <Card key={catalog.id}><CardHeader><CardTitle>{highlight(catalog.name, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(catalog.description, searchTerm)}</p></CardContent></Card>
        )} />
        <Section title="Users" icon={<User className="h-5 w-5" />} results={userResults} render={user => (
          <Card key={user.id}><CardHeader><CardTitle>{highlight(user.name, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(user.email, searchTerm)}</p></CardContent></Card>
        )} />
        <Section title="Surveys" icon={<FileText className="h-5 w-5" />} results={surveyResults} render={survey => (
          <Card key={survey.id}><CardHeader><CardTitle>{highlight(survey.title, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(survey.description, searchTerm)}<br /><span className="text-xs text-muted-foreground">Assigned to: {highlight(survey.assignedTo, searchTerm)}</span></p></CardContent></Card>
        )} />
        <Section title="Games" icon={<Trophy className="h-5 w-5" />} results={gameResults} render={game => (
          <Card key={game.id}><CardHeader><CardTitle>{highlight(game.name, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(game.description, searchTerm)}</p></CardContent></Card>
        )} />
        <Section title="Plans" icon={<ClipboardList className="h-5 w-5" />} results={planResults} render={plan => (
          <Card key={plan.id}><CardHeader><CardTitle>{highlight(plan.name, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(plan.description, searchTerm)}</p></CardContent></Card>
        )} />
        <Section title="Policies" icon={<ShieldCheck className="h-5 w-5" />} results={policyResults} render={policy => (
          <Card key={policy.id}><CardHeader><CardTitle>{highlight(policy.name, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(policy.description, searchTerm)}</p></CardContent></Card>
        )} />
        <Section title="Accounts" icon={<Settings className="h-5 w-5" />} results={accountResults} render={account => (
          <Card key={account.id}><CardHeader><CardTitle>{highlight(account.name, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(account.type, searchTerm)}</p></CardContent></Card>
        )} />
        <Section title="Grading Scales" icon={<BarChart2 className="h-5 w-5" />} results={gradingScaleResults} render={scale => (
          <Card key={scale.id}><CardHeader><CardTitle>{highlight(scale.name, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(scale.description, searchTerm)}</p></CardContent></Card>
        )} />
        <Section title="Copilot Tasks" icon={<Zap className="h-5 w-5" />} results={copilotTaskResults} render={task => (
          <Card key={task.id}><CardHeader><CardTitle>{highlight(task.title, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(task.description, searchTerm)}</p></CardContent></Card>
        )} />
        <Section title="Automation Actions" icon={<Zap className="h-5 w-5" />} results={automationActionResults} render={action => (
          <Card key={action.id}><CardHeader><CardTitle>{highlight(action.title, searchTerm)}</CardTitle></CardHeader><CardContent><p>{highlight(action.description, searchTerm)}</p></CardContent></Card>
        )} />
      </div>
    </div>
  );
};

function Section({ title, icon, results, render }) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">{icon} {title}</h2>
      {results.length === 0 ? <p className="text-muted-foreground">No {title.toLowerCase()} found.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(render)}
        </div>
      )}
    </div>
  );
}

export default SearchResults; 