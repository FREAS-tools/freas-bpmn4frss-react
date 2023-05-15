import type { DataValidationResult }
  from "freas-bpmn4frss-library/frss-extension/services/overlays/schemas";
import type { FrssModeler } from 'freas-bpmn4frss-library';

export const showValidation = (
  data: DataValidationResult,
  library: FrssModeler | undefined,
) => {
  try {
    library?.showFrssOverlays(data);
  } catch (e) {
    console.error(e);
    alert('There has been an error while loading the resulting overlays.');
  }
}