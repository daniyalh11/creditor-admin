
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CourseBasicInfoForm } from './form-sections/CourseBasicInfoForm';
import { BloomsTaxonomySection } from './form-sections/BloomsTaxonomySection';
import { CourseDetailsSection } from './form-sections/CourseDetailsSection';
import { CourseCategoriesSection } from './form-sections/CourseCategoriesSection';
import { CourseThumbnailSection } from './form-sections/CourseThumbnailSection';

interface CourseCreationFormProps {
  courseData?: any;
}

const CourseCreationForm: React.FC<CourseCreationFormProps> = ({ courseData }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const courseId = searchParams.get('courseId');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    learningObjectives: [''],
    price: '',
    level: 'Beginner',
    maxStudents: '',
    estimatedDuration: '',
    categories: [] as string[],
    thumbnail: '',
    bloomsTaxonomy: [] as string[]
  });

  // Populate form with existing course data when editing
  useEffect(() => {
    if (isEdit && courseData) {
      setFormData({
        title: courseData.title || '',
        description: courseData.description || '',
        learningObjectives: courseData.learningObjectives || [''],
        price: courseData.price ? courseData.price.toString() : '',
        level: courseData.difficulty || 'Beginner',
        maxStudents: courseData.maxStudents ? courseData.maxStudents.toString() : '',
        estimatedDuration: courseData.duration || '',
        categories: courseData.categories || [courseData.category] || [],
        thumbnail: courseData.thumbnail || '',
        bloomsTaxonomy: courseData.bloomsTaxonomy || []
      });
    }
  }, [isEdit, courseData]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, thumbnail: imageUrl || '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.categories.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one category.",
        variant: "destructive"
      });
      return;
    }

    if (isEdit) {
      // Handle update logic here
      const updatedCourse = {
        ...courseData,
        title: formData.title,
        description: formData.description,
        learningObjectives: formData.learningObjectives.filter(obj => obj.trim()),
        category: formData.categories[0] || 'General',
        categories: formData.categories,
        difficulty: formData.level,
        duration: formData.estimatedDuration || '8 weeks',
        price: formData.price ? parseFloat(formData.price) : 0,
        maxStudents: formData.maxStudents ? parseInt(formData.maxStudents) : null,
        bloomsTaxonomy: formData.bloomsTaxonomy,
        thumbnail: formData.thumbnail || courseData.thumbnail,
        lastUpdated: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };

      // Save updated course to localStorage
      localStorage.setItem(`course-${courseId}`, JSON.stringify(updatedCourse));

      toast({
        title: "Course updated successfully",
        description: "Your course has been updated.",
      });
      navigate('/courses');
      return;
    }

    // Create new course with unique ID
    const newCourseId = `new-${Date.now()}`;
    const newCourse = {
      id: newCourseId,
      title: formData.title,
      description: formData.description,
      learningObjectives: formData.learningObjectives.filter(obj => obj.trim()),
      category: formData.categories[0] || 'General',
      categories: formData.categories,
      courseType: 'Sequential' as const,
      difficulty: formData.level,
      duration: formData.estimatedDuration || '8 weeks',
      price: formData.price ? parseFloat(formData.price) : 0,
      maxStudents: formData.maxStudents ? parseInt(formData.maxStudents) : null,
      bloomsTaxonomy: formData.bloomsTaxonomy,
      thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop',
      status: 'Draft' as const,
      students: 0,
      moduleCount: 0,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      lastUpdated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      isActive: true,
      modules: [],
      units: []
    };

    // Save course to localStorage
    localStorage.setItem(`course-${newCourseId}`, JSON.stringify(newCourse));

    toast({
      title: "Course created successfully",
      description: "You can now start building your course content.",
    });

    // Navigate to course builder
    navigate(`/courses/builder/${newCourseId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <CourseBasicInfoForm 
          formData={{
            title: formData.title,
            description: formData.description,
            learningObjectives: formData.learningObjectives
          }}
          onInputChange={handleInputChange}
        />

        <BloomsTaxonomySection
          selectedLevels={formData.bloomsTaxonomy}
          onLevelsChange={(levels) => handleInputChange('bloomsTaxonomy', levels)}
        />

        <CourseDetailsSection
          formData={{
            price: formData.price,
            level: formData.level,
            maxStudents: formData.maxStudents,
            estimatedDuration: formData.estimatedDuration
          }}
          onInputChange={handleInputChange}
        />

        <CourseCategoriesSection
          selectedCategories={formData.categories}
          onCategoriesChange={(categories) => handleInputChange('categories', categories)}
        />

        <CourseThumbnailSection
          currentImage={formData.thumbnail}
          onImageChange={handleImageChange}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/courses')}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            {isEdit ? 'Update Course' : 'Create Course & Continue'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreationForm;
