import React from "react"
import type { FrssModeler } from "freas-bpmn4frss-library";

/**
 * Loads the file from the input
 * @param event 
 * @param library 
 * @returns 
 */
export const loadDiagramFromFile = (
  event: React.ChangeEvent<HTMLInputElement>,
  library: FrssModeler | undefined
) => {
  const fileArray = event?.target?.files;

  // check errors
  if (
    fileArray === null
    || fileArray === undefined
    || fileArray[0] === null
  ) {
    alert("The file should be specified!");
    return;
  }
  const file = fileArray[0];

  // create a reader and read the file
  const reader = new FileReader();
  reader.readAsText(file, "utf-8");

  // propagate the loaded diagram into the library
  reader.onload = () => {
    const result = reader.result;

    if (typeof result !== 'string') {
      alert('The file could not be loaded');
      return;
    }

    library?.loadDiagram(result);
  };   
}