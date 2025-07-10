import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, MessageSquare, Edit, BarChart3, Activity, Eye } from 'lucide-react';
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

  const [showEditModal, setShowEditModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

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

  const [participants, setParticipants] = useState([
    { id: 1, name: 'Sarah Chen', position: 'For', lastActive: '2 hours ago', status: 'Submitted', response: 'AI can significantly reduce human error...', score: 85, arguments: 3, responses: 5 },
    { id: 2, name: 'Mark Thompson', position: 'Against', lastActive: '1 hour ago', status: 'Submitted', response: 'The legal profession requires human judgment...', score: 78, arguments: 2, responses: 7 },
    { id: 3, name: 'Lisa Rodriguez', position: 'For', lastActive: '30 minutes ago', status: 'Submitted', response: 'AI can democratize access...', score: 92, arguments: 3, responses: 4 },
    { id: 4, name: 'James Wilson', position: 'Against', lastActive: '45 minutes ago', status: 'Submitted', response: 'There are significant ethical concerns...', score: null, arguments: 2, responses: 3 },
    { id: 5, name: 'Emma Davis', position: 'For', lastActive: '2 hours ago', status: 'Not Submitted', response: null, score: null, arguments: 0, responses: 0 },
    { id: 6, name: 'Robert Kim', position: 'Against', lastActive: '3 hours ago', status: 'Not Submitted', response: null, score: null, arguments: 0, responses: 0 }
  ]);

  const handleBack = () => navigate(`/courses/edit/${courseId}`);
  const handleSaveInstructions = (instructions) => setDebate(prev => ({ ...prev, instructions }));
  const handleEditDebate = () => setShowEditModal(true);
  const handleSaveDebate = (data) => {
    setDebate(prev => ({ ...prev, ...data }));
    toast({ title: '✅ Debate Updated', description: 'Debate details have been successfully updated.' });
  };

  const handlePositionChange = (participantId, position) => {
    setParticipants(prev => prev.map(p => p.id === participantId ? { ...p, position } : p));
  };

  const handleViewResponse = (participant) => {
    setSelectedParticipant(participant);
    setShowResponseModal(true);
  };

  const handleScoreResponse = (participant) => {
    setSelectedParticipant(participant);
    setShowScoreModal(true);
  };

  const handleSaveScore = (scoreData) => {
    setParticipants(prev => prev.map(p => p.id === selectedParticipant.id ? { ...p, score: scoreData.score } : p));
    toast({ title: '✅ Score Saved', description: `Score for ${selectedParticipant.name} has been successfully saved.` });
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  // Additional render and tab UI logic would be here, unchanged.

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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handleBack} className="rounded-full px-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Modules
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Debate Dashboard</h1>
                  <p className="text-gray-600">Manage and moderate debate discussions</p>
                </div>
              </div>
            </div>
            {/* Content Tabs and Body */}
          </div>
        </div>
      </div>

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