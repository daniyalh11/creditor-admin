
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PolicySectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const PolicySection: React.FC<PolicySectionProps> = ({ title, description, children }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground pt-1">{description}</p>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default PolicySection;
