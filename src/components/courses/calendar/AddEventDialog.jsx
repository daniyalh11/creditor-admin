import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

/**
 * @typedef {'blue' | 'green' | 'red' | 'yellow' | 'purple'} EventColor
 */

/**
 * @typedef {object} CalendarEvent
 * @property {string} title - The title of the event.
 * @property {Date} date - The date of the event.
 * @property {string} time - The time of the event (e.g., "14:00").
 * @property {string} [description] - An optional description for the event.
 * @property {EventColor} color - A color tag for the event.
 * @property {string} [location] - An optional location for the event.
 */

/**
 * A dialog component for adding a new event to the calendar.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controls if the dialog is open.
 * @param {() => void} props.onClose - Function to call when the dialog should close.
 * @param {(event: CalendarEvent) => void} props.onAdd - Function to call to add the new event.
 * @param {Date | null} [props.initialDate] - An optional initial date for the event.
 */
export const AddEventDialog = ({
  isOpen,
  onClose,
  onAdd,
  initialDate
}) => {
  const [activeTab, setActiveTab] = useState('Summary');
  const [formData, setFormData] = useState({
    title: '',
    date: new Date(),
    time: '',
    description: '',
    color: 'blue',
    location: ''
  });

  useEffect(() => {
    if (initialDate) {
      setFormData(prev => ({ ...prev, date: initialDate }));
    }
  }, [initialDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.time) {
      onAdd(formData);
      // Reset form after submission
      setFormData({
        title: '',
        date: initialDate || new Date(),
        time: '',
        description: '',
        color: 'blue',
        location: ''
      });
      onClose();
    }
  };

  const tabs = ['Summary', 'Description', 'Repeat', 'Miscellaneous'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>
        
        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Summary Tab */}
          {activeTab === 'Summary' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Name:</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Event name"
                  required
                />
              </div>

              <div>
                <Label>Duration:</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(formData.date, "MM/dd/yyyy")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => date && setFormData({...formData, date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <span>to</span>
                  
                  <div className="flex items-center space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(formData.date, "MM/dd/yyyy")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => date && setFormData({...formData, date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-500">* Optional</div>
            </div>
          )}

          {/* Description Tab */}
          {activeTab === 'Description' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Enter location (optional)"
                />
              </div>

              <div>
                <Label>Color Tag</Label>
                <Select 
                  value={formData.color} 
                  onValueChange={(value) => setFormData({...formData, color: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="yellow">Yellow</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter event description (optional)"
                  rows={4}
                  className="resize-none"
                  dir="ltr"
                  style={{ direction: 'ltr', textAlign: 'left' }}
                />
              </div>
            </div>
          )}

          {/* Repeat Tab */}
          {activeTab === 'Repeat' && (
            <div className="space-y-4">
              <div>
                <Label>Repeat Pattern</Label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Does not repeat</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Miscellaneous Tab */}
          {activeTab === 'Miscellaneous' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label>Priority</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};