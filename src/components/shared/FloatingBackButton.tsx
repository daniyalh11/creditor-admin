
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FloatingBackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Try to go back in history first
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to dashboard if no history
      navigate('/admin');
    }
  };

  return (
    <div className="fixed top-4 left-4 z-[9999] pointer-events-none">
      <Button
        onClick={handleBack}
        variant="outline"
        size="sm"
        className="pointer-events-auto bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 flex items-center gap-2 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
    </div>
  );
};
