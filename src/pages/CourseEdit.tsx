import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { ModernCourseSidebar } from '@/components/courses/ModernCourseSidebar';
import { ModulesList } from '@/components/courses/modules/ModulesList';
import { ModuleAssessmentsView } from '@/components/courses/ModuleAssessmentsView';
import { CourseSettings } from '@/components/courses/CourseSettings';
import { NewsSection } from '@/components/courses/news/NewsSection';
import { CalendarSection } from '@/components/courses/calendar/CalendarSection';
import { LearnersSection } from '@/components/courses/learners/LearnersSection';
import { InstructorsSection } from '@/components/courses/instructors/InstructorsSection';
import { ScoresSection } from '@/components/courses/assessments/ScoresSection';
import { MasterySection } from '@/components/courses/mastery/MasterySection';
import { Header } from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMainCollapsed } = useSidebar();
  
  // Mock course data - determine if sequential based on course ID
  const [course] = useState({
    id: id || '1',
    title: 'Introduction to Legal Studies',
    description: 'A comprehensive overview of legal systems and principles',
    category: 'Law',
    status: "Published" as const,
    students: 45,
    thumbnail: '',
    createdAt: '2024-01-15',
    // For demo: courses with ID 7-12 are sequential, others are open
    progressionType: (id && ['7', '8', '9', '10', '11', '12'].includes(id)) ? 'sequential' as const : 'open' as const
  });

  // Mock modules data for the course
  const mockModules = [
    {
      id: 'module-1',
      title: 'Legal System Basics',
      description: 'Overview of legal systems and structures',
      units: [
        {
          id: 'unit-1',
          title: 'Introduction to Legal Concepts',
          lessons: [
            {
              id: 'lesson-1',
              title: 'Legal Terminology',
              sections: [
                {
                  id: 'section-1',
                  type: 'text' as const,
                  title: 'Common Legal Terms',
                  content: 'This section covers common legal terminology used in the field.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Constitutional Law',
      description: 'Understanding constitutional principles and applications',
      units: []
    },
    {
      id: 'module-3',
      title: 'Criminal Law Fundamentals',
      description: 'Basic principles of criminal law and procedure',
      units: []
    }
  ];

  const [activeSection, setActiveSection] = useState('modules');
  const [isCourseSidebarCollapsed, setIsCourseSidebarCollapsed] = useState(false);
  const [viewingAssessments, setViewingAssessments] = useState(false);
  const [currentModule, setCurrentModule] = useState<any>(null);

  // Keep main sidebar expanded when viewing assessments
  useEffect(() => {
    if (viewingAssessments) {
      setMainCollapsed(false);
    }
  }, [viewingAssessments, setMainCollapsed]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Reset assessments view when changing sections
    setViewingAssessments(false);
    setCurrentModule(null);
  };

  const handleCourseSidebarToggle = (collapsed: boolean) => {
    setIsCourseSidebarCollapsed(collapsed);
  };

  const handleBackToCourses = () => {
    navigate('/courses');
  };

  const handleViewAssessments = (module: any) => {
    setCurrentModule(module);
    setViewingAssessments(true);
  };

  const handleBackToModules = () => {
    setViewingAssessments(false);
    setCurrentModule(null);
  };

  const renderContent = () => {
    if (viewingAssessments && currentModule) {
      return (
        <ModuleAssessmentsView
          moduleTitle={currentModule.title}
          onBack={handleBackToModules}
        />
      );
    }

    switch (activeSection) {
      case 'modules':
        return (
          <ModulesList 
            courseId={course.id} 
            modules={mockModules} 
            progressionType={course.progressionType}
            onViewAssessments={handleViewAssessments}
          />
        );
      case 'news':
        return <NewsSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'scores':
        return <ScoresSection />;
      case 'mastery':
        return <MasterySection />;
      case 'learners':
        return <LearnersSection />;
      case 'instructors':
        return <InstructorsSection />;
      case 'settings':
        return <CourseSettings courseId={course.id} />;
      default:
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{activeSection}</h2>
            <p className="text-gray-600">Content for {activeSection} section coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Header - Always visible */}
      <Header />

      {/* Main Layout Container - starts below fixed header */}
      <div className="flex pt-16">
        {/* Main Sidebar - Fixed left, always expanded when viewing assessments */}
        <div className={cn(
          "fixed left-0 top-0 bottom-0 z-40 transition-all duration-300",
          viewingAssessments ? "w-64" : "w-16"
        )}>
          <div className="h-full overflow-hidden">
            <SidebarNav onCloseMobile={() => {}} />
          </div>
        </div>

        {/* Course Sidebar - Hide when viewing assessments */}
        {!viewingAssessments && (
          <div className={cn(
            "fixed top-0 bottom-0 z-30 transition-all duration-300",
            "left-16", // Start right after the main sidebar
            isCourseSidebarCollapsed ? "w-16" : "w-64"
          )}>
            <ModernCourseSidebar 
              course={course}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              onToggle={handleCourseSidebarToggle}
              onBackToCourses={handleBackToCourses}
              isCollapsed={isCourseSidebarCollapsed}
            />
          </div>
        )}
        
        {/* Main Content Area - Takes remaining space */}
        <div className={cn(
          "flex-1 transition-all duration-300",
          viewingAssessments 
            ? "ml-64" // Expanded main sidebar when viewing assessments
            : isCourseSidebarCollapsed 
              ? "ml-32" // Both sidebars collapsed
              : "ml-80" // Both sidebars expanded
        )}>
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEdit;
