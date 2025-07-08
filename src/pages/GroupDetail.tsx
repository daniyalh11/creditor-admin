import React, { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';
// import { ArrowLeft } from 'lucide-react'; // May not be needed if contextual sidebar handles navigation
// import { Button } from '@/components/ui/button'; // May not be needed

const GroupDetail = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { setGroupSectionActive, openGroupPanel, closeGroupPanel } = useSidebar();
  // const navigate = useNavigate();

  useEffect(() => {
    if (groupId) {
      setGroupSectionActive(true);
      openGroupPanel(groupId); // Open panel with current group ID
    }
    
    // Cleanup when component unmounts or groupId changes
    return () => {
      // setGroupSectionActive(false); // This might be too aggressive if navigating between sub-pages
      // closeGroupPanel(); // Only close if navigating away from the group section entirely
    };
  }, [groupId, setGroupSectionActive, openGroupPanel]);

  // The AdminLayout will handle the main structure (main sidebar, contextual sidebar, header, content area).
  // GroupDetail now primarily ensures the group context is set and renders the specific content for the sub-route.
  return (
    <div className="animate-fade-in">
      {/* 
        The header (e.g., group name) might be part of the GroupContextualSidebar or dynamically set in Header.tsx.
        For now, sub-pages like GroupNewsPage will have their own titles.
      */}
      {/* 
      Example of a back button IF the contextual sidebar doesn't have one or for specific flows
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate('/groups')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Groups
        </Button>
      </div> 
      */}
      <Outlet /> {/* This will render GroupNewsPage, GroupCalendarPage, etc. */}
    </div>
  );
};

export default GroupDetail;
