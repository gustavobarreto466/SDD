import { Rule, DiagnosisResult } from './types';

export class InferenceEngine {
  private rules: Rule[] = [];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  /**
   * Evalúa los síntomas proporcionados y retorna las coincidencias con su grado de certeza.
   */
  public evaluate(selectedSymptomIds: string[]): { diagnosis: DiagnosisResult; matchPercentage: number }[] {
    const results: { diagnosis: DiagnosisResult; matchPercentage: number }[] = [];

    for (const rule of this.rules) {
      const totalRequired = rule.symptomsRequired.length;
      if (totalRequired === 0) continue;

      const matchedSymptoms = rule.symptomsRequired.filter(symptomId => 
        selectedSymptomIds.includes(symptomId)
      );

      const matchPercentage = (matchedSymptoms.length / totalRequired) * 100;

      // Retornar si cumple al menos un umbral del 50% de síntomas de la regla
      if (matchPercentage >= 50) {
        results.push({
          diagnosis: rule.result,
          matchPercentage: Math.round(matchPercentage)
        });
      }
    }

    // Ordenar resultados por mayor porcentaje de coincidencia
    return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }
}