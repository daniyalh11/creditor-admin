import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit2, Save, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const PolicyItem = ({
  id,
  label,
  type,
  initialValue,
  placeholder,
  defaultValueLabel,
  onSave,
  isCrossedOut = false,
  buttonLinkAction
}) => {
  const [isChecked, setIsChecked] = useState(typeof initialValue === 'boolean' ? initialValue : false);
  const [textValue, setTextValue] = useState(typeof initialValue === 'string' ? initialValue : '');
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
    if (onSave) {
      onSave(id, checked);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(id, textValue);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTextValue(typeof initialValue === 'string' ? initialValue : '');
  }

  if (type === 'checkbox') {
    return (
      <div className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-b-0">
        <Checkbox
          id={id}
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
          disabled={isCrossedOut}
        />
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            isCrossedOut ? "line-through text-muted-foreground" : ""
          )}
        >
          {label}
        </label>
      </div>
    );
  }

  if (type === 'editableText') {
    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
        <span className={cn("text-sm", isCrossedOut ? "line-through text-muted-foreground" : "")}>{label}</span>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder={placeholder}
              className="w-auto h-8"
            />
            {defaultValueLabel && <span className="text-xs text-muted-foreground whitespace-nowrap">({defaultValueLabel})</span>}
            <Button variant="ghost" size="icon" onClick={handleSave} className="h-8 w-8">
              <Save size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCancel} className="h-8 w-8">
              <XCircle size={16} />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {textValue || placeholder} {defaultValueLabel && `(${defaultValueLabel})`}
            </span>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-8 w-8">
              <Edit2 size={16} />
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  if (type === 'buttonLink') {
    return (
      <div className="py-3 border-b border-gray-100 last:border-b-0">
        <Button variant="link" onClick={buttonLinkAction} className="p-0 h-auto text-primary hover:underline">
            <Edit2 size={16} className="mr-2"/> {label}
        </Button>
      </div>
    );
  }

  return null;
};

export default PolicyItem;