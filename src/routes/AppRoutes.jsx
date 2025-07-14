import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/layout/AdminLayout';

// Import all page components
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import CourseCreation from '../pages/CourseCreation';
import CourseBuilder from '../pages/CourseBuilder';
import UnitsBuilder from '../pages/UnitsBuilder';
import LessonBuilder from '../pages/LessonBuilder';
import AssessmentsBuilder from '../pages/AssessmentsBuilder';
import AssessmentBuilder from '../pages/AssessmentBuilder';
import CategoryDetail from '../pages/CategoryDetail';
import CourseDetail from '../pages/CourseDetail';
import CourseEdit from '../pages/CourseEdit';
import Groups from '../pages/Groups';
import GroupDetail from '../pages/GroupDetail';
import GroupManage from '../pages/GroupManage';
import Catalog from '../pages/Catalog';
import CatalogDetail from '../pages/CatalogDetail';
import Assignments from '../pages/Assignments';
import AssignmentDetail from '../pages/AssignmentDetail';
import AssignmentEdit from '../pages/AssignmentEdit';
import Progress from '../pages/Progress';
import Reports from '../pages/Reports';
import UsersPage from '../pages/Users';
import UserDetail from '../pages/UserDetail';
import UserEdit from '../pages/UserEdit';
import Messages from '../pages/Messages';
import Surveys from '../pages/Surveys';
import SurveyDetail from '../pages/SurveyDetail';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Help from '../pages/Help';
import SupportTicket from '../pages/SupportTicket';
import ModuleDetail from '../pages/ModuleDetail';
import LessonEditor from '../pages/LessonEditor';
import ContactSupport from '../pages/ContactSupport';
import UserGuide from '../pages/UserGuide';
import SurveyBuilder from '@/pages/SurveyBuilder';
import Resources from '../pages/Resources';
import SearchResults from '../pages/SearchResults';

// Import group pages
import GroupNewsPage from '../pages/groups/GroupNewsPage';
import GroupCalendarPage from '../pages/groups/GroupCalendarPage';
import GroupMembersPage from '../pages/groups/GroupMembersPage';
import GroupAdminsPage from '../pages/groups/GroupAdminsPage';
import GroupResourcesPage from '../pages/groups/GroupResourcesPage';
import GroupOverviewPage from '../pages/groups/GroupOverviewPage';
import GroupChatPage from '../pages/groups/GroupChatPage';

// Import admin pages
import Admin from '../pages/Admin';
import AdminDashboardPage from '../pages/admin/AdminDashboard';
import ApiSettings from '../pages/admin/ApiSettings';
import AboutSettings from '../pages/admin/AboutSettings';
import AccountsSettings from '../pages/admin/AccountsSettings';
import ActivitySettings from '../pages/admin/ActivitySettings';
import AutomationSettingsPage from '../pages/admin/AutomationSettings';
import CalendarSettings from '../pages/admin/CalendarSettings';
import CatalogSettings from '../pages/settings/CatalogSettings';
import CourseSettings from '../pages/settings/CourseSettings';
import EmailSettings from '../pages/admin/EmailSettings';
import ExportSettings from '../pages/settings/ExportSettings';
import HelpDeskSettings from '../pages/settings/HelpDeskSettings';
import ImportSettings from '../pages/settings/ImportSettings';
import MasterySettings from '../pages/settings/MasterySettings';
import MessagesSettings from '../pages/settings/MessagesSettings';
import ModerateSettings from '../pages/admin/ModerateSettings';
import PermissionsSettings from '../pages/settings/PermissionsSettings';
import PortalSettings from '../pages/settings/PortalSettings';
import TaggingSettings from '../pages/settings/TaggingSettings';
import GameSettings from '../pages/admin/GameSettings';
import GradingScales from '../pages/admin/GradingScales';
import CopilotSettings from '../pages/admin/CopilotSettings';
import PlansSettings from '../pages/settings/PlansSettings';
import PoliciesSettings from '../pages/settings/PoliciesSettings';
import ZoomUsSettings from '../pages/admin/ZoomUsSettings';
import LTISettings from '../pages/admin/LTISettings';

