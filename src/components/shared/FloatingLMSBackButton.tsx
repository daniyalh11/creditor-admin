
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FloatingLMSBackButton = () => {
  const getRedirectUrl = (): string => {
    // First, check for 'from' parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from');
    
    if (fromParam) {
      try {
        // Validate that it's a proper URL
        new URL(fromParam);
        return fromParam;
      } catch {
        // Invalid URL, continue to next fallback
      }
    }
    
    // Second, check document.referrer for LMS domains
    if (document.referrer && document.referrer.toLowerCase().includes('lms')) {
      return document.referrer;
    }
    
    // Third, fallback to default LMS URL
    return 'https://your-default-lms.com';
  };

  const handleBackToLMS = () => {
    const redirectUrl = getRedirectUrl();
    window.location.href = redirectUrl;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <Button
        onClick={handleBackToLMS}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl rounded-full px-6 py-3 transition-all duration-200 flex items-center gap-2 font-medium"
        size="lg"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to LMS
      </Button>
    </div>
  );
};
