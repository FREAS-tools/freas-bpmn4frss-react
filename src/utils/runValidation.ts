import {SaveXMLResult} from 'bpmn-js/lib/BaseViewer';
import { getValidation } from '../api';
import type { FrssModeler } from 'freas-bpmn4frss-library';

export const runValidation = async (
  diagram: SaveXMLResult | undefined,
  library: FrssModeler | undefined,
) => {
  try {
    if (diagram?.error !== undefined || diagram?.xml === undefined) {
      alert('Diagram deserialisation failed');
      return;
    }

    const result = await getValidation({
      analysis_type: 'SEMANTIC_ALL',
      bpmn_model: diagram.xml,
    });

    // remove previously loaded overlays
    library?.removeFrssOverlays();

    // load new overlays
    library?.showFrssOverlays(result);
  } catch (e) {
    console.log(e);
    alert('Something went wrong');
  }
};