import DebateDashboard from '@/pages/DebateDashboard';
import QuizDashboard from '@/pages/QuizDashboard';
import EssayDashboard from '@/pages/EssayDashboard';
import AssignmentDashboard from '@/pages/AssignmentDashboard';
import AdminAssignmentDashboard from '@/pages/AdminAssignmentDashboard';
import SurveyDashboard from '@/pages/SurveyDashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Course Edit route - standalone without AdminLayout */}
      <Route path="/courses/edit/:id" element={<CourseEdit />} />
      
      {/* Assessment Builder route - standalone without AdminLayout */}
      <Route path="/courses/builder/:id/assessment-builder" element={<AssessmentBuilder />} />
      
      <Route element={<AdminLayout title="Dashboard" />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/create" element={<CourseCreation />} />
        {/* Add route for editing courses in creation form */}
        <Route path="/courses/create/edit" element={<CourseCreation />} />
        <Route path="/courses/builder/:id" element={<CourseBuilder />} />
        <Route path="/courses/builder/:id/units" element={<UnitsBuilder />} />
        <Route path="/courses/builder/:id/units/lesson/:lessonId" element={<LessonBuilder />} />
        <Route path="/courses/builder/:id/assessments" element={<AssessmentsBuilder />} />
        <Route path="/courses/:categoryId" element={<CategoryDetail />} />
        <Route path="/courses/view/:id" element={<CourseDetail />} />
        
        {/* Module routes */}
        <Route path="/modules/view/:id" element={<ModuleDetail />} />
        <Route path="/modules/edit/:id" element={<ModuleDetail />} />
        
        {/* Lesson routes */}
        <Route path="/lessons/view/:id" element={<ModuleDetail />} />
        <Route path="/lessons/edit/:id" element={<LessonEditor />} />
        
        <Route path="/groups" element={<Groups />} />
        {/* Group Detail and its sub-routes */}
        <Route path="/groups/view/:groupId" element={<GroupDetail />}>
          <Route index element={<Navigate to="news" replace />} /> 
          <Route path="overview" element={<GroupOverviewPage />} />
          <Route path="news" element={<GroupNewsPage />} />
          <Route path="calendar" element={<GroupCalendarPage />} />
          <Route path="chat" element={<GroupChatPage />} />
          <Route path="members" element={<GroupMembersPage />} />
          <Route path="admins" element={<GroupAdminsPage />} />
          <Route path="resources" element={<GroupResourcesPage />} />
        </Route>
        <Route path="/groups/manage/:id" element={<GroupManage />} />

        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/view/:catalogId" element={<CatalogDetail />} />
        <Route path="/catalog/manage/:catalogId" element={<CatalogDetail />} />

        <Route path="/assignments" element={<Assignments />} />
        <Route path="/assignments/view/:id" element={<AssignmentDetail />} />
        <Route path="/assignments/edit/:id" element={<AssignmentEdit />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/view/:id" element={<UserDetail />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/surveys" element={<Surveys />} />
        <Route path="/surveys/view/:surveyId" element={<SurveyDetail />} />
        <Route path="/surveys/builder/:surveyId" element={<SurveyBuilder />} />
        <Route path="/survey-builder" element={<SurveyBuilder />} />
        <Route path="/games" element={<GameSettings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchResults />} />
        
        {/* Help & Support Routes */}
        <Route path="/help" element={<Help />} />
        <Route path="/help/faqs" element={<Help />} />
        <Route path="/help/contact" element={<ContactSupport />} />
        <Route path="/help/guides" element={<UserGuide />} />
        <Route path="/help/ticket" element={<SupportTicket />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/api" element={<ApiSettings />} />
        <Route path="/admin/about" element={<AboutSettings />} />
        <Route path="/admin/accounts" element={<AccountsSettings />} />
        <Route path="/admin/accounts/:tab" element={<AccountsSettings />} />
        <Route path="/admin/activity" element={<ActivitySettings />} />
        <Route path="/admin/automation" element={<AutomationSettingsPage />} />
        <Route path="/admin/automation/:tab" element={<AutomationSettingsPage />} />
        <Route path="/admin/calendar" element={<CalendarSettings />} />
        <Route path="/admin/catalog" element={<CatalogSettings />} />
        <Route path="/admin/copilot" element={<CopilotSettings />} />
        <Route path="/admin/courses" element={<CourseSettings />} />
        <Route path="/admin/email" element={<EmailSettings />} />
        <Route path="/admin/export" element={<ExportSettings />} />
        <Route path="/admin/games" element={<GameSettings />} />
        <Route path="/admin/grading" element={<GradingScales />} />
        <Route path="/admin/help" element={<HelpDeskSettings />} />
        <Route path="/admin/import" element={<ImportSettings />} />
        <Route path="/admin/lti" element={<LTISettings />} />
        <Route path="/admin/lti/:tab" element={<LTISettings />} />
        <Route path="/admin/mastery" element={<MasterySettings />} />
        <Route path="/admin/messages" element={<MessagesSettings />} />
        <Route path="/admin/moderate" element={<ModerateSettings />} />
        <Route path="/admin/moderate/:tab" element={<ModerateSettings />} />
        <Route path="/admin/permissions" element={<PermissionsSettings />} />
        <Route path="/admin/plans" element={<PlansSettings />} />
        <Route path="/admin/policies" element={<PoliciesSettings />} />
        <Route path="/admin/policies/:tab" element={<PoliciesSettings />} />
        <Route path="/admin/portal" element={<PortalSettings />} />
        <Route path="/admin/tagging" element={<TaggingSettings />} />
        <Route path="/admin/zoomus" element={<ZoomUsSettings />} />
        
        {/* Admin assignment routes */}
        <Route path="/admin/courses/:id/assignments" element={<AdminAssignmentDashboard />} />
        <Route path="/admin/courses/:id/assignments/:assignmentId" element={<AdminAssignmentDashboard />} />
        
        <Route path="/admin/*" element={<Admin />} />
      </Route>
      
      {/* Assessment dashboard routes - standalone without AdminLayout */}
      <Route path="/courses/edit/:id/debate/:debateId" element={<DebateDashboard />} />
      <Route path="/courses/edit/:id/quiz/:quizId" element={<QuizDashboard />} />
      <Route path="/courses/edit/:id/essay/:essayId" element={<EssayDashboard />} />
      <Route path="/courses/edit/:id/assignment/:assignmentId" element={<AssignmentDashboard />} />
      <Route path="/courses/edit/:id/survey/:surveyId" element={<SurveyDashboard />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;