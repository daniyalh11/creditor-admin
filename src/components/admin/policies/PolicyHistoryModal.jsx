import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { History, Eye, RotateCcw, Calendar, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PolicyHistoryModal = ({
  isOpen,
  onClose,
  policyTitle,
  policyKey,
  onRestore
}) => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showVersionContent, setShowVersionContent] = useState(false);

  // Mock data - in real app this would come from API
  const policyVersions = [
    {
      version: '1.2',
      date: '2024-01-15',
      editedBy: 'Admin User',
      summary: 'Updated data retention policies and GDPR compliance',
      content: 'This privacy policy outlines how we collect, use, and protect your personal information...',
      isCurrent: true
    },
    {
      version: '1.1',
      date: '2024-01-10',
      editedBy: 'Legal Team',
      summary: 'Added cookie consent requirements',
      content: 'Previous version of privacy policy with basic data collection terms...',
    },
    {
      version: '1.0',
      date: '2023-12-01',
      editedBy: 'System Admin',
      summary: 'Initial policy creation',
      content: 'Original privacy policy document with fundamental terms...',
    }
  ];

  const handleViewContent = (version) => {
    setSelectedVersion(version);
    setShowVersionContent(true);
  };

  const handleRestore = (version) => {
    if (onRestore) {
      onRestore(version);
    }
    toast({
      title: 'Policy Restored',
      description: `${policyTitle} has been restored to version ${version}.`,
    });
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <Dialog open={isOpen && !showVersionContent} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              {policyTitle} - Version History
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {policyVersions.map((version) => (
              <Card key={version.version} className={version.isCurrent ? 'border-primary' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">Version {version.version}</CardTitle>
                      {version.isCurrent && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewContent(version)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Content
                      </Button>
                      {!version.isCurrent && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
                            >
                              <RotateCcw className="h-4 w-4" />
                              Restore
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Restore Policy Version</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to restore {policyTitle} to version {version.version}? 
                                This will replace the current version and cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRestore(version.version)}>
                                Restore Version
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(version.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{version.editedBy}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Summary of Changes:</p>
                    <p className="text-sm text-muted-foreground">{version.summary}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Version Content Modal */}
      <Dialog open={showVersionContent} onOpenChange={() => setShowVersionContent(false)}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              {policyTitle} - Version {selectedVersion?.version}
            </DialogTitle>
          </DialogHeader>
          
          {selectedVersion && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-b pb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(selectedVersion.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{selectedVersion.editedBy}</span>
                </div>
                {selectedVersion.isCurrent && (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Current Version
                  </Badge>
                )}
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Summary of Changes:</h4>
                <p className="text-sm text-muted-foreground mb-4">{selectedVersion.summary}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Policy Content:</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm">{selectedVersion.content}</p>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setShowVersionContent(false)}>
                  Back to History
                </Button>
                {!selectedVersion.isCurrent && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Restore This Version
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Restore Policy Version</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to restore {policyTitle} to version {selectedVersion.version}? 
                          This will replace the current version and cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRestore(selectedVersion.version)}>
                          Restore Version
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PolicyHistoryModal;