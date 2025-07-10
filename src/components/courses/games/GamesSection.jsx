import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Settings, Users, Trophy, Clock, MoreHorizontal, Edit, Trash2, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const GamesSection = () => {
  const [games, setGames] = useState([
    {
      id: '1',
      title: 'Legal Terms Quiz Challenge',
      description: 'Test your knowledge of legal terminology and concepts in this interactive quiz game.',
      type: 'quiz',
      difficulty: 'Medium',
      players: 15,
      duration: '20 minutes',
      status: 'Active',
      createdBy: 'John Smith',
      createdAt: '2 days ago',
      participants: 12,
      maxScore: 100
    },
    {
      id: '2',
      title: 'Case Study Puzzle',
      description: 'Solve complex legal scenarios by piecing together evidence and legal principles.',
      type: 'puzzle',
      difficulty: 'Hard',
      players: 8,
      duration: '45 minutes',
      status: 'Draft',
      createdBy: 'Sarah Johnson',
      createdAt: '1 week ago',
      participants: 0,
      maxScore: 150
    },
    {
      id: '3',
      title: 'Court Simulation',
      description: 'Experience a virtual courtroom environment and practice legal procedures.',
      type: 'simulation',
      difficulty: 'Hard',
      players: 20,
      duration: '60 minutes',
      status: 'Active',
      createdBy: 'Mike Davis',
      createdAt: '3 days ago',
      participants: 18,
      maxScore: 200
    }
  ]);

  const [showInstructions, setShowInstructions] = useState(false);

  const getGameTypeIcon = (type) => {
    switch (type) {
      case 'quiz': return <Trophy className="h-4 w-4" />;
      case 'puzzle': return <Settings className="h-4 w-4" />;
      case 'simulation': return <Play className="h-4 w-4" />;
      case 'trivia': return <Users className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteGame = (gameId) => {
    setGames(games.filter(game => game.id !== gameId));
  };

  return (
    <div className="bg-white min-h-full">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Games</h1>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="default"
              onClick={() => setShowInstructions(!showInstructions)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Instructions
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Game
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Instructions Panel */}
        {showInstructions && (
          <Card className="border border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Game Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800">
              <div className="space-y-3">
                <p><strong>Creating Games:</strong> Click "Add Game" to create interactive learning experiences for your students.</p>
                <p><strong>Game Types:</strong> Choose from quizzes, puzzles, simulations, or trivia games to match your learning objectives.</p>
                <p><strong>Difficulty Levels:</strong> Set appropriate difficulty levels (Easy, Medium, Hard) based on your students' knowledge.</p>
                <p><strong>Participation:</strong> Monitor student engagement and track their progress through game analytics.</p>
                <p><strong>Management:</strong> Use the dropdown menu on each game to edit, share, or delete games as needed.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Games List */}
        <div className="space-y-4">
          {games.length === 0 ? (
            <div className="text-center py-12">
              <Play className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No games yet</h3>
              <p className="text-gray-600 mb-4">
                Create engaging games to make learning interactive and fun for your students.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Game
              </Button>
            </div>
          ) : (
            games.map((game) => (
              <Card key={game.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {getGameTypeIcon(game.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{game.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{game.description}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Game
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share Game
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteGame(game.id)} 
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <Badge className={getStatusColor(game.status)}>
                          {game.status}
                        </Badge>
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          {game.participants}/{game.players} players
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {game.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Trophy className="h-4 w-4 mr-1" />
                          Max Score: {game.maxScore}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {game.createdBy.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">
                            Created by {game.createdBy} • {game.createdAt}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Play className="h-4 w-4 mr-1" />
                            Launch Game
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};