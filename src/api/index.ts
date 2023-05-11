import axios from "axios";
import {
  dataValidationResultSchema,
  type DataValidationRequest,
  type DataValidationResult
} from "freas-bpmn4frss-library/frss-extension/services/overlays/schemas";
import { validationApiRoute } from "./route";

/**
 * Call validation (very alpha stage)
 * @param data the data that is needed for validation (the BPMN model)
 *             and the required mode
 * @returns validated response
 */
export const getValidation = async (
  data: DataValidationRequest,
): Promise<DataValidationResult> => {
  const response = await axios.post(validationApiRoute, data);

  return dataValidationResultSchema.parse(response.data);
}