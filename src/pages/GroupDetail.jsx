import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';
// import { ArrowLeft } from 'lucide-react'; // Uncomment if needed
// import { Button } from '@/components/ui/button'; // Uncomment if needed

const GroupDetail = () => {
  const { groupId } = useParams();
  const { setGroupSectionActive, openGroupPanel, closeGroupPanel } = useSidebar();
  // const navigate = useNavigate();

  useEffect(() => {
    if (groupId) {
      setGroupSectionActive(true);
      openGroupPanel(groupId); // Open panel with current group ID
    }

    // Optional cleanup (commented out for sub-page navigation persistence)
    return () => {
      // setGroupSectionActive(false);
      // closeGroupPanel();
    };
  }, [groupId, setGroupSectionActive, openGroupPanel]);

  return (
    <div className="animate-fade-in">
      {/* Optional back button:
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate('/groups')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Groups
        </Button>
      </div>
      */}
      <Outlet />
    </div>
  );
};

export default GroupDetail;
