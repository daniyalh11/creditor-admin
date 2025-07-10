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
    courseType: 'Sequential',
    difficulty: 'Beginner',
    duration: '8 weeks',
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
  });

  const [modules, setModules] = useState([]);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (id) {
      const savedCourse = localStorage.getItem(`course-${id}`);
      if (savedCourse) {
        const courseData = JSON.parse(savedCourse);
        setCourse({
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          category: courseData.category || 'General',
          courseType: courseData.courseType || 'Sequential',
          difficulty: courseData.difficulty || 'Beginner',
          duration: courseData.duration || '8 weeks',
          thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
        });
        if (courseData.modules) setModules(courseData.modules);
        if (courseData.rewards) setRewards(courseData.rewards);
      } else {
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
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        localStorage.setItem(`course-${id}`, JSON.stringify(defaultCourse));
        setCourse(defaultCourse);
      }
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const existingCourse = JSON.parse(localStorage.getItem(`course-${id}`) || '{}');
      const updatedCourse = {
        ...existingCourse,
        modules,
        rewards,
        moduleCount: modules.length,
        rewardCount: rewards.length,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      localStorage.setItem(`course-${id}`, JSON.stringify(updatedCourse));
    }
  }, [modules, rewards, id]);

  const getModuleStats = (moduleId) => {
    const courseUnits = JSON.parse(localStorage.getItem(`course-${id}-units`) || '[]');
    const moduleUnits = courseUnits.filter(unit => unit.moduleId === moduleId);
    const courseAssessments = JSON.parse(localStorage.getItem(`course-${id}-assessments`) || '[]');
    const moduleAssessments = courseAssessments.filter(a => a.moduleId === moduleId);
    const totalHours = moduleUnits.reduce((sum, unit) => sum + (unit.estimatedTime || 0), 0);
    return {
      units: moduleUnits.length,
      assessments: moduleAssessments.length,
      hours: totalHours
    };
  };

  const handleSaveDraft = () => {
    const courseData = {
      ...course,
      modules,
      rewards,
      moduleCount: modules.length,
      rewardCount: rewards.length,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    localStorage.setItem(`course-${id}`, JSON.stringify(courseData));
    toast({ title: 'Draft saved', description: 'Your course draft has been saved successfully.' });
  };

  const handleAddModule = (moduleData) => {
    const newModule = {
      id: Date.now().toString(),
      topic: moduleData.topic,
      description: moduleData.description,
      createdAt: new Date().toISOString()
    };
    setModules([...modules, newModule]);
    setShowAddModule(false);
    toast({ title: 'Module added', description: 'New module has been added to your course.' });
  };

  const handleAddReward = (reward) => {
    setRewards([...rewards, reward]);
  };

  const handleRemoveReward = (rewardId) => {
    setRewards(rewards.filter(r => r.id !== rewardId));
    toast({ title: 'Reward removed', description: 'Reward has been removed from your course.' });
  };

  const handleEditModule = (moduleId) => {
    navigate(`/pages/ModuleBuilder/${moduleId}/${id}`);
  };

  const handleDeleteModule = (moduleId) => {
    setModules(modules.filter(m => m.id !== moduleId));
    toast({ title: 'Module deleted', description: 'Module has been removed from your course.' });
  };

  const handleCreateUnits = (moduleId) => {
    handleSaveDraft();
    navigate(`/courses/builder/${id}/units`, { state: { moduleId } });
  };

  const handleCreateAssessments = (moduleId) => {
    handleSaveDraft();
    navigate(`/courses/builder/${id}/assessments`, { state: { moduleId } });
  };

  const handlePublishCourse = () => {
    const courseUnits = JSON.parse(localStorage.getItem(`course-${id}-units`) || '[]');
    const currentCourseData = JSON.parse(localStorage.getItem(`course-${id}`) || '{}');

    const publishedCourse = {
      id,
      title: course.title,
      description: course.description,
      category: course.category,
      status: 'Published',
      courseType: course.courseType,
      difficulty: course.difficulty,
      duration: course.duration,
      students: 0,
      moduleCount: modules.length,
      rewardCount: rewards.length,
      createdAt: currentCourseData.createdAt || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      thumbnail: course.thumbnail,
      isActive: true,
      modules,
      rewards,
      units: courseUnits
    };

    const existingCourses = JSON.parse(localStorage.getItem('published-courses') || '[]');
    const courseIndex = existingCourses.findIndex(c => c.id === id);
    if (courseIndex >= 0) {
      existingCourses[courseIndex] = publishedCourse;
    } else {
      existingCourses.push(publishedCourse);
    }
    localStorage.setItem('published-courses', JSON.stringify(existingCourses));

    const updatedCourseData = { ...currentCourseData, ...publishedCourse, modules, rewards };
    localStorage.setItem(`course-${id}`, JSON.stringify(updatedCourseData));

    toast({ title: '✅ Course published successfully', description: 'Your course is now available on the main courses page.' });
    navigate('/courses');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <CourseHeader
          course={course}
          onNavigateBack={() => navigate('/courses')}
          onSaveDraft={handleSaveDraft}
          onAddModule={() => setShowAddModule(true)}
          onAddReward={() => setShowAddReward(true)}
          hasModules={modules.length > 0}
        />

        <DebugInfo courseId={id} modules={modules} />

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

        <RewardsSection
          rewards={rewards}
          onRemoveReward={handleRemoveReward}
        />

        <PublishSection
          modules={modules}
          onPublishCourse={handlePublishCourse}
        />
      </div>

      <AddModuleDialog
        open={showAddModule}
        onOpenChange={setShowAddModule}
        onAdd={handleAddModule}
      />

      <AddRewardDialog
        open={showAddReward}
        onOpenChange={setShowAddReward}
        onAddReward={handleAddReward}
      />

      <PublishCourseDialog
        open={showPublishModal}
        onOpenChange={setShowPublishModal}
        courseId={id || ''}
      />
    </div>
  );
};

export default CourseBuilder;