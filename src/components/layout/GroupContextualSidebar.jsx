import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';
import {
  Newspaper,
  CalendarDays,
  Users,
  Shield,
  Library,
  ChevronLeft,
  LayoutGrid,
  MessageCircle
} from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const GroupContextualSidebar = ({ isCollapsed }) => {
  const { groupId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { closeGroupPanel, setGroupSectionActive } = useSidebar();

  if (!groupId) return null;

  const handleCloseGroupSidebar = () => {
    closeGroupPanel();
    setGroupSectionActive(false);
    navigate('/groups');
  };

  const groupNavItems = [
    { icon: LayoutGrid, label: 'Overview', path: `/groups/view/${groupId}/overview` },
    { icon: Newspaper, label: 'News', path: `/groups/view/${groupId}/news` },
    { icon: CalendarDays, label: 'Calendar', path: `/groups/view/${groupId}/calendar` },
    { icon: MessageCircle, label: 'Group Chat', path: `/groups/view/${groupId}/chat` },
    { icon: Users, label: 'Members', path: `/groups/view/${groupId}/members` },
    { icon: Shield, label: 'Admins', path: `/groups/view/${groupId}/admins` },
    { icon: Library, label: 'Resources', path: `/groups/view/${groupId}/resources` },
  ];

  const renderTooltip = (content, children) => {
    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="right" className="animate-in fade-in-80 zoom-in-95 duration-200">
            {content}
          </TooltipContent>
        </Tooltip>
      );
    }
    return children;
  };

  return (
    <div
      className={cn(
        'h-full flex flex-col bg-sidebar border-r shadow-lg transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div
        className={cn(
          'h-16 flex items-center border-b sticky top-0 bg-sidebar z-10',
          'border-sidebar-border',
          isCollapsed ? 'px-2 justify-center' : 'px-4 justify-between'
        )}
      >
        {!isCollapsed && (
          <h2 className="font-semibold text-lg text-sidebar-foreground">Group Menu</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCloseGroupSidebar}
          aria-label="Close group sidebar"
          className="hover:bg-sidebar-accent/80 transition-all hover:scale-110 text-sidebar-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-none">
        {groupNavItems.map((item) =>
          renderTooltip(
            item.label,
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              to={item.path}
              active={
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + '/')
              }
              onClick={() => navigate(item.path)}
              collapsed={isCollapsed}
              className={cn(isCollapsed && 'justify-center')}
            />
          )
        )}
      </nav>
    </div>
  );
};
