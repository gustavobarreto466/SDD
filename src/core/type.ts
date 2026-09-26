export type Category = 'Hardware' | 'Software' | 'Red';

export interface Symptom {
  id: string;
  label: string;
  category: Category;
}

export interface DiagnosisResult {
  id: string;
  title: string;
  category: Category;
  severity: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  description: string;
  solutions: string[];
}

export interface Rule {
  id: string;
  symptomsRequired: string[]; // IDs de síntomas necesarios
  result: DiagnosisResult;
}