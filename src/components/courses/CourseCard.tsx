
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MonitorIcon, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  courseCount: number;
  imageUrl?: string;
}

const CourseCard = ({ id, title, description, courseCount, imageUrl }: CourseCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the category detail page
    navigate(`/courses/${title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <Card 
      className="overflow-hidden h-full flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer animate-fade-in border-slate-200"
      onClick={handleCardClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
            <BookOpen size={48} className="text-ca-primary opacity-80" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
      </div>
      
      <CardContent className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
        <p className="text-sm text-slate-600 mb-3 flex-grow">{description}</p>
        <div className="flex items-center mt-2 pt-2 border-t border-slate-100">
          <MonitorIcon size={16} className="text-ca-primary mr-2" />
          <span className="text-sm font-medium text-slate-600">{courseCount} {courseCount === 1 ? 'course' : 'courses'}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
