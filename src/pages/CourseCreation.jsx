import React, { useState, useEffect } from 'react';
import CourseCreationForm from '@/components/courses/CourseCreationForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CourseCreation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  const courseId = searchParams.get('courseId');
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (isEdit && courseId) {
      // Load course data from localStorage or API
      const savedCourse = localStorage.getItem(`course-${courseId}`);
      if (savedCourse) {
        setCourseData(JSON.parse(savedCourse));
      }
    }
  }, [isEdit, courseId]);

  const handleUpdate = (updatedData) => {
    if (isEdit && courseId) {
      // Save updated course data to localStorage (simulate API)
      localStorage.setItem(`course-${courseId}`, JSON.stringify(updatedData));
      setCourseData(updatedData);
      console.log('Course updated:', updatedData);
    }
    navigate('/courses');
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate('/courses')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">
            {isEdit ? 'Edit Course' : 'Create New Course'}
          </h1>
        </div>

        {isEdit && (
          <Button 
            onClick={() => {
              // Ask CourseCreationForm to submit the form
              const form = document.querySelector('form');
              if (form) form.requestSubmit();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Update
          </Button>
        )}
      </div>

      <CourseCreationForm courseData={courseData} onSubmit={isEdit ? handleUpdate : undefined} />
    </div>
  );
};

export default CourseCreation;
