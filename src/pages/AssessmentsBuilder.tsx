
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, FileText } from 'lucide-react';
import { AssessmentsList } from '@/components/courses/assessments/AssessmentsList';

const AssessmentsBuilder = () => {
  const { id } = useParams(); // Course ID
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    // Load published assessments from localStorage
    const publishedAssessments = JSON.parse(localStorage.getItem('publishedAssessments') || '[]');
    setAssessments(publishedAssessments);
  }, []);

  const handleBack = () => {
    navigate(`/courses/builder/${id}`);
  };

  const handleCreateAssessment = () => {
    navigate(`/courses/builder/${id}/assessment-builder`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Assessments Builder</h1>
                <p className="text-sm text-gray-600">Module 1 - Create and manage assessments</p>
              </div>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleCreateAssessment}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Assessment
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {assessments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No assessments yet</h2>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Create your first assessment to evaluate student learning.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleCreateAssessment}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Assessment
            </Button>
          </div>
        ) : (
          <AssessmentsList courseId={id || ''} assessments={assessments} />
        )}
      </div>
    </div>
  );
};

export default AssessmentsBuilder;
