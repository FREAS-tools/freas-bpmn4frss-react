import React, { useEffect } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  DataValidationFormData,
  analysisTypes,
  dataValidationFormSchema,
} from "freas-bpmn4frss-library/frss-extension/services/overlays/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import type { FrssModeler } from "freas-bpmn4frss-library";
import { runValidation } from "../utils/runValidation";
import { Button } from "./Button";

type ValidationFormProps = {
  className: string,
  library: FrssModeler | undefined,

  // diagram prop which triggers re-rendering of the panel
  diagram: string | undefined,
};

type OptionProps = {
  value: string,
}

const Option: React.FC<OptionProps> = ({value}) => (
  <option value={value}>{value}</option>
)

export const ValidationForm: React.FC<ValidationFormProps> = (
  {className, library},
) => {
  // obtain react hook form hooks
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    unregister
  } = useForm<DataValidationFormData>({
    // use the validation schema to perform validation of the form data
    resolver: zodResolver(dataValidationFormSchema),
  });

  const onSubmit: SubmitHandler<DataValidationFormData> = async (data) => {
    await runValidation(data, library);
  };

  const includeElementId = watch('analysis_type');

  // unregister the element_id input when the evidence quality analysis option
  // is not present
  useEffect(() => {
    if (includeElementId !== 'EVIDENCE_QUALITY_ANALYSIS') {
      unregister('element_id');
    }
  }, [unregister, includeElementId])

  return (
    <div className={`bio-properties-panel ${className}`}>
      {/* Using the CSS classes from the @bpmn-io/properties-panel library */}
      <div className="bio-properties-panel-header">
        <div className="bio-properties-panel-header-labels panel-header">
          Run BPMN4FRSS diagram validation
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='validation-form'>
        <label 
          htmlFor="analysis-type"
          className="bio-properties-panel-label"
        >
          Select the analysis type
        </label>
        <select
          {
            ...register(
              'analysis_type',
              { required: 'analysis type is required' }
            )
          }
          className="bio-propeties-panel-input"
          id="analysis-type"
        >
          {
            // possible options are defined by the constant "analysisTypes" array
            analysisTypes
              .map(
                (analysisType) => (
                  <Option value={analysisType} key={analysisType}/>
                ))
          }
        </select>
        {
          // When the quality analysis is performed, it expects 
          // a valid element id
          watch('analysis_type') === 'EVIDENCE_QUALITY_ANALYSIS' 
          &&(
            <>
              <label
                htmlFor="quality-analysis-element-id"
                className="bio-properties-panel-label"
              >
                Select element ID for the analysis
              </label>
              <select {...register('element_id')} 
                className="bio-propeties-panel-input"
                id="quality-analysis-element-id"
              >
              {
                library
                  ?.getListOfElementIds([
                    'bpmn:Task',
                    'bpmn:DataStoreReference',
                  ])
                  .map((id) => <Option value={id} key={id} />)
              }
              </select>
            </>
          )
        }
        <div className="">{errors.root?.message}</div>
      {/* Input that runs the valudation */}
      <div className="form-button-container">
        <input 
          type="submit"
          value="Run validation"
          className="button clickable"
        />
        {/* Button to hide the overlays */}
        <Button
          onClick={() => library?.removeFrssOverlays()}
          caption="Hide overlays"
          type="button"
        />
      </div>
      
      </form>
    </div>
  );
};
