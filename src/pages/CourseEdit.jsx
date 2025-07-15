import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { ModernCourseSidebar } from '@/components/courses/ModernCourseSidebar';
import { ModulesList } from '@/components/courses/modules/ModulesList';
import { ModuleAssessmentsView } from '@/components/courses/ModuleAssessmentsView';
import { CourseSettings } from '@/components/courses/CourseSettings';
import NewsSection from '@/components/courses/news/NewsSection';
import { CalendarSection } from '@/components/courses/calendar/CalendarSection';
import { LearnersSection } from '@/components/courses/learners/LearnersSection';
import { InstructorsSection } from '@/components/courses/instructors/InstructorsSection';
import { ScoresSection } from '@/components/courses/assessments/ScoresSection';
import { MasterySection } from '@/components/courses/mastery/MasterySection';
import { Header } from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';

// Sidebar width constants
const MAIN_SIDEBAR_EXPANDED = 256; // px, w-64
const MAIN_SIDEBAR_COLLAPSED = 64; // px, w-16
const COURSE_SIDEBAR_EXPANDED = 256; // px, w-64
const COURSE_SIDEBAR_COLLAPSED = 64; // px, w-16

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMainCollapsed } = useSidebar();

  const [course] = useState({
    id: id || '1',
    title: 'Introduction to Legal Studies',
    description: 'A comprehensive overview of legal systems and principles',
    category: 'Law',
    status: "Published",
    students: 45,
    thumbnail: '',
    createdAt: '2024-01-15',
    progressionType: (id && ['7', '8', '9', '10', '11', '12'].includes(id)) ? 'sequential' : 'open'
  });

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
                  type: 'text',
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
  const [currentModule, setCurrentModule] = useState(null);

  useEffect(() => {
    if (viewingAssessments) {
      setMainCollapsed(false);
    }
  }, [viewingAssessments, setMainCollapsed]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setViewingAssessments(false);
    setCurrentModule(null);
  };

  const handleCourseSidebarToggle = (collapsed) => {
    setIsCourseSidebarCollapsed(collapsed);
  };

  const handleBackToCourses = () => {
    navigate('/courses');
  };

  const handleViewAssessments = (module) => {
    // Redirect to the new dedicated assessment view page
    navigate(`/courses/edit/${course.id}/module/${module.id}/assessments-view`);
  };

  const handleBackToModules = () => {
    setViewingAssessments(false);
    setCurrentModule(null);
  };

  const getMainContentMargin = () => {
    if (viewingAssessments) {
      // Only main sidebar, expanded
      return { marginLeft: MAIN_SIDEBAR_EXPANDED };
    }
    // Both sidebars visible
    const mainSidebarWidth = MAIN_SIDEBAR_COLLAPSED;
    const courseSidebarWidth = isCourseSidebarCollapsed
      ? COURSE_SIDEBAR_COLLAPSED
      : COURSE_SIDEBAR_EXPANDED;
    return { marginLeft: mainSidebarWidth + courseSidebarWidth };
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
      <Header />
      <div className="flex pt-16">
        <div className={cn(
          "fixed left-0 top-0 bottom-0 z-40 transition-all duration-300",
          viewingAssessments ? "w-64" : "w-16"
        )}>
          <div className="h-full overflow-hidden">
            <SidebarNav onCloseMobile={() => {}} />
          </div>
        </div>

        {!viewingAssessments && (
          <div className={cn(
            "fixed top-0 bottom-0 z-30 transition-all duration-300",
            "left-16",
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

        <div className={cn(
          "flex-1 transition-all duration-300",
          viewingAssessments 
            ? "ml-64" 
            : isCourseSidebarCollapsed 
              ? "ml-32" 
              : "ml-80"
        )}>
          
        {/* Main Content Area - Takes remaining space */}
        <div
          className={cn("flex-1 transition-all duration-300")}
          style={getMainContentMargin()}
        ></div>
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEdit;
