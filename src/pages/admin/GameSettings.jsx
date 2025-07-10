import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Trophy, CheckSquare, Star, ArrowLeft, Minus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FloatingLMSBackButton } from '@/components/shared/FloatingLMSBackButton';

const GameSettings = () => {
  const [games, setGames] = useState([
    {
      id: 1,
      name: "Site-wide game",
      description: "14 Players",
      levels: [
        { id: 1, name: "Starter", points: 200 },
        { id: 2, name: "Runner", points: 300 },
        { id: 3, name: "Champion", points: 500 }
      ],
      favorites: 0,
      stars: 0,
      image: "/lovable-uploads/99489061-8ed9-41d2-84f2-9f76fec2a9a0.png",
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGame, setNewGame] = useState({
    name: "",
    description: "",
    levels: 1,
  });

  const [selectedGame, setSelectedGame] = useState(null);
  const [newLevel, setNewLevel] = useState({ name: "", points: 100 });
  const [isAddLevelDialogOpen, setIsAddLevelDialogOpen] = useState(false);

  const gameDetail = selectedGame !== null ? games.find(g => g.id === selectedGame) : null;

  const handleDelete = (id) => {
    setGames(games.filter(game => game.id !== id));
    toast({
      title: "Game deleted",
      description: "The game has been deleted successfully"
    });
  };

  const handleAdd = () => setIsAddDialogOpen(true);

  const handleAddSubmit = () => {
    const id = Math.max(0, ...games.map(g => g.id)) + 1;
    setGames([...games, {
      id,
      name: newGame.name,
      description: newGame.description,
      levels: [],
      favorites: 0,
      stars: 0,
      image: "/lovable-uploads/99489061-8ed9-41d2-84f2-9f76fec2a9a0.png",
    }]);
    setNewGame({ name: "", description: "", levels: 1 });
    setIsAddDialogOpen(false);
    toast({
      title: "Game added",
      description: "New game has been created successfully"
    });
  };

  const handleSelectAll = () => {
    toast({
      title: "All games selected",
      description: "You can now perform bulk actions"
    });
  };

  const handleViewGame = (id) => setSelectedGame(id);
  const handleBackToList = () => setSelectedGame(null);
  const handleAddLevel = () => setIsAddLevelDialogOpen(true);

  const handleAddLevelSubmit = () => {
    if (!gameDetail) return;
    const updatedGames = games.map(game => {
      if (game.id === gameDetail.id) {
        const newLevelId = game.levels.length > 0 ? Math.max(...game.levels.map(l => l.id)) + 1 : 1;
        return {
          ...game,
          levels: [...game.levels, {
            id: newLevelId,
            name: newLevel.name,
            points: newLevel.points
          }]
        };
      }
      return game;
    });

    setGames(updatedGames);
    setNewLevel({ name: "", points: 100 });
    setIsAddLevelDialogOpen(false);
    toast({
      title: "Level added",
      description: "New level has been added to the game"
    });
  };

  const handleAddAction = (levelName) => {
    toast({
      title: "Add action",
      description: `Add a new action to ${levelName} level`
    });
  };

  const leaderboardUsers = [
    { id: 1, name: "Tony Brat", avatar: "/lovable-uploads/e59edc90-ac04-4990-910a-f9f9af02863e.png", stars: 0, likes: 1 },
    { id: 2, name: "Troy Corser", avatar: "/lovable-uploads/e59edc90-ac04-4990-910a-f9f9af02863e.png", stars: 0, likes: 1 },
    { id: 3, name: "Travis Diss", avatar: "/lovable-uploads/e59edc90-ac04-4990-910a-f9f9af02863e.png", stars: 0, likes: 1 },
    { id: 4, name: "Spike Dussay", avatar: "/lovable-uploads/e59edc90-ac04-4990-910a-f9f9af02863e.png", stars: 0, likes: 1 },
    { id: 5, name: "Cary Duvons", avatar: "/lovable-uploads/e59edc90-ac04-4990-910a-f9f9af02863e.png", stars: 0, likes: 1 },
    { id: 6, name: "Jane Eire", avatar: "/lovable-uploads/e59edc90-ac04-4990-910a-f9f9af02863e.png", stars: 0, likes: 1 },
    { id: 7, name: "Sally Johnson", avatar: "/lovable-uploads/e59edc90-ac04-4990-910a-f9f9af02863e.png", stars: 0, likes: 1 },
    { id: 8, name: "Tess Payton", avatar: "/lovable-uploads/e59edc90-ac04-4990-910a-f9f9af02863e.png", stars: 0, likes: 1 },
    { id: 9, name: "Jeremy Philips", avatar: "/lovable-uploads/e59edc90-ac04-4990-910a-f9f9af02863e.png", stars: 0, likes: 1 }
  ];

  if (selectedGame !== null && gameDetail) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleBackToList} className="p-1">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">{gameDetail.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ... The same JSX for game detail view */}
        </div>

        <Dialog open={isAddLevelDialogOpen} onOpenChange={setIsAddLevelDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Level</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="levelName">Level Name</Label>
                <Input
                  id="levelName"
                  value={newLevel.name}
                  onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                  placeholder="Level name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  min="1"
                  value={newLevel.points}
                  onChange={(e) => setNewLevel({ ...newLevel, points: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddLevelDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddLevelSubmit}>Add Level</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <FloatingLMSBackButton />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Games" description="Manage and configure learning games" />
      {/* ... Game list view with dialog and controls */}
      <FloatingLMSBackButton />
    </div>
  );
};

export default GameSettings;
