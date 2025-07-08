
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, MessageSquare, Edit, TrendingUp, Target, BarChart3, PieChart, Activity, Eye } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { InstructionBlock } from '@/components/courses/assessments/InstructionBlock';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { DebateEditModal } from '@/components/courses/assessments/DebateEditModal';
import { DebateResponseModal } from '@/components/courses/assessments/DebateResponseModal';
import { DebateScoreModal } from '@/components/courses/assessments/DebateScoreModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DebateDashboard = () => {
  const { id: courseId, debateId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);
  
  // Mock debate data - with state management
  const [debate, setDebate] = useState({
    id: debateId,
    title: 'Debate: The Role of AI in Legal Practice',
    description: 'Engage in a structured debate about the benefits and risks of artificial intelligence implementation in legal practice.',
    topic: 'Should artificial intelligence be widely adopted in legal practice to assist lawyers and judges?',
    timeLimit: 60,
    participantLimit: 20,
    status: 'Active',
    totalParticipants: 12,
    activeDebaters: 8,
    instructions: 'Welcome to the debate forum! Please maintain respectful discourse and support your arguments with evidence. You may take either the "Pro AI" or "Against AI" position. Each participant can make up to 3 main arguments and respond to others\' points. Use proper citations for any external sources.'
  });

  // Mock participants data with positions and responses
  const [participants, setParticipants] = useState([
    { 
      id: 1, 
      name: 'Sarah Chen', 
      position: 'For', 
      lastActive: '2 hours ago',
      status: 'Submitted',
      response: 'AI can significantly reduce human error in legal research and case analysis. Studies show that AI-powered legal research tools can identify relevant precedents 40% faster than traditional methods. The integration of AI in legal practice would enhance accuracy and efficiency.',
      score: 85,
      arguments: 3,
      responses: 5
    },
    { 
      id: 2, 
      name: 'Mark Thompson', 
      position: 'Against', 
      lastActive: '1 hour ago',
      status: 'Submitted',
      response: 'The legal profession requires human judgment and empathy that AI cannot replicate. Critical decisions about justice and human rights should not be delegated to algorithms. AI lacks the contextual understanding necessary for complex legal scenarios.',
      score: 78,
      arguments: 2,
      responses: 7
    },
    { 
      id: 3, 
      name: 'Lisa Rodriguez', 
      position: 'For', 
      lastActive: '30 minutes ago',
      status: 'Submitted',
      response: 'AI can democratize access to legal services by reducing costs and making legal assistance more affordable for ordinary citizens. This technological advancement could bridge the justice gap.',
      score: 92,
      arguments: 3,
      responses: 4
    },
    { 
      id: 4, 
      name: 'James Wilson', 
      position: 'Against', 
      lastActive: '45 minutes ago',
      status: 'Submitted',
      response: 'There are significant ethical concerns about bias in AI algorithms that could perpetuate discrimination in legal decisions. The legal system must maintain human oversight to ensure fairness and justice.',
      score: null,
      arguments: 2,
      responses: 3
    },
    { 
      id: 5, 
      name: 'Emma Davis', 
      position: 'For', 
      lastActive: '2 hours ago',
      status: 'Not Submitted',
      response: null,
      score: null,
      arguments: 0,
      responses: 0
    },
    { 
      id: 6, 
      name: 'Robert Kim', 
      position: 'Against', 
      lastActive: '3 hours ago',
      status: 'Not Submitted',
      response: null,
      score: null,
      arguments: 0,
      responses: 0
    }
  ]);

  const handleBack = () => {
    navigate(`/courses/edit/${courseId}`);
  };

  const handleSaveInstructions = (instructions: string) => {
    setDebate(prev => ({
      ...prev,
      instructions
    }));
  };

  const handleEditDebate = () => {
    setShowEditModal(true);
  };

  const handleSaveDebate = (data: any) => {
    setDebate(prev => ({ ...prev, ...data }));
    toast({
      title: "✅ Debate Updated",
      description: "Debate details have been successfully updated.",
    });
  };

  const handlePositionChange = (participantId: number, position: string) => {
    setParticipants(prev => 
      prev.map(p => p.id === participantId ? { ...p, position } : p)
    );
  };

  const handleViewResponse = (participant: any) => {
    setSelectedParticipant(participant);
    setShowResponseModal(true);
  };

  const handleScoreResponse = (participant: any) => {
    setSelectedParticipant(participant);
    setShowScoreModal(true);
  };

  const handleSaveScore = (scoreData: any) => {
    setParticipants(prev => 
      prev.map(p => p.id === selectedParticipant.id ? { ...p, score: scoreData.score } : p)
    );
    toast({
      title: "✅ Score Saved",
      description: `Score for ${selectedParticipant.name} has been successfully saved.`,
    });
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'team', label: 'Team' },
    { id: 'scores', label: 'Scores' },
    { id: 'submission-status', label: 'Submission Status' },
    { id: 'analysis', label: 'Analysis' }
  ];

  // Calculate metrics
  const submittedCount = participants.filter(p => p.status === 'Submitted').length;
  const gradedCount = participants.filter(p => p.score !== null).length;
  const forCount = participants.filter(p => p.position === 'For').length;
  const againstCount = participants.filter(p => p.position === 'Against').length;
  const scores = participants.filter(p => p.score !== null).map(p => p.score);
  const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;

  // Chart data
  const scoreDistributionData = [
    { range: '90-100', count: scores.filter(s => s >= 90).length },
    { range: '80-89', count: scores.filter(s => s >= 80 && s < 90).length },
    { range: '70-79', count: scores.filter(s => s >= 70 && s < 80).length },
    { range: '60-69', count: scores.filter(s => s >= 60 && s < 70).length },
    { range: 'Below 60', count: scores.filter(s => s < 60).length }
  ];

  const teamParticipationData = [
    { name: 'For the Topic', value: forCount, color: '#10B981' },
    { name: 'Against the Topic', value: againstCount, color: '#EF4444' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'team':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Team Management</h2>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{participants.length}</div>
                    <div className="text-sm text-gray-600">Total Participants</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{forCount}</div>
                    <div className="text-sm text-gray-600">For the Topic</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{againstCount}</div>
                    <div className="text-sm text-gray-600">Against the Topic</div>
                  </CardContent>
                </Card>
              </div>

              {/* Participant List */}
              <Card>
                <CardHeader>
                  <CardTitle>Participant List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {participant.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{participant.name}</h4>
                            <p className="text-sm text-gray-600">Last active: {participant.lastActive}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Select
                            value={participant.position}
                            onValueChange={(value) => handlePositionChange(participant.id, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="For">For the Topic</SelectItem>
                              <SelectItem value="Against">Against the Topic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'scores':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">User Responses & Scoring</h2>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {participants.filter(p => p.status === 'Submitted').map((participant) => (
                      <div key={participant.id} className="border-l-4 border-blue-400 bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 text-sm">
                                {participant.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{participant.name}</h4>
                              <Badge variant={participant.position === 'For' ? 'default' : 'secondary'} className="text-xs">
                                {participant.position} the Topic
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {participant.score && (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Score: {participant.score}
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewResponse(participant)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleScoreResponse(participant)}
                            >
                              Score Response
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">
                          {participant.response ? 
                            `${participant.response.substring(0, 150)}...` : 
                            'No response submitted'
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'submission-status':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submission Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{participant.name}</h4>
                          <p className="text-sm text-gray-600">Last active: {participant.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={participant.status === 'Submitted' ? 'default' : 'destructive'}>
                          {participant.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'analysis':
        return (
          <div className="space-y-6">
            {/* Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{highestScore}</div>
                    <div className="text-sm text-gray-600">Highest Score</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">{lowestScore}</div>
                    <div className="text-sm text-gray-600">Lowest Score</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{Math.round(averageScore)}</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completion Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Completion Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{participants.length}</div>
                    <div className="text-sm text-gray-600">Total Participants</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{submittedCount}</div>
                    <div className="text-sm text-gray-600">Submissions Received</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600">{gradedCount}</div>
                    <div className="text-sm text-gray-600">Submissions Graded</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-600">{forCount} For / {againstCount} Against</div>
                    <div className="text-sm text-gray-600">Topic Position</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scoreDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={teamParticipationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {teamParticipationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Participation Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Participation Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Submission Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Submitted</span>
                        <span className="text-green-700 font-bold">{submittedCount} participants</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="font-medium">Not Submitted</span>
                        <span className="text-red-700 font-bold">{participants.length - submittedCount} participants</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Grading Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Graded</span>
                        <span className="text-blue-700 font-bold">{gradedCount} submissions</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="font-medium">Pending</span>
                        <span className="text-yellow-700 font-bold">{submittedCount - gradedCount} submissions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <>
            {/* Instructions Block */}
            <InstructionBlock
              title="Debate"
              instructions={debate.instructions}
              onSave={handleSaveInstructions}
            />

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Debate Overview</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleEditDebate}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{debate.title}</h4>
                  <p className="text-gray-600 mb-3">{debate.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 italic">
                      <strong>Debate Topic:</strong> {debate.topic}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {debate.totalParticipants}
                    </div>
                    <div className="text-sm text-gray-600">Total Participants</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {debate.activeDebaters}
                    </div>
                    <div className="text-sm text-gray-600">Active Debaters</div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      {debate.timeLimit}
                    </div>
                    <div className="text-sm text-gray-600">Time Limit (minutes)</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {debate.participantLimit}
                    </div>
                    <div className="text-sm text-gray-600">Max Participants</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex pt-16">
        <div className="fixed left-0 top-0 bottom-0 w-64 z-40">
          <div className="h-full overflow-hidden">
            <SidebarNav onCloseMobile={() => {}} />
          </div>
        </div>
        
        <div className="flex-1 ml-64">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBack}
                  className="rounded-full px-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Modules
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Debate Dashboard</h1>
                  <p className="text-gray-600">Manage and moderate debate discussions</p>
                </div>
              </div>
            </div>

            {/* Debate Info Card */}
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-purple-900">{debate.title}</CardTitle>
                      <Badge className="bg-purple-100 text-purple-800">Debate</Badge>
                    </div>
                    <p className="text-purple-700 mb-4">{debate.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-purple-600">
                        <Users className="h-4 w-4" />
                        <span>{debate.totalParticipants} participants</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-600">
                        <Clock className="h-4 w-4" />
                        <span>{debate.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>{debate.activeDebaters} active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={cn(
                      "py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
                      activeTab === tab.id
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="space-y-4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && (
        <DebateEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          debateData={debate}
          onSave={handleSaveDebate}
        />
      )}

      {showResponseModal && selectedParticipant && (
        <DebateResponseModal
          isOpen={showResponseModal}
          onClose={() => {
            setShowResponseModal(false);
            setSelectedParticipant(null);
          }}
          participant={selectedParticipant}
        />
      )}

      {showScoreModal && selectedParticipant && (
        <DebateScoreModal
          isOpen={showScoreModal}
          onClose={() => {
            setShowScoreModal(false);
            setSelectedParticipant(null);
          }}
          participant={selectedParticipant}
          onSave={handleSaveScore}
        />
      )}
    </div>
  );
};

export default DebateDashboard;
