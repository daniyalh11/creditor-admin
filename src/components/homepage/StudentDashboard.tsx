
import React from 'react';
import { AnnouncementSection } from './AnnouncementSection';
import { CalendarSection } from './CalendarSection';
import { StatCard } from '@/components/shared/StatCard';
import { Clock, BarChart, Calendar, BookOpen, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CourseCard from '../courses/CourseCard';
import { useNavigate } from 'react-router-dom';

// Featured courses data
const featuredCourses = [
  {
    id: 1,
    title: "Constitutional Law",
    description: "Fundamentals of constitutional law and its applications in modern legal practice",
    courseCount: 8,
    imageUrl: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Civil Procedure",
    description: "Learn about the rules and standards that courts follow when adjudicating civil lawsuits",
    courseCount: 6,
    imageUrl: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Legal Research",
    description: "Develop skills to conduct effective legal research and document your findings",
    courseCount: 4,
    imageUrl: "https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Criminal Law",
    description: "Explore principles and statutes related to criminal offenses and defense",
    courseCount: 7,
    imageUrl: "https://images.unsplash.com/photo-1589452271712-64b8e0515219?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

// Dashboard statistics data
const dashboardStats = [
  {
    title: "Total Users",
    value: "1,283",
    icon: <Users className="h-5 w-5 text-ca-primary" />,
    trend: { value: 12, positive: true },
  },
  {
    title: "Active Courses",
    value: "24",
    icon: <BookOpen className="h-5 w-5 text-ca-primary" />,
    trend: { value: 8, positive: true },
  },
  {
    title: "Pending Assignments",
    value: "42",
    icon: <FileText className="h-5 w-5 text-ca-primary" />,
    trend: { value: 3, positive: true },
  },
  {
    title: "Completion Rate",
    value: "76%",
    icon: <BarChart className="h-5 w-5 text-ca-primary" />,
    trend: { value: 5, positive: true },
  }
];

export function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left content (first 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Legal Education */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Featured Legal Education</h2>
            
            {/* Featured slider with large image and text overlay */}
            <div className="relative rounded-lg overflow-hidden h-[300px] mb-6 hover-glow transform transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => navigate('/courses')} 
                  className="bg-white/80 backdrop-blur-sm rounded-full p-3 z-10 shadow-md mr-[550px] hover:bg-white hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button 
                  onClick={() => navigate('/courses')} 
                  className="bg-white/80 backdrop-blur-sm rounded-full p-3 z-10 shadow-md ml-[550px] hover:bg-white hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Modern Legal Technology" 
                className="w-full h-full object-cover transform transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 animate-slide-up">Modern Legal Technology</h3>
                  <p className="text-white/80 animate-slide-up" style={{animationDelay: "100ms"}}>Advancing legal education through technology</p>
                </div>
              </div>
            </div>
            
            {/* Dashboard stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {dashboardStats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="border border-slate-200 transform transition-all hover:shadow-glow hover:scale-105 hover:border-ca-primary/30 stagger-item animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="flex flex-col p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <div className="bg-blue-50 p-2 rounded-md animate-pulse">
                        {stat.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold">{stat.value}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`text-xs font-medium ${stat.trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.trend.positive ? '+' : ''}{stat.trend.value}%
                      </span>
                      <span className="text-xs text-muted-foreground">vs. last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Weekly Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="transform transition-all hover:shadow-glow hover:scale-[1.02] hover:border-ca-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24.5</div>
                <p className="text-sm text-green-600">+5.5 this week</p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-all hover:shadow-glow hover:scale-[1.02] hover:border-ca-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal flex items-center">
                  <BarChart className="h-4 w-4 mr-1" /> Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">67%</div>
                <p className="text-sm text-green-600">+12% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Monthly Overview */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Monthly Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-glow transform transition-all duration-300 hover:scale-[1.03] hover:border-ca-primary/30 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Study Hours</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="flex h-48 items-end gap-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                    const height = [18, 23, 28, 26, 36, 32][index];
                    return (
                      <div key={month} className="flex flex-col items-center group">
                        <div 
                          className="bg-ca-primary rounded-t-sm w-12 transition-all duration-500 group-hover:bg-ca-secondary"
                          style={{ 
                            height: `${height * 2}px`,
                            animationDelay: `${index * 100}ms`,
                          }}
                        ></div>
                        <span className="text-xs mt-1">{month}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-glow transform transition-all duration-300 hover:scale-[1.03] hover:border-ca-primary/30 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="text-lg">Completed Courses</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex flex-col justify-center">
                <div className="relative h-48 w-full">
                  <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                    <path
                      d="M0,40 L20,35 L40,25 L60,30 L80,22 L100,15"
                      fill="none"
                      stroke="var(--ca-primary)"
                      strokeWidth="2"
                      className="animate-draw-line"
                      strokeDasharray="200"
                      strokeDashoffset="200"
                      style={{
                        animation: "dash 2s linear forwards",
                      }}
                    />
                    {[0, 20, 40, 60, 80, 100].map((x, i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={[40, 35, 25, 30, 22, 15][i]}
                        r="3"
                        fill="var(--ca-primary)"
                        className="animate-pulse"
                        style={{
                          animationDelay: `${i * 200}ms`,
                        }}
                      />
                    ))}
                    <g className="grid">
                      {[0, 10, 20, 30, 40, 50].map((y, i) => (
                        <line
                          key={`h-${i}`}
                          x1="0"
                          y1={y}
                          x2="100"
                          y2={y}
                          stroke="rgba(0,0,0,0.1)"
                          strokeDasharray="2,2"
                        />
                      ))}
                    </g>
                  </svg>
                  <div className="absolute bottom-0 w-full flex justify-between px-2 text-xs text-gray-500">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Right sidebar with announcements and calendar */}
        <div className="space-y-6">
          <AnnouncementSection />
          <CalendarSection />
        </div>
      </div>
    </div>
  );
}
