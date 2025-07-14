import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';
import { Pencil, ImagePlus, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { EditIntroductionModal } from '@/components/catalog/EditIntroductionModal';
import { AddBoxModal } from '@/components/catalog/AddBoxModal';
import { AddCategoryModal } from '@/components/catalog/AddCategoryModal';
import { EditCategoryModal } from '@/components/catalog/EditCategoryModal';
import { VisibilityFilterModal } from '@/components/catalog/VisibilityFilterModal';
import { SEOMetadataModal } from '@/components/catalog/SEOMetadataModal';

const CatalogSettings = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [pageSize, setPageSize] = useState("50");
  const [format, setFormat] = useState("Graphic");
  const [introduction, setIntroduction] = useState("None");
  const [boxes, setBoxes] = useState([]);

  // Modal states
  const [showEditIntroModal, setShowEditIntroModal] = useState(false);
  const [showAddBoxModal, setShowAddBoxModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [showSEOModal, setShowSEOModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingBox, setEditingBox] = useState(null);
  const [boxModalMode, setBoxModalMode] = useState('add');

  const [catalogOptions, setCatalogOptions] = useState([
    { id: "enableSearch", label: "Enable catalog search", checked: true },
    { id: "enableCalendar", label: "Enable catalog calendar", checked: false },
    { id: "enableLocationFiltering", label: "Enable location filtering", checked: false },
  ]);

  const [advancedOptions, setAdvancedOptions] = useState([
    { id: "displayItemsForDefaultOrg", label: "Display items for default organization in all catalogs", checked: true },
    { id: "onlyDisplayDefaultOrgInVisitor", label: "Only display items from default organization in visitor catalog (recommended)", checked: true },
    { id: "dontApplyRulesForSuperAdmins", label: "Don't apply item and category visibility rules to super admins", checked: true },
    { id: "onlyShowOpenEnrollment", label: "Only show open enrollment courses/paths in visitor catalog", checked: false },
    { id: "hideOldCourses", label: "Hide old courses", checked: false },
  ]);

  const [rightColumnOptions, setRightColumnOptions] = useState([
    { id: "showFeaturedItems", label: "Show list of featured items", checked: false },
    { id: "showBoxes", label: "Show boxes", checked: false },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "DRAFT", visibilityFilter: "none" },
    { id: 2, name: "General", visibilityFilter: "none" },
    { id: 3, name: "Junior", visibilityFilter: "none" },
    { id: 4, name: "NEW COURSE", visibilityFilter: "none" },
    { id: 5, name: "SOVEREIGNTY 101", visibilityFilter: "none" },
    { id: 6, name: "MODULE 1: Understanding Sovereignty and Government Authority", visibilityFilter: "none" },
    { id: 7, name: "UNIT 1: Sovereignty and Governance", visibilityFilter: "none" },
    { id: 8, name: "UNIT 2: Sovereign Immunity", visibilityFilter: "none" },
  ]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleOptionChange = (optionSetId, optionId, checked) => {
    if (optionSetId === 'catalog') {
      setCatalogOptions(prev => 
        prev.map(option => 
          option.id === optionId ? { ...option, checked } : option
        )
      );
    } else if (optionSetId === 'advanced') {
      setAdvancedOptions(prev => 
        prev.map(option => 
          option.id === optionId ? { ...option, checked } : option
        )
      );
    } else if (optionSetId === 'rightColumn') {
      setRightColumnOptions(prev => 
        prev.map(option => 
          option.id === optionId ? { ...option, checked } : option
        )
      );
    }
    
    toast({
      title: "Setting Updated",
      description: `The option has been ${checked ? 'enabled' : 'disabled'}.`,
      duration: 2000,
    });
  };

  const handleSaveIntroduction = (newIntroduction) => {
    setIntroduction(newIntroduction || "None");
    toast({
      title: "Introduction Updated",
      description: "The introduction has been saved successfully.",
    });
  };

  const handleSaveBox = (boxData) => {
    const newBox = {
      id: Date.now().toString(),
      ...boxData,
      dateAdded: new Date().toLocaleDateString(),
    };
    setBoxes(prev => [...prev, newBox]);
    toast({
      title: "Box Added",
      description: "New box has been added successfully.",
    });
  };

  const handleEditBox = (updatedBox) => {
    setBoxes(prev => prev.map(box => box.id === updatedBox.id ? updatedBox : box));
    toast({
      title: "Box Updated",
      description: "Box has been updated successfully.",
    });
  };

  const handleDeleteBox = (boxId) => {
    setBoxes(prev => prev.filter(box => box.id !== boxId));
    toast({
      title: "Box Deleted",
      description: "Box has been deleted successfully.",
    });
  };

  const openAddBoxModal = () => {
    setBoxModalMode('add');
    setEditingBox(null);
    setShowAddBoxModal(true);
  };

  const openEditBoxModal = (box) => {
    setBoxModalMode('edit');
    setEditingBox(box);
    setShowAddBoxModal(true);
  };

  const handleSaveCategory = (categoryData) => {
    const newCategory = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      ...categoryData,
    };
    setCategories(prev => [...prev, newCategory]);
    toast({
      title: "Category Added",
      description: "New category has been added successfully.",
    });
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowEditCategoryModal(true);
  };

  const handleSaveEditedCategory = (updatedCategory) => {
    setCategories(prev => 
      prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)
    );
    toast({
      title: "Category Updated",
      description: "Category has been updated successfully.",
    });
  };

  const handleVisibilityFilter = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setSelectedCategory(category);
      setSelectedCategoryId(categoryId);
      setShowVisibilityModal(true);
    }
  };

  const handleSaveVisibilityFilter = (filter) => {
    if (selectedCategoryId) {
      setCategories(prev => 
        prev.map(cat => 
          cat.id === selectedCategoryId ? { ...cat, visibilityFilter: filter } : cat
        )
      );
      toast({
        title: "Visibility Filter Updated",
        description: "Visibility filter has been updated successfully.",
      });
    }
  };

  const handleSEOMetadata = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setSelectedCategory(category);
      setSelectedCategoryId(categoryId);
      setShowSEOModal(true);
    }
  };

  const handleSaveSEOMetadata = (metadata) => {
    toast({
      title: "SEO Metadata Updated",
      description: "SEO metadata has been updated successfully.",
    });
  };

  const handlePictureUpload = (categoryId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        toast({
          title: "Picture Uploaded",
          description: `Picture ${file.name} has been uploaded successfully.`,
        });
      }
    };
    input.click();
  };

  const handleCategorySelection = (categoryId, checked) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedCategories.length > 0) {
      setCategories(prev => prev.filter(cat => !selectedCategories.includes(cat.id)));
      setSelectedCategories([]);
      toast({
        title: "Categories Deleted",
        description: `${selectedCategories.length} category(ies) have been deleted successfully.`,
      });
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCategories(categories.map(cat => cat.id));
    } else {
      setSelectedCategories([]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Catalog Settings" 
        description="Configure the course catalog and display options"
      />
      
      <div className="bg-white border-b">
        <Tabs value={activeTab} className="p-1" onValueChange={setActiveTab}>
          <TabsList className="h-12 p-0 bg-transparent w-full justify-start gap-1 overflow-x-auto">
            <TabsTrigger 
              value="settings"
              className={cn(
                "px-6 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium",
              )}
            >
              Settings
            </TabsTrigger>
            <TabsTrigger 
              value="categories"
              className={cn(
                "px-6 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium",
              )}
            >
              Categories
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 bg-white rounded-lg border">
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium mb-4">Introduction</h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{introduction}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center"
                  onClick={() => setShowEditIntroModal(true)}
                >
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Pagination</h2>
              <div className="flex items-center gap-2">
                <span className="w-24">Page size</span>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Options</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-sm">Option</th>
                    <th className="text-right font-medium text-sm">Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {catalogOptions.map((option) => (
                    <tr key={option.id} className="h-10">
                      <td>{option.label}</td>
                      <td className="text-right">
                        <Checkbox 
                          id={option.id} 
                          checked={option.checked} 
                          onCheckedChange={(checked) => handleOptionChange('catalog', option.id, checked)}
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Layout</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-sm">Feature</th>
                    <th className="text-right font-medium text-sm">Setting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-10">
                    <td>Format</td>
                    <td className="text-right">
                      <Select value={format} onValueChange={setFormat}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Graphic">Graphic</SelectItem>
                          <SelectItem value="List">List</SelectItem>
                          <SelectItem value="Grid">Grid</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-sm">Feature</th>
                    <th className="text-right font-medium text-sm">Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {advancedOptions.map((option) => (
                    <tr key={option.id} className="h-10">
                      <td>{option.label}</td>
                      <td className="text-right">
                        <Checkbox 
                          id={option.id} 
                          checked={option.checked} 
                          onCheckedChange={(checked) => handleOptionChange('advanced', option.id, checked)}
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Right column</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-sm">Feature</th>
                    <th className="text-right font-medium text-sm">Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {rightColumnOptions.map((option) => (
                    <tr key={option.id} className="h-10">
                      <td>{option.label}</td>
                      <td className="text-right">
                        <Checkbox 
                          id={option.id} 
                          checked={option.checked} 
                          onCheckedChange={(checked) => handleOptionChange('rightColumn', option.id, checked)}
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Boxes</h2>
              {boxes.length === 0 ? (
                <p className="text-muted-foreground">There are no boxes.</p>
              ) : (
                <div className="space-y-2">
                  {boxes.map((box) => (
                    <div key={box.id} className="p-3 border rounded-lg flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{box.title}</h4>
                        <p className="text-sm text-gray-600">{box.description}</p>
                        <p className="text-xs text-gray-500">Added on {box.dateAdded}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditBoxModal(box)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBox(box.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button 
                className="mt-4 flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white"
                onClick={openAddBoxModal}
              >
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
          </div>
        )}
        
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Categories</h2>
              <Button 
                className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white"
                onClick={() => setShowAddCategoryModal(true)}
              >
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="mr-2" 
              onClick={handleDeleteSelected}
              disabled={selectedCategories.length === 0}
            >
              Delete
            </Button>
            
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2 text-left w-6">
                    <Checkbox 
                      id="select-all" 
                      checked={selectedCategories.length === categories.length && categories.length > 0}
                      onCheckedChange={handleSelectAll}
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Visibility filter</th>
                  <th className="px-3 py-2 text-center">Edit</th>
                  <th className="px-3 py-2 text-center">Picture</th>
                  <th className="px-3 py-2 text-center">SEO Metadata</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <Checkbox 
                        id={`category-${category.id}`} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => handleCategorySelection(category.id, checked)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-2">{category.name}</td>
                    <td className="px-3 py-2">
                      {category.visibilityFilter}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleVisibilityFilter(category.id)}
                      >
                        +
                      </Button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => handlePictureUpload(category.id)}
                      >
                        <ImagePlus className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSEOMetadata(category.id)}
                      >
                        +
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <EditIntroductionModal
        isOpen={showEditIntroModal}
        onClose={() => setShowEditIntroModal(false)}
        currentIntroduction={introduction === "None" ? "" : introduction}
        onSave={handleSaveIntroduction}
      />

      <AddBoxModal
        isOpen={showAddBoxModal}
        onClose={() => setShowAddBoxModal(false)}
        onSave={handleSaveBox}
        onEdit={handleEditBox}
        onDelete={handleDeleteBox}
        editingBox={editingBox}
        mode={boxModalMode}
      />

      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onSave={handleSaveCategory}
      />

      <EditCategoryModal
        isOpen={showEditCategoryModal}
        onClose={() => setShowEditCategoryModal(false)}
        onSave={handleSaveEditedCategory}
        category={selectedCategory}
      />

      <VisibilityFilterModal
        isOpen={showVisibilityModal}
        onClose={() => setShowVisibilityModal(false)}
        onSave={handleSaveVisibilityFilter}
        currentFilter={selectedCategory?.visibilityFilter || 'none'}
      />

      <SEOMetadataModal
        isOpen={showSEOModal}
        onClose={() => setShowSEOModal(false)}
        onSave={handleSaveSEOMetadata}
        currentMetadata={{
          title: '',
          description: '',
          keywords: ''
        }}
      />
    </div>
  );
};

export default CatalogSettings;