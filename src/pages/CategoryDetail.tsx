
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock category data
  const getCategoryData = () => {
    // Convert the categoryId from kebab case to title case for display
    const categoryTitle = categoryId?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const categoryMap: Record<string, any> = {
      'general': {
        title: 'General Courses',
        description: 'Browse our core courses and fundamentals',
        courses: [
          {
            id: '1',
            title: 'Become Private',
            imageUrl: '/placeholder.svg',
            contactText: 'Contact us',
            instructor: 'Rowland, PaulMichael'
          },
          {
            id: '2',
            title: 'Freshman Master Class',
            imageUrl: '/placeholder.svg',
            dateRange: 'When: May 08 - Jun 30, 2025',
            instructor: 'Rowland, PaulMichael'
          },
          {
            id: '3',
            title: 'Privately Operate',
            imageUrl: '/placeholder.svg',
            contactText: 'Contact us',
            instructor: 'Rowland, PaulMichael'
          },
          {
            id: '4',
            title: 'Secured Party Creditor (SPC) Packet',
            imageUrl: '/placeholder.svg',
            description: 'Learn about the principles, documentation, and processes involved in becoming a Secured Party Creditor.',
            duration: '45 Minutes',
            instructor: 'Rowland, PaulMichael'
          }
        ]
      },
      'sovereignty-101': {
        title: 'SOVEREIGNTY 101',
        description: 'Sovereignty, Law, and Personal Freedom in the United States',
        courses: [
          {
            id: '5',
            title: 'SOVEREIGNTY 101',
            imageUrl: '/placeholder.svg',
            description: 'Sovereignty, Law, and Personal Freedom in the United States',
            instructor: 'Rowland, PaulMichael'
          }
        ]
      },
      'legal-foundations': {
        title: 'Legal Foundations',
        description: 'Understanding the legal system basics',
        courses: []
      },
      'advanced-legal-studies': {
        title: 'Advanced Legal Studies',
        description: 'In-depth analysis of complex legal matters',
        courses: []
      }
    };

    return categoryMap[categoryId as string] || {
      title: categoryTitle || 'Unknown Category',
      description: 'Category information',
      courses: []
    };
  };

  const categoryData = getCategoryData();

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/courses')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">{categoryData.title}</h1>
          <p className="text-slate-500">{categoryData.description}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        {searchQuery && (
          <Button 
            variant="ghost" 
            onClick={() => setSearchQuery('')}
            className="text-sm"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.courses.map((course: any) => (
          <Card key={course.id} className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md cursor-pointer">
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={course.imageUrl || '/placeholder.svg'} 
                alt={course.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <CardContent className="flex flex-col flex-grow p-4">
              <h3 className="text-lg font-medium mb-2">{course.title}</h3>
              
              {course.description && (
                <p className="text-sm text-slate-600 mb-3">{course.description}</p>
              )}
              
              {course.dateRange && (
                <p className="text-sm text-slate-600 mb-2">{course.dateRange}</p>
              )}
              
              {course.contactText && (
                <p className="text-sm text-slate-600 mb-2">{course.contactText}</p>
              )}
              
              {course.duration && (
                <div className="flex items-center text-sm text-slate-600 mb-2">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{course.duration}</span>
                </div>
              )}
              
              {course.instructor && (
                <div className="flex items-center text-sm mt-auto pt-2">
                  <User className="h-3.5 w-3.5 mr-1 text-slate-400" />
                  <span className="text-slate-600">{course.instructor}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {categoryData.courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No courses available in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
