import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const AssessmentSettingsTab = ({
  assessmentSettings,
  onSettingsChange
}) => {
  const handleSettingChange = (field, value) => {
    onSettingsChange({
      ...assessmentSettings,
      [field]: value
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Assessment Settings</h3>
        <p className="text-xs text-gray-600 mb-4">Configure your assessment parameters</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Assessment Title
          </Label>
          <Input
            id="title"
            value={assessmentSettings.title}
            onChange={(e) => handleSettingChange('title', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            id="description"
            value={assessmentSettings.description}
            onChange={(e) => handleSettingChange('description', e.target.value)}
            placeholder="Assessment description"
            className="mt-1 resize-none"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="timeLimit" className="text-sm font-medium text-gray-700">
            Time Limit (minutes)
          </Label>
          <Input
            id="timeLimit"
            type="number"
            value={assessmentSettings.timeLimit}
            onChange={(e) => handleSettingChange('timeLimit', Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="passingScore" className="text-sm font-medium text-gray-700">
            Passing Score
          </Label>
          <Input
            id="passingScore"
            type="number"
            value={assessmentSettings.passingScore}
            onChange={(e) => handleSettingChange('passingScore', Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="attemptsAllowed" className="text-sm font-medium text-gray-700">
            Attempts Allowed
          </Label>
          <Input
            id="attemptsAllowed"
            type="number"
            value={assessmentSettings.attemptsAllowed}
            onChange={(e) => handleSettingChange('attemptsAllowed', Number(e.target.value))}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};