import { Rule, DiagnosisResult } from './types';

export class InferenceEngine {
  private rules: Rule[] = [];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  public evaluate(selectedSymptomIds: string[]): { diagnosis: DiagnosisResult; matchPercentage: number }[] {
    const results: { diagnosis: DiagnosisResult; matchPercentage: number }[] = [];

    for (const rule of this.rules) {
      const totalRequired = rule.symptomsRequired.length;
      if (totalRequired === 0) continue;

      const matchedSymptoms = rule.symptomsRequired.filter((symptomId: string) => 
        selectedSymptomIds.includes(symptomId)
      );

      const matchPercentage = (matchedSymptoms.length / totalRequired) * 100;

      if (matchPercentage >= 50) {
        results.push({
          diagnosis: rule.result,
          matchPercentage: Math.round(matchPercentage)
        });
      }
    }

    return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }
}