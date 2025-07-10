import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, MessageSquareQuote, Quote, List, Images, Zap, Image, BarChart3, Minus, Users, Shield, Package } from 'lucide-react';

export const LessonBuilderSidebar = ({
  activeTab,
  setActiveTab,
  onAddTextBlock,
  onAddStatementBlock,
  onAddQuoteBlock,
  onAddListBlock,
  onAddGalleryBlock,
  onAddInteractiveBlock,
  onAddMediaBlock,
  onAddChartsBlock,
  onAddDividerBlock,
  onAddTemplate
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-1">Content Blocks</h2>
        <p className="text-sm text-gray-500">Click blocks to add them to your lesson</p>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
            <TabsTrigger value="blocks" className="text-sm">Blocks</TabsTrigger>
            <TabsTrigger value="templates" className="text-sm">Templates</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="blocks" className="px-4 pb-4 mt-4 h-full">
            <ScrollArea className="h-[calc(100vh-200px)] pr-2">
              <div className="space-y-3">
                {/* Text Block */}
                <div 
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  onClick={onAddTextBlock}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">
                      <FileText className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Text</h3>
                      <p className="text-sm text-gray-500">Paragraph, headings, tables</p>
                    </div>
                    <div className="text-gray-400 text-lg">›</div>
                  </div>
                </div>

                {/* Statement Block */}
                <div 
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  onClick={onAddStatementBlock}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">
                      <MessageSquareQuote className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Statement</h3>
                      <p className="text-sm text-gray-500">Highlighted statements</p>
                    </div>
                    <div className="text-gray-400 text-lg">›</div>
                  </div>
                </div>

                {/* Quote Block */}
                <div 
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  onClick={onAddQuoteBlock}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">
                      <Quote className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Quote</h3>
                      <p className="text-sm text-gray-500">Quotes with various styles</p>
                    </div>
                    <div className="text-gray-400 text-lg">›</div>
                  </div>
                </div>

                {/* List Block */}
                <div 
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  onClick={onAddListBlock}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">
                      <List className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">List</h3>
                      <p className="text-sm text-gray-500">Bullets, numbers, checklists</p>
                    </div>
                    <div className="text-gray-400 text-lg">›</div>
                  </div>
                </div>

                {/* Gallery Block */}
                <div 
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  onClick={onAddGalleryBlock}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">
                      <Images className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Gallery</h3>
                      <p className="text-sm text-gray-500">Image galleries and grids</p>
                    </div>
                    <div className="text-gray-400 text-lg">›</div>
                  </div>
                </div>

                {/* Interactive Block */}
                <div 
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  onClick={onAddInteractiveBlock}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">
                      <Zap className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Interactive</h3>
                      <p className="text-sm text-gray-500">Interactive components</p>
                    </div>
                    <div className="text-gray-400 text-lg">›</div>
                  </div>
                </div>

                {/* Media Block */}
                <div 
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  onClick={onAddMediaBlock}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">
                      <Image className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Media</h3>
                      <p className="text-sm text-gray-500">Images, videos, and audio files</p>
                    </div>
                    <div className="text-gray-400 text-lg">›</div>
                  </div>
                </div>

                {/* Charts Block */}
                <div 
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  onClick={onAddChartsBlock}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">
                      <BarChart3 className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Charts</h3>
                      <p className="text-sm text-gray-500">Bar, pie, and line charts</p>
                    </div>
                    <div className="text-gray-400 text-lg">›</div>
                  </div>
                </div>

                {/* Divider Block */}
                <div 
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                  onClick={onAddDividerBlock}
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">
                      <Minus className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">Divider</h3>
                      <p className="text-sm text-gray-500">Separators and continue buttons</p>
                    </div>
                    <div className="text-gray-400 text-lg">›</div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="templates" className="px-4 pb-4 mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Course Templates</h3>
              <p className="text-sm text-gray-500">Click on a template to start building your lesson</p>
            </div>
            
            <ScrollArea className="h-[calc(100vh-280px)] pr-2">
              <div className="space-y-4">
                {/* Welcome Course Template */}
                <div 
                  className="relative group p-4 border rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  onClick={() => onAddTemplate('welcome')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-4 py-2 rounded-lg transition-all duration-200">
                      Click to use
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-white">
                      <h4 className="font-semibold text-lg mb-1">Welcome Course</h4>
                      <p className="text-sm text-white text-opacity-90 mb-3">Perfect for onboarding new employees or students</p>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">4 blocks</span>
                    </div>
                  </div>
                </div>

                {/* Compliance Training Template */}
                <div 
                  className="relative group p-4 border rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)' }}
                  onClick={() => onAddTemplate('compliance')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-4 py-2 rounded-lg transition-all duration-200">
                      Click to use
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-white">
                      <h4 className="font-semibold text-lg mb-1">Compliance Training</h4>
                      <p className="text-sm text-white text-opacity-90 mb-3">Structured format for compliance and safety training</p>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">4 blocks</span>
                    </div>
                  </div>
                </div>

                {/* Product Training Template */}
                <div 
                  className="relative group p-4 border rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)' }}
                  onClick={() => onAddTemplate('product')}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black bg-opacity-50 px-4 py-2 rounded-lg transition-all duration-200">
                      Click to use
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-white">
                      <h4 className="font-semibold text-lg mb-1">Product Training</h4>
                      <p className="text-sm text-white text-opacity-90 mb-3">Showcase features and benefits effectively</p>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">3 blocks</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="px-4 pb-4 mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Lesson Settings</h3>
              <p className="text-sm text-gray-500">Customize your lesson appearance and details</p>
            </div>
            
            <ScrollArea className="h-[calc(100vh-280px)] pr-2">
              <div className="space-y-6">
                {/* Basic Information Section */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-3">Basic Information</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="lesson-title" className="text-sm font-medium text-gray-700">
                        Lesson Title
                      </Label>
                      <Input
                        id="lesson-title"
                        defaultValue="New Lesson"
                        className="mt-1"
                        placeholder="Enter lesson title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lesson-description" className="text-sm font-medium text-gray-700">
                        Description
                      </Label>
                      <Textarea
                        id="lesson-description"
                        defaultValue="Course description"
                        className="mt-1 min-h-[80px]"
                        placeholder="Enter lesson description"
                      />
                    </div>
                  </div>
                </div>

                {/* Appearance Section */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-3">Appearance</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="theme-select" className="text-sm font-medium text-gray-700">
                        Theme
                      </Label>
                      <Select defaultValue="default">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="font-family-select" className="text-sm font-medium text-gray-700">
                        Font Family
                      </Label>
                      <Select defaultValue="Inter">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Open Sans">Open Sans</SelectItem>
                          <SelectItem value="Lato">Lato</SelectItem>
                          <SelectItem value="Poppins">Poppins</SelectItem>
                          <SelectItem value="Nunito">Nunito</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="primary-color" className="text-sm font-medium text-gray-700">
                        Primary Color
                      </Label>
                      <div className="mt-2">
                        <div className="flex gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer border-2 border-gray-300"></div>
                          <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer border-2 border-transparent"></div>
                          <div className="w-8 h-8 rounded-full bg-orange-500 cursor-pointer border-2 border-transparent"></div>
                          <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer border-2 border-transparent"></div>
                          <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer border-2 border-transparent"></div>
                          <div className="w-8 h-8 rounded-full bg-cyan-500 cursor-pointer border-2 border-transparent"></div>
                        </div>
                        <Input
                          id="primary-color"
                          defaultValue="#3b82f6"
                          className="font-mono text-sm"
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Add prop-types for runtime type checking
LessonBuilderSidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  onAddTextBlock: PropTypes.func.isRequired,
  onAddStatementBlock: PropTypes.func.isRequired,
  onAddQuoteBlock: PropTypes.func.isRequired,
  onAddListBlock: PropTypes.func.isRequired,
  onAddGalleryBlock: PropTypes.func.isRequired,
  onAddInteractiveBlock: PropTypes.func.isRequired,
  onAddMediaBlock: PropTypes.func.isRequired,
  onAddChartsBlock: PropTypes.func.isRequired,
  onAddDividerBlock: PropTypes.func.isRequired,
  onAddTemplate: PropTypes.func.isRequired,
};