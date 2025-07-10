import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [isMainCollapsed, setIsMainCollapsed] = useState(false);
  
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const [isAdminSectionActive, setIsAdminSectionActive] = useState(false);

  const [isGroupSidebarOpen, setIsGroupSidebarOpen] = useState(false);
  const [isGroupSectionActive, setIsGroupSectionActive] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);

  const location = useLocation();
  
  useEffect(() => {
    const isInAdminSection = location.pathname.startsWith('/admin');
    const groupViewRegex = /^\/groups\/view\/([^/]+)/;
    const groupMatch = location.pathname.match(groupViewRegex);
    const isInGroupSection = !!groupMatch;
    const currentGroupId = groupMatch ? groupMatch[1] : null;
    const isInAssessmentBuilder = location.pathname.includes('/assessment-builder');
    
    // Check if we're on assessment dashboard pages that should keep main sidebar expanded
    const isOnAssessmentDashboard = location.pathname.includes('/quiz/') ||
                                   location.pathname.includes('/assignment/') ||
                                   location.pathname.includes('/debate/') ||
                                   location.pathname.includes('/essay/') ||
                                   location.pathname.includes('/survey/');
    
    // Check if we're on the module assessments view page (where assessments are listed)
    const isOnModuleAssessmentsView = /\/courses\/edit\/\d+.*assessments/.test(location.pathname);
    
    // Add module-related paths that should auto-collapse the main sidebar
    // BUT exclude assessment dashboard pages and module assessments view
    const isInModuleContext = (location.pathname.startsWith('/courses/edit/') ||
                              location.pathname.startsWith('/modules/') ||
                              location.pathname.includes('/module-builder')) &&
                              !isOnAssessmentDashboard &&
                              !isOnModuleAssessmentsView;

    // Determine if we're in a context that needs main sidebar collapsed
    const isInSpecialContext = isInAdminSection || 
                              isInGroupSection || 
                              isInAssessmentBuilder ||
                              isInModuleContext;

    setIsAdminSectionActive(isInAdminSection);
    setIsGroupSectionActive(isInGroupSection);
    setActiveGroupId(currentGroupId);

    if (isInSpecialContext) {
      setIsMainCollapsed(true);
      if (!isInAdminSection) {
        setIsAdminSidebarOpen(false);
      }
      if (!isInGroupSection) {
        setIsGroupSidebarOpen(false);
      }
    } else {
      setIsMainCollapsed(false);
      setIsAdminSidebarOpen(false);
      setIsGroupSidebarOpen(false);
    }
  }, [location.pathname]);
  
  const toggleMain = () => setIsMainOpen(!isMainOpen);
  const closeMain = () => setIsMainOpen(false);
  
  const toggleAdminSidebar = () => {
    const newState = !isAdminSidebarOpen;
    setIsAdminSidebarOpen(newState);
    if (!newState) {
      setIsAdminSectionActive(false);
    } else {
       setIsMainCollapsed(true);
    }
  };
  
  const openAdminPanel = () => {
    setIsMainCollapsed(true);
    setIsAdminSidebarOpen(true);
    setIsAdminSectionActive(true);
    setIsGroupSidebarOpen(false);
  };
  
  const closeAdminPanel = () => {
    setIsAdminSidebarOpen(false);
    if (!isGroupSectionActive) {
        setIsMainCollapsed(false);
    }
  };

  const toggleGroupSidebar = () => {
    const newState = !isGroupSidebarOpen;
    setIsGroupSidebarOpen(newState);
    if (!newState) {
      setIsGroupSectionActive(false);
    } else {
      setIsMainCollapsed(true);
    }
  };

  const openGroupPanel = (groupId) => {
    setActiveGroupId(groupId);
    setIsMainCollapsed(true);
    setIsGroupSidebarOpen(true);
    setIsGroupSectionActive(true);
    setIsAdminSidebarOpen(false);
  };

  const closeGroupPanel = () => {
    setIsGroupSidebarOpen(false);
    setActiveGroupId(null);
    if (!isAdminSectionActive) {
        setIsMainCollapsed(false);
    }
  };

  return (
    <SidebarContext.Provider 
      value={{ 
        isMainOpen, 
        toggleMain, 
        closeMain, 
        
        isAdminSectionActive,
        setAdminSectionActive: setIsAdminSectionActive,
        isMainCollapsed,
        setMainCollapsed: setIsMainCollapsed,
        isAdminSidebarOpen,
        toggleAdminSidebar,
        setAdminSidebarOpen: setIsAdminSidebarOpen,
        openAdminPanel,
        closeAdminPanel,

        isGroupSectionActive,
        setGroupSectionActive: setIsGroupSectionActive,
        isGroupSidebarOpen,
        toggleGroupSidebar,
        setGroupSidebarOpen: setIsGroupSidebarOpen,
        openGroupPanel,
        closeGroupPanel,
        activeGroupId
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}