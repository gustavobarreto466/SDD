import './css/styles.css';
import { InferenceEngine } from './core/InferenceEngine';
import { RULES } from './data/knowledgeBase';
import { UIController } from './ui/UIController';

document.addEventListener('DOMContentLoaded', () => {
  const engine = new InferenceEngine(RULES);
  const ui = new UIController(engine);
  ui.init();
});