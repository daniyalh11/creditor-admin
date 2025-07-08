
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared/PageHeader';
import { AddCatalogDialog } from '@/components/catalog/AddCatalogDialog';
import { EditCatalogDialog } from '@/components/catalog/EditCatalogDialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const Catalog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState<any>(null);
  const navigate = useNavigate();
  
  const catalogs = [
    { 
      id: 1, 
      name: 'Web Development', 
      courseCount: 4, 
      description: 'Frontend and backend web development courses',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop'
    },
    { 
      id: 2, 
      name: 'Data Science', 
      courseCount: 2, 
      description: 'Data analysis, machine learning, and AI courses',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
    },
    { 
      id: 3, 
      name: 'Mobile Development', 
      courseCount: 2, 
      description: 'iOS and Android app development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'
    },
    { 
      id: 4, 
      name: 'DevOps', 
      courseCount: 2, 
      description: 'Cloud computing, deployment, and infrastructure',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop'
    },
  ];

  const handleEditCatalog = (catalog: any) => {
    setSelectedCatalog(catalog);
    setEditDialogOpen(true);
  };

  const handleDeleteCatalog = (catalogId: number) => {
    console.log('Delete catalog:', catalogId);
    // Handle delete logic here
  };

  const handleCatalogClick = (catalogId: number) => {
    navigate(`/catalog/view/${catalogId}`);
  };

  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden">
      <div className="flex-shrink-0 p-4 space-y-4">
        <PageHeader 
          title="Course Catalog" 
          description="Manage course categories and organize your learning content"
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search catalogs..." />
          </div>
          <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Catalog
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
          {catalogs.map((catalog) => (
            <Card 
              key={catalog.id} 
              className="hover:shadow-lg transition-all duration-200 group relative overflow-hidden cursor-pointer"
              onClick={() => handleCatalogClick(catalog.id)}
            >
              {/* Hover Actions */}
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-white/90 hover:bg-white shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCatalog(catalog);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-white/90 hover:bg-white shadow-md text-red-600 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCatalog(catalog.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={catalog.image} 
                  alt={catalog.name}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-900">{catalog.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{catalog.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {catalog.courseCount} courses
                    </span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <AddCatalogDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <EditCatalogDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        catalog={selectedCatalog}
      />
    </div>
  );
};

export default Catalog;
