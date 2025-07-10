import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle } from 'lucide-react';

const GroupRssFeeds = ({ onReturnToNews }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">RSS Feeds</h2>
        <Button variant="outline" onClick={onReturnToNews}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to News
        </Button>
      </div>
      <div className="text-center py-10 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground mb-4">There are currently no news feeds.</p>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add or edit feeds
        </Button>
      </div>
    </div>
  );
};

export default GroupRssFeeds;
