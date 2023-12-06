import CreateDataStoreBehavior from './createDataStoreBehavior';

export default {
    __init__: [
      'createDataStoreBehavior'
    ],
  
    createDataStoreBehavior: ['type', CreateDataStoreBehavior],
    additionalDefinitions: {
        "name": "FlowDataStore",
        "extends": [ "DataStore" ], 
        "superClass": [ "FlowElement", "ItemAwareElement" ]
    }
};