import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { Header } from './Header';
import { Menu, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import { AdminNavigation } from './AdminNavigation';
import { GroupContextualSidebar } from './GroupContextualSidebar';
import { useToast } from '@/hooks/use-toast';
import { FloatingBackButton } from '@/components/shared/FloatingBackButton';

const getAdminContext = (pathname) => {
  if (pathname.includes('/admin/accounts')) {
    return {
      tabs: [
        { value: "overview", label: "Overview" },
        { value: "roles", label: "Roles" },
        { value: "form", label: "Form" },
        { value: "email", label: "Email" },
        { value: "signup", label: "Sign up" },
        { value: "fields", label: "Fields" },
        { value: "settings", label: "Settings" },
        { value: "profiles", label: "Profiles" },
        { value: "rules", label: "Rules" },
        { value: "inactivity", label: "Inactivity" },
        { value: "avatars", label: "Avatars" },
        { value: "custom", label: "Custom" },
      ],
      activeTab: pathname.split('/').pop() || "overview"
    };
  } else if (pathname.includes('/admin/automation')) {
    return {
      tabs: [],
      activeTab: "" 
    };
  } else if (pathname.startsWith('/admin/moderate')) {
    return {
      tabs: [],
      activeTab: ""
    };
  } else if (pathname.startsWith('/admin/policies')) {
    return {
      tabs: [],
      activeTab: ""
    };
  }
  return { tabs: [], activeTab: "" };
};

export const AdminLayout = ({ title }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { groupId: routeGroupId } = useParams();

  const { 
    isMainCollapsed, 
    setMainCollapsed, 
    isAdminSectionActive,
    isAdminSidebarOpen,
    toggleAdminSidebar,
    closeAdminPanel,
    openAdminPanel,
    isGroupSectionActive,
    isGroupSidebarOpen,
    toggleGroupSidebar,
    closeGroupPanel,
    openGroupPanel,
    activeGroupId
  } = useSidebar();
  const { toast } = useToast();

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleMainSidebarCollapse = () => {
    setMainCollapsed(!isMainCollapsed);
  };

  const handleToggleAdminSidebar = () => {
    if (isAdminSidebarOpen) {
      closeAdminPanel();
      if (!isGroupSectionActive) navigate('/');
    } else {
      openAdminPanel();
    }
    toast({
      title: isAdminSidebarOpen ? "Admin panel closed" : "Admin panel opened",
      duration: 2000,
    });
  };
  
  const handleToggleGroupSidebar = () => {
    if (isGroupSidebarOpen) {
      closeGroupPanel();
    } else {
      if (activeGroupId) {
        openGroupPanel(activeGroupId);
      }
    }
    toast({
      title: isGroupSidebarOpen ? "Group panel closed" : "Group panel opened",
      duration: 2000,
    });
  };

  const { tabs, activeTab } = getAdminContext(location.pathname);
  
  const handleTabChange = (value) => {
    const basePath = location.pathname.includes('/admin/accounts/') 
      ? '/admin/accounts'
      : location.pathname.split('/').slice(0, -1).join('/'); 
    
    const newPath = `${basePath}/${value}`;
    navigate(newPath);
  };

  useEffect(() => {
    if (!isAdminSectionActive && isAdminSidebarOpen) {
      // closeAdminPanel();
    }
    if (!isGroupSectionActive && isGroupSidebarOpen) {
      // closeGroupPanel();
    }
  }, [isAdminSectionActive, isAdminSidebarOpen, isGroupSectionActive, isGroupSidebarOpen, closeAdminPanel, closeGroupPanel]);
  
  useEffect(() => {
    if (isMobile && isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
    
    const currentPath = location.pathname;
    if (currentPath === '/admin/accounts') {
      navigate('/admin/accounts/overview');
    } else if (currentPath === '/admin/automation') {
      navigate('/admin/automation/courses');
    }
  }, [location.pathname, isMobile, navigate, isMobileSidebarOpen]);

  const isContextualSidebarOpen = isAdminSidebarOpen || isGroupSidebarOpen;
  const showAdminContextualSidebar = isAdminSectionActive && isAdminSidebarOpen;
  const showGroupContextualSidebar = isGroupSectionActive && isGroupSidebarOpen;

  const contextualSidebarWidth = "16rem";
  const isContextualSidebarVisuallyCollapsed = false;

  const shouldShowFloatingBackButton = location.pathname.startsWith('/admin') && 
    !location.pathname.endsWith('/admin') && 
    !tabs.length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 transform transition-all duration-500 ease-in-out lg:translate-x-0",
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          isMainCollapsed ? 'lg:w-16' : 'lg:w-64'
        )}
      >
        <SidebarNav onCloseMobile={() => setIsMobileSidebarOpen(false)} />
      </div>

      {/* Contextual Sidebar (Admin or Group) */}
      {(showAdminContextualSidebar || showGroupContextualSidebar) && (
        <div
          className={cn(
            "fixed inset-y-0 z-30 transform transition-all duration-500 ease-in-out flex flex-col",
            isMobile ? (isContextualSidebarOpen ? 'translate-x-0 left-0 w-64' : '-translate-x-full w-64') 
                     : '',
            "animate-fade-in"
          )}
          style={{ 
            left: isMobile ? undefined : (isMainCollapsed ? '4rem' : '16rem'),
            width: isMobile ? undefined : contextualSidebarWidth
          }}
        >
          {showAdminContextualSidebar && (
            <>
              <div className="h-16 flex items-center justify-between px-4 border-b sticky top-0 bg-sidebar z-10 border-sidebar-border">
                <h2 className="font-semibold text-lg text-sidebar-foreground">Admin Settings</h2>
                <Button variant="ghost" size="icon" onClick={handleToggleAdminSidebar} aria-label="Close admin sidebar" className="hover:bg-sidebar-accent/80 transition-all hover:scale-110 text-sidebar-foreground">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto bg-white">
                <AdminNavigation pathname={location.pathname} collapsed={isContextualSidebarVisuallyCollapsed} />
              </div>
            </>
          )}
          {showGroupContextualSidebar && (
            <GroupContextualSidebar isCollapsed={isContextualSidebarVisuallyCollapsed} />
          )}
        </div>
      )}

      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          className="text-primary hover:bg-accent/80 transition-all hover:scale-110 hover:rotate-12 shadow-sm hover:shadow-md"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Sidebar Collapse Toggle Button */}
      {!isMobile && (
        <div 
          className="fixed z-50 top-5 transition-all duration-500"
          style={{ 
            left: isMainCollapsed ? '3.75rem' : '15.75rem'
          }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMainSidebarCollapse}
            className="rounded-full h-6 w-6 flex items-center justify-center bg-background shadow-md hover:shadow-glow transition-all hover:scale-110"
          >
            {isMainCollapsed ? 
              <ChevronRight className="h-4 w-4 animate-pulse" /> : 
              <ChevronLeft className="h-4 w-4 animate-pulse" />
            }
          </Button>
        </div>
      )}

      {/* Contextual Sidebar Toggle Button */}
      {!isMobile && (
        <>
          {isAdminSectionActive && !isAdminSidebarOpen && (
             <div 
              className="fixed z-50 top-5 transition-all duration-500 animate-pulse"
              style={{ left: isMainCollapsed ? '4.5rem' : '16.5rem' }}
            >
              <Button
                variant="outline" size="icon" onClick={handleToggleAdminSidebar}
                className="rounded-full h-6 w-6 flex items-center justify-center bg-background shadow-md hover:shadow-glow transition-all hover:scale-110"
                aria-label="Open admin sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          {isGroupSectionActive && !isGroupSidebarOpen && activeGroupId && (
             <div 
              className="fixed z-50 top-5 transition-all duration-500 animate-pulse"
              style={{ left: isMainCollapsed ? '4.5rem' : '16.5rem' }} 
            >
              <Button
                variant="outline" size="icon" onClick={handleToggleGroupSidebar}
                className="rounded-full h-6 w-6 flex items-center justify-center bg-background shadow-md hover:shadow-glow transition-all hover:scale-110"
                aria-label="Open group sidebar"
              >
                <ChevronRight className="h-4 w-4" /> 
              </Button>
            </div>
          )}
        </>
      )}
      
      {/* Floating Back Button */}
      {shouldShowFloatingBackButton && <FloatingBackButton />}

      {/* Main Content Area */}
      <div
        className="transition-all duration-500 flex-1"
        style={{
          marginLeft: isMobile ? '0' : 
            (isContextualSidebarOpen ? 
              (isMainCollapsed ? `calc(4rem + ${contextualSidebarWidth})` : `calc(16rem + ${contextualSidebarWidth})`) :
              (isMainCollapsed ? '4rem' : '16rem')
            )
        }}
      >
        <Header />
        <main className="pt-16 transition-all duration-500">
          {tabs.length > 0 && (
            <div className="bg-background border-b animate-slide-up">
              <div className="container overflow-x-auto">
                <Tabs defaultValue={activeTab} className="p-1" onValueChange={handleTabChange}>
                  <TabsList className="h-12 p-0 bg-transparent w-full justify-start gap-1 overflow-x-auto">
                    {tabs.map((tab) => (
                      <TabsTrigger 
                        key={tab.value} 
                        value={tab.value}
                        className={cn(
                          "px-6 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium transition-all hover:bg-accent/50",
                          "tab-highlight relative overflow-hidden",
                          "group"
                        )}
                      >
                        <span className="relative z-10 group-hover:animate-pulse">{tab.label}</span>
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-primary transition-opacity duration-300"></span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          )}
          <div className="container py-6 px-4 lg:px-6 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};