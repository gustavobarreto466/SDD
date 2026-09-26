import { InferenceEngine } from '../core/InferenceEngine';
import { SYMPTOMS } from '../data/knowledgeBase';
import { Symptom } from '../core/types';

export class UIController {
  private engine: InferenceEngine;

  constructor(engine: InferenceEngine) {
    this.engine = engine;
  }

  public init(): void {
    this.renderSymptoms();
    this.setupEventListeners();
  }

  private renderSymptoms(): void {
    const container = document.getElementById('symptoms-container');
    if (!container) return;

    const hardwareSymptoms = SYMPTOMS.filter(s => s.category === 'Hardware');
    const softwareSymptoms = SYMPTOMS.filter(s => s.category === 'Software');

    const renderGroup = (title: string, icon: string, symptoms: Symptom[]) => `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="color: var(--accent); font-size: 1.1rem; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>${icon}</span> ${title}
        </h3>
        <div class="symptoms-grid">
          ${symptoms.map(symptom => `
            <label class="symptom-item">
              <input type="checkbox" value="${symptom.id}" class="symptom-checkbox" />
              <span>${symptom.label}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = `
      ${renderGroup('Síntomas de Hardware', '💻', hardwareSymptoms)}
      ${renderGroup('Síntomas de Software', '⚙️', softwareSymptoms)}
    `;
  }

  private setupEventListeners(): void {
    const btnDiagnose = document.getElementById('btn-diagnose');
    const btnReset = document.getElementById('btn-reset');

    btnDiagnose?.addEventListener('click', () => this.handleDiagnose());
    btnReset?.addEventListener('click', () => this.handleReset());
  }

  private handleDiagnose(): void {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.symptom-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(cb => cb.value);

    const resultsContainer = document.getElementById('results-container');
    if (!resultsContainer) return;

    if (selectedIds.length === 0) {
      resultsContainer.innerHTML = '<p style="color: var(--text-muted)">Por favor, selecciona al menos un síntoma para realizar el análisis.</p>';
      return;
    }

    const results = this.engine.evaluate(selectedIds);

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p style="color: var(--text-muted)">No se encontraron diagnósticos que concuerden con los síntomas seleccionados.</p>';
      return;
    }

    const precisionNotice = selectedIds.length === 1 
      ? `<div style="background: rgba(56, 189, 248, 0.1); border: 1px solid var(--accent); border-radius: 8px; padding: 0.8rem 1rem; margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-main);">
          💡 <strong>Nota de precisión:</strong> Has seleccionado solo 1 síntoma. Seleccionar más síntomas relacionados ayudará a que el sistema entregue un diagnóstico más preciso y específico.
         </div>`
      : '';

    resultsContainer.innerHTML = precisionNotice + results.map(res => `
      <div class="diagnosis-card">
        <div class="diagnosis-header">
          <h3>${res.diagnosis.title} <small>(${res.matchPercentage}% de coincidencia)</small></h3>
          <span class="badge badge-${res.diagnosis.severity.toLowerCase()}">${res.diagnosis.severity}</span>
        </div>
        <p>${res.diagnosis.description}</p>
        <h4 style="margin-top: 0.8rem; font-size: 0.95rem;">Soluciones recomendadas:</h4>
        <ul class="solutions-list">
          ${res.diagnosis.solutions.map(sol => `<li>${sol}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  private handleReset(): void {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.symptom-checkbox');
    checkboxes.forEach(cb => cb.checked = false);

    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
      resultsContainer.innerHTML = '<p style="color: var(--text-muted)">Selecciona síntomas y haz clic en "Analizar Fallas" para ver los resultados.</p>';
    }
  }
}