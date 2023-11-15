import { Buffer } from 'buffer';
import { getAndValidateRequest } from '../api';
import type { FrssModeler } from 'freas-bpmn4frss-library';
import type {
  DataValidationFormData,
  DataValidationRequest,
} from 'freas-bpmn4frss-library/frss-extension/services/overlays/schemas';
import { showValidation } from './showValidation';

export const runValidation = async (
  data: DataValidationFormData,
  library: FrssModeler | undefined,
) => {
  try {
    /* Obtain the XML diagram for the request */
    const xmlDiagram = await library?.saveXML();
    if (xmlDiagram?.error !== undefined || xmlDiagram?.xml === undefined) {
      alert('Diagram deserialisation failed');
      return;
    }

    /* Build the request data */
    const request: DataValidationRequest = {
      ...data,
      model: Buffer.from(xmlDiagram.xml, 'binary').toString('base64')
    };
    /* Send request to the REST API */
    const result = await getAndValidateRequest(request);

    /* Remove previously loaded validation */
    library?.removeFrssOverlays();

    /* Load new overlays */
    showValidation(result, library);
  } catch (e) {
    console.error(e);
    alert('Something went wrong during request creation.');
  }
};