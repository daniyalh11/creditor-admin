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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  
  const [selectedGame, setSelectedGame] = useState<null | number>(null);
  const [newLevel, setNewLevel] = useState({ name: "", points: 100 });
  const [isAddLevelDialogOpen, setIsAddLevelDialogOpen] = useState(false);
  
  const gameDetail = selectedGame !== null ? games.find(g => g.id === selectedGame) : null;
  
  const handleDelete = (id: number) => {
    setGames(games.filter(game => game.id !== id));
    toast({
      title: "Game deleted",
      description: "The game has been deleted successfully"
    });
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddSubmit = () => {
    const id = Math.max(0, ...games.map(g => g.id)) + 1;
    
    setGames([...games, {
      id,
      name: newGame.name,
      description: newGame.description,
      levels: [],
      favorites: 0,
      stars: 0,
      image: "/lovable-uploads/99489061-8ed9-41d2-84f2-9f76fec2a9a0.png", // Default image
    }]);
    
    setNewGame({
      name: "",
      description: "",
      levels: 1,
    });
    
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
  
  const handleViewGame = (id: number) => {
    setSelectedGame(id);
  };
  
  const handleBackToList = () => {
    setSelectedGame(null);
  };
  
  const handleAddLevel = () => {
    setIsAddLevelDialogOpen(true);
  };
  
  const handleAddLevelSubmit = () => {
    if (!gameDetail) return;
    
    const updatedGames = games.map(game => {
      if (game.id === gameDetail.id) {
        const newLevelId = game.levels.length > 0 ? 
          Math.max(...game.levels.map(l => l.id)) + 1 : 1;
        
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
  
  const handleAddAction = (levelName: string) => {
    toast({
      title: "Add action",
      description: `Add a new action to ${levelName} level`
    });
  };

  // Leaderboard data
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
        
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="text-destructive hover:bg-destructive/10">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Levels</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Levels</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                        <TableHead className="w-[100px]">Edit</TableHead>
                        <TableHead className="w-[100px]">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gameDetail.levels.map((level) => (
                        <TableRow key={level.id}>
                          <TableCell className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            {level.name}
                          </TableCell>
                          <TableCell className="text-right">{level.points}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Minus className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4">
                  <Button onClick={handleAddLevel} className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {gameDetail.levels.map((level) => (
              <Card key={level.id}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{level.name} level actions</h2>
                  <p className="text-muted-foreground mb-4">The following actions are performed when this level is achieved</p>
                  <Button onClick={() => handleAddAction(level.name)} className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Badges</h2>
                <p className="text-muted-foreground">There are no badges set for this game.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Points</h2>
                <p className="text-muted-foreground">There are no points set for this game.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Teams</h2>
                <p className="text-muted-foreground">There are no teams in this game.</p>
                <div className="mt-4">
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
                <div className="space-y-4">
                  {leaderboardUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{user.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{user.stars}</span>
                        </div>
                        <div className="w-4 text-center">{user.likes}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
                  onChange={(e) => setNewLevel({...newLevel, name: e.target.value})}
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
                  onChange={(e) => setNewLevel({...newLevel, points: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddLevelDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddLevelSubmit}>Add Level</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Floating Back to LMS Button */}
        <FloatingLMSBackButton />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Games" 
        description="Manage and configure learning games"
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSelectAll}>
            <CheckSquare className="mr-2 h-4 w-4" />
            Select all
          </Button>
          <Button variant="outline" className="text-destructive hover:bg-destructive/10">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="overflow-hidden border">
            <div 
              className="relative aspect-video cursor-pointer" 
              onClick={() => handleViewGame(game.id)}
            >
              <img 
                src={game.image} 
                alt={game.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold">{game.name}</h3>
                  <p className="text-sm text-gray-200">{game.description}</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1 text-amber-500" />
                    <span>{game.levels.length}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <span>{game.stars}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(game.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Game</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={newGame.name} 
                onChange={(e) => setNewGame({...newGame, name: e.target.value})}
                placeholder="Game name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={newGame.description} 
                onChange={(e) => setNewGame({...newGame, description: e.target.value})}
                placeholder="Game description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="levels">Levels</Label>
              <Input 
                id="levels" 
                type="number" 
                min="1"
                value={newGame.levels} 
                onChange={(e) => setNewGame({...newGame, levels: parseInt(e.target.value) || 1})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddSubmit}>Create Game</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Floating Back to LMS Button */}
      <FloatingLMSBackButton />
    </div>
  );
};

export default GameSettings;
