
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AddModuleDialog } from '@/components/courses/AddModuleDialog';
import { PublishCourseDialog } from '@/components/courses/PublishCourseDialog';
import { AddRewardDialog } from '@/components/courses/AddRewardDialog';
import { CourseHeader } from '@/components/courses/CourseHeader';
import { DebugInfo } from '@/components/courses/DebugInfo';
import { ModulesSection } from '@/components/courses/ModulesSection';
import { RewardsSection } from '@/components/courses/RewardsSection';
import { PublishSection } from '@/components/courses/PublishSection';
import { useToast } from '@/hooks/use-toast';

interface RewardItem {
  id: string;
  name: string;
  type: 'badge' | 'certificate';
  imageUrl: string;
  description?: string;
}

const CourseBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddModule, setShowAddModule] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showAddReward, setShowAddReward] = useState(false);
  
  const [course, setCourse] = useState({
    id: id,
    title: 'Loading...',
    description: 'Loading course details...',
    category: 'General',
    courseType: 'Sequential' as const,
    difficulty: 'Beginner',
    duration: '8 weeks',
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
  });

  const [modules, setModules] = useState([]);
  const [rewards, setRewards] = useState<RewardItem[]>([]);

  // Load course data from localStorage on mount and when ID changes
  useEffect(() => {
    if (id) {
      console.log('Loading course data for ID:', id);
      const savedCourse = localStorage.getItem(`course-${id}`);
      if (savedCourse) {
        const courseData = JSON.parse(savedCourse);
        console.log('Loaded course data:', courseData);
        setCourse({
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          category: courseData.category || 'General',
          courseType: (courseData.courseType as 'Sequential') || 'Sequential',
          difficulty: courseData.difficulty || 'Beginner',
          duration: courseData.duration || '8 weeks',
          thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
        });
        
        // Load modules if they exist
        if (courseData.modules && courseData.modules.length > 0) {
          console.log('Loading modules from course data:', courseData.modules);
          setModules(courseData.modules);
        }

        // Load rewards if they exist
        if (courseData.rewards && courseData.rewards.length > 0) {
          console.log('Loading rewards from course data:', courseData.rewards);
          setRewards(courseData.rewards);
        }
      } else {
        console.log('No saved course found, creating default course');
        // Create a default course entry if none exists
        const defaultCourse = {
          id: id,
          title: 'New Course',
          description: 'Course description',
          category: 'General',
          courseType: 'Sequential',
          difficulty: 'Beginner',
          duration: '8 weeks',
          thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop',
          modules: [],
          rewards: [],
          createdAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        };
        localStorage.setItem(`course-${id}`, JSON.stringify(defaultCourse));
        setCourse({
          id: defaultCourse.id,
          title: defaultCourse.title,
          description: defaultCourse.description,
          category: defaultCourse.category,
          courseType: defaultCourse.courseType as 'Sequential',
          difficulty: defaultCourse.difficulty,
          duration: defaultCourse.duration,
          thumbnail: defaultCourse.thumbnail
        });
      }
    }
  }, [id]);

  // Auto-save modules and rewards whenever they change
  useEffect(() => {
    if (id && (modules.length >= 0 || rewards.length >= 0)) {
      console.log('Auto-saving modules and rewards:', modules, rewards);
      const existingCourse = JSON.parse(localStorage.getItem(`course-${id}`) || '{}');
      const updatedCourse = {
        ...existingCourse,
        modules: modules,
        rewards: rewards,
        moduleCount: modules.length,
        rewardCount: rewards.length,
        lastUpdated: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };
      localStorage.setItem(`course-${id}`, JSON.stringify(updatedCourse));
      console.log('Saved course with modules and rewards:', updatedCourse);
    }
  }, [modules, rewards, id]);

  // Function to get module stats
  const getModuleStats = (moduleId: string) => {
    // Get units for this module
    const courseUnits = JSON.parse(localStorage.getItem(`course-${id}-units`) || '[]');
    const moduleUnits = courseUnits.filter(unit => unit.moduleId === moduleId);
    
    // Get assessments for this module
    const courseAssessments = JSON.parse(localStorage.getItem(`course-${id}-assessments`) || '[]');
    const moduleAssessments = courseAssessments.filter(assessment => assessment.moduleId === moduleId);
    
    // Calculate total hours (assuming each unit has an estimatedTime property)
    const totalHours = moduleUnits.reduce((total, unit) => {
      return total + (unit.estimatedTime || 0);
    }, 0);

    return {
      units: moduleUnits.length,
      assessments: moduleAssessments.length,
      hours: totalHours
    };
  };

  const handleSaveDraft = () => {
    // Force save current state
    const courseData = {
      ...course,
      modules: modules,
      rewards: rewards,
      moduleCount: modules.length,
      rewardCount: rewards.length,
      lastUpdated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };
    
    localStorage.setItem(`course-${id}`, JSON.stringify(courseData));
    console.log('Manual save - course data:', courseData);
    
    toast({
      title: "Draft saved",
      description: "Your course draft has been saved successfully.",
    });
  };

  const handleAddModule = (moduleData: { topic: string; description: string }) => {
    const newModule = {
      id: Date.now().toString(),
      topic: moduleData.topic,
      description: moduleData.description,
      createdAt: new Date().toISOString()
    };
    
    console.log('Adding new module:', newModule);
    const updatedModules = [...modules, newModule];
    setModules(updatedModules);
    
    setShowAddModule(false);
    toast({
      title: "Module added",
      description: "New module has been added to your course.",
    });
  };

  const handleAddReward = (reward: RewardItem) => {
    console.log('Adding new reward:', reward);
    const updatedRewards = [...rewards, reward];
    setRewards(updatedRewards);
  };

  const handleRemoveReward = (rewardId: string) => {
    console.log('Removing reward:', rewardId);
    const updatedRewards = rewards.filter(r => r.id !== rewardId);
    setRewards(updatedRewards);
    
    toast({
      title: "Reward removed",
      description: "Reward has been removed from your course.",
    });
  };

  const handleEditModule = (moduleId: string) => {
    console.log('Edit module:', moduleId);
    // Navigate to module editor
    navigate(`/pages/ModuleBuilder/${moduleId}/${id}`);
  };

  const handleDeleteModule = (moduleId: string) => {
    console.log('Deleting module:', moduleId);
    const updatedModules = modules.filter(m => m.id !== moduleId);
    setModules(updatedModules);
    
    toast({
      title: "Module deleted",
      description: "Module has been removed from your course.",
    });
  };

  const handleCreateUnits = (moduleId: string) => {
    console.log('Creating units for module:', moduleId);
    // Save current state before navigating
    handleSaveDraft();
    navigate(`/courses/builder/${id}/units`, { state: { moduleId } });
  };

  const handleCreateAssessments = (moduleId: string) => {
    console.log('Creating assessments for module:', moduleId);
    // Save current state before navigating
    handleSaveDraft();
    navigate(`/courses/builder/${id}/assessments`, { state: { moduleId } });
  };

  const handlePublishCourse = () => {
    // Get existing units for this course
    const courseUnits = JSON.parse(localStorage.getItem(`course-${id}-units`) || '[]');
    
    // Get current course data with the actual modules and rewards
    const currentCourseData = JSON.parse(localStorage.getItem(`course-${id}`) || '{}');
    
    console.log('Publishing course with modules:', modules);
    console.log('Publishing course with rewards:', rewards);
    console.log('Current course data:', currentCourseData);
    
    // Create the published course data with the current modules and rewards state
    const publishedCourse = {
      id: id,
      title: course.title,
      description: course.description,
      category: course.category,
      status: 'Published' as const,
      courseType: course.courseType,
      difficulty: course.difficulty,
      duration: course.duration,
      students: 0,
      moduleCount: modules.length,
      rewardCount: rewards.length,
      createdAt: currentCourseData.createdAt || new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      lastUpdated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      thumbnail: course.thumbnail,
      isActive: true,
      modules: modules,
      rewards: rewards,
      units: courseUnits
    };

    console.log('Final published course data:', publishedCourse);

    // Get existing published courses
    const existingCourses = JSON.parse(localStorage.getItem('published-courses') || '[]');
    
    // Check if course already exists and update, otherwise add new
    const courseIndex = existingCourses.findIndex((c: any) => c.id === id);
    if (courseIndex >= 0) {
      existingCourses[courseIndex] = publishedCourse;
      console.log('Updated existing course at index:', courseIndex);
    } else {
      existingCourses.push(publishedCourse);
      console.log('Added new course to published list');
    }
    
    // Save to localStorage
    localStorage.setItem('published-courses', JSON.stringify(existingCourses));
    console.log('Saved published courses:', existingCourses);
    
    // Also update the course status in individual storage with current modules and rewards
    const updatedCourseData = {
      ...currentCourseData,
      ...publishedCourse,
      modules: modules,
      rewards: rewards
    };
    localStorage.setItem(`course-${id}`, JSON.stringify(updatedCourseData));
    
    toast({
      title: "✅ Course published successfully",
      description: "Your course is now available on the main courses page.",
    });

    // Navigate to courses page
    navigate('/courses');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <CourseHeader
          course={course}
          onNavigateBack={() => navigate('/courses')}
          onSaveDraft={handleSaveDraft}
          onAddModule={() => setShowAddModule(true)}
          onAddReward={() => setShowAddReward(true)}
          hasModules={modules.length > 0}
        />

        {/* Debug Info */}
        <DebugInfo courseId={id} modules={modules} />

        {/* Modules Section */}
        <ModulesSection
          modules={modules}
          courseId={id}
          onAddModule={() => setShowAddModule(true)}
          onEditModule={handleEditModule}
          onDeleteModule={handleDeleteModule}
          onCreateUnits={handleCreateUnits}
          onCreateAssessments={handleCreateAssessments}
          getModuleStats={getModuleStats}
        />

        {/* Rewards Section */}
        <RewardsSection
          rewards={rewards}
          onRemoveReward={handleRemoveReward}
        />

        {/* Publish Course Section */}
        <PublishSection
          modules={modules}
          onPublishCourse={handlePublishCourse}
        />
      </div>

      {/* Add Module Dialog */}
      <AddModuleDialog
        open={showAddModule}
        onOpenChange={setShowAddModule}
        onAdd={handleAddModule}
      />

      {/* Add Reward Dialog */}
      <AddRewardDialog
        open={showAddReward}
        onOpenChange={setShowAddReward}
        onAddReward={handleAddReward}
      />

      {/* Publish Course Dialog */}
      <PublishCourseDialog
        open={showPublishModal}
        onOpenChange={setShowPublishModal}
        courseId={id || ''}
      />
    </div>
  );
};

export default CourseBuilder;
