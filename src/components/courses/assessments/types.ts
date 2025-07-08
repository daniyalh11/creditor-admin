
export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'Quiz' | 'Essay' | 'Assignment' | 'Survey' | 'Debate';
  duration: number;
  status: 'published' | 'draft';
  maxScore?: number;
  format?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  topic?: string;
  questions?: number;
  attempts?: string;
  wordLimit?: number;
  // Survey-specific properties
  surveyType?: string;
  responseLimit?: string;
}

export interface AssessmentCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  assessments: Assessment[];
  expanded: boolean;
}
