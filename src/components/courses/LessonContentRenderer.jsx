import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Play, Pause, Headphones, BookOpen } from 'lucide-react';

export const LessonContentRenderer = ({
  lesson,
  isPlaying,
  onPlayPause
}) => {
  switch (lesson.type) {
    case 'video':
      return (
        <div className="space-y-4">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
            <img 
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=450&fit=crop" 
              alt="Video preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={onPlayPause}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
              {isPlaying ? "0:15 / 25:00" : "0:00 / 25:00"}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Video Description:
            </h4>
            <p className="text-gray-600 mb-4">
              {lesson.content}
            </p>
            <div className="mt-3">
              <p className="font-medium text-sm text-gray-700 mb-1">Key Topics Covered:</p>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Strategy development and planning</li>
                <li>• Digital marketing channels and platforms</li>
                <li>• Campaign execution and optimization</li>
                <li>• Performance measurement and analytics</li>
              </ul>
            </div>
          </div>
        </div>
      );
    case 'audio':
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Headphones className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Audio Lesson</h4>
                <p className="text-sm text-gray-600">Duration: {lesson.duration}</p>
              </div>
              <Button onClick={onPlayPause} className="bg-blue-500 hover:bg-blue-600">
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{isPlaying ? "5:32 / 30:00" : "0:00 / 30:00"}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1">
                  <div className={`bg-blue-500 h-1 rounded-full transition-all duration-300 ${isPlaying ? 'w-1/6' : 'w-0'}`}></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              Audio Transcript:
            </h4>
            <p className="text-gray-600">
              {lesson.content}
            </p>
          </div>
        </div>
      );
    default:
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Text Content</h4>
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Immersive Reader
            </Button>
          </div>
          <div className="prose prose-sm max-w-none">
            <p>{lesson.content}</p>
            
            <h5 className="font-medium mt-4 mb-2">Key Concepts:</h5>
            <ul className="space-y-1 text-gray-700">
              <li>- Legal Structure: Business trusts are formed under state law and provide a flexible structure for business operations</li>
              <li>- Fiduciary Duties: Trustees have legal obligations to manage assets in the best interests of beneficiaries</li>
              <li>- Tax Advantages: Business trusts can provide certain tax benefits depending on their structure and jurisdiction</li>
              <li>- Asset Protection: Properly structured trusts can offer protection from creditors and legal claims</li>
            </ul>
          </div>
        </div>
      );
  }
};

// Add prop-types for runtime validation in JavaScript
LessonContentRenderer.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'video', 'audio']).isRequired,
    duration: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
};