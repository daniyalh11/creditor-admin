
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Event, ModalMode } from './types';
import { SimpleRichTextEditor } from './SimpleRichTextEditor';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  selectedEvent: Event | null;
  selectedDate: Date | null;
  onSave: (eventData: Event) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedEvent,
  selectedDate,
  onSave,
  onEdit,
  onDelete
}) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [eventTitle, setEventTitle] = useState('');
  const [eventStartDate, setEventStartDate] = useState<Date | null>(null);
  const [eventEndDate, setEventEndDate] = useState<Date | null>(null);
  const [eventAllDay, setEventAllDay] = useState(true);
  const [eventDescription, setEventDescription] = useState('');
  const [repeatEvent, setRepeatEvent] = useState(false);
  const [repeatFrequency, setRepeatFrequency] = useState('daily');
  const [repeatInterval, setRepeatInterval] = useState(1);
  const [repeatEndType, setRepeatEndType] = useState<'never' | 'after' | 'on'>('never');
  const [repeatEndDate, setRepeatEndDate] = useState<Date | null>(null);
  const [repeatEndCount, setRepeatEndCount] = useState(5);

  // Reset form to default values
  const resetEventForm = () => {
    setEventTitle('');
    setEventDescription('');
    setEventAllDay(true);
    setRepeatEvent(false);
    setRepeatFrequency('daily');
    setRepeatInterval(1);
    setRepeatEndType('never');
    setRepeatEndDate(null);
    setRepeatEndCount(5);
    setActiveTab('summary');
  };

  // Load event data into form for editing
  const loadEventForEdit = (event: Event) => {
    setEventTitle(event.title);
    setEventStartDate(event.startDate);
    setEventEndDate(event.endDate);
    setEventAllDay(event.allDay);
    setEventDescription(event.description || '');
    setRepeatEvent(event.repeat || false);
    setRepeatFrequency(event.repeatFrequency || 'daily');
    setRepeatInterval(event.repeatInterval || 1);
    setRepeatEndType(event.repeatEndType || 'never');
    setRepeatEndDate(event.repeatEndDate || null);
    setRepeatEndCount(event.repeatEndCount || 5);
    setActiveTab('summary');
  };

  useEffect(() => {
    if (mode === 'create' && selectedDate) {
      resetEventForm();
      setEventStartDate(selectedDate);
      setEventEndDate(selectedDate);
    } else if ((mode === 'edit' || mode === 'view') && selectedEvent) {
      loadEventForEdit(selectedEvent);
    }
  }, [mode, selectedEvent, selectedDate]);

  const handleSave = () => {
    if (!eventTitle || !eventStartDate || !eventEndDate) {
      return;
    }
    
    const eventData: Event = {
      id: selectedEvent?.id || `event-${Date.now()}`,
      title: eventTitle,
      startDate: eventStartDate,
      endDate: eventEndDate,
      allDay: eventAllDay,
      description: eventDescription,
      repeat: repeatEvent,
      repeatFrequency: repeatEvent ? repeatFrequency : undefined,
      repeatInterval: repeatEvent ? repeatInterval : undefined,
      repeatEndType: repeatEvent ? repeatEndType : undefined,
      repeatEndDate: repeatEvent && repeatEndType === 'on' ? repeatEndDate : undefined,
      repeatEndCount: repeatEvent && repeatEndType === 'after' ? repeatEndCount : undefined
    };
    
    onSave(eventData);
    onClose();
  };

  const getDialogTitle = () => {
    switch (mode) {
      case 'view': return 'View Event';
      case 'edit': return 'Edit Event';
      case 'create': return 'Add Event';
      default: return 'Add Event';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl">{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        
        {mode === 'view' && selectedEvent && (
          <div className="flex justify-end space-x-2 mb-4">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={onEdit}>
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="repeat">Repeat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="event-name">Name:</Label>
              <Input 
                id="event-name" 
                placeholder="Event name" 
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                disabled={mode === 'view'}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Duration:</Label>
              <div className="flex flex-col space-y-2">
                <div className="grid grid-cols-2 gap-2 items-center">
                  <Input 
                    type="date"
                    value={eventStartDate ? format(eventStartDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setEventStartDate(e.target.value ? new Date(e.target.value) : null)}
                    disabled={mode === 'view'}
                  />
                  <span className="text-center">to</span>
                  <Input 
                    type="date"
                    value={eventEndDate ? format(eventEndDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setEventEndDate(e.target.value ? new Date(e.target.value) : null)}
                    disabled={mode === 'view'}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="description" className="space-y-4 pt-4">
            <div className="w-full">
              <SimpleRichTextEditor
                value={eventDescription}
                onChange={setEventDescription}
                placeholder="Add description for your event..."
                disabled={mode === 'view'}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="repeat" className="pt-4">
            <div className="space-y-6">
              <div className="flex items-center">
                <Checkbox 
                  id="repeat-event" 
                  checked={repeatEvent}
                  onCheckedChange={(checked) => setRepeatEvent(!!checked)}
                  disabled={mode === 'view'}
                />
                <label htmlFor="repeat-event" className="ml-2 font-medium">Repeat</label>
              </div>
              
              {repeatEvent && (
                <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                      <Label htmlFor="repeat-frequency" className="text-sm">Repeats:</Label>
                      <Select 
                        value={repeatFrequency}
                        onValueChange={setRepeatFrequency}
                        disabled={mode === 'view'}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Label htmlFor="repeat-interval" className="text-sm">Repeats every:</Label>
                      <div className="flex items-center gap-2">
                        <Select
                          value={repeatInterval.toString()}
                          onValueChange={(val) => setRepeatInterval(parseInt(val))}
                          disabled={mode === 'view'}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>days</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-sm">Event ends:</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroup 
                            value={repeatEndType}
                            onValueChange={(val: 'never' | 'after' | 'on') => setRepeatEndType(val)}
                            disabled={mode === 'view'}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="never" id="end-never" disabled={mode === 'view'} />
                              <Label htmlFor="end-never">Never</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2 mt-2">
                              <RadioGroupItem value="after" id="end-after" disabled={mode === 'view'} />
                              <div className="flex items-center gap-2">
                                <Label htmlFor="end-after">After</Label>
                                <Input 
                                  type="number" 
                                  className="w-16" 
                                  min={1}
                                  value={repeatEndCount}
                                  onChange={(e) => setRepeatEndCount(parseInt(e.target.value) || 1)}
                                  disabled={mode === 'view' || repeatEndType !== 'after'}
                                />
                                <span>occurrences</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 mt-2">
                              <RadioGroupItem value="on" id="end-on" disabled={mode === 'view'} />
                              <div className="flex items-center gap-2">
                                <Label htmlFor="end-on">On</Label>
                                <Input 
                                  type="date"
                                  className="w-auto"
                                  value={repeatEndDate ? format(repeatEndDate, 'yyyy-MM-dd') : ''}
                                  onChange={(e) => setRepeatEndDate(e.target.value ? new Date(e.target.value) : null)}
                                  disabled={mode === 'view' || repeatEndType !== 'on'}
                                />
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {mode !== 'view' && (
          <div className="text-sm text-gray-500 mt-2">* Optional</div>
        )}
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            {mode === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {(mode === 'create' || mode === 'edit') && (
            <Button variant="default" onClick={handleSave}>
              {mode === 'edit' ? 'Update' : 'Save'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